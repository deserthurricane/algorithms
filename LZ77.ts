/**
 * Алгоритм Lempel-Ziv 1977
 * - динамическое накопление словаря при сжатии данных
 */
class LZ77_1 {
  private text: string;
  private charTable: Record<string, [number, number]> = {};
  private readonly bufferLength = 4;
  private readonly dictLength = 6;

  constructor(text: string) {
    this.text = text;
  }

  encode() {
    let bufferIndex = 0;

    // const charTable: Array<[number, number, string]> = [];

    while (bufferIndex <= this.text.length) {
      // Обработка первого случае - у нас еще нет словаря
      if (bufferIndex === 0) {
        this.charTable[this.text[bufferIndex]] = [0, 0];
        bufferIndex++;
        // dictIndex++;
        continue;
      }

      let buffer = this.text.substr(bufferIndex, this.dictLength);

      console.log(buffer, 'buffer');
      
      const charIsInTable = Object.keys(this.charTable).includes(buffer[bufferIndex]);

      if (!charIsInTable) {
        // Впервые встречаем такой символ
        this.charTable[this.text[bufferIndex]] = [0, 0];

        bufferIndex++;
        // dictIndex++;
      } else {
        console.log('match');
        
        // buffer += this.text[i];
        let matchCount = 1;

        // let bufferPrefix = buffer[bufferIndex];
        /**
         * ИДЕЯ: проверять, что буква есть в словаре
         */

        let buffer = this.text.substr(bufferIndex, this.dictLength);
        let charIsInTable = Object.keys(this.charTable).includes(buffer[bufferIndex]);

        while (charIsInTable && matchCount <= this.bufferLength) {
          // buffer += this.text[bufferIndex];
          matchCount++;
          bufferIndex++;
          buffer = this.text.substr(bufferIndex, this.dictLength);
          charIsInTable = Object.keys(this.charTable).includes(buffer[bufferIndex]);
        }

        this.charTable[this.text[bufferIndex]] = [bufferIndex - matchCount, matchCount - 1]; 
        
        // if (matchCount > this.dictLength) {
        //   dictIndex = bufferIndex - this.dictLength;
        // }
      }
    }

    console.log(this.charTable, 'charTable');
    
  }
}

// const algo = new LZ77('ABRAKADABRA');
const algo = new LZ77_1('aacaaca');
// bcabaaac
algo.encode();

// console.log('A'.startsWith('ABRA'));
