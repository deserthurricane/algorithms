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

    const newMatrix = [...matrix];

    matrix.forEach((vector, vectorIndex) => {
      vector.forEach((v: V | 0, index) => {
        // Найден вектор, надо поменять его направление
        if (v !== 0) {
          const vIndex = verticeArray.indexOf(v); // куда сейчас указывает вектор
          newMatrix[vectorIndex][index] = 0; // обнуляем значение истока
          newMatrix[vIndex] = newMatrix[vIndex];

          const firstZeroIndex = newMatrix[vIndex].indexOf(0); // первый нулевой элемент матрицы, доступный для заполнения
          newMatrix[vIndex][firstZeroIndex] = verticeArray[vectorIndex]; 
        }
      });
    });

    console.log(newMatrix, 'newMatrix');
    
    return newMatrix;
  }

  // Поиск в глубину
  DFS(matrix: (V|0)[][], verticeArray: V[]) {
    const visited = [];

    // для каждого ряда в матрице
    // matrix.forEach((_, vectorIndex) => {
    //   console.log(vectorIndex, 'vectorIndex');
    //   if (!visited.includes(verticeArray[vectorIndex])) {
        const vectorIndex = 0;
        this._DFS(matrix, vectorIndex, verticeArray, visited)
      // }
    // });
    console.log(visited, 'visited final')
    return visited;
  }

  _DFS(matrix: (V | 0)[][], vectorIndex: number, verticeArray: V[], visited: V[]) {  
    console.log(visited, 'visited');

    // if (visited.includes('B' as any) && visited.includes('C' as any) && visited.includes('D' as any)) {
    //   console.log(matrix[vectorIndex], 'matrix[vectorIndex] AAA')
    // }
      
    // const allChildrenVisited = matrix[vectorIndex].every(v => (v !== 0 && visited.includes(v)) || v === 0);

    // if (allChildrenVisited && !visited.includes(verticeArray[vectorIndex])) {      
    //   return visited.push(verticeArray[vectorIndex]);
    // }

    matrix[vectorIndex].forEach((child: V | 0) => {
      // взаимозаменяемо с условием из this.DSF
      if (child !== 0 && !visited.includes(child)) {
        const childIndex = verticeArray.indexOf(child);
        console.log(verticeArray[childIndex], 'verticeArray[childIndex]');
        
        return this._DFS(matrix, childIndex, verticeArray, visited);
      }

      // Ноль всегда в конце
      if (child === 0) {
        const allChildrenVisited = matrix[vectorIndex].every(v => (v !== 0 && visited.includes(v)) || v === 0);

        if (allChildrenVisited && !visited.includes(verticeArray[vectorIndex])) {      
          return visited.push(verticeArray[vectorIndex]);
        }
      }
    })
  }

  main() {
    // Меняем направления дуг в векторной матрице
    const reverseMatrix = this.revertMatrix();
    const matrix = this.adjacencyVector.getMatrix();
    const verticeArray = this.adjacencyVector.getVerticeArray();

    const newOrderArray = this.DFS(reverseMatrix, verticeArray);

    // const surprise = this.DFS(matrix, newOrderArray);

    // Делаем поиск в глубину
    // const searchOrder = this.DFS(reverseMatrix, verticeArray);

    // Повторяем поиск в глубину в указанном порядке
  }
}

const algo = new Kosaraju(graph);
// algo.revertMatrix();
algo.main();
