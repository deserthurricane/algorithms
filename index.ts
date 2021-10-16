import { HCode } from './Huffman';
import { LZ77 } from './LZ77';
import { getEncoding, readBinaryData, writeBinaryData } from './utils';
import { performance } from 'perf_hooks';
import * as path from 'path';

export class Archivator {
  static compress(pathName: string, algoType: 0 | 1) {
    const ext = path.extname(pathName);
    const encoding = getEncoding(ext);

    let algo;

    if (algoType === 0) {
      algo = new HCode(pathName, encoding)
    }

    if (algoType === 1) {
      algo = new LZ77(pathName, encoding);
    }

    const buffer = measureRunTimeDecorator(algo.encode.bind(algo));

    writeBinaryData(`${path.dirname(pathName)}/${path.basename(pathName, ext)}.${algoType}${ext}`, Buffer.from(buffer, encoding))
  }

  static decompress(pathName: string) {
    const algoType = readBinaryData(pathName)[0];
    
    let algo;

    if (algoType === 0) {
      algo = new HCode(pathName);
    }

    if (algoType === 1) {
      algo = new LZ77(pathName);
    }

    const buffer = measureRunTimeDecorator(algo.decode.bind(algo));

    const ext = path.extname(pathName);
    const encoding = getEncoding(ext);

    writeBinaryData(`${path.dirname(pathName)}/${path.basename(pathName, ext)}.decoded${ext}`, Buffer.from(buffer, encoding));
  }
}

function measureRunTimeDecorator<T>(fn: Function) {
  const start = performance.now();
  const result = fn();
  const finish = performance.now();

  const runTime = finish - start;
  console.log('runTime:', runTime);

  return result;
}

/** TEXT */
// Archivator.compress('tests/abra/abra.txt', 0);
// Archivator.decompress('tests/abra/abra.0.txt');
// Archivator.compress('tests/abra/abra.txt', 1);
// Archivator.decompress('tests/abra/abra.1.txt');

// Archivator.compress('tests/latin/latin.txt', 0);
// Archivator.decompress('tests/latin/latin.0.txt');
// Archivator.compress('tests/latin/latin.txt', 1);
// Archivator.decompress('tests/latin/latin.1.txt');

/** IMAGE */
// Archivator.compress('tests/glasses/glasses.png', 0);
// Archivator.decompress('tests/glasses/glasses.0.png');
// Archivator.compress('tests/glasses/glasses.png', 1);
// Archivator.decompress('tests/glasses/glasses.1.png');

// Archivator.compress('tests/photo/photo.jpg', 0);
// Archivator.decompress('tests/photo/photo.0.jpg');
// Archivator.compress('tests/photo/photo.jpg', 1);
// Archivator.decompress('tests/photo/photo.1.jpg');

// Archivator.compress('tests/pic/Bykovo.jpg', 0);
// Archivator.decompress('tests/pic/Bykovo.0.jpg');
// Archivator.compress('tests/pic/Bykovo.jpg', 1);
// Archivator.decompress('tests/pic/Bykovo.1.jpg');