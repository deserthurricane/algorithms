import { AdjacencyMatrixWeighted, graph } from './AdjacencyMatrixWeighted';
import { AdjacencyMatrix } from './AdjacencyMatrix';

class Dijkstra<V> {
  verticeArray: V[];
  matrix: number[][];

  constructor(graph: AdjacencyMatrixWeighted<V>) {
    this.verticeArray = graph.getVerticeArray();
    this.matrix = graph.getMatrix();
  }

  main(): VerticeWeight[] {
    const start = new VerticeWeight(0, 0);
    const minWay: VerticeWeight[] = [start];
    const checkedVertices = [start];
    const visited: number[] = [];

    let currentMinIndex = 0;

    // как понять, что мы полностью проверили вершину?

    while (currentMinIndex < this.verticeArray.length) {
      // visited.push(currentMinIndex);
      // console.log('hi');
      
      for (let i = 0; i < this.verticeArray.length; i++) {
        // Если вершины смежные
        if (this.matrix[currentMinIndex][i] > 0) {
          const curWayWeight = checkedVertices[currentMinIndex]?.getWeight() ?? 0;

          if (!checkedVertices[i]) {
            // Как вернуться назад? Как сделать ссылку? Запустить рекурсивно?
            if (currentMinIndex === 4 && i === 6) {
              console.log(this.matrix[currentMinIndex][i], 'E - g');
              console.log(curWayWeight, 'curWayWeight');
              
            } 
            checkedVertices[i] = new VerticeWeight(currentMinIndex, curWayWeight + this.matrix[currentMinIndex][i]);
          } else {
            // const curWayWeight = checkedVertices[currentMinIndex].getWeight();
            const newWeight = curWayWeight + this.matrix[currentMinIndex][i];
            if (currentMinIndex === 4 && i === 6) {
              console.log(this.matrix[currentMinIndex][i], 'E - g');
            }          
            if (checkedVertices[i].getWeight() > newWeight) {
              checkedVertices[i].setUnion(currentMinIndex, newWeight);
            }
          }
        }        
      }

      // if (currentMinIndex === 4) {
      //   console.log(checkedVertices, 'checkedVertices');
      // }

      // let minValue;
      // let newCurrentIndex = currentMinIndex + 1; 
    
      // for (let i = 0; i < this.verticeArray.length; i++) {
      //   if (this.matrix[currentMinIndex][i] !== 0) {
      //     const weight = checkedVertices[i].getWeight();
      //     if ((minValue > weight && !visited.includes(i) ) || !minValue) {
      //       minValue = weight;
      //       newCurrentIndex = checkedVertices[i].getVerticeIndex();
      //     }
      //   }
      // }

      // currentMinIndex = newCurrentIndex;
          currentMinIndex++;
    }

    // console.log(currentMinIndex, 'currentMinIndex');
    console.log(checkedVertices, 'checkedVertices');

    return minWay;
  }
}

class VerticeWeight {
  // индекс вершины, из которой мы пришли, и стоимость пути
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

  public getVerticeIndex() {
    return this.union[0];
  }
}

const algo = new Dijkstra(graph);
algo.main();