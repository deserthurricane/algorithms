import { graph, AdjacencyMatrixWeighted } from "./AdjacencyMatrixWeighted";

/**
 * Алгоритм Краскала - поиск в неориентированном взвешенном графе 
 * минимального скелета (минимального остовного дерева)
 */
class Kruskal<V> {
  verticeArray: V[];
  adjacencyMatrix: number[][];

  constructor(graph: AdjacencyMatrixWeighted<V>) {
    this.verticeArray = graph.getVerticeArray();
    this.adjacencyMatrix = graph.getMatrix();
  }

  /**
   * Запуск алгоритма Краскала
   */
  main(): UnionFind[] {
    // Отсортировать рёбра
    const sortedEdges: UnionFind[] = this._sortEdges();
    // Построить минимальный скелет графа
    return this._getMinSkullGraph(sortedEdges);
  }

  /**
   * Поиск минимального скелета графа на основе веса рёбер и отсутствия циклов
   * 
   * Для каждой вершины ребра проверить, изолир или нет, иначе выполнять поиск вшить/вглубь
   * Если цикла не найдено, добавлять ребро
   */
  _getMinSkullGraph(sortedEdges: UnionFind[]) {
    // Индексы добавленных в минимальный скелет вершин
    const addedVertices: Set<number> = new Set();

    // Минимальный скелет графа - набор ребер с весами
    const minSkullGraph: UnionFind[] = [];
    
    outer: for (let i = 0; i < sortedEdges.length; i++) {
      const isV1Added = addedVertices.has(sortedEdges[i].union[0]);
      const isV2Added = addedVertices.has(sortedEdges[i].union[1]);

      if (!isV1Added || !isV2Added) {
        // Одна из вершин не использовалась - добавляем ребро с ней в минимальный скелет
        minSkullGraph.push(sortedEdges[i]);
      } else {
        // Если обе вершины уже добавлены в минимальный скелет - проверяем отсутствие циклических ссылок
        const visited: number[] = [];
        this._DFS(sortedEdges[i].union[0], visited, minSkullGraph);

        if (!visited.includes(sortedEdges[i].union[1])) {
          minSkullGraph.push(sortedEdges[i])
        }
      }

      // Добавляем обе вершины, инцидентные текущему ребру
      addedVertices.add(sortedEdges[i].union[0]);
      addedVertices.add(sortedEdges[i].union[1]);

      // Если все вершины графа уже есть в минимальном скелете - выходим из цикла
      if (addedVertices.size === this.verticeArray.length) {
        console.log(i, 'number of search cycles')
        break outer;
      }
    }

    console.log(minSkullGraph, 'minSkullGraph');
    
    return minSkullGraph;
  }

  /**
   * Сортировка ребер по их весу
   */
  _sortEdges(): UnionFind[] {
    const edges = this._getEdges();

    return edges.sort((e1, e2) => {
      return e1.weight > e2.weight ? 1 : -1;
    });
  }

  /**
   * Получение рёбер из "взвешенной" матрицы смежности 
   */
  _getEdges(): UnionFind[] {
    const visited: number[] = [];
    const edges: UnionFind[] = [];

    for (let row = 0; row < this.adjacencyMatrix.length; row++) {
      for (let i = 0; i < this.adjacencyMatrix.length; i++) {
        if (this.adjacencyMatrix[row][i] > 0 && !visited.includes(i)) {
          edges.push(new UnionFind(row, i, this.adjacencyMatrix[row][i]))
        }
      }
      visited.push(row);
    }

    return edges;
  }

  /**
   * Глубокий поиск только по добавленным ребрам
   * @param startIndex 
   * @param visited 
   * @param minSkullGraph 
   */
  private _DFS(startIndex: number, visited: number[], minSkullGraph: UnionFind[]) {
    visited.push(startIndex);

    this.adjacencyMatrix[startIndex].forEach((child: number, childIndex: number) => {
      if (child !== 0) {
        // Проверка, добавлено ли уже в минимальный скелет ребро из проверяемых смежных вершин
        const hasAddedEdge = minSkullGraph.find(edge => 
          [startIndex, childIndex].includes(edge.union[0]) 
            && [startIndex, childIndex].includes(edge.union[1])
        );

        if (!visited.includes(childIndex) && hasAddedEdge) {
          this._DFS(childIndex, visited, minSkullGraph);
        }
      }
    });
  } 
}


/**
 * Структура для хранения информации о ребре графа
 */
class UnionFind {
  union: [number, number];
  weight: number;

  constructor(v1Index: number, v2Index: number, weight: number) {
    this.union = [v1Index, v2Index];
    this.weight = weight;
  }
}

const algo = new Kruskal(graph);
algo.main();