import { insertionSort } from './InsertionSort';

function shellSort(array: number[]): number[] {
  let sortedArray = [...array];

  // const step = Math.floor(Math.log2(sortedArray.length));  
  
  // for (let i = 0; i < step; i++) {    
    for (let step = Math.floor(sortedArray.length / 2); step > 0; step = Math.floor(step / 2)) {
      for (let j = step; j < sortedArray.length && j + step != undefined; j += step) {
        // console.log(j,'j');
        
      // for (let j = i; j < sortedArray.length; j+=step) {

        // for (let n = 1; n <= step; n++) {
        for (let n = j + step; n < sortedArray.length && n + step != undefined; n += step) {
          // console.log(j, 'j');

          if (sortedArray[j] > sortedArray[n]) {
            const insert = sortedArray[n];
            sortedArray[n] = sortedArray[j];
            sortedArray[j] = insert;
          }
          
          // if (i == 0) {
          //   console.log(sortedArray[j],'sortedArray[j]');
          //   console.log(sortedArray[j+step],'sortedArray[j+step]');
          // }
          // if (sortedArray[n*j] > sortedArray[n*j+step]) {
          //   const insert = sortedArray[n*j+step];
          //   sortedArray[n*j+step] = sortedArray[n*j];
          //   sortedArray[n*j] = insert;
          // }
        }


      }

      // if (i == 2) {
      //   console.log(sortedArray[j], 'sortedArray[j]');
      //   console.log(sortedArray[j+step], 'sortedArray[j+step]');
      // }
    }
  // }

  // console.log(sortedArray, 'sortedArray');

  // sortedArray = insertionSort(sortedArray);
  
  return sortedArray;
}

console.log(shellSort([1, 8, 5, 11, 10, 3, 4, 12, 7, 2, 6, 9]));
// [1,  2, 4, 11 ]