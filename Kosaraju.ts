import { AdjacencyVector, graph } from './AdjacencyVector';

class Kosaraju<V> {
  adjacencyVector: AdjacencyVector<V>;

  constructor(adjacencyVector: AdjacencyVector<V>) {
    this.adjacencyVector = adjacencyVector;
  }
  //  0  1  2  3
  // [A, B, C, D]
  /**
   * Векторы смежности (ориентированные)
   * 0 - 0 0 0 0
   * 1 - A 0 0 0
   * 2 - A 0 0 0
   * 3 - A C 0 0
   */
  /**
   * Векторы смежности (ориентированные, reverted)
   * 0 - B C D 0  AB, AC, AD
   * 1 - 0 0 0 0  -
   * 2 - D 0 0 0  CD
   * 3 - 0 0 0 0  -
   */
  revertMatrix() {
    const verticeArray = this.adjacencyVector.getVerticeArray();
    const matrix = this.adjacencyVector.getMatrix();

    const newMatrix: V|0[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

//     const newMatrix: (V | 0)[][] = [
// ...matrix
//     ];

    matrix.forEach((row, rowIndex) => {
      row.forEach((v: V | 0, index) => {
        // Найден вектор, надо поменять его направление
        if (v !== 0) {
          const vIndex = verticeArray.indexOf(v); // куда сейчас указывает вектор
          // newMatrix[rowIndex] = newMatrix[rowIndex] || [];
          // newMatrix[rowIndex][index] = 0; // обнуляем значение истока

          const firstZeroIndex = newMatrix[vIndex].indexOf(0); // первый нулевой элемент матрицы, доступный для заполнения
          (newMatrix[vIndex][firstZeroIndex] as V | 0) = verticeArray[rowIndex]; 
        }
      });
    });

    console.log(newMatrix, 'newMatrix');
    
    return newMatrix;
  }

  // Поиск в глубину
  DFS(matrix: (V|0)[][], verticeArray: V[]): number[] {
    const visited: number[] = [];

    const vectorIndex = 0;
    this._DFS(matrix, vectorIndex, verticeArray, visited)
    console.log(visited, 'visited final')
    return visited;
  }

  _DFS(matrix: (V | 0)[][], vectorIndex: number, verticeArray: V[], visited: number[]) { 
    matrix[vectorIndex].forEach((child: V | 0) => {
      if (child !== 0) {
        const childIndex = verticeArray.indexOf(child);

        if (!visited.includes(childIndex)) {
          return this._DFS(matrix, childIndex, verticeArray, visited);
        }
      }

      // Ноль всегда в конце
      if (child === 0) {
        const allChildrenVisited = matrix[vectorIndex].every(v => (v !== 0 && visited.includes(verticeArray.indexOf(v))) || v === 0);

        if (allChildrenVisited && !visited.includes(vectorIndex)) {
          visited.push(vectorIndex);               
          return visited;
        }
      }
    })
  }

  main(): V[][] {
    // Меняем направления дуг в векторной матрице
    const reverseMatrix = this.revertMatrix();
    const matrix = this.adjacencyVector.getMatrix();
    const verticeArray = this.adjacencyVector.getVerticeArray();

    const newSearchOrder: number[] = this.DFS(reverseMatrix, verticeArray);

    return this.getStronglyConnectedComponents(newSearchOrder, matrix, verticeArray);

    // const surprise = this.DFS(matrix, newOrderArray);

    // Делаем поиск в глубину
    // const searchOrder = this.DFS(reverseMatrix, verticeArray);

    // Повторяем поиск в глубину в указанном порядке
  }

  getStronglyConnectedComponents(searchOrder: number[], matrix: (V|0)[][], verticeArray: V[]): V[][] {
    const stronglyConnectedComponents = [];
    searchOrder = searchOrder.reverse();
    console.log(searchOrder, 'searchOrder');
    
    
    searchOrder.forEach(order => {
      // Начальный пункт, в который мы должны вернуться, если компонент связный
      // const startIndex = order;

      // matrix[order].forEach(v => {
      //   if (v === 0) return;

      //   const verticeIndex = verticeArray.indexOf(v);
      //   matrix[]
      // })
      const visited: number[] = [];
      this._DFS(matrix, order, verticeArray, visited);

      // Одна вершина не может быть связанной
      if (visited.length > 1) {
        const visitedVertices = visited.map(v => verticeArray[v]);
        stronglyConnectedComponents.push(visitedVertices);
      }
    });

    console.log(stronglyConnectedComponents, 'stronglyConnectedComponents')

    return stronglyConnectedComponents;
  }

  // _getStronglyConnectedComponents(startIndex: number, matrix: (V|0)[][])
}

const algo = new Kosaraju(graph);
// algo.revertMatrix();
algo.main();
