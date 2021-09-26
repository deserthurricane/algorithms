import * as fs from 'fs';

/**
 * Запись 16-битных чисел в файл BinaryData
 */
// export function writeBinaryData() {
//   const values = [];

//   for (let i = 0; i < 1e7; i++) {
//     values[i] = generate16bitNumber();
//   }

//   // console.log(values, 'values');

//   const wstream = fs.createWriteStream('BinaryData');
//   const int16Binary = Buffer.from(Int16Array.from(values).buffer);
//   // console.log(int16Binary, 'int16Binary');

//   wstream.write(int16Binary);
//   wstream.end();

//   wstream.on('finish', function() {
//     console.log('file has been written');
//     readBinaryData()
//   });
// }

export function readBinaryData(): string {
  const buffer: Buffer = fs.readFileSync('LZ77.png');
  const result = buffer.toString('base64');

  /**
   * @TODO encoding в зависимости от типа файла: utf-8 для текстов, base64 для картинок
   */

  console.log(buffer.toString('base64'), 'buffer');
  

  // offset 2 для получения 16-битных чисел, по 2 байта каждое, в бинарном строковом формате
  // for (let offset = 0; offset < buffer.byteLength; offset+=2) {
  //   let binaryValue = buffer.readUInt16LE(offset).toString(2);
  //   let radixDiff = 16 - binaryValue.length;
  //   while (radixDiff) {
  //     binaryValue = '0' + binaryValue;
  //     radixDiff--;
  //   }

  //   binaryStrings.push(binaryValue);
  //   return binaryStrings;
  // }

  // console.log(binaryStrings, 'binaryStrings');
  // console.log(binaryStrings.length, 'binaryStrings.length');
  
  return result;
}

// writeBinaryData() 
// readBinaryData()