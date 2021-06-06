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
		// Изначально все величины lp[i] заполним нулями. - в JS оставляем undefined, чтобы не тратить время на заполнение массива
		const lp = new Array(num);

		for (let i = 2; i <= num; i++) {
			if (lp[i] === undefined) {
				lp[i] = i;
				primes.push(i);
			}

			for (let j = 0; j <= lp[i] && j * i <= num; j++) {
				if (primes[j] <= lp[i] && primes[j] * i <= num) {
					lp[primes[j] * i] = primes[j];
				}
			}
		}

		return primes.length.toString();
	}
}

module.exports = { PrimesEratosthenNTask };

