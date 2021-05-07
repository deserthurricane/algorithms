const fs = require('fs');
const { performance } = require('perf_hooks');

class Tester {
  _task;
  _path;

  /**
   * 
   * @param {function} task 
   * @param {string} path 
   */
  constructor(task, path) {
    this._task = task;
    this._path = path;
  }

  /**
   * @private
   * 
   * @param {string} inFile 
   * @param {string} outFile 
   * @returns {boolean}
   */
  _runTest(inFile, outFile) {
    const data = fs.readFileSync(inFile, {
      encoding: 'utf-8'
    }).trim();
    const actual = this._task.run(data);
    const expect = fs.readFileSync(outFile, {
      encoding: 'utf-8'
    }).trim();
    
    return actual === expect; 
  }

  /**
   * Декоратор для расчёта времени выполнения алгоритма
   * @private
   * @param {function} testFn 
   */
  _measureRunTime(testFn) {
    const self = this;

    return function() {
      const start = performance.now();
      const result = testFn.apply(self, arguments);
      const finish = performance.now();

      const runTime = finish - start;
      console.log('runTime:', runTime);

      return result;
    }
  }

  /**
   * @public
   * @returns {void}
   */
  runTests() {
    let fileCount = 0;
    
    while (true) {
      const inFile = `${this._path}/test.${fileCount}.in`;
      const outFile = `${this._path}/test.${fileCount}.out`;

      if (!fs.existsSync(inFile) || !fs.existsSync(outFile))
        break;

      const result = this._measureRunTime(this._runTest)(inFile, outFile);
      console.log('result:', result);

      fileCount++;
    }
  }
}

module.exports = { Tester };