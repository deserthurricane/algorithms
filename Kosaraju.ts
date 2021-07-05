import { AdjacencyVector, graph } from './AdjacencyVector';

class Kosaraju<V> {
  adjacencyVector: AdjacencyVector<V>;

  constructor(adjacencyVector: AdjacencyVector<V>) {
    this.adjacencyVector = adjacencyVector;
  }
  //  0  1  2  3
  // [A, B, C, D]
  /**
   * Векторы смежности (ориентированные)
   * 0 - 0 0 0 0
   * 1 - A 0 0 0
   * 2 - A 0 0 0
   * 3 - A C 0 0
   */
  /**
   * Векторы смежности (ориентированные, reverted)
   * 0 - B C D 0  AB, AC, AD
   * 1 - 0 0 0 0  -
   * 2 - D 0 0 0  CD
   * 3 - 0 0 0 0  -
   */
  revertMatrix() {
    const verticeArray = this.adjacencyVector.getVerticeArray();
    const matrix = this.adjacencyVector.getMatrix();
  //   const matrix =   [[
  //   'B', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'C', 'F', 'E', 0,
  //   0,   0,   0,   0
  // ],
  // [
  //   'D', 'G', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'C', 'H', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'A', 'F', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'G', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'F', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'D', 'G', 0, 0,
  //   0,   0, 0, 0
  // ]];

    const newMatrix = AdjacencyVector.createEmptyMatrix(verticeArray.length);

    matrix.forEach((row, rowIndex) => {
      // @ts-ignore
      row.forEach((v: V | 0, index) => {
        // Найден вектор, надо поменять его направление
        if (v !== 0) {
          const vIndex = verticeArray.indexOf(v); // куда сейчас указывает вектор

          const firstZeroIndex = newMatrix[vIndex].indexOf(0); // первый нулевой элемент матрицы, доступный для заполнения
          (newMatrix[vIndex][firstZeroIndex] as V | 0) = verticeArray[rowIndex]; 
        }
      });
    });

    console.log(newMatrix, 'newMatrix');
    
    return newMatrix;
  }

  // Поиск в глубину
  DFS(matrix: (V|0)[][], verticeArray: V[]): number[] {
    const visited: number[] = [];
    const checked = [];
    console.log(verticeArray, 'verticeArray');

    let vectorIndex = 0;

    while (vectorIndex < verticeArray.length) {
      if (!checked.includes(vectorIndex)) {
        this._DFS2(matrix, vectorIndex, verticeArray, visited, checked)
      }
      vectorIndex++;
    }
    console.log(checked, 'checked final')
    return checked;
  }


  main() {
    // Меняем направления дуг в векторной матрице
    const reverseMatrix = this.revertMatrix();
    const matrix = this.adjacencyVector.getMatrix();
  //   const matrix =   [[
  //   'B', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'C', 'F', 'E', 0,
  //   0,   0,   0,   0
  // ],
  // [
  //   'D', 'G', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'C', 'H', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'A', 'F', 0, 0,
  //   0,   0,   0, 0
  // ],
  // [
  //   'G', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'F', 0, 0, 0,
  //   0,   0, 0, 0
  // ],
  // [
  //   'D', 'G', 0, 0,
  //   0,   0, 0, 0
  // ]] as (0 | V)[][];

    const verticeArray = this.adjacencyVector.getVerticeArray();
    
    const newSearchOrder: number[] = this.DFS(reverseMatrix, verticeArray).reverse();
    console.log(newSearchOrder, 'newSearchOrder');

    return this.getStronglyConnectedComponents(newSearchOrder, matrix, verticeArray);
  }

  getStronglyConnectedComponents(searchOrder: number[], matrix: (V|0)[][], verticeArray: V[]): number[][] {
    const stronglyConnectedComponents: number[][] = [];
    
    let checked = [];
    
    searchOrder.forEach(order => {
      console.log(order, 'order');
      console.log(checked, 'checked');
      let visited: number[] = [];

      
      this._DFS3(matrix, order, verticeArray, visited, checked);

      // if (visited.length === 1) {
      //   return checked.push(visited[0]);
      // }

      // Одна вершина не может быть связанной
      if (visited.length > 1) {
        // Обновляем список связанных компонентов  
        stronglyConnectedComponents.push(visited);
      }

      checked = checked.concat(visited)

      // visited.forEach(index => checked.push(index));
    });

    console.log(stronglyConnectedComponents, 'stronglyConnectedComponents')

    return stronglyConnectedComponents;
  }

  _DFS3(matrix: (V | 0)[][], vectorIndex: number, verticeArray: V[], visited: number[], checked: number[]) {
    visited.push(vectorIndex);
    
    matrix[vectorIndex].forEach((child: V | 0) => {
      if (child !== 0) {
        const childIndex = verticeArray.indexOf(child);

        if (!visited.includes(childIndex) && !checked.includes(childIndex)) {
          return this._DFS3(matrix, childIndex, verticeArray, visited, checked);
        }
      }
    })
  }

  _DFS2(matrix: (V | 0)[][], vectorIndex: number, verticeArray: V[], visited: number[], checked: number[]) {
    visited.push(vectorIndex);

    console.log(vectorIndex, 'vectorIndex');
    
    
    matrix[vectorIndex].forEach((child: V | 0) => {
      console.log(matrix[vectorIndex], 'matrix[vectorIndex]');
      console.log(child, ' child');
      
      
      if (child !== 0) {
        const childIndex = verticeArray.indexOf(child);

        if (!visited.includes(childIndex)) {
          this._DFS2(matrix, childIndex, verticeArray, visited, checked);
        }
      }
    })

    checked.push(vectorIndex)
  }


  _DFS1(matrix: (V | 0)[][], vectorIndex: number, verticeArray: V[], visited: number[]) {
    // console.log(visited, 'visited');
    
    visited.push(vectorIndex);

    matrix[vectorIndex].forEach((child: V | 0) => {
      if (child !== 0) {
        const childIndex = verticeArray.indexOf(child);

        if (!visited.includes(childIndex)) {
          return this._DFS1(matrix, childIndex, verticeArray, visited);
        }
      }

      // Ноль всегда в конце
      // if (child === 0) {
      //   const allChildrenVisited = matrix[vectorIndex].every(v => (v !== 0 && visited.includes(verticeArray.indexOf(v))) || v === 0);

      //   if (allChildrenVisited && !visited.includes(vectorIndex)) {
      //     visited.push(vectorIndex);               
      //     return visited;
      //   }
      // }
    })
    
                   

  }

  test(searchOrder: number[], matrix: (V|0)[][], verticeArray: V[]) {
    let components = [];
    let stack = searchOrder.reverse();
    let seen = [];
    let dfs = [];

    /** second dfs */
		while (stack.length !== 0) {
			const curr = stack.pop();
			if (!seen.includes(curr)) {
				dfs.push(curr);

				let set = [];
				while (dfs.length !== 0) {
					const next = dfs.pop();
					if (!seen.includes(next)) {
            seen.push(next)
						set.push(next);
            if (matrix[next]) {
              matrix[next].forEach(child => {
                dfs.push(child);
              })
            }
					}
				}
				components.push(set);
			}

		}
    console.log(components, 'components');
    
		return components;
  }

  // _DFSUtil(matrix, index, visited) {
  //   visited.push(index);

  //   let i = 0;

  //   while (i < matrix.length - 1) {
  //     i++;
  //     if (!visited.includes(i)) {
  //       this._DFSUtil(matrix, i, visited)
  //     }
  //   }
  // }
}

const algo = new Kosaraju(graph);
// algo.revertMatrix();
algo.main();
