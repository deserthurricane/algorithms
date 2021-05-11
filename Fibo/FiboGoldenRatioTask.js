/**
 * Значение N-ого числа Фибоначчи через формулу золотого сечения
 */
class FiboGoldenRatioTask {
	/**
	 *
	 * @param {string} num - целое число N >= 0
	 * @returns {string}
	 */
	run(num) {
		const PHI = (Math.sqrt(5)+1)/2;
    let result = Math.floor((Math.pow(PHI, num) / Math.sqrt(5)) + 0.5);
		result = isFinite(result) ? BigInt(result) : result;
    console.log('answer', result);
    return result.toString();
	}
}

module.exports = { FiboGoldenRatioTask };

