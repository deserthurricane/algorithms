// Алгоритм Lempel-Ziv 1977 - динамическое накопление словаря при сжатии данных

type CharTableValue = [number, number, string | null];

class LZ77 {
  text: string;
  charTable: Array<CharTableValue> = [];
  bufferLength = 4;
  dictLength = 6; // вопрос! как правильно выбрать размер?

  constructor(text: string) {
    this.text = text;
  }

  encode() {
    let cursor = 0;

    while (cursor < this.text.length) {
      const currentChar = this.text[cursor];
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

      console.log(this.charTable);
    }
  }

  /**
   * Насколько окно словаря смещено относительно начала строки
   */
  getWindowOffset(cursor: number): number {
    return cursor - this.dictLength > 0 ? cursor - this.dictLength : 0;
  }

  findLongestSubstring(cursor: number, dictIdxArr: number[]) {
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
  getAllCoincidenceIdxFromCharTable(cursor: number): number[] {
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
const algor = new LZ77('ABRAKADABRA');
algor.encode();

const algor2 = new LZ77('aacaacabcabaaac');
algor2.encode();

const algor3 = new LZ77('КОСИЛКОСОЙКОСОЙКОСОЙ');
algor3.encode();