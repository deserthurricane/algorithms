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
		num = parseInt(num);

		const numArr = this._createNumArray(num);

		let currentIndex = 0;

		while (currentIndex < numArr.length) {
			for (let i = 0; i < numArr.length; i++) {
				if (i !== currentIndex && numArr[i] % numArr[currentIndex] === 0) {
					// numArr[i] = false;
					numArr.splice(i, 1); // удаляем неподходящий элемент и уменьшаем длину массива
				}
			}

			currentIndex++;
		}

		return numArr.length.toString();
	}

	_createNumArray(num) {
		let numArr = [];

		for (let i = 2; i <= num; i++) {
			numArr.push(i);
		}

		return numArr;
	}
}

module.exports = { PrimesEratosthenTask };

