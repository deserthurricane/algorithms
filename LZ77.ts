// Алгоритм Lempel-Ziv 1977 - динамическое накопление словаря при сжатии данных

import { create2ByteNumber, create4ByteNumber, getNumberFrom16Bit, getNumberFrom32Bit, readBinaryData, writeBinaryData } from "./utils";

type CharTableValue = [number, number, string | null];

class LZ77 {
  text: string;
  charTable: Array<CharTableValue> = [];
  bufferLength = 1000;
  dictLength = 1000; // вопрос! как правильно выбрать размер?
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.text = readBinaryData(fileName).toString('base64');
    // console.log(this.text, 'this.text');
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
      const dictIdxArr = this.getAllCoincidenceIdxFromCharTable(cursor);

      if (dictIdxArr?.length > 0) {
        const [position, length] = this.findLongestSubstring(cursor, dictIdxArr);
        const newChar = this.text[cursor + length] || null; // null - если строка закончилась
        this.charTable.push([position, length, newChar]);
        cursor += length + 1;
      } else {
        this.charTable.push([0, 0, currentChar]);
        cursor++;
      }

      // console.log(this.charTable);
    }

    const data = this.createBinaryData();

    // console.log(data, 'data');
    
    writeBinaryData(`${this.fileName}.lz`, data);
  }

  createBinaryData() {
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

  createCharTableBuffer(charTableByteSize: number): Uint8Array {
    const charTableData = new Uint8Array(charTableByteSize);
    let i = 0;
  
    for (let [position, length, char] of this.charTable) {
      if (i === charTableByteSize) break;
  
      charTableData.set(create2ByteNumber(position), i);
      charTableData[i+2] = length;
      charTableData[i+3] = char !== null ? char.charCodeAt(0) : 0;
  
      i += 4;
    }

    console.log(charTableData, 'charTableData');

    return charTableData;
  }

  public decode(fileName: string): string {
    const encodedData: Buffer = readBinaryData(fileName);

    const dataView = new Uint8Array(encodedData);

    const algoType: 0 | 1 = dataView[0] as 0 | 1;
    const dataLength: number = getNumberFrom32Bit(dataView, 1);
    console.log(dataLength, 'dataLength');
    

    const charTable = [];

    for (let i = 5; i < encodedData.byteLength; i += 4) {
      const position = encodedData.slice(i, i + 2).readInt16LE();
      const length = encodedData[i+2];
      const char = encodedData[i+3] !== 0 ? String.fromCharCode(encodedData[i+3]) : null;

      charTable.push([position, length, char]);
    }

    let result = '';

    charTable.forEach(value => {
      let cursor = result.length - value[0]; // с какой позиции начинаем копировать
      let length = value[1]; // количество символов для копирования

      while (length > 0) {
        result += result[cursor];
        cursor++;
        length--;
      }
      // Добавляем последний, уникальный символ
      result += (value[2] !== null ? value[2] : '');
    });

    // console.log(result, 'decoded string');

    writeBinaryData(`${this.fileName}.lz.decoded`, Buffer.from(result, 'base64'))
    return result;
  }

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

    // console.log(results, 'results');
    //  const longestSubStr = Object.entries(results).sort(([key1, value1], [key2, value2]) => value2 > value1 ? 1 : -1)[0]
    // console.log(Array.from(Object.entries(results)));

    const longestSubStr = Array.from(results.entries()).sort(([key1, value1], [key2, value2]) => value2 > value1 ? 1 : -1)[0];
    // console.log(longestSubStr, 'longestSubStr');

    return longestSubStr;
  }
  /**
   * Находим все совпадения в charTable
   */
  private getAllCoincidenceIdxFromCharTable(cursor: number): number[] {
    // console.log(cursor, 'cursor');
    const windowOffset = this.getWindowOffset(cursor);
    // console.log(windowOffset, 'windowOffset');

    const dictIdxArr: number[] = this.text
      .slice(windowOffset, cursor)
      .split('')
      .reduce((accum, current, currentIndex) => {
        if (current === this.text[cursor]) {
          accum.push(currentIndex + windowOffset); // получаем "абсолютный" индекс из исходной строки
        }

        return accum;
      }, []);

    // console.log(dictIdxArr, 'dictIdxArr');
    return dictIdxArr;
  }

  /**
   * Насколько окно словаря смещено относительно начала строки
   */
  private getWindowOffset(cursor: number): number {
    return cursor - this.dictLength > 0 ? cursor - this.dictLength : 0;
  }

  /**
   * Встречается ли в словаре в интервале скользящего окна искомый символ
   * @TODO оптимизировать ???, так как позже мы проходим по той же строке в getAllCoincidenceIdxFromCharTable 
   */
  // hasCharTableCurrentCharInWindow(char: string, cursor: number): boolean {
  //   // Проход до первого совпадения, чтобы получить булевый результат и сэкономить количество итераций
  //   return this.charTable.some(value =>
  //     value[2] === char // проверка на наличие символа в словаре - в общем
  //     && value[1] <= this.dictLength // попадает ли найденный символ в текущий размер окна - в частности
  //   );
  // }
}

/**
 * ТЕСТЫ
 */
// const algor = new LZ77('ABRAKADABRA');
// algor.encode();
// algor.decode();

// const algor2 = new LZ77('aacaacabcabaaac');
// algor2.encode();
// algor2.decode();

// const algor3 = new LZ77('КОСИЛКОСОЙКОСОЙКОСОЙ');
// algor3.encode();
// algor3.decode();

// const algor4 = new LZ77(GRANATOVYI_BRASLET);
// algor4.encode();
// algor4.decode();

// const algor5 = new LZ77('latin.txt');
// // algor5.encode();
// algor5.decode('latin.txt.lz');

const algor6 = new LZ77('LZ77.png');
algor6.encode();
// algor6.decode('LZ77.png.lz');