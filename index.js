const { FiboGoldenRatioTask } = require('./FiboGoldenRatioTask');
const { FiboIterativeTask } = require('./FiboIterativeTask');
const { FiboMatrixPowerTask } = require('./FiboMatrixPowerTask');
const { FiboRecursionTask } = require('./FiboRecursionTask');
const { PowerBinaryDecompositionTask } = require('./PowerBinaryDecompositionTask');
const { PowerIterativeTask } = require('./PowerIterativeTask');
const { PowerOfTwoTask } = require('./PowerOfTwoTask');
const { Tester } = require('./Tester');

class Program {
  static main() {
    // const task = new PowerIterativeTask();
    // const task = new PowerOfTwoTask();
    // const task = new PowerBinaryDecompositionTask();
    // const path = `./tests/Power`;

    // const task = new FiboIterativeTask();
    // const task = new FiboRecursionTask();
    // const task = new FiboGoldenRatioTask();
    const task = new FiboMatrixPowerTask();
    const path = `./tests/Fibo`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();