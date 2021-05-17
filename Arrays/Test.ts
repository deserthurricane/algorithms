import { VectorArray } from './VectorArray';
import { IArray } from './types';
import { SingleArray } from './SingleArray';
import { performance } from 'perf_hooks';
import { FactorArray } from './FactorArray';

class Test {
  static main(): void {
    // const single = new SingleArray<number>(100000);
    // this.testRemove(single, 99999);
    // this.testGet(single, 99999);
    // this.testPutIndex(single, 9999, 9999);
    // this.testPutIndex(single, 500, 98997);
    // this.testPut(single, 100000);
    // this.testPut(single, 1000);
    // this.testPut(single, 10000);
    // this.testPut(single, 100000);

    // const vector = new VectorArray<number>(100000);
    // this.testPutIndex(vector, 9999, 99999);
    // this.testGet(vector, 99999);
    // this.testRemove(vector, 9999);

    const factor = new FactorArray<number>();
    this.testRemove(factor, 6);
  }

  private static testGet(array: IArray<number>, index: number) {
    const start = performance.now();
    array.get(index);
    const finish = performance.now();

    console.log(array, 'testGet: ', finish - start);
  }

  private static testPut(array: IArray<number>, count: number) {
    const start = performance.now();
    for (let i = 0; i < count; i++) {
      array.put(i);
    }
    const finish = performance.now();

    console.log(/* array, */ 'testPut: ', finish - start);
  }

  private static testPutIndex(array: IArray<number>, el: number, index: number) {
    const start = performance.now();
    array.put(el, index);
    const finish = performance.now();

    console.log(/* array,  */'testPutIndex: ', finish - start);
  }

  private static testRemove(array: IArray<number>, index: number) {
    const start = performance.now();
    const removedEl = array.remove(index);
    const finish = performance.now();

    console.log(removedEl, 'testRemove: ', finish - start);
  }
}

Test.main();