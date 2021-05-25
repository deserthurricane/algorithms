export class ShellSort {
  array;

  main(): number[] {
    let sortedArray = [...this.array];
 
    for (let step = Math.floor(sortedArray.length / 2); step > 0; step = Math.floor(step / 2)) {
      for (let j = 0; j < sortedArray.length && j + step != undefined; j+=step) {
        for (let n = j + step; n < sortedArray.length && n + step != undefined; n += step) {
          if (sortedArray[j] > sortedArray[n]) {
            const insert = sortedArray[n];
            sortedArray[n] = sortedArray[j];
            sortedArray[j] = insert;
          }
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