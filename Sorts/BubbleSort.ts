function bubbleSort(array: number[]): number[] {
  const sortedArray = [...array];
  
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = 0; j < sortedArray.length; j++) {
      if (sortedArray[j] > sortedArray[j+1]) {
        const bubble = sortedArray[j+1];
        sortedArray[j+1] = sortedArray[j];
        sortedArray[j] = bubble;
      }
    }
  }
  
  return sortedArray;
  
}

console.log(bubbleSort([2, 6, 9, 4, 1, 7, 8, 3, 5, 10]));