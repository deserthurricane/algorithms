import { AdjacencyMatrixWeighted, graph } from './AdjacencyMatrixWeighted';

/**
 * Алгоритм Дейкстры 
 * Находит кратчайшие пути от одной из вершин графа до всех остальных
 */
class Dijkstra<V> {
  verticeArray: V[];
  matrix: number[][];

  constructor(graph: AdjacencyMatrixWeighted<V>) {
    this.verticeArray = graph.getVerticeArray();
    this.matrix = graph.getMatrix();
  }

  main(): number[] {
    const start = new VerticeWeight(0, 0); // начальная вершина имеет нулевые индекс и стоимость пути к ней
    const currentWeightVertices = [start]; // массив для хранения вершин с их текущими весами и истоками. важно, чтобы индексы совпадали с this.verticeArray
    const visited: number[] = []; // здесь храним индексы посещенных вершин

    let currentMinWayIndex = 0; // вершина, которую сейчас проверяем

    while (currentMinWayIndex < this.verticeArray.length) {
      for (let i = 0; i < this.verticeArray.length; i++) {
        if (this.matrix[currentMinWayIndex][i] > 0) {
          const curWayWeight = currentWeightVertices[currentMinWayIndex]?.getWeight() ?? 0;

          if (!currentWeightVertices[i]) {
            // Добавляем вершину впервые
            currentWeightVertices[i] = new VerticeWeight(currentMinWayIndex, curWayWeight + this.matrix[currentMinWayIndex][i]);
          } else {
            // Ищем другие пути к вершине и сравниваем с ее текущим весом
            const newWeight = curWayWeight + this.matrix[currentMinWayIndex][i];
         
            if (currentWeightVertices[i].getWeight() > newWeight) {
              // Если есть более "дешевый" вариант - перезаписываем текущий вес и исток
              currentWeightVertices[i].setUnion(currentMinWayIndex, newWeight);
            }
          }
        }        
      }

      visited.push(currentMinWayIndex);
      // Самый важный момент: выбираем следующую вершину - самую "дешевую" из смежных
      currentMinWayIndex = this._getNextVerticeIndex(currentMinWayIndex, currentWeightVertices, visited);
    }

    console.log(visited, 'visited');
    console.log(currentWeightVertices, 'currentWeightVertices');

    const minWay = this._getMinWay(currentWeightVertices);
    console.log(minWay, 'minWay');
    
    return minWay;
  }

  /**
   * Получение индекса следующей смежной вершины с минимальным весом
   */
  _getNextVerticeIndex(currentIndex: number, checkedVertices: VerticeWeight[], visited: number[]): number {
    let minValue;
    let newCurrentIndex = currentIndex + 1;

    for (let i = 0; i < this.verticeArray.length; i++) {
      if (this.matrix[currentIndex][i] !== 0 && !visited.includes(i)) {
        const weight = checkedVertices[i].getWeight();
        if (minValue > weight || !minValue) {
          minValue = weight;
          newCurrentIndex = i;
        }
      }
    }

    return newCurrentIndex;
  }

  /**
   * Получение последовательности прохода по вершинам
   */
  _getMinWay(checkedVertices: VerticeWeight[]): number[] {
    let i = this.verticeArray.length - 1; // начинаем собирать кратчайший путь с последней вершины ("место назначения")
    const minWay = [i];

    while (i > 0) {
      const prevVerticeIndex = checkedVertices[i].getPrevVerticeIndex();
      i = prevVerticeIndex;
      minWay.push(i);
    }
    
    return minWay.reverse();
  }
}

/**
 * Структура для хранения индекса предыдущей вершины
 * и стоимости пути к текущей вершине
 */
class VerticeWeight {
  private union: [number, number];

  constructor(source: number, weight: number) {
    this.setUnion(source, weight);
  }

  public setUnion(source: number, weight: number) {
    this.union = [source, weight];
  }

  public getWeight() {
    return this.union[1];
  }

  public getPrevVerticeIndex() {
    return this.union[0];
  }
}

const algo = new Dijkstra(graph);
algo.main();