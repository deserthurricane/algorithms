/**
 * Алгоритм Lempel-Ziv 1977
 * - динамическое накопление словаря при сжатии данных
 */
class LZ77 {
  private text: string;
  private charTable: Array<[number, number, string]> = [];

  constructor(text: string) {
    this.text = text;
  }

  encode() {
    let i = 0;
    let prefix = '';
    // const charTable: Array<[number, number, string]> = [];

    while (i <= this.text.length) {
      console.log(prefix, 'prefix');
      
      if (!prefix.startsWith(this.text[i])) {
        // Впервые встречаем такой символ
        this.charTable.push([0, 0, this.text[i]]);

        if (!prefix) {
          prefix = this.text[i];
        }

        i++;
      } else {
        // prefix += this.text[i];
        let matchCount = 1;

        while (prefix.startsWith(this.text.substr(i, matchCount)) && matchCount <= this.text.length) {
          if (i === 5) {
            console.log(prefix, 'prefix A');
            console.log(this.text.substr(i, matchCount), '');
            
          }


          matchCount++;
        }

        prefix = this.text.slice(0, matchCount - 1);

        if (i === 5) {
          console.log(prefix, 'prefix A');
          console.log(matchCount, 'matchCount');
          
        }

        this.charTable.push([i, matchCount - 1, this.text[i + 1]]);
        i += matchCount; 
        
      }
    }

    console.log(this.charTable, 'charTable');
    
  }
}

const algo = new LZ77('ABRAKADABRA');
algo.encode();

console.log('A'.startsWith('ABRA'));
