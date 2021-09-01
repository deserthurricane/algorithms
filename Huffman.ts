/**
 * Узел в дереве Хаффмана
 */
class HNode {
  private charCode: null | number;
  private weight: number = 0;
  private subNodes: [HNode, HNode] | null;

  constructor(charCode: number | null, weight: number, subNodes: [HNode, HNode] | null) {
    this.charCode = charCode;
    this.weight = weight;
    this.subNodes = subNodes;
  }

  // public setSubNode(order: 0 | 1, node: HNode) {
  //   this.subNodes[order] = node;
  // }

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
 * Код Хаффмана
 */
class HCode {
  private charTable: Map<number, number>;
  private hTree: HNode;

  constructor(charTable: Map<number, number>) {
    this.charTable = charTable;
  }

  main() {
    // Создать дерево
    this.createTree();

    // Пройтись по дереву и создать код Хаффмана
  }

  createTree(): HNode {
    const sortedChars: Array<[number, number]> = this.sortCharTable();
    console.log(sortedChars, 'sortedChars');
    
    const hNodes: HNode[] = [];

    while (sortedChars.length > 1 || hNodes.length > 1) {
      // Достаём последний и предпоследний по значению count элементы
      // let hNode1: HNode;
      // let hNode2: HNode;

      // console.log(sortedChars[sortedChars.length-1], 'sortedChars[sortedChars.length-1]');
      
      const hNode1 = this.getMinEl(sortedChars, hNodes);
      const hNode2 = this.getMinEl(sortedChars, hNodes);
      // if (hNodes[hNodes.length-1]?.getWeight() < sortedChars[sortedChars.length-1]?.[1]) {
      //   hNode1 = hNodes.pop();
      // } else {
      //   const lastChar = sortedChars.pop();
      //   console.log(lastChar, 'lastChar1');
      //   hNode1 = new HNode(lastChar[0], lastChar[1], null);
      // }

      // if (hNodes[hNodes.length-1]?.getWeight() < sortedChars[sortedChars.length-1]?.[1]) {
      //   hNode2 = hNodes.pop();
      // } else {
      //   const lastChar = sortedChars.pop();
      //   console.log(lastChar, 'lastChar2');
        
      //   hNode2 = new HNode(lastChar[0], lastChar[1], null);
      // }

      // console.log(hNode1, 'hNode1');
      // console.log(hNode2, 'hNode2');
      

      const sumCount = hNode1.getWeight() + hNode2.getWeight();
      const hTreeNode = new HNode(null, sumCount, [hNode1, hNode2]);

      // console.log(hTreeNode, 'hTreeNode');
      

      this.enqueueEl(hNodes, hTreeNode);
    }

    // console.log(hNodes, 'hNodes');

    console.log(sortedChars, 'sortedChars final');
    console.log(hNodes, 'hNodes final');

    const lastChar = sortedChars.pop();
    const hNode1 = new HNode(lastChar[0], lastChar[1], null);
    const hNode2 = hNodes.pop();

    const sumCount = hNode1.getWeight() + hNode2.getWeight();
    const hTreeRoot = new HNode(null, sumCount, [hNode1, hNode2]);

    console.log(hTreeRoot, 'root');
    return hTreeRoot;
  }

  private sortCharTable(): Array<[number, number]> {
    return [...this.charTable.entries()].sort(([charCode1, count1], [charCode2, count2]) => {
      return count2 > count1 ? 1 : -1;
    });
  }

  private enqueueEl<T>(arr: Array<any>, newEl: T): void {
    if (!arr.length) {
      arr[0] = newEl;
    } else {
      const lastEl = arr[arr.length - 1];

      arr[arr.length - 1] = newEl;
      arr[arr.length] = lastEl;
    }
  }

  private getMinEl(sortedChars: Array<[number, number]>, hNodes: HNode[]) {
    console.log(hNodes, 'hNodes');
    
    let minNode: HNode;

    // if (sortedChars.length === 1) {
    //   minNode = hNodes.pop();
    //   return minNode;
    // }

    if (hNodes.length === 0) {
      const lastChar = sortedChars.pop();
      minNode = new HNode(lastChar[0], lastChar[1], null);
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

function createCharTable(text: string): Map<number, number> {
  const charMap = new Map();

  text.split('').forEach(char => {
    const charCode = char.charCodeAt(0);

    if (!charMap.has(charCode)) {
      charMap.set(charCode, 1);
    } else {
      const count = charMap.get(charCode);
      charMap.set(charCode, count + 1);
    }
  });

  return charMap;
}


/** TEST */
const text = 'ABRAKADABRA';
// A - 5
// B - 2
// R - 2
// K - 1
// D - 1
const charTable = createCharTable(text);

// console.log(charTable, 'charTable');

const algo = new HCode(charTable);

algo.main();