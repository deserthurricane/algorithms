/**
 * Нахождение максимальной суммы чисел в "треугольнике", или "ёлочке" 
 */
function getMaxSumFromTriangle(triangle: Array<number[]>): number {
  // новая "ёлочка", хранящая суммы значений текущего и следующего рядов
  const maxSumTriangle = new Array(triangle.length);

  // копируем последний ряд исходной "ёлочки" без изменений
  maxSumTriangle[maxSumTriangle.length - 1] = [...triangle[triangle.length - 1]];

  // начинаем складывать суммы с предпоследнего ряда
  for (let row = triangle.length - 2; row >= 0; row--) {
    // храним макс сумму и индекс потомка, который её сформировал
    const sumRow: number[] = [];

    for (let i = 0; i <= row; i++) {
      // сравниваем текущий ряд исходной "ёлочки" со следующим рядом "суммированной" ёлочки 
      const firstChildSum = triangle[row][i] + maxSumTriangle[row + 1][i];
      const secondChildSum = triangle[row][i] + maxSumTriangle[row + 1][i + 1];

      if (firstChildSum >= secondChildSum) {
        sumRow.push(firstChildSum);
      } else {
        sumRow.push(secondChildSum);
      }
    }

    maxSumTriangle[row] = sumRow;
  }

  console.log(maxSumTriangle, 'maxSumTriangle');
  console.log(maxSumTriangle[0][0], 'maxSum');
  
  // на верхушке "ёлочки" оказывается макс сумма
  return maxSumTriangle[0][0];
}

getMaxSumFromTriangle([
  [1],
  [2, 3],
  [4, 5, 6],
  [9, 8, 0, 3]
]);