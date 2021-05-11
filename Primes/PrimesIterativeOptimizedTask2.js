
/**
 * Количество простых чисел от 1 до N через перебор делителей с оптимизацией
 */
class PrimesIterativeOptimizedTask2 {
	/**
	 *
	 * @param {string} num - целое число N >= 1
	 * @returns {string}
	 */
	run(num) {
		let primesCount = 0;
		num = parseInt(num);

		for (let n = 2; n < num; n++) {
			if (this._isPrime(n)) primesCount++
		}

		console.log('answer', primesCount);

		return primesCount.toString();
	}

	_isPrime(num) {
		if (num === 2) return true;
		if (num % 2 === 0) return false;

		const sqrtNum = Math.sqrt(num); 
		for (let d = 3; d <= sqrtNum; d+=2) {
			if (num % d === 0) {
				return false;
			}
		}

		return true;
	}
}

module.exports = { PrimesIterativeOptimizedTask2 };

