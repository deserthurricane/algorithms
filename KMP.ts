/**
 * Алгоритм Кнута-Морриса-Пратта
 * для поиска всех вхождений подстроки в строку
 */
class KMP {
  private text: string;
  private pattern: string;

  constructor(text: string, pattern: string) {
    this.text = text;
    this.pattern = pattern;
  }

  main(): number[] | undefined {
    const pi: number[] = this._createPiFast();

    const results = this._getAllMatchIdx(pi);
    console.log(results, 'results');

    if (!results.length) {
      return undefined;
    }
    return results;
  }

  /**
   * Создание pi-таблицы, в которой отмечается количество совпавших символов
   * в префиксе и суффиксе в пределах одной подстроки исходного текста
   */
  private _createPiFast() {
    // добавляем к строке паттер с символом, который гарантированно не встречается в строке
    const textWithPattern = this.pattern + '@' + this.text;
    const pi: number[] = [null, 0]; // первый символ не с чем сравнивать - 0, для удобства нумерации строк заполняем нулевой индекс null

    let t = 2;
    let matchIndex = 0;
    let lastIndex = 1;
    
    while (t <= textWithPattern.length) {      
      // Если символы совпали
      if (textWithPattern[matchIndex] === textWithPattern[lastIndex]) {
        pi[t] = pi[t - 1] + 1;
        matchIndex++;
      } else {
        // Если символы не совпали
        let prevMatchRow = pi[t - 1]; // возвращаемся в предыдущий ряд и берем указатель на ряд с максимальным совпадением

        while (prevMatchRow > 0 && prevMatchRow != null) {
          const prevMatchIndex = pi[prevMatchRow]; // берем количество совпавших символов из pi-таблицы этого ряда

          if (textWithPattern[prevMatchIndex] === textWithPattern[lastIndex]) {
            pi[t] = prevMatchIndex + 1;
            matchIndex = prevMatchIndex + 1;
            break;
          } else {
            prevMatchRow = prevMatchIndex;
          }
        }

        if (prevMatchRow == null || prevMatchRow == 0) {
          pi[t] = 0;
          matchIndex = 0;
        }
      }

      t++;
      lastIndex++;
    }

    console.log(pi, 'pi');

    return pi;
  }

  /**
   * Преобразование pi-таблицы в массив начальных индексов найденных совпадений
   */
  private _getAllMatchIdx(pi: number[]): number[] {
    return pi.reduce((accum, next, nextIndex) => {
      // подходят все результаты в pi-таблице, где длина совпавшего префикса/суффикса равна длине шаблона
      if (next === this.pattern.length) {
        // индексы в таблице pi указывают на последний совпавший символ + приклеенный спереди шаблон, а нам нужен первый совпавший символ в исходной строке
        accum.push(nextIndex - 
          (this.pattern.length * 2) 
          - 1 // символ @
        )
      }
      return accum;
    }, [])
  }

  // private _createPiSlow(): number[] {
  //   const pi: number[] = new Array(this.pattern.length + 1); // так как индексация начиналась с 1, а не с 0

  //   for (let q = 0; q <= this.pattern.length; q++) {
  //     const line = this._getLeft(this.pattern, q);

  //     for (let len = 1; len < q; len++) {
  //       if (this._getLeft(line, len) === this._getRight(line, len)) {
  //         pi[q] = len;
  //       }
  //     }
  //   }
  //   return pi;
  // }
}

const algo1 = new KMP('ааbааbааааbааbаааb', 'ааbаа'); // [ 0, 3, 8, 11 ]
algo1.main();

const algo2 = new KMP('ааbаа', 'ааbаа'); // [ 0 ]
algo2.main();

const algo3 = new KMP('ааbаа', 'x'); // undefined
algo3.main();