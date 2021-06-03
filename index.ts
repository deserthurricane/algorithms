import { Tester } from './Tester';
import { BubbleSort } from './Sorts/BubbleSort';
import { InsertionSort } from './Sorts/InsertionSort';
import { SelectionSort } from './Sorts/SelectionSort';
import { ShellSort } from './Sorts/ShellSort';
import { HeapSort } from './Sorts/HeapSort';
import { MergeSort } from './Sorts/MergeSort';
import { RadixMaxSort } from './Sorts/RadixMaxSort';
import { QuickSort } from './Sorts/QuickSort';
import { RadixSort } from './Sorts/RadixSort';

class Program {
  static main() {
    // const task = new BubbleSort();
    // const task = new InsertionSort();
    // const task = new SelectionSort();
    // const task = new ShellSort();
    // const task = new HeapSort();
    // const path = `./sorting-tests/0.random`;
    // const path = `./sorting-tests/1.digits`;
    // const path = `./sorting-tests/2.sorted`;
    const path = `./sorting-tests/3.revers`;

    // const task = new MergeSort();
    // const task = new RadixSort();
    // const task = new RadixMaxSort();
    const task = new QuickSort();
    
    const tester = new Tester(task, path);
    tester.runSingleOperation();
  }
}

Program.main();