const math = require('mathjs');

/**
 * Значение N-ого числа Фибоначчи через перемножение матриц
 */
class FiboMatrixPowerTask {
	/**
	 *
	 * @param {string} num - целое число N >= 0
	 * @returns {string}
	 */
	run(num) {
		num = parseInt(num);

		if (num <= 1) return num;

		const base = math.matrix([[1, 1], [1, 0]]);
		const power = num - 1;
		let result = math.multiply(base, 1);
		let powerOf2 = 2;

		while (powerOf2 <= power) {
			result = math.multiply(result, result);

			let newPowerOf2 = powerOf2 * 2;
			if (newPowerOf2 > power) break;
			
			powerOf2 = newPowerOf2;
		}

		const powerDiff = power - powerOf2;

		for (let i = 0; i < powerDiff; i++) {
			result = math.multiply(result, base);
		}

		result = math.subset(result, math.index(0, 0));

		return result.toString();
	}
}

module.exports = { FiboMatrixPowerTask };

