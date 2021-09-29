import { create4ByteNumber, get8BitInt, getNumberFrom4Byte, readBinaryData, writeBinaryData } from "./utils";

/**
 * Узел в дереве Хаффмана
 */
class HNode {
  private charCode: null | number | string;
  private weight: number = 0;
  private subNodes: [HNode, HNode] | null;

  constructor(charCode: number | null | string, weight: number, subNodes: [HNode, HNode] | null) {
    this.charCode = charCode;
    this.weight = weight;
    this.subNodes = subNodes;
  }

  public getWeight() {
    return this.weight;
  }

  public getSubNodes() {
    return this.subNodes;
  }

  public getCharCode() {
    return this.charCode;
  }
}

/**
 * Код Хаффмана - алгоритм сжатия любых данных
 */
export class HCode {
  private charTable: Map<string, number> = new Map();
  private hTreeRoot: HNode;
  private hCode: Map<string, string> = new Map();
  private text: string;
  private fileName: string;

  constructor(fileName: string, encoding?: BufferEncoding) {
    this.fileName = fileName;

    if (encoding) {
      this.text = readBinaryData(fileName).toString(encoding);
    }
  }

  /**
   * Создание таблицы частотности употребления символов
   */
  private createCharTable() {
    this.text.split('').forEach(char => {
      if (!this.charTable.has(char)) {
        this.charTable.set(char, 1);
      } else {
        const count = this.charTable.get(char);
        this.charTable.set(char, count + 1);
      }
    });
  }

  /**
   * Сжатие файла с помощью кода Хаффмана
   */
  public encode(): Uint8Array {
    // Создать таблицу частотности
    this.createCharTable();

    // Создать бинарное дерево
    this.createHTree();

    // Пройтись по дереву и создать код Хаффмана
    this.createHCode();

    // Создать "бинарную строку"
    const binaryString = this.createBinaryString();

    const header = this.createFileHeader(0, this.text.length, this.charTable)
    const data = this.createDataBuffer(binaryString);

    const file = new Uint8Array(header.byteLength + data.byteLength);
    file.set(header, 0);
    file.set(data, header.byteLength);

    return file;
  }

  /**
  * Создание хэдера
  * @param algoType - выбранный алгоритм сжатия: 0 - код Хаффмана, 1 - LZ77
  * @param dataLength - длина исходных данных в байтах
  * @param charTable - таблица кодирования
  * @returns Uint8Array
  */
  private createFileHeader(algoType: 0 | 1, dataLength: number, charTable: Map<string, number>): Uint8Array {
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

    const charTableBuffer = this.createCharTableBuffer(charTable, charTableByteSize);
    header.set(charTableBuffer, 6);

    return header;
  }

  /**
  * Кодирование символов в файле по Коду Хаффмана
  */
  private createDataBuffer(data: string): Uint8Array {
    const byteDataArray = new Uint8Array(Math.ceil(data.length / 8));
    let byteIndex = 0;

    for (let i = 0; i < data.length; i += 8) {
      // Записываем байты справа налево
      let rightToLeftBytes = '';

      for (let j = i + 7; j >= i; j--) {
        if (data[j] !== undefined) {
          rightToLeftBytes += data[j]
        }
      }

      byteDataArray[byteIndex] = parseInt(rightToLeftBytes, 2);
      byteIndex++;
    }

    return byteDataArray;
  }

  /**
   * Кодирование Кода Хаффмана
   */
  private createCharTableBuffer(charTable: Map<string, number>, charTableByteSize: number): Uint8Array {
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
   * Декодирование из бинарной строки в обычный текст
   */
  public decode(): string {
    const encodedData: Buffer = readBinaryData(this.fileName);

    const { dataLength, charTable, startIndex } = this.decodeFileHeader(encodedData);

    this.charTable = charTable;

    // Раскодируем текст по Коду Хаффмана this.charTable
    const fileData = encodedData.slice(startIndex);
    let binaryText = '';
    for (let i = 0; i < fileData.byteLength; i++) {
      binaryText += get8BitInt(fileData[i]);
    }

    let decodedText = '';

    // Создать дерево
    this.createHTree();

    // Пройтись по дереву и создать код Хаффмана
    this.createHCode();

    const hCodeEntries = Array.from(this.hCode.entries());

    let i = dataLength;

    while (i > 0) {
      const [char, code] = this.findPrefix(binaryText, hCodeEntries);
      decodedText += char;
      binaryText = binaryText.slice(code.length);
      i--;
    }

    // writeBinaryData(`${this.fileName}.huffman.decoded`, Buffer.from(decodedText, 'base64'));
    // Buffer.from(decodedText)
    return decodedText;
  }

  private decodeFileHeader(buffer: ArrayBuffer) {
    const dataView = new Uint8Array(buffer);

    const algoType: 0 | 1 = dataView[0] as 0 | 1;
    const dataLength: number = getNumberFrom4Byte(dataView, 1);

    const charTableLength: number = dataView[5];
    const charTable: Map<string, number> = new Map();
    const startCharTableIndex = 6;

    let byteIndex = startCharTableIndex;
    const end = startCharTableIndex + charTableLength * 1 + charTableLength * 4;

    while (byteIndex < end) {
      charTable.set(
        String.fromCharCode(dataView[byteIndex]),
        getNumberFrom4Byte(dataView, byteIndex + 1)
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

  /**
   * Поиск префикса из кода Хаффмана в "бинарной строке"
   */
  private findPrefix(encodedText: string, hCodeEntries: Array<[string, string]>): [string, string] {
    return hCodeEntries.find(([key, value]) => encodedText.startsWith(value));
  }

  /**
   * Кодирование символов исходного текста из UTF-8 в бинарный код
   */
  private createBinaryString(): string {
    return this.text
      .split('')
      .map(char => this.hCode.get(char))
      .join('');
  }

  /**
   * Создание кода Хаффмана по полученной таблице частотности символов
   */
  private createHCode(): void {
    const charCodesUTF: string[] = Array.from(this.charTable.keys());

    for (let charCodeUTF of charCodesUTF) {
      const result = this.createBinaryCharCode(charCodeUTF);
      this.hCode.set(charCodeUTF, result);
    }
    // console.log(this.hCode, 'this.hCode');
  }

  /**
   * Построение кода Хаффмана для одного символа
   */
  private createBinaryCharCode(charCodeUTF: string): string {
    let indexes: Array<0 | 1> = [];
    const found = {
      isFound: false
    };

    const visited: WeakMap<HNode, boolean> = new Map();

    // Запускаем глубокий поиск по левой и правой ветвям дерева
    this.deepNodeSearch(this.hTreeRoot.getSubNodes()[0], charCodeUTF, 0, visited, found, indexes);
    this.deepNodeSearch(this.hTreeRoot.getSubNodes()[1], charCodeUTF, 1, visited, found, indexes);

    return indexes.join('');
  }

  /**
   * Рекурсивная реализация глубокого поиска для 1 узла
   */
  private deepNodeSearch(node: HNode, charCodeUTF: string, nodeIndex: 0 | 1, visited: WeakMap<HNode, boolean>, found: { isFound: boolean }, indexes: Array<0 | 1>) {
    if (found.isFound) return;

    const subNodes = node.getSubNodes();

    if (subNodes === null) {
      if (node.getCharCode() === charCodeUTF) {
        found.isFound = true;
        visited.set(node, true);
        indexes.unshift(nodeIndex);
      }
      return;
    } else {
      this.deepNodeSearch(subNodes[0], charCodeUTF, 0, visited, found, indexes);
      this.deepNodeSearch(subNodes[1], charCodeUTF, 1, visited, found, indexes);

      if (visited.get(subNodes[0]) === true || visited.get(subNodes[1]) === true) {
        visited.set(node, true);
        indexes.unshift(nodeIndex);
      }
    }
  }

  /**
   * Создаем бинарное дерево с "путями" к символам для последующего составления кода Хаффмана
   */
  private createHTree(): void {
    const sortedChars: Array<[string, number]> = this.sortCharTable();

    const hNodes: HNode[] = [];

    while (sortedChars.length > 1 || hNodes.length > 1) {
      // Достаём последний и предпоследний по значению count элементы      
      const hNode1 = this.getMinEl(sortedChars, hNodes);
      const hNode2 = this.getMinEl(sortedChars, hNodes);

      // Создаём новый узел дерева Хаффмана
      const sumCount = hNode1.getWeight() + hNode2.getWeight();
      const hTreeNode = new HNode(null, sumCount, [hNode1, hNode2]);

      // Кладем его в очередь созданных узлов
      this.enqueueEl(hNodes, hTreeNode);
    }

    this.hTreeRoot = this.setRoot(sortedChars, hNodes);
  }

  private setRoot(sortedChars: [string, number][], hNodes: HNode[]): HNode {
    if (sortedChars.length === 0) {
      return hNodes.pop()
    } else {
      const lastChar = sortedChars.pop();
      const hNode1 = new HNode(lastChar[0], lastChar[1], null);
      const hNode2 = hNodes.pop();

      const sumCount = hNode1.getWeight() + hNode2.getWeight();
      const hTreeRoot = new HNode(null, sumCount, [hNode1, hNode2]);

      return hTreeRoot;
    }
  }

  /**
   * Сортируем символы по частотности употребления в тексте (desc)
   */
  private sortCharTable(): Array<[string, number]> {
    return [...this.charTable.entries()].sort(([charCode1, count1], [charCode2, count2]) => {
      return count2 > count1 ? 1 : -1;
    });
  }

  /**
   * Кладем новую ноду бинарного дерева в очередь из подобных нод 
   */
  private enqueueEl<T>(arr: Array<any>, newEl: T): void {
    if (!arr.length) {
      arr[0] = newEl;
    } else {
      // Ставим в начало списка элемент с бОльшим весом
      arr.unshift(newEl);
    }
  }

  /**
   * Получаем минимальный по весу элемент из двух очередей - очереди с символами текста и очереди с создаваемыми нодами 
   */
  private getMinEl(sortedChars: Array<[string, number]>, hNodes: HNode[]) {
    let minNode: HNode;

    if (hNodes.length === 0) {
      const lastChar = sortedChars.pop();
      minNode = new HNode(lastChar[0], lastChar[1], null);
      return minNode;
    }

    if (sortedChars.length === 0) {
      minNode = hNodes.pop();
      return minNode;
    }

    if (hNodes[hNodes.length - 1].getWeight() < sortedChars[sortedChars.length - 1][1]) {
      minNode = hNodes.pop();
    } else {
      const lastChar = sortedChars.pop();
      minNode = new HNode(lastChar[0], lastChar[1], null);
    }

    return minNode;
  }
}