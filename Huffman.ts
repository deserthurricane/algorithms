import { createDataBuffer, createFileHeader, decodeFileHeader, get8BitInt, readBinaryData, writeBinaryData } from "./utils";

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
class HCode {
  private charTable: Map<string, number>;
  private hTreeRoot: HNode;
  private hCode: Map<string, string> = new Map();
  private text: string;
  private fileName: string;

  constructor(fileName: string, charTable: Map<string, number>) {
    this.charTable = charTable;
    this.fileName = fileName;
    this.text = readBinaryData(fileName).toString('utf-8');
  }

  /**
   * Кодирование символов текста в "бинарную строку"
   */
  public encode(): string {
    // Создать дерево
    this.createHTree();

    // Пройтись по дереву и создать код Хаффмана
    this.createHCode();

    // Создать "бинарную строку"
    const binaryString = this.createBinaryString();

    const header = createFileHeader(0, this.text.length, this.charTable)
    const data = createDataBuffer(binaryString);

    const file = new Uint8Array(header.byteLength + data.byteLength);
    file.set(header, 0);
    file.set(data, header.byteLength);

    console.log(file.buffer, 'file');
    // console.log(decodeFileHeader(file.buffer));    

    writeBinaryData(`${this.fileName}.huffman`, file);
    
    // console.log(binaryString.length / 8, 'BYTE COUNT');
    // console.log(this.text.length, 'INITIAL SYMBOLS BYTE COUNT');
    // console.log(this.text.length - (binaryString.length / 8), 'BYTE ECONOMY');
    // console.log(100 - ((binaryString.length / 8) / this.text.length) * 100, '% ECONOMY');
    
    return binaryString;
  }

  /**
   * Декодирование из бинарной строки в обычный текст
   */
  public decode(fileName: string) {
    // Для простоты тестирования декодируем то же сообщение, что мы кодировали
    // let encodedText = this.encode();
    const encodedData: Buffer = readBinaryData(fileName);

    // console.log(encodedData.byteLength, 'bytelength');
    // decodeFileHeader(encodedData);

    const { dataLength, charTable, startIndex } = decodeFileHeader(encodedData);

    // console.log(charTable, 'dataLength, startIndex');
    
    this.charTable = charTable;

    console.log(this.charTable, 'this.charTable');
    

    let encodedText = readBinaryData(fileName).slice(startIndex).toString('utf-8').split('').map(char => get8BitInt(char.charCodeAt(0))).join('');
    console.log(encodedText, 'encodedText');
    console.log('v'.charCodeAt(0).toString(10));
    console.log('Q'.charCodeAt(0).toString(10));
    console.log(';'.charCodeAt(0).toString(10));
    
    console.log('v'.charCodeAt(0).toString(2));
    let decodedText = '';

    // Создать дерево
    this.createHTree();

    // Пройтись по дереву и создать код Хаффмана
    this.createHCode();

    const hCodeEntries = Array.from(this.hCode.entries());
    console.log(hCodeEntries, 'hCodeEntries');
    

    let i = dataLength;

    while (i > 0) {
      const [char, code] = this.findPrefix(encodedText, hCodeEntries);
      decodedText += char;
      encodedText = encodedText.slice(code.length);
      i--;
    }

    console.log(decodedText, 'decodedText');
    
    return decodedText;
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

    console.log(this.hCode, 'this.hCode');
  }

  /**
   * Построение кода Хаффмана для одного символа
   */
  private createBinaryCharCode(charCodeUTF: string): string {
    let indexes: Array<0|1> = [];
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
  private deepNodeSearch(node: HNode, charCodeUTF: string, nodeIndex: 0|1, visited: WeakMap<HNode, boolean>, found: { isFound: boolean }, indexes: Array<0|1>) {
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

    if (hNodes[hNodes.length-1].getWeight() < sortedChars[sortedChars.length-1][1]) {
      minNode = hNodes.pop();
    } else {
      const lastChar = sortedChars.pop();      
      minNode = new HNode(lastChar[0], lastChar[1], null);
    }

    return minNode;
  }
}

/**
 * Утилита для создания таблицы частотности символов
 */
function createCharTable(text: string): Map<string, number> {
  const charMap = new Map();

  text.split('').forEach(char => {
    if (!charMap.has(char)) {
      charMap.set(char, 1);
    } else {
      const count = charMap.get(char);
      charMap.set(char, count + 1);
    }
  });

  return charMap;
}


/** TEST */
// const text1 = 'ABRAKADABRA';
// // A - 5
// // B - 2
// // R - 2
// // K - 1
// // D - 1
// const charTable = createCharTable(text1);
// console.log(charTable, 'charTable');
// const algo = new HCode(text1, charTable);

// algo.encode();
// algo.decode();

// console.log('###################################################################################################');

// const text2 = `
//   Мороз и солнце; день чудесный!
//   Еще ты дремлешь, друг прелестный —
//   Пора, красавица, проснись:
//   Открой сомкнуты негой взоры
//   Навстречу северной Авроры,
//   Звездою севера явись!
//   Вечор, ты помнишь, вьюга злилась,
//   На мутном небе мгла носилась;
//   Луна, как бледное пятно,
//   Сквозь тучи мрачные желтела,
//   И ты печальная сидела —
//   А нынче... погляди в окно:
//   Под голубыми небесами
//   Великолепными коврами,
//   Блестя на солнце, снег лежит;
//   Прозрачный лес один чернеет,
//   И ель сквозь иней зеленеет,
//   И речка подо льдом блестит.
//   Вся комната янтарным блеском
//   Озарена. Веселым треском
//   Трещит затопленная печь.
//   Приятно думать у лежанки.
//   Но знаешь: не велеть ли в санки
//   Кобылку бурую запречь?
//   Скользя по утреннему снегу,
//   Друг милый, предадимся бегу
//   Нетерпеливого коня
//   И навестим поля пустые,
//   Леса, недавно столь густые,
//   И берег, милый для меня.
// `;

// const charTable2 = createCharTable(text2);
// console.log(charTable2, 'charTable2');
// const algo2 = new HCode(text2, charTable2);

// algo2.encode();
// algo2.decode();


// /*** BIG TEXT */
// const charTable3 = createCharTable(GRANATOVYI_BRASLET);
// console.log(charTable3, 'charTable3');
// const algo3 = new HCode(GRANATOVYI_BRASLET, charTable3);

// algo3.encode();
// algo3.decode();

/*** IMAGE */
const charTable4 = createCharTable(readBinaryData('abra.txt').toString('utf-8'));
console.log(charTable4, 'charTable4');
// createFileHeader(0, 11, charTable4);
const algo4 = new HCode('abra.txt', charTable4);

// algo4.encode();
algo4.decode('abra.txt.huffman');