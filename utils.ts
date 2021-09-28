import * as fs from 'fs';

export function readBinaryData(fileName: string): Buffer {
  const data: Buffer = fs.readFileSync(fileName);
  // const result = buffer.toString('base64');
  // const result = buffer.toString('utf-8');

  // /**
  //  * @TODO encoding в зависимости от типа файла: utf-8 для текстов, base64 для картинок
  //  */

  // console.log(result, 'buffer');
  

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
  
  return data;
}

export function writeBinaryData(fileName: string, data: Uint8Array) {
  const wstream = fs.createWriteStream(fileName);
  wstream.write(data);
  wstream.end();
}



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

  // console.log(header.buffer, 'header');

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

export function decodeFileHeader(buffer: ArrayBuffer) {
  const dataView = new Uint8Array(buffer);

  const algoType: 0 | 1 = dataView[0] as 0 | 1;
  const dataLength: number = getNumberFrom32Bit(dataView, 1);

  const charTableLength: number = dataView[5];
  const charTable: Map<string, number> = new Map();
  const startCharTableIndex = 6;

  let byteIndex = startCharTableIndex;
  const end = startCharTableIndex + charTableLength * 1 + charTableLength * 4;

  while (byteIndex < end) {
    charTable.set(
      String.fromCharCode(dataView[byteIndex]),
      getNumberFrom32Bit(dataView, byteIndex + 1)
    );

    byteIndex += 5;
  }

  console.log(charTable, 'charTable');

  return {
    algoType,
    dataLength,
    charTable,
    startIndex: end
  };
}

function getNumberFrom32Bit(buffer: ArrayBuffer, startIndex: number): number {
  let i = startIndex;

  return buffer[i] 
    | (buffer[i+1] << 8)
    | (buffer[i+2] << 16)
    | (buffer[i+3] << 24);
}

export function get8BitInt(num: number) {
  let binaryNum = num.toString(2).split('').reverse().join('');

  if (binaryNum.length < 8) {
    binaryNum += '0'.repeat(8 - binaryNum.length)
  }

  return binaryNum;
}