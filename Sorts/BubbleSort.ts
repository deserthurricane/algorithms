export class BubbleSort {
  array;

  main(): number[] {
    const sortedArray = [...this.array];

    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length; j++) {        
        if (Number(sortedArray[j]) > Number(sortedArray[j+1])) {
          const bubble = Number(sortedArray[j]);
          sortedArray[j] = Number(sortedArray[j+1]);
          sortedArray[j+1] = bubble;
        }
      }
    }
    
    return sortedArray;
  }

  run(array:number[]): string {
    this.array = array;
    const sortedArray = this.main();    
    return sortedArray.join(' ');
  }
}