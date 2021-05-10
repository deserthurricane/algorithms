/**
 * Значение N-ого числа Фибоначчи через рекурсию
 */
class FiboRecursionTask {
	/**
	 *
	 * @param {string} num - целое число N >= 0
	 * @returns {string}
	 */
	run(num) {
    const result = this._getFibo(num).toString();
    console.log('answer', result);
    return result;
	}

  _getFibo(num) {
    return num <= 1 ? num : BigInt(this._getFibo(num - 1)) + BigInt(this._getFibo(num - 2));
  }
}

module.exports = { FiboRecursionTask };

