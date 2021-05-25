import { Tester } from './Tester';
import { BubbleSort } from './Sorts/BubbleSort';
import { InsertionSort } from './Sorts/InsertionSort';
import { SelectionSort } from './Sorts/SelectionSort';
import { ShellSort } from './Sorts/ShellSort';
import { HeapSort } from './Sorts/HeapSort';

class Program {
  static main() {
    // const task = new BubbleSort();
    // const task = new InsertionSort();
    // const task = new SelectionSort();
    // const task = new ShellSort();
    const task = new HeapSort();
    // const path = `./sorting-tests/0.random`;
    // const path = `./sorting-tests/1.digits`;
    // const path = `./sorting-tests/2.sorted`;
    const path = `./sorting-tests/3.revers`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();

// const { StringLengthTask } = require('./StringLengthTask');
// const { Tester } = require('./Tester');

// class Program {
//   static main() {
//     const task = new StringLengthTask();
//     const path = `./sorting-tests/0.String`;

//     const tester = new Tester(task, path);
//     tester.runTests();
//   }
// }

// Program.main();