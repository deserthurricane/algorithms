const { StringLengthTask } = require('./StringLengthTask');
const fs = require('fs');

class Tester {
  _task;
  _path;

  /**
   * 
   * @param {StringLengthTask} task 
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

      const result = this._runTest(inFile, outFile);
      console.log(result);

      fileCount++;
    }
  }
}

module.exports = { Tester };