/**
 * Алгоритм поиска подстроки Бойера-Мура
 * (данный вариант ищет индекс первого вхождения)
 */
class BoyerMoore {
  private text: string;
  private pattern: string;

  constructor(text: string, pattern: string) {
    this.text = text;
    this.pattern = pattern;
  }

  main(): number {
    const suffixArray = this._createSuffixArray();
    const lastMatchIndex = this._findFirstMatchIndex(suffixArray);

    const result = lastMatchIndex === -1 ? lastMatchIndex : (lastMatchIndex - (this.pattern.length - 1));
    console.log(result, 'result');

    return result;
  }

  private _findFirstMatchIndex(suffixArray: number[]): number {
    // OOOLALABC.ABC.BC.C.ABCCCCCC
    // BC.ABC.BC.C.ABC
    let i = this.pattern.length - 1;
    let matchIndex = -1;
    
    outer: while (i < this.text.length) {
      let matchCount = 0;
      let localMatchIndex = -1;
      let p = this.pattern.length - 1;

      for (let j = i; j >= i - this.pattern.length - 1; j--) {
        // Символ строки совпадает с проверяемым символом шаблона (ведем проверку с конца шаблона)
        if (this.text[j] === this.pattern[p]) {
          matchCount++;

          if (matchCount === this.pattern.length) {
            matchIndex = localMatchIndex;
            break outer;
          }

          if (localMatchIndex === -1) {
            localMatchIndex = i;
          }

          p--;
        } else {
          // Символы не совпадают. Проверяем, был ли найден хоть один суффикс?
          if (matchCount === 0) {
            // в suffixArray нет такого суффикса - сдвигаемся на 1 символ вправо в тексте
            i = i + 1;
            break;
          } else {
            // в suffixArray есть такой суффикс - сдвигаемся на указанное количество символов вправо по тексту
            // индекс суффикса в suffixArray == количество совпавших символов, значение - размер сдвига вправо
            i = localMatchIndex + suffixArray[matchCount];
            break;
          }
        }
      }
    }

    // console.log(matchIndex, 'matchIndex');
    
    return matchIndex;
  }

  private _createSuffixArray(): number[] {
    // BC.ABC.BC.C.ABCCCCCC
    // BC.ABC.BC.C.ABC
    const suffixArray: number[] = [null];
    let lastIndex = this.pattern.length - 1; // 14

    // ищем смещения для всех символов в шаблоне, кроме последнего
    // i - количество символов в суффиксе
    for (let i = 1; i <= this.pattern.length; i++) {
      const substr = this._getSubstr(this.pattern, this.pattern.length - i, i);
      lastIndex--;
      
      // j - индекс совпадения с суффиксом, по последнему символу суффикса
      outer: for (let j = lastIndex; j >= 0; j--) {
        if (substr === this._getSubstr(this.pattern, j, i)) {
          suffixArray[i] = this.pattern.length - i - j;
          break outer;
        }
      }
    }

    console.log(suffixArray, 'suffixArray');
    
    return suffixArray;
  }

  // Вспомогательный метод получения подстроки
  private _getSubstr(str: string, startIndex: number, length: number) {
    let result = '';
    
    for (let i = startIndex; i < startIndex + length; i++) {
      result += str[i];
    }

    return result;
  }
}

function createSuffixArray(pattern: string): number[] {
  // BC.ABC.BC.C.ABCCCCCC
  // BC.ABC.BC.C.ABC
  const suffixArray: number[] = [null];
  let lastIndex = pattern.length - 1; // 14

  // ищем смещения для всех символов в шаблоне, кроме последнего
  // i - количество символов в суффиксе
  for (let i = 1; i <= pattern.length; i++) {
    const substr = pattern.substr(pattern.length - i, i);
    lastIndex--;
    
    // j - индекс совпадения с суффиксом, по последнему символу суффикса
    outer: for (let j = lastIndex; j >= 0; j--) {
      if (substr === pattern.substr(j, i)) {
        suffixArray[i] = pattern.length - i - j;
        break outer;
      }
    }
  }

  return suffixArray;
}

const algo1 = new BoyerMoore('OOOLALABC.ABC.BC.C.ABC', 'BC.ABC.BC.C.ABC') // expect 7
algo1.main();

const algo2 = new BoyerMoore('OOOLALABC.ABC.BC.C.ABCCCC', 'BC.ABC.BC.C.ABC') // expect 7
algo2.main();

const algo3 = new BoyerMoore('OOOLALABC.ABC.BC.C.AB', 'BC.ABC.BC.C.ABC') // expect -1
algo3.main();

const algo4 = new BoyerMoore('BC.ABC.BC.C.ABC', 'BC.ABC.BC.C.ABC') // expect 0
algo4.main();