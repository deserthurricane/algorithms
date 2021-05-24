import { insertionSort } from './InsertionSort';

function shellSort(array: number[]): number[] {
  let sortedArray = [...array];
  
  // for (let i = 0; i < step; i++) {    
    for (let step = Math.floor(sortedArray.length/2); step > 0; step = Math.floor(step/2)) {
      for (let i = step; i + step < sortedArray.length; i++) {
        // console.log(j,'j');
        
      // for (let j = i; j < sortedArray.length; j+=step) {

        // for (let j = 1; j <= step; j++) {
        let j = i + step;
        const tmp = sortedArray[j];

        while (j - step >= 0 && sortedArray[j - step] > tmp) {
          sortedArray[j] = sortedArray[j - step];
          j -= step;
        }

        sortedArray[j] = tmp;
        // for (let j = i + step; j + step < sortedArray.length; j += step) {
        //   console.log(j, 'j');

        //   if (sortedArray[i] > sortedArray[j]) {
        //     const insert = sortedArray[j];
        //     sortedArray[j] = sortedArray[i];
        //     sortedArray[i] = insert;
        //   }
          
          // if (i == 0) {
          //   console.log(sortedArray[j],'sortedArray[j]');
          //   console.log(sortedArray[j+step],'sortedArray[j+step]');
          // }
          // if (sortedArray[j*j] > sortedArray[j*j+step]) {
          //   const insert = sortedArray[j*j+step];
          //   sortedArray[j*j+step] = sortedArray[j*j];
          //   sortedArray[j*j] = insert;
          // }
        // }


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