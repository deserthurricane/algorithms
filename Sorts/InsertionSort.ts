export class InsertionSort {
  array;

  main(): number[] {
    let sortedArr = [...this.array];

    for (let i = 1; i < sortedArr.length; i++) {
      for (let j = i; j >= 1; j--) {
        if (Number(sortedArr[j]) < Number(sortedArr[j-1])) {
          const insert = Number(sortedArr[j]);
          sortedArr[j] = Number(sortedArr[j-1]);
          sortedArr[j-1] = insert;
        }
      }
    }
  
    return sortedArr;
  }

  run(array:number[]): string {
    this.array = array;
    const sortedArray = this.main();    
    return sortedArray.join(' ');
  }
}