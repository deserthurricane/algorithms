/**
 * Представление графа в виде вектора смежности
 */
export class AdjacencyVector<V> {
  private verticeArray: V[] = []; // храним индексы всех вершин в порядке их добавления в граф
  private adjacencyMatrix: Array<V | 0>[] = []; // 2D векторная матрица

  static createEmptyMatrix(n: number) {
    const matrix = [];
    
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        matrix[i][j] = 0;
      }
    }

    return matrix;
  }

  public getVerticeArray() {
    return this.verticeArray;
  }

  public getMatrix() {
    return this.adjacencyMatrix;
  }

  // максимальная возможная степень вершины = количество всех добавленных вершин
  private _getMaxPower() {
    return this.verticeArray.length - 1;
  }

  // После добавления новой вершины добавляем дефолтные нулевые значения для последнего столбца всех вершин
  private _fillWithZero() {
    const maxPower = this._getMaxPower();
    this.adjacencyMatrix.forEach((vector: Array<V | 0>) => {
      vector[maxPower] = 0;
    });

    // Добавляем ноль в последнюю колонку каждого вектора
    for (let i = 0; i <= this.adjacencyMatrix.length - 1; i++) {
      this.adjacencyMatrix[i][this.adjacencyMatrix[i].length - 1] = 0;
    }

    // Заполняем нулями вектор нового элемента
    for (let i = 0; i <= maxPower; i++) {
      this.adjacencyMatrix[this.adjacencyMatrix.length - 1][i] = 0;
    }
  }
 
  // Добавление новой вершины
  public addVertice(newVertice: V) {
    const index = this.verticeArray.findIndex((v) => v === newVertice);
    const newVerticeIndex =  index >= 0 ? index : this.verticeArray.length; 

    this.verticeArray[newVerticeIndex] = newVertice;
    this.adjacencyMatrix[newVerticeIndex] = this.adjacencyMatrix[newVerticeIndex] || [];

    if (newVerticeIndex === this.verticeArray.length - 1) {
      this._fillWithZero();
    }
  }

  // Добавление нового ребра
  public addEdge(start: V, end: V) {
    const startVerticeIndex = this.verticeArray.indexOf(start);
    const firstZeroIndex = this.adjacencyMatrix[startVerticeIndex].indexOf(0);
    this.adjacencyMatrix[startVerticeIndex][firstZeroIndex] = end;
  }

  printMatrix() {
    return console.log(this.adjacencyMatrix);
  }

  printVerticeArray() {
    return console.log(this.verticeArray);
  }
}


export const graph = new AdjacencyVector();
// test 1
/**
 * Граф
 * A - B
 * | \ 
 * C - D
 */
/**
 * Векторы смежности (неориентированные)
 * 0 - B C D 0
 * 1 - A 0 0 0
 * 2 - A D 0 0
 * 3 - A C 0 0
 */
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
// graph.addVertice('A');
// graph.addVertice('B');
// graph.addVertice('C');
// graph.addVertice('D');

// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('B', 'C');
// graph.addEdge('C', 'D');
// graph.addEdge('D', 'B');


// test 2
graph.addVertice('A'); // 0
graph.addVertice('B'); // 1
graph.addVertice('C'); // 2
graph.addVertice('D'); // 3
graph.addVertice('E'); // 4
graph.addVertice('F'); // 5
graph.addVertice('G'); // 6
graph.addVertice('H'); // 7

// B H D C E A   // G, F

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('B', 'F');
graph.addEdge('B', 'E');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'C');
graph.addEdge('D', 'H');
graph.addEdge('E', 'A');
graph.addEdge('E', 'F');
graph.addEdge('F', 'G');
graph.addEdge('G', 'F');
graph.addEdge('H', 'D');
graph.addEdge('H', 'G');
graph.printMatrix();
graph.printVerticeArray();


//   const matrix =   [[
  //   'B', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'C', 'F', 'E', 0,
  //   0,   0,   0,   0
  // ],
  // [
  //   'D', 'G', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'C', 'H', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'A', 'F', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'G', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'F', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'D', 'G', 0, 0,
  //   0,   0, 0, 0
  // ]];

