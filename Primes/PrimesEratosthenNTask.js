/**
 * Количество простых чисел от 1 до N через решето Эратосфена с линейным временем
 */
class PrimesEratosthenNTask {
	/**
	 *
	 * @param {string} num - целое число N >= 1
	 * @returns {string}
	 */
	run(num) {
		num = parseInt(num);

		const primes = [];
		const lp = this._fillArrayWithZero(num);

		for (let i = 2; i <= num; i++) {
			if (lp[i] === 0) {
				lp[i] = i;
				primes.push(i);
			}

			for (const p of primes) {
				if (p <= lp[i] && p * i <= num) {
					lp[p * i] = p;
				}
			}
		}

		return primes.length.toString();
	}

	_fillArrayWithZero(num) {
		let numZeroArr = [];

		for (let i = 0; i < num; i++) {
			numZeroArr.push(0);
		}

		return numZeroArr;
	}
}

module.exports = { PrimesEratosthenNTask };

