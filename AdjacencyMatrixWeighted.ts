import { AdjacencyMatrix } from "./AdjacencyMatrix";

/**
 * Представление взвешенного неориентированного графа в виде матрицы смежности
 */
export class AdjacencyMatrixWeighted<V> extends AdjacencyMatrix<V> {
  // @ts-ignore
  protected matrix: number[][] = []; // 2D матрица

  constructor() {
    super();
  }

  // Добавление нового ребра с весом
  public addEdge(start: V, end: V, weight?: number) {
    if (weight === undefined) {
      return super.addEdge(start, end);
    }
    const startIndex: number = this.verticeArray.indexOf(start);
    const endIndex: number = this.verticeArray.indexOf(end);
    // для взвешенного неориентированного графа записываем значения для обеих вершин
    this.matrix[startIndex][endIndex] = weight;
    this.matrix[endIndex][startIndex] = weight;
  }
}

export const graph = new AdjacencyMatrixWeighted();
// test 1
graph.addVertice('A'); // 0
graph.addVertice('B'); // 1
graph.addVertice('C'); // 2
graph.addVertice('D'); // 3
graph.addVertice('E'); // 4
graph.addVertice('F'); // 5
graph.addVertice('G'); // 6

// graph.printVerticeArray();

/*** algo Kruskal */
// graph.addEdge('A', 'B', 7);
// graph.addEdge('A', 'D', 5);

// graph.addEdge('B', 'C', 8);
// graph.addEdge('B', 'D', 9);
// graph.addEdge('B', 'E', 7);

// graph.addEdge('C', 'E', 5);

// graph.addEdge('D', 'E', 15);
// graph.addEdge('D', 'F', 6);

// graph.addEdge('E', 'F', 8);
// graph.addEdge('E', 'G', 9);

// graph.addEdge('F', 'G', 11);

/*** algo Dijkstra */
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 3);
graph.addEdge('A', 'D', 6);

graph.addEdge('B', 'C', 4);
graph.addEdge('B', 'E', 9);

graph.addEdge('C', 'D', 1);
graph.addEdge('C', 'E', 7);
graph.addEdge('C', 'F', 6);

graph.addEdge('D', 'F', 4);

graph.addEdge('E', 'F', 1);
graph.addEdge('E', 'G', 5);

graph.addEdge('F', 'G', 8);

// graph.printMatrix();
