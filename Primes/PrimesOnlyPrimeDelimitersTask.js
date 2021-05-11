
/**
 * Количество простых чисел от 1 до N через перебор делителей с оптимизацией
 */
class PrimesOnlyPrimeDelimitersTask {
	primes;
	/**
	 *
	 * @param {string} num - целое число N >= 1
	 * @returns {string}
	 */
	run(num) {
		this.primes = [];
		num = parseInt(num);
		const primesCount = this._countPrimes(num);
		
		console.log('answer', primesCount);
		console.log('primes', this.primes);

		return primesCount.toString();
	}

	_countPrimes(num) {
		if (num < 2) return 0;
		this.primes.push(2);

		for (let p = 3; p <= num; p+=2) {
			if (this._isPrime(p)) {
				this.primes.push(p);
			}
		}

		return this.primes.length;
	}

	_isPrime(p) {
		const sqrtNum = Math.sqrt(p); 
		for (let i = 0; this.primes[i] <= sqrtNum; i++) {
			if (p % this.primes[i] === 0) {
				return false;
			}
		}

		return true;
	}
}

module.exports = { PrimesOnlyPrimeDelimitersTask };

