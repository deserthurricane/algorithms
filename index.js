const { Tester } = require('./Tester');

const { FiboGoldenRatioTask } = require('./Fibo/FiboGoldenRatioTask');
const { FiboIterativeTask } = require('./Fibo/FiboIterativeTask');
const { FiboMatrixPowerTask } = require('./Fibo/FiboMatrixPowerTask');
const { FiboRecursionTask } = require('./Fibo/FiboRecursionTask');

const { PowerBinaryDecompositionTask } = require('./Power/PowerBinaryDecompositionTask');
const { PowerIterativeTask } = require('./Power/PowerIterativeTask');
const { PowerOfTwoTask } = require('./Power/PowerOfTwoTask');

const { PrimesIterativeOptimizedTask } = require('./Primes/PrimesIterativeOptimizedTask');
const { PrimesIterativeOptimizedTask2 } = require('./Primes/PrimesIterativeOptimizedTask2');
const { PrimesIterativeTask } = require('./Primes/PrimesIterativeTask');
const { PrimesOnlyPrimeDelimitersTask } = require('./Primes/PrimesOnlyPrimeDelimitersTask');
const { PrimesEratosthenTask } = require('./Primes/PrimesEratosthenTask');
const { PrimesEratosthenNTask } = require('./Primes/PrimesEratosthenNTask');

class Program {
  static main() {
    // const task = new PowerIterativeTask();
    // const task = new PowerOfTwoTask();
    // const task = new PowerBinaryDecompositionTask();
    // const path = `./tests/Power`;

    // const task = new FiboIterativeTask();
    // const task = new FiboRecursionTask();
    // const task = new FiboGoldenRatioTask();
    // const task = new FiboMatrixPowerTask();

    // const task = new PrimesIterativeTask();
    // const task = new PrimesIterativeOptimizedTask();
    // const task = new PrimesIterativeOptimizedTask2();
    // const task = new PrimesOnlyPrimeDelimitersTask();
    // const task = new PrimesEratosthenTask();
    const task = new PrimesEratosthenNTask();
    const path = `./tests/Primes`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();