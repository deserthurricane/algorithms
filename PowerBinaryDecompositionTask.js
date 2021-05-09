const { isInt, makeFloat } = require('./utils/numbers');

/**
 * Возведение в степень через двоичное разложение показателя степени
 */
class PowerBinaryDecompositionTask {
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

		let halfPower = power;
		let binaryArr = [];

		while (halfPower >= 1) {
			if (halfPower % 2 === 0) {
				binaryArr.push(0);
				halfPower /= 2;
			} else {
				binaryArr.push(1);
				halfPower = Math.floor(halfPower/2);
			}
		}

		let result = num;
		let resultsOfPowersWithRemain = [];

		for (let i = 0; i < binaryArr.length; i++) {
			if (binaryArr[i] === 1) {
				resultsOfPowersWithRemain.push(result);
			}

			result *= result;
		}

		result = resultsOfPowersWithRemain.reduce((accum, next) => {
			accum *= next;
			return accum;
		}, 1);

		console.log('answer: ', result);

		return (isInt(result) ? makeFloat(result) : result).toString();
	}
}

module.exports = { PowerBinaryDecompositionTask };
