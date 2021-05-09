const { PowerBinaryDecompositionTask } = require('./PowerBinaryDecompositionTask');
const { PowerIterativeTask } = require('./PowerIterativeTask');
const { PowerOfTwoTask } = require('./PowerOfTwoTask');
const { Tester } = require('./Tester');

class Program {
  static main() {
    // const task = new PowerIterativeTask();
    // const task = new PowerOfTwoTask();
    const task = new PowerBinaryDecompositionTask();
    const path = `./tests/Power`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();