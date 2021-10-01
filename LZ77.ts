import { create2ByteNumber, create4ByteNumber, getNumberFrom2Byte, getNumberFrom4Byte, readBinaryData } from "./utils";

type CharTableValue = [number, number, string | null];

/**
 * Алгоритм Lempel-Ziv 1977 - динамическое накопление словаря при сжатии данных
 */
export class LZ77 {
  text: string;
  charTable: Array<CharTableValue> = [];
  bufferLength = 1000;
  dictLength = 1000; // чем больше словарь - тем меньше сжатый файл, но дольше сжатие
  private fileName: string;

  constructor(fileName: string, encoding?: BufferEncoding) {
    this.fileName = fileName;

    if (encoding) {
      this.text = readBinaryData(fileName).toString(encoding);
    }
  }

  public encode() {
    let cursor = 0;

    while (cursor < this.text.length) {
      const currentChar = this.text[cursor];
      /**
       * @TODO переименовать нормально dictIdxArr
       * Мы ничего не ищем в словаре charTable!
       * Наоборот, мы каждый раз "с чистого листа" посимвольно сравниваем кусок текста из окна и из буфера
       */
      const windowIdxArr = this.getAllMatchIdxInWindow(cursor);

      if (windowIdxArr?.length > 0) {
        const [position, length] = this.findLongestSubstring(cursor, windowIdxArr);
        const newChar = this.text[cursor + length] || null; // null - если строка закончилась
        this.charTable.push([position, length, newChar]);
        cursor += length + 1;
      } else {
        this.charTable.push([0, 0, currentChar]);
        cursor++;
      }
    }

    const data = this.createBinaryData();

    return data;
  }

  private createBinaryData() {
    const algoTypeLength = 1; // 1 байт - 0 или 1
    const initialDataLength = 4; // количество символов в исходных данных занимает 4 байта

    const positionByteSize = 2;  // позиция начала повтора займет 2 байта
    const lengthByteSize = 1;  // число повтора символа может занять до 3 байт, так как могут быть большие числа
    const charByteSize = 1; // буква займет 1 байт
    const charTableByteSize = 
      this.charTable.length * positionByteSize 
      + this.charTable.length * lengthByteSize
      + this.charTable.length * charByteSize;

    const bufferLength = algoTypeLength + initialDataLength + charTableByteSize;

    const binaryData = new Uint8Array(bufferLength);
    binaryData[0] = 1; // тип алгоритма

    const dataLengthBytes = create4ByteNumber(this.charTable.length);
    binaryData.set(dataLengthBytes, 1);
    

    const charTableBuffer = this.createCharTableBuffer(charTableByteSize);
    binaryData.set(charTableBuffer, 5);

    return binaryData;
  }

  private createCharTableBuffer(charTableByteSize: number): Uint8Array {
    const charTableData = new Uint8Array(charTableByteSize);
    let i = 0;
  
    for (let [position, length, char] of this.charTable) {
      if (i === charTableByteSize) break;
  
      charTableData.set(create2ByteNumber(position), i);
      charTableData[i+2] = length;
      charTableData[i+3] = char !== null ? char.charCodeAt(0) : 0;
  
      i += 4;
    }

    return charTableData;
  }

  public decode(): string {
    const encodedData: Buffer = readBinaryData(this.fileName);

    const dataView = new Uint8Array(encodedData);

    const algoType: 0 | 1 = dataView[0] as 0 | 1;
    const dataLength: number = getNumberFrom4Byte(dataView, 1);

    for (let i = 5; i < encodedData.byteLength; i += 4) {
      const position = getNumberFrom2Byte(encodedData, i);
      const length = encodedData[i+2];
      const char = encodedData[i+3] !== 0 ? String.fromCharCode(encodedData[i+3]) : null;

      this.charTable.push([position, length, char]);
    }

    let result = '';

    this.charTable.forEach(value => {
      let cursor = result.length - value[0]; // с какой позиции начинаем копировать
      let length = value[1]; // количество символов для копирования

      while (length > 0) {
        result += result[cursor];
        cursor++;
        length--;
      }

      // Добавляем последний, "уникальный" символ
      result += (value[2] !== null ? value[2] : '');
    });

    return result;
  }

  /**
   * "Жадный" алгоритм: ищет самое длинное совпадение
   */
  private findLongestSubstring(cursor: number, dictIdxArr: number[]) {
    const results = new Map<number, number>();

    for (let i = 0; i < dictIdxArr.length; i++) {
      let dictIdx = dictIdxArr[i];
      let count = 0;
      let cursorCopy = cursor;

      while (this.text[dictIdx + count] === this.text[cursorCopy]) {
        count++;
        cursorCopy++;
      }

      const position = (cursor - dictIdx);

      results.set(position, count);
    }

    const longestSubStr = Array.from(results.entries()).sort(([key1, value1], [key2, value2]) => value2 > value1 ? 1 : -1)[0];

    return longestSubStr;
  }

  /**
   * Находим все совпадения в window
   */
  private getAllMatchIdxInWindow(cursor: number): number[] {
    const windowOffset = this.getWindowOffset(cursor);

    const windowIdxArr: number[] = this.text
      .slice(windowOffset, cursor)
      .split('')
      .reduce((accum, current, currentIndex) => {
        if (current === this.text[cursor]) {
          accum.push(currentIndex + windowOffset); // получаем "абсолютный" индекс из исходной строки
        }

        return accum;
      }, []);

    return windowIdxArr;
  }

  /**
   * Насколько окно словаря смещено относительно начала строки
   */
  private getWindowOffset(cursor: number): number {
    return cursor - this.dictLength > 0 ? cursor - this.dictLength : 0;
  }
}