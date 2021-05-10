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
		if (num <= 2) return 1;

		let base = math.matrix([[1, 1], [1, 0]]);
		let result = math.matrix([[1, 0], [0, 1]]);

		// const bits = (num).toString(2); 

		// for (const bit of bits) {
		// 	result = math.multiply(result, result);

		// 	if (bit == '1') {
		// 		result = math.multiply(result, base);
		// 	}
		// }

		// console.log('resulttttt', result);

		// result = math.subset(result, math.index(0, 0));

		// let result = math.multiply(base, base);
		// let powerOf2 = 2;

		// while (powerOf2 <= num) {
		// 	let newPowerOf2 = powerOf2 * 2;

		// 	if (newPowerOf2 > num) break;

		// 	powerOf2 = newPowerOf2;
		// 	result = math.multiply(result, result);
		// }

		// const powerDiff = num - powerOf2;

		// for (let i = 0; i < powerDiff; i++) {
		// 	result = math.multiply(result, base);
		// }

		// console.log(base, 'base');
		// console.log(result, 'result');

		// const answer = math.multiply(result, base);
		// console.log(math.subset(answer, math.index(0, 0)));

		// while (power < num) {
		// 	if (power % 2 === 1) {
		// 		result = math.multiply(result, base);
		// 	} else {
		// 		result = math.multiply(result, base);
		// 	}

		// 	power *= 2;
		// }

		result = math.subset(result, math.index(0, 0));

		console.log('answer', result);

		return result.toString();
	}
}

module.exports = { FiboMatrixPowerTask };

