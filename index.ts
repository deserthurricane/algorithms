import { Tester } from './Tester';
import { BubbleSort } from './Sorts/BubbleSort';

class Program {
  static main() {
    const task = new BubbleSort();
    const path = `./sorting-tests/0.random`;
    // const path = `./sorting-tests/1.digits`;
    // const path = `./sorting-tests/2.sorted`;
    // const path = `./sorting-tests/3.revers`;

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