export class BubbleSort {
  array;

  main(): number[] {
    const sortedArray = [...this.array];
  
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length; j++) {
        if (sortedArray[j] > sortedArray[j+1]) {
          const bubble = sortedArray[j];
          sortedArray[j] = sortedArray[j+1];
          sortedArray[j+1] = bubble;
        }
      }
    }
    
    return sortedArray;
  }

  run(array:number[]): string {
    this.array = array;

    const sortedArray = this.main();
    console.log('sortedArray', sortedArray);
    
    return sortedArray.join(' ');
  }
}