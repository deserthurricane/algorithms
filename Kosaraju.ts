import { AdjacencyVector, graph } from './AdjacencyVector';

/**
 * Алгоритм Косарайю - поиск сильно связанных компонентов в орграфе
 */
class Kosaraju<V> {
  adjacencyVector: AdjacencyVector<V>;

  constructor(adjacencyVector: AdjacencyVector<V>) {
    this.adjacencyVector = adjacencyVector;
  }

  /**
   * Утилита для обращения дуг графа
   */
  private revertMatrix() {
    const verticeArray = this.adjacencyVector.getVerticeArray();
    const matrix = this.adjacencyVector.getMatrix();

    const newMatrix = AdjacencyVector.createEmptyMatrix(verticeArray.length);

    matrix.forEach((row, rowIndex) => {
      row.forEach((v: V | 0) => {
        // Найден вектор, надо поменять его направление
        if (v !== 0) {
          const vIndex = verticeArray.indexOf(v); // куда сейчас указывает вектор

          const firstZeroIndex = newMatrix[vIndex].indexOf(0); // первый нулевой элемент матрицы, доступный для заполнения
          (newMatrix[vIndex][firstZeroIndex] as V | 0) = verticeArray[rowIndex]; 
        }
      });
    });
    
    return newMatrix;
  }

  /**  
   * Метод выполнения первого поиска в глубину
   */
  private _DFS(matrix: (V|0)[][], verticeArray: V[]): number[] {
    const visited: number[] = [];
    const checked = [];

    let rowIndex = 0;

    while (rowIndex < verticeArray.length) {
      if (!checked.includes(rowIndex)) {
        this._firstDFS(matrix, rowIndex, verticeArray, visited, checked)
      }
      rowIndex++;
    }

    return checked;
  }

  /**
   * Метод получения списка сильно связанных компонентов
   */
  private _getStronglyConnectedComponents(searchOrder: number[], matrix: (V|0)[][], verticeArray: V[]): number[][] {
    // Индексы вершин сильно связанных компонентов
    const components: number[][] = [];
    
    // Все проверенные вершины
    let checked = [];
    
    searchOrder.forEach(verticeIndex => {
      // Текущий список проверенных вершин, начиная от исходной
      let visited: number[] = [];

      this._secondDFS(matrix, verticeIndex, verticeArray, visited, checked);

      // Одна вершина не может быть связанной
      if (visited.length > 1) {
        // Обновляем список связанных компонентов  
        components.push(visited);
      }

      // Отмечаем как проверенные все добавленные сильно связанные компоненты
      checked = checked.concat(visited)
    });

    return components;
  }

  /**
   * Утилита для выполнения поиска в глубину на инвертированном графе
   * Мутирует visited и checked
   */
  private _firstDFS(matrix: (V | 0)[][], verticeIndex: number, verticeArray: V[], visited: number[], checked: number[]) {
    visited.push(verticeIndex);

    matrix[verticeIndex].forEach((child: V | 0) => {
      if (child !== 0) {
        const childIndex = verticeArray.indexOf(child);

        if (!visited.includes(childIndex)) {
          this._firstDFS(matrix, childIndex, verticeArray, visited, checked);
        }
      }
    });

    checked.push(verticeIndex);
  }

  /**
   * Утилита поиска сильно связанных компонентов на исходном графе (также поиск в глубину)
   * Мутирует visited
   */
  private _secondDFS(matrix: (V | 0)[][], vectorIndex: number, verticeArray: V[], visited: number[], checked: number[]) {
    visited.push(vectorIndex);
    
    matrix[vectorIndex].forEach((child: V | 0) => {
      if (child !== 0) {
        const childIndex = verticeArray.indexOf(child);

        if (!visited.includes(childIndex) && !checked.includes(childIndex)) {
          return this._secondDFS(matrix, childIndex, verticeArray, visited, checked);
        }
      }
    });
  }

  /**
   * Метод для выполнения алгоритма
   */
  main(): number[][] {
    // Меняем направления дуг в векторной матрице
    const reverseMatrix = this.revertMatrix();
    const verticeArray = this.adjacencyVector.getVerticeArray();
    
    // Определяем порядок выхода из вершин
    const newSearchOrder: number[] = this._DFS(reverseMatrix, verticeArray).reverse();
    console.log(newSearchOrder, 'newSearchOrder');

    const matrix = this.adjacencyVector.getMatrix();
    // Получаем список сильно связанных компонентов
    const components = this._getStronglyConnectedComponents(newSearchOrder, matrix, verticeArray);
    
    console.log(components, 'components');
    return components;
  }
}

const algo = new Kosaraju(graph);
algo.main();