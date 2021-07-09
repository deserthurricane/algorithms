import { graph, AdjacencyMatrix } from './AdjacencyMatrix';

/**
 * Алгоритм топологической сортировки Демукрона по полустепени заходов в вершину
 */
class Demukron<V> {
  verticeArray: V[];
  adjacencyMatrix: (0 | 1)[][];

  constructor(graph: AdjacencyMatrix<V>) {
    this.verticeArray = graph.getVerticeArray();
    this.adjacencyMatrix = graph.getMatrix();
  }

  main() {
    const topologicMatrix: number[][] = [];
    const sums = [];

    for (let i = 0; i < this.verticeArray.length; i++) {
      for (let j = 0; j < this.verticeArray.length; j++) {
        sums[i] = (sums[i] || 0) + this.adjacencyMatrix[j][i];
      }
    }

    let level = 0;
    
    outer: while (level < this.verticeArray.length) {
      let foundIndex: number[] = [];

      for (let i = 0; i < sums.length; i++) {
        if (sums[i] === 0) {
          foundIndex.push(i);
          sums[i] = null;
        }
      }

      if (foundIndex.length === 0) {
        break outer;
      }
      
      for (let i = 0; i < sums.length; i++) {
        for (let j = 0; j < foundIndex.length; j++) {
          if (sums[i] !== null) {
            sums[i] -= this.adjacencyMatrix[foundIndex[j]][i];
          }
        }
      }

      topologicMatrix[level] = foundIndex;
      level++;
    }

    console.log(level, 'level');
    console.log(topologicMatrix, 'topologicMatrix');

    return topologicMatrix;
  }
}

const algo = new Demukron(graph);
algo.main();