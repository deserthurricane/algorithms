import { graph, AdjacencyMatrixWeighted } from "./AdjacencyMatrixWeighted";

class Kruskal<V> {
  verticeArray: V[];
  adjacencyMatrix: number[][];

  constructor(graph: AdjacencyMatrixWeighted<V>) {
    this.verticeArray = graph.getVerticeArray();
    this.adjacencyMatrix = graph.getMatrix();
  }

  main(): UnionFind<V>[] {
    // Отсортировать рёбра
    const sortedEdges: UnionFind<V>[] = this._sortEdges();
    console.log(sortedEdges, 'sortedEdges'); 

    // Для каждой вершины проверить, изолир или нет, иначе выполнять поиск вшить/вглубь
    // Если цикла не найдено, добавлять ребро

    // Индексы добавленных вершин
    const addedVertices: Set<number> = new Set();
    // const isolatedVerticesArray: V[] = []; // надо или нет

    // Минимальный скелет графа - набор ребер с весами
    const minSkullGraph: UnionFind<V>[] = [];
    
    outer: for (let i = 0; i < sortedEdges.length; i++) {
      const isV1Added = addedVertices.has(this.verticeArray.indexOf(sortedEdges[i].union[0]));
      const isV2Added = addedVertices.has(this.verticeArray.indexOf(sortedEdges[i].union[1]));

      if (!isV1Added || !isV2Added) {
        minSkullGraph.push(sortedEdges[i]);
      } else {
        // const newVertice = isV1Added ? sortedEdges[i].union[1] : sortedEdges[i].union[0];
        // const newVerticeIndex = this.verticeArray.indexOf(sortedEdges[i].union[0]);
        console.log(sortedEdges[i], 'sortedEdges[i]');
        
        
        const visited: number[] = [];
        this._DFS(this.verticeArray.indexOf(sortedEdges[i].union[0]), visited, minSkullGraph);

        if (i === 5) {
          console.log(addedVertices, 'added')
          console.log(visited, 'visited')
        }

        if (!visited.includes(this.verticeArray.indexOf(sortedEdges[i].union[1]))) {
          // как проверить, что нет цикла?
          // искать ТОЛЬКО среди добавленных вершин
          minSkullGraph.push(sortedEdges[i])
        }
      }

      addedVertices.add(this.verticeArray.indexOf(sortedEdges[i].union[0]));
      addedVertices.add(this.verticeArray.indexOf(sortedEdges[i].union[1]));

      // if (!isV1Checked) {
      //   checkedVertices.push(sortedEdges[i].union[0])
      // }

      if (addedVertices.size === this.verticeArray.length) {
        console.log(i, 'i end of iteration')
        break outer;
      }
    }

    console.log(minSkullGraph, 'minSkullGraph');
    

    return minSkullGraph;
  }

  _sortEdges(): UnionFind<V>[] {
    const edges = this._getEdges();

    return edges.sort((e1, e2) => {
      return e1.weight > e2.weight ? 1 : -1;
    });
  }

  _getEdges(): UnionFind<V>[] {
    const visited: number[] = [];
    const edges: UnionFind<V>[] = [];

    for (let row = 0; row < this.adjacencyMatrix.length; row++) {
      for (let i = 0; i < this.adjacencyMatrix.length; i++) {
        if (this.adjacencyMatrix[row][i] > 0 && !visited.includes(i)) {
          edges.push(new UnionFind(this.verticeArray[row], this.verticeArray[i], this.adjacencyMatrix[row][i]))
        }
      }
      visited.push(row);
    }

    // console.log(edges, 'edges');

    return edges;
  }

  private _DFS(startIndex: number, visited: number[], minSkullGraph: UnionFind<V>[]) {
    // Осуществляем глубокий поиск только среди уже добавленных вершин
    // if (!addedVertices.has(startIndex) || !addedVertices.has(endIndex)) return;

    // const hasAddedEdge = minSkullGraph.find(edge => 
    //   [startIndex, endIndex].includes(this.verticeArray.indexOf(edge.union[0])) 
    //     && [startIndex, endIndex].includes(this.verticeArray.indexOf(edge.union[1]))
    // );

    // if (!hasAddedEdge) return;
    
    visited.push(startIndex);

    this.adjacencyMatrix[startIndex].forEach((child: number, childIndex: number) => {
      if (child !== 0) {
        const hasAddedEdge = minSkullGraph.find(edge => 
          [startIndex, childIndex].includes(this.verticeArray.indexOf(edge.union[0])) 
            && [startIndex, childIndex].includes(this.verticeArray.indexOf(edge.union[1]))
        );

        if (!visited.includes(childIndex) /* && addedVertices.has(childIndex) */ && hasAddedEdge) {
          this._DFS(childIndex, visited, minSkullGraph);
        }
      }
    });
  } 
}


class UnionFind<V> {
  union: [V, V];
  weight: number;

  constructor(V1: V, V2: V, weight) {
    this.union = [V1, V2];
    this.weight = weight;
  }
}

const algo = new Kruskal(graph);
algo.main();