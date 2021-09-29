import { HCode } from './Huffman';
import { LZ77 } from './LZ77';
import { readBinaryData, writeBinaryData } from './utils';
import { performance } from 'perf_hooks';


export class Archivator {
  static compress(path: string, algoType: 0 | 1) {
    /**
     * @TODO определить кодировку utf8 или base64
     */

    let algo;

    if (algoType === 0) {
      algo = new HCode(path, 'base64')
    }

    if (algoType === 1) {
      algo = new LZ77(path, 'base64');
    }

    const buffer = algo.encode();

    writeBinaryData(`${path}.${algoType}`, Buffer.from(buffer, 'base64'))
  }

  static decompress(path: string) {
    const algoType = readBinaryData(path)[0];

    console.log(algoType, 'algoType');
    
    let algo;

    if (algoType === 0) {
      algo = new HCode(path);
    }

    if (algoType === 1) {
      algo = new LZ77(path);
    }

    const buffer = algo.decode();

    writeBinaryData(`${path}.decoded`, Buffer.from(buffer, 'base64'))
  }
}

// function measureRunTimeDecorator(fn) {
//     const start = performance.now();
//     const result = fn();
//     const finish = performance.now();

//     const runTime = finish - start;
//     console.log('runTime:', runTime);

//     console.log(result);
    

//     return result as Uint8Array;
//   // const start = performance.now();
//   // const data = fn();
//   // const finish = performance.now();

//   // const runTime = finish - start;
//   // console.log('runTime, ms:', runTime);

//   // return data;
// }

/** TEXT */
// Archivator.compress('tests/abra/abra.txt', 0);
// Archivator.decompress('tests/abra/abra.txt.0');

/** IMAGE */
// Archivator.compress('tests/glasses/glasses.png', 1);
Archivator.decompress('tests/glasses/glasses.png.1');
