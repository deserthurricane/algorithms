import * as fs from 'fs';


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

export function readBinaryData(fileName: string): string {
  const buffer: Buffer = fs.readFileSync(fileName);
  // const result = buffer.toString('base64');
  const result = buffer.toString('utf-8');

  /**
   * @TODO encoding в зависимости от типа файла: utf-8 для текстов, base64 для картинок
   */

  console.log(result, 'buffer');
  

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

export function writeBinaryData(fileName: string, data: Uint8Array) {
  const wstream = fs.createWriteStream(fileName);
  wstream.write(data);
  wstream.end();
}

// writeBinaryData() 
// readBinaryData()

export function createDataBuffer(data: string): Uint8Array {
  const byteDataArray = new Uint8Array(Math.ceil(data.length / 8));
  let byteIndex = 0;

  for (let i = 0; i < data.length; i += 8) {
    // Записываем байты слева направо
    let rightToLeftBytes = '';
    let undefinedCount = 0; // сколько бит не хватило до полного байта

    for (let j = i + 7; j >= i; j--) {
      if (data[j] !== undefined) {
        rightToLeftBytes += data[j] // || '0';
      } else {
        undefinedCount++;
      }
    }
    // for (let j = i; j < i + 8; j++) {
    //   if (data[j] !== undefined) {
    //     rightToLeftBytes += data[j];
    //   } else {
    //     undefinedCount++;
    //   }
    // }
    
    // if (undefinedCount > 0) {
    //   const zeroTail = '0'.repeat(undefinedCount);
    //   rightToLeftBytes += zeroTail;
    // }

    console.log(rightToLeftBytes, 'rightToLeftBytes');
    

    // bits.push(parseInt(rightToLeftBytes, 2));
    byteDataArray[byteIndex] = parseInt(rightToLeftBytes, 2);
    byteIndex++;
  }

  console.log(byteDataArray, 'byteDataArray');

  return byteDataArray;
  
}

/**
 * 
 * @param algoType - выбранный алгоритм сжатия: 0 - код Хаффмана, 1 - LZ77
 * @param dataLength - длина исходных данных в байтах
 * @param charTable - таблица кодирования
 * @returns Uint8Array
 */
export function createFileHeader(algoType:  0 | 1, dataLength: number, charTable: Map<string, number>): Uint8Array {
  /* Любое по величине число, обозначающее количество байт исходного файла, необходимо разместить в массиве из 4 байт 
   * Это нужно для того, чтобы и маленькие числа, и числа до 2 ^ 30 (2Гб) занимали одинаковое количество байт 
   */
  const charCodeUtfByteSize = 1;  // код символа по utf-8 займет 1 байт
  const charCountUtfByteSize = 4;  // число повтора символа может занять до 3 байт, так как могут быть большие числа
  const charTableByteSize = charTable.size * charCodeUtfByteSize + charTable.size * charCountUtfByteSize;

  console.log(charTableByteSize, 'charTableByteSize');
  
  const bufferLength = 
    1 // тип алгоритма занимает 1 байт (хранит 0 или 1)
    + 4 // количество символов в исходных данных занимает 4 байта
    + 1 // количество символов в таблице кодов занимает 1 байт (максимум может использоваться 256 символов)
    + charTableByteSize // пары "код символа" (1 байт) - "количество повторов" (4 байта)
  ;

  const header = new Uint8Array(bufferLength);
  
  header[0] = algoType;
  
  const dataLengthBytes = create4ByteNumber(dataLength);
  header.set(dataLengthBytes, 1);

  header[5] = charTable.size;

  const charTableBuffer = createCharTableBuffer(charTable, charTableByteSize);
  header.set(charTableBuffer, 6);

  console.log(header.buffer, 'header');

  return header;
}

function createCharTableBuffer(charTable: Map<string, number>, charTableByteSize: number): Uint8Array {
  const hCodeArray = new Uint8Array(charTableByteSize);
  let i = 0;

  for (let [char, count] of charTable) {
    if (i === charTableByteSize) break;

    hCodeArray[i] = char.charCodeAt(0);
    hCodeArray.set(create4ByteNumber(count), ++i);

    i += 4;
  }

  return hCodeArray;
}

/**
 * Записать любое число в 4 байта
 * @param num 
 * @returns 
 */
 function create4ByteNumber(num: number): Uint8Array {
  const number4Bytes = new Uint8Array(4);
  number4Bytes[0] = num & 255;
  number4Bytes[1] = (num >> 8) & 255;
  number4Bytes[2] = (num >> 16) & 255;
  number4Bytes[3] = (num >> 24) & 255;

  return number4Bytes;
};