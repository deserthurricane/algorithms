export class ShellSort {
  array;

  main(): number[] {
    let sortedArray = [...this.array];
  
      for (let step = Math.floor(sortedArray.length/2); step > 0; step = Math.floor(step/2)) {
        for (let i = step; i + step < sortedArray.length; i++) {
          let j = i + step;
          const tmp = sortedArray[j];

          while (j - step >= 0 && sortedArray[j - step] > tmp) {
            sortedArray[j] = sortedArray[j - step];
            j -= step;
          }

          sortedArray[j] = tmp;
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