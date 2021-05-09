const { isInt, makeFloat } = require('./utils/numbers');

/**
 * Возведение в степень итеративным способом
 */
class PowerIterativeTask {
	/**
	 *
	 * @param {number} num - вещественное число A > 0
	 * @param {number} power - целое число N >= 0
	 * @returns {string}
	 */
	run(num, power) {
		if (power === 0) {
			return '1.0';
		}

		let result = 1;

		for (let i = 0; i < power; i++) {
			result *= num;
		}

		result = (isInt(result) ? makeFloat(result) : result).toString();

		return result;
	}
}

module.exports = { PowerIterativeTask };
