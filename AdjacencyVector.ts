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

  public addVertice(newVertice: V, incidentVertices?: V[]) {
    const index = this.verticeArray.findIndex((v) => v === newVertice);
    const newVerticeIndex =  index >= 0 ? index : this.verticeArray.length; 
    // console.log(newVerticeIndex, 'newVerticeIndex');
    
    // const newVerticeIndex =  this.verticeArray.length;
    this.verticeArray[newVerticeIndex] = newVertice;
    this.adjacencyMatrix[newVerticeIndex] = this.adjacencyMatrix[newVerticeIndex] || [];

    if (newVerticeIndex === this.verticeArray.length - 1) {
      this._fillWithZero();
    }

    if (!incidentVertices) return;

    incidentVertices.forEach((vertice: V) => {
      // Обновляем вектор инцидентной вершины
      // const incidentVerticeIndex = this.verticeArray.indexOf(vertice);
      // const firstZeroIncidentIndex = this.adjacencyMatrix[incidentVerticeIndex].indexOf(0);      
      // this.adjacencyMatrix[incidentVerticeIndex][firstZeroIncidentIndex] = newVertice;
      
      // Обновляем вектор новой вершины
      const firstZeroIndex = this.adjacencyMatrix[newVerticeIndex].indexOf(0);
      this.adjacencyMatrix[newVerticeIndex][firstZeroIndex] = vertice;
    });
  }

  printMatrix() {
    return console.log(this.adjacencyMatrix);
  }

  printVerticeArray() {
    return console.log(this.verticeArray);
  }
}


/**
 * Граф
 * A <- B
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
export const graph = new AdjacencyVector();
// test 1
graph.addVertice('A');
graph.addVertice('B', ['A']);
graph.addVertice('C', ['A']);
graph.addVertice('B', ['C']);
graph.addVertice('D', ['B']);
graph.addVertice('C', ['D']);

// graph.addVertice('E');
// graph.addVertice('G');
// graph.addVertice('H');
// graph.addVertice('C', ['E']);
// graph.addVertice('E', ['G']);
// graph.addVertice('G', ['H']);
// graph.addVertice('H', ['E']);

// test 2
// graph.addVertice('A'); // 0
// graph.addVertice('B'); // 1
// graph.addVertice('C'); // 2
// graph.addVertice('D'); // 3
// graph.addVertice('E'); // 4
// graph.addVertice('F'); // 5
// graph.addVertice('G'); // 6
// graph.addVertice('H'); // 7

// B H D C E A   // G, F

// graph.addVertice('A', ['B']);
// graph.addVertice('B', ['C']);
// graph.addVertice('B', ['F']);
// graph.addVertice('B', ['E']);
// graph.addVertice('C', ['D']);
// graph.addVertice('C', ['G']);
// graph.addVertice('D', ['C']);
// graph.addVertice('D', ['H']);
// graph.addVertice('E', ['A']);
// graph.addVertice('E', ['F']);
// graph.addVertice('F', ['G']);
// graph.addVertice('G', ['F']);
// graph.addVertice('H', ['D']);
// graph.addVertice('H', ['G']);
graph.printMatrix();
graph.printVerticeArray();

