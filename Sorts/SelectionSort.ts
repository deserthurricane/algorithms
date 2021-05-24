function selectionSort(array: number[]): number[] {
  const sortedArray = [...array];

  for (let i = sortedArray.length - 1; i >= 0; i--) {
    let maxIndex = i;

    for (let j = 0; j < i; j++) {
      if (sortedArray[j] > sortedArray[maxIndex]) {
        maxIndex = j;
      }
    }
    const maxElement = sortedArray[maxIndex];
    sortedArray[maxIndex] = sortedArray[i];
    sortedArray[i] = maxElement;
  }

  return sortedArray;
}

console.log(selectionSort([15, 16, 13, 8, 5, 11, 10, 3, 4, 12, 7, 2, 6, 9, 14, 1]));