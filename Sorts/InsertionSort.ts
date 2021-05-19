function insertionSort(array: number[]): number[] {
  let sortedArr = [...array];

  for (let i = 1; i < sortedArr.length; i++) {
    for (let j = i; j >= 1; j--) {
      if (sortedArr[j] < sortedArr[j-1]) {
        const insert = sortedArr[j];
        sortedArr[j] = sortedArr[j-1];
        sortedArr[j-1] = insert;
      }
    }
  }

  return sortedArr;
}

console.log(insertionSort([2, 6, 9, 4, 1, 7, 8, 3, 5, 10]))