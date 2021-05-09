/**
 * Проверяет, является ли число целым
 * @param {number} num
 * @returns {boolean}
 */
function isInt(num) {
	return num % 1 === 0;
}

/**
 * Конвертирует целое число в формат с плавающей точкой
 * @param {number} num
 * @returns {boolean}
 */
function makeFloat(num, float = 1) {
	return num.toFixed(float);
}

module.exports = {
	isInt,
	makeFloat,
};
