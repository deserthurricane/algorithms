/**
 * Количество простых чисел от 1 до N через перебор делителей
 */
class PrimesIterativeTask {
	/**
	 *
	 * @param {string} num - целое число N >= 1
	 * @returns {string}
	 */
	run(num) {
		let primesCount = 0;
		num = parseInt(num);

		for (let i = 2; i <= num; i++) {
			let isPrime = true;
			for (let j = 2; j < i; j++) {
				if (i % j === 0) {
					isPrime = false;
					break;
				};
			}

			if (isPrime) primesCount++;
		}

		console.log('answer', primesCount);

		return primesCount.toString();
	}
}

module.exports = { PrimesIterativeTask };

