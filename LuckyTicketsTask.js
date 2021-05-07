/**
 * Алгоритм подсчёта количества 2N-значных счастливых билетов
 */
class LuckyTicketsTask {
  /**
   * @public
   * 
   * @param {string} count 
   * @returns {string}
   */
  run(count) {
    let possibleSums = [];
    let nextSums = [];
 
    for (let i = 0; i < count; i++) {
      // Обновляем возможные суммы N-значных чисел
      possibleSums = this._add9PossibleSums(possibleSums);
      // Обновляем количество повторяющихся комбинаций билетов для каждой суммы
      const sumsForLastNum = this._getSumsForLastNum(possibleSums, nextSums);
      nextSums = this._getSumsOfNextSums(possibleSums, sumsForLastNum);
    }

    return this._getLuckyTicketsCount(nextSums)
      .toString()
      .replace('n', ''); // убираем обозначение n в конце числа от BigInt  
  }

  /**
   * @private
   * 
   * @param {number[]} possibleSums - возможные суммы с предыдущей итерации
   * @returns {number[]} 
   */
  _add9PossibleSums(possibleSums) {
    const newPossibleSums = [...possibleSums];
    let newNumber = possibleSums.length ? possibleSums[possibleSums.length - 1] : -1;

    for (let i = 0; i <= 9; i++) {
      newPossibleSums.push(++newNumber);
    }

    return newPossibleSums;
  }

  /**
   * @private
   * 
   * @param {number[]} possibleSums 
   * @param {number[]} prevSums
   * @returns {number[number[]]} - двумерный массив сумм для каждой цифры от 0 до 9
   */
  _getSumsForLastNum(possibleSums, prevSums) {
    // Кейс для первой итерации
    if (prevSums.length === 0) {
      return [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    }

    const nextSums = [];
    
    // Индекс смещения всех возможных чисел (сумм) от 0 до n*9
    let shiftIndex = 0;

    // Итерация по последнему числу
    for (let lastNum = 0; lastNum <= 9; lastNum++) {
      // Все суммы для последнего числа от 0 до 9
      const lastNumSum = [];
      
      // Индекс сумм предыдущей итерации
      let prevSumsIndex = 0;   

      // Итерация по всем суммам от нуля до n*9
      for (let i = shiftIndex; i < possibleSums.length; i++) {
        lastNumSum[i] = prevSums[prevSumsIndex];
        prevSumsIndex++;
      }

      nextSums.push(lastNumSum);
      shiftIndex++;    
    }
    
    return nextSums;
  }

  /**
   * @private
   * 
   * @param {number[]} possibleSums 
   * @param {number[number[]]} nextSums
   * @returns {number[]} 
   */
  _getSumsOfNextSums(possibleSums, nextSums) {
    let finalSumsArray = [];
    
    for (let i = 0; i < possibleSums.length; i++) {
      for (let j = 0; j < nextSums.length; j++) {
        finalSumsArray[i] = (finalSumsArray[i] || 0) + (nextSums[j][i] || 0);
      }
    }

    return finalSumsArray;
  }

  /**
   * @private
   * 
   * @param {number[]} finalSumsArray
   * @returns {number} BigInt
   */
  _getLuckyTicketsCount(finalSumsArray) {
    const luckyTicketsCount = finalSumsArray.reduce((accum, sum) => {
      accum += BigInt(sum) * BigInt(sum);
      return accum;
    }, BigInt(0));

    return luckyTicketsCount;
  }
}

module.exports = { LuckyTicketsTask };