import * as fs from 'fs';
import { performance } from 'perf_hooks';
import { readBinaryData } from './Buffer';

export class Tester {
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
    const array = data.split('\n')[1].split(' ').map(x => +x);

    const actual = this._task.run(array);
    const expect = fs.readFileSync(outFile, {
      encoding: 'utf-8'
    }).trim();   
    
    // console.log(actual, 'actual');
    
    
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

      console.log('test no:', fileCount);
      // @ts-ignore
      const result = this._measureRunTime(this._runTest)(inFile, outFile);
      console.log('result:', result);

      console.log('--------------------------------------');

      fileCount++;
    }
  }

  _runFile(array) {
    this._task.main(array);
  }

  public runSingleOperation() {
    const array = readBinaryData();
    // @ts-ignore
    this._measureRunTime(this._runFile)(array);
  }
}

// module.exports = { Tester };