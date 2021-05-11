const { isInt, makeFloat } = require('../utils/numbers');

/**
 * Возведение в степень через степень двойки с домножением
 */
class PowerOfTwoTask {
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

		let result = num * num;
		let powerOf2 = 2;

		while (powerOf2 <= power) {
			let newPowerOf2 = powerOf2 * 2;

			if (newPowerOf2 > power) break;

			powerOf2 = newPowerOf2;
			result *= result;
		}

		const powerDiff = power - powerOf2;

		for (let i = 0; i < powerDiff; i++) {
			result *= num;
		}

		console.log('answer:', result);

		return (isInt(result) ? makeFloat(result) : result).toString();
	}
}

module.exports = { PowerOfTwoTask };
