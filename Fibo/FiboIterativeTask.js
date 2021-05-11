/**
 * Значение N-ого числа Фибоначчи итеративным способом
 */
class FiboIterativeTask {
	/**
	 *
	 * @param {string} num - целое число N >= 0
	 * @returns {string}
	 */
	run(num) {
    const result = this._getFibo(num);
    console.log('answer', result);
    return result;
	}

  /**
   * Порядковый номер числа Фибоначчи
   * @param {number} order 
   * @returns 
   */
  _getFibo(order) {
    if (order === 0) {
      return 0;
    }

    if (order === 1) {
      return 1;
    }

    let num1 = 0;
    let num2 = 1;
    
    let result = BigInt(0);
    for (let i = 1; i < order; i++) {
      result = BigInt(num1) + BigInt(num2);
      num1 = num2;
      num2 = result;
    }

    return result.toString();
  }
}

module.exports = { FiboIterativeTask };

