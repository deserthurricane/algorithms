export class SelectionSort {
  array;

  main(): number[] {
    const sortedArray = [...this.array];

    for (let i = sortedArray.length - 1; i >= 0; i--) {
      let maxIndex = i;
  
      for (let j = 0; j < i; j++) {
        if (Number(sortedArray[j]) > Number(sortedArray[maxIndex])) {
          maxIndex = j;
        }
      }
      const maxElement = Number(sortedArray[maxIndex]);
      sortedArray[maxIndex] = Number(sortedArray[i]);
      sortedArray[i] = maxElement;
    }
  
    return sortedArray;
  }

  run(array:number[]): string {
    this.array = array;
    const sortedArray = this.main();    
    return sortedArray.join(' ');
  }
}