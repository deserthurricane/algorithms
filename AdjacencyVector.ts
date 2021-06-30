/**
 * Представление графа в виде вектора смежности
 */
export class AdjacencyVector<V> {
  private verticeArray: V[] = []; // храним индексы всех вершин в порядке их добавления в граф
  private adjacencyMatrix: Array<V | 0>[] = []; // 2D векторная матрица

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
    const newVerticeIndex = this.verticeArray.length;
    this.verticeArray[newVerticeIndex] = newVertice;
    this.adjacencyMatrix[newVerticeIndex] = [];

    this._fillWithZero();

    if (!incidentVertices) return;

    incidentVertices.forEach((vertice: V) => {
      // Обновляем вектор инцидентной вершины
      const incidentVerticeIndex = this.verticeArray.indexOf(vertice);
      const firstZeroIncidentIndex = this.adjacencyMatrix[incidentVerticeIndex].indexOf(0);      
      this.adjacencyMatrix[incidentVerticeIndex][firstZeroIncidentIndex] = newVertice;
      
      // Обновляем вектор новой вершины
      const firstZeroIndex = this.adjacencyMatrix[newVerticeIndex].indexOf(0);
      this.adjacencyMatrix[newVerticeIndex][firstZeroIndex] = vertice;
    });
  }

  printMatrix() {
    return console.log(this.adjacencyMatrix);
  }
}


/**
 * Граф
 * A - B
 * | \ 
 * C - D
 */
/**
 * Векторы смежности
 * 0 - B C D 0
 * 1 - A 0 0 0
 * 2 - A D 0 0
 * 3 - A C 0 0
 */
const graph = new AdjacencyVector();
graph.addVertice('A');
graph.addVertice('B', ['A']);
graph.addVertice('C', ['A']);
graph.addVertice('D', ['A', 'C']);
graph.printMatrix();

