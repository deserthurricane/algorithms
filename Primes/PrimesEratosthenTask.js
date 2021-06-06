/**
 * Количество простых чисел от 1 до N через решето Эратосфена
 */
class PrimesEratosthenTask {
	/**
	 *
	 * @param {string} num - целое число N >= 1
	 * @returns {string}
	 */
	run(num) {
		const n = parseInt(num);
		const prime = this._createNumArray(num);

		const sqrt = Math.sqrt(n);
 
    for (let p = 2; p <= sqrt; p++) {
			if (prime[p] === true) {
				// Помечаем как false все множители p до корня из n
				for (let i = p * p; i <= n; i += p) {
					prime[i] = false;
				}
			}
    }

		let primeCount = 0;
 
		// Считаем все индексы со значениями true
    for (let i = 2; i <= n; i++) {
			if (prime[i] === true) {
				primeCount++;
			}
    }

		console.log(primeCount, 'primeCount')

		return primeCount.toString();
	}

	_createNumArray(num) {
		let numArr = [];

		for (let i = 0; i <= num; i++) {
			numArr.push(true);
		}

		return numArr;
	}
}

module.exports = { PrimesEratosthenTask };

