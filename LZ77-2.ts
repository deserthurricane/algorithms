// Алгоритм Lempel-Ziv 1977 - динамическое накопление словаря при сжатии данных

type CharTableValue = [number, number, string];

class LZ77 {
  text = '';
  charTable: Array<CharTableValue> = [];
  bufferLength = 4;
  dictLength = 11; // вопрос! как правильно выбрать размер?

  constructor(text) {
    this.text = text;
  }

  encode() {
    let cursor = 0;

    while (cursor < this.text.length) {
      const currentChar = this.text[cursor];

      if (this.hasCharTableCurrentCharInWindow(currentChar, cursor)) {
        const [position, length] = this.findLongestSubstring(cursor);
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

  // есть ли в словаре в интервале скользящего окна искомый символ
  hasCharTableCurrentCharInWindow(char: string, cursor: number) {
    const start = cursor - this.dictLength > 0 ? cursor - this.dictLength : 0;
    return this.charTable.slice(start).find(value => value[2] === char);
  }

  findLongestSubstring(cursor: number) {
    console.log(cursor, 'cursor');

    const start = cursor - this.dictLength > 0 ? cursor - this.dictLength : 0;

    console.log(start, 'start');


    const dictIdxArr: number[] = this.text
      .slice(start, cursor)
      .split('')
      .reduce((accum, current, currentIndex) => {
        if (current === this.text[cursor]) {
          accum.push(currentIndex);
        }

        return accum;
      }, []);

    console.log(dictIdxArr, 'dictIdxArr');


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

    console.log(results, 'results');


    //  const longestSubStr = Object.entries(results).sort(([key1, value1], [key2, value2]) => value2 > value1 ? 1 : -1)[0]
    console.log(Array.from(Object.entries(results)));

    const longestSubStr = Array.from(results.entries()).sort(([key1, value1], [key2, value2]) => value2 > value1 ? 1 : -1)[0];
    console.log(longestSubStr, 'longestSubStr');

    return longestSubStr;
  }

}



const algor = new LZ77('ABRAKADABRA');
algor.encode();

const algor2 = new LZ77('aacaacabcabaaac');
algor2.encode();