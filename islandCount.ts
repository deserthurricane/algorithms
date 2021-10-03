function getIslandCount(matrix: Array<(0|1)[]>): number {
  let islandCount = 0;
  const matrixCopy = [...matrix];

  for (let i = 0; i < matrixCopy.length; i++) {
    for (let j = 0; j < matrixCopy.length; j++) {
      if (matrixCopy[i][j] === 1) {
        islandCount++;
        walk(matrixCopy, i, j);
      }
    }
  }

  console.log(islandCount, 'islandCount');

  return islandCount;
}

function walk(matrixCopy: Array<(0|1)[]>, row: number, index: number) {
  if (row < 0 || row > (matrixCopy.length - 1)) {
    return;
  }

  if (index < 0 || index > (matrixCopy.length - 1)) {
    return;
  }

  if (matrixCopy[row][index] === 0) {
    return;
  }

  // "подтопляем" остров
  matrixCopy[row][index] = 0;

  // идем вверх
  walk(matrixCopy, row - 1, index);

  // идем вниз
  walk(matrixCopy, row + 1, index);

  // идем влево
  walk(matrixCopy, row, index - 1);

  // идем вправо
  walk(matrixCopy, row, index + 1);
}

getIslandCount([
  [1, 1, 1, 1],
  [0, 1, 0, 1],
  [0, 0, 0, 0],
  [1, 0, 1, 1]
]); // 3

getIslandCount([
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
  [1, 0, 1, 1]
]); // 4