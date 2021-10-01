import * as fs from 'fs';
import * as chardet from 'chardet';
import * as mime from 'mime-types';

export function readBinaryData(fileName: string): Buffer {
  return fs.readFileSync(fileName);
}

export function writeBinaryData(fileName: string, data: Uint8Array) {
  const wstream = fs.createWriteStream(fileName);
  wstream.write(data);
  wstream.end();
}

/**
 * Записать число в 4 байта
 */
export function create4ByteNumber(num: number): Uint8Array {
  const number4Bytes = new Uint8Array(4);
  number4Bytes[0] = num & 255;
  number4Bytes[1] = (num >> 8) & 255;
  number4Bytes[2] = (num >> 16) & 255;
  number4Bytes[3] = (num >> 24) & 255;

  return number4Bytes;
};

/**
 * Записать число в 2 байта
 */
export function create2ByteNumber(num: number): Uint8Array {
  const number2Bytes = new Uint8Array(2);
  number2Bytes[0] = num & 255;
  number2Bytes[1] = (num >> 8) & 255;

  return number2Bytes;
};

/**
 * Получить число из 4 байт
 */
export function getNumberFrom4Byte(buffer: ArrayBuffer, startIndex: number): number {
  let i = startIndex;

  return buffer[i] 
    | (buffer[i+1] << 8)
    | (buffer[i+2] << 16)
    | (buffer[i+3] << 24);
}

/**
 * Получить число из 2 байт
 */
export function getNumberFrom2Byte(buffer: ArrayBuffer, startIndex: number): number {
  let i = startIndex;

  return buffer[i] 
    | (buffer[i+1] << 8);
}

/**
 * Перевернуть бинарную строку и получить число из 1 байта
 */
export function get8BitInt(num: number) {
  let binaryNum = num.toString(2).split('').reverse().join('');

  if (binaryNum.length < 8) {
    binaryNum += '0'.repeat(8 - binaryNum.length)
  }

  return binaryNum;
}

export function getFileEncoding(path) {
  const encoding = chardet.detectFileSync(path);
  console.log(encoding, 'enc');
}

/**
 * Определение кодировки файла
 */
export function getEncoding(ext): BufferEncoding {
  const contentType = mime.contentType(ext) || '';

  const parts = contentType.split(';');

  if (parts.length === 1) {
    if (contentType.startsWith('image')) {
      return 'base64';
    }

    throw new Error('Unrecognized mimeType');
  }

  return parts[1].split('=')[1] as BufferEncoding;
}