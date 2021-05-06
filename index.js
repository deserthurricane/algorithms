const { StringLengthTask } = require('./StringLengthTask');
const { Tester } = require('./Tester');

class Program {
  static main() {
    const task = new StringLengthTask();
    const path = `./tests/0.String`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();