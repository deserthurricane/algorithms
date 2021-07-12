/**
 * Представление графа в виде матрицы смежности
 */
export class AdjacencyMatrix<V> {
  protected verticeArray: V[] = []; // храним индексы всех вершин в порядке их добавления в граф
  protected matrix: Array<1 | 0>[] = []; // 2D матрица

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
    return this.matrix;
  }

  // максимальная возможная степень вершины = количество всех добавленных вершин
  protected _getMaxPower() {
    return this.verticeArray.length - 1;
  }

  // После добавления новой вершины добавляем дефолтные нулевые значения для последнего столбца всех вершин
  protected _fillWithZero() {
    const maxPower = this._getMaxPower();
    this.matrix.forEach((vector: Array<1 | 0>) => {
      vector[maxPower] = 0;
    });

    // Добавляем ноль в последнюю колонку каждого вектора
    for (let i = 0; i <= this.matrix.length - 1; i++) {
      this.matrix[i][this.matrix[i].length - 1] = 0;
    }

    // Заполняем нулями вектор нового элемента
    for (let i = 0; i <= maxPower; i++) {
      this.matrix[this.matrix.length - 1][i] = 0;
    }
  }

  /**
   * Добавление новой вершины
   * @param newVertice 
   */
  public addVertice(newVertice: V) {
    // Проверка на существующее значение. Не храним дубликаты
    const index = this.verticeArray.findIndex((v) => v === newVertice);
    const newVerticeIndex = index >= 0 ? index : this.verticeArray.length; 
    
    this.verticeArray[newVerticeIndex] = newVertice;
    this.matrix[newVerticeIndex] = [];
    
    if (newVerticeIndex === this.verticeArray.length - 1) {
      this._fillWithZero();
    }
  }

  // Добавление нового ребра
  public addEdge(start: V, end: V) {
    const startIndex: number = this.verticeArray.indexOf(start);
    const endIndex: number = this.verticeArray.indexOf(end);
    this.matrix[startIndex][endIndex] = 1;
  }

  public printMatrix() {
    return console.log(this.matrix);
  }

  public printVerticeArray() {
    return console.log(this.verticeArray);
  }
}

export const graph = new AdjacencyMatrix();
// test 1
graph.addVertice('V1'); // 0
graph.addVertice('V2'); // 1
graph.addVertice('V3'); // 2
graph.addVertice('V4'); // 3
graph.addVertice('V5'); // 4
graph.addVertice('V6'); // 5
graph.addVertice('V7'); // 6
graph.addVertice('V8'); // 7
graph.addVertice('V9'); // 8
graph.addVertice('V10'); // 9
graph.addVertice('V11'); // 10
graph.addVertice('V12'); // 11
graph.addVertice('V13'); // 12
graph.addVertice('V14'); // 13

// graph.printVerticeArray();

graph.addEdge('V5', 'V9');
graph.addEdge('V5', 'V3');
graph.addEdge('V5', 'V10');

graph.addEdge('V8', 'V4');
graph.addEdge('V8', 'V6');
graph.addEdge('V8', 'V14');
graph.addEdge('V8', 'V2');

graph.addEdge('V9', 'V1');
graph.addEdge('V9', 'V7');

graph.addEdge('V2', 'V13');

graph.addEdge('V10', 'V1');
graph.addEdge('V10', 'V14');
graph.addEdge('V10', 'V12');

graph.addEdge('V1', 'V3');
graph.addEdge('V1', 'V13');

graph.addEdge('V7', 'V6');

graph.addEdge('V14', 'V11');

graph.addEdge('V6', 'V4');
graph.addEdge('V6', 'V11');
graph.addEdge('V6', 'V13');
graph.addEdge('V6', 'V12');

graph.addEdge('V4', 'V3');

graph.addEdge('V11', 'V3');

graph.addEdge('V13', 'V3');

// graph.printMatrix();
