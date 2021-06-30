export class AdjacencyVector<V> {
  verticeArray: V[] = []; // храним индексы всех вершин в порядке их добавления в граф
  adjacencyMatrix: Array<V | 0>[] = []; // 2D векторная матрица

  /**
   * Граф
   * A - B
   * | \ 
   * C - D
   */
  /**
   * Векторы смежности
   * A B C D
   * B A 0 0
   * C A D 0
   * D A C 0
   */

  // максимальная возможная степень вершины = количество всех добавленных вершин
  private _getMaxPower() {
    return this.verticeArray.length;
  }

  // После добавления новой вершины добавляем дефолтные нулевые значения для последнего столбца всех вершин
  private _fillWithZero() {
    const maxPower = this._getMaxPower();
    this.adjacencyMatrix.forEach((vector: Array<V | 0>) => {
      vector[maxPower] = 0;
    });

  }

  public addVertice(newVertice: V, incidentVertices: V[]) {
    const newVerticeIndex = this.verticeArray.length;
    this.verticeArray[newVerticeIndex] = newVertice;
    this._fillWithZero();
    const maxPower = this._getMaxPower();

    incidentVertices.forEach((vertice: V) => {
      const incidentVerticeIndex = this.verticeArray.findIndex(vertice);

      this.verticeArray[incidentVerticeIndex]

      this.adjacencyMatrix[incidentVerticeIndex][newVerticeIndex] = newVertice;
      this.adjacencyMatrix[newVerticeIndex][maxPower] = newVertice;
    });

      //     this.adjacencyMatrix[incidentVerticeIndex][newVerticeIndex] = newVertice;
      // this.adjacencyMatrix[newVerticeIndex][maxPower] = newVertice;
  }
}

const graph = new AdjacencyVector();
graph.addVertice('A')