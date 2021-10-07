/**
 * Построить сарай на максимально свободном квадратном участке "двора"
 */
 class BarnN2 {
  // Матрица, обозначающая "двор"
  yard: Array<Array<0 | 1>>;
  heights: number[] = [];
  L: number[] = [];
  R: number[] = [];

  constructor(yard: Array<Array<0 | 1>>) {
    this.yard = yard;
  }

  public getMaxSquare() {
    let maxSquare = 0;

    for (let y = 0; y < this.yard.length; y++) {
      this.getHeights(y);

      /** Вычисляем правые и левые границы максимальной ширины элементов для максимальной высоты */
      this.getRights();
      this.getLefts();

      for (let x = 0; x < this.yard.length; x++) {
        const height = this.heights[x];
        const width = this.R[x] - this.L[x] + 1;
        const square = height * width;
        
        if (maxSquare < square) {
          maxSquare = square;
        }
      }
    }

    console.log(maxSquare, 'maxSquare final');
    
    return maxSquare;
  }

  private getHeights(y: number) {
    for (let x = 0; x < this.yard.length; x++) {
      // Поменяла местами x и y, так как y - это ряд, а x - позиция внутри ряда
      if (this.yard[y][x] === 0) {
        this.heights[x] = (this.heights[x] || 0) + 1;
      } else {
        this.heights[x] = 0;
      }
    }
  }

  private getRights() {
    const stack = [];

    for (let x = 0; x < this.yard.length; x++) {
      while (stack.length > 0) {
        if (this.heights[stack[stack.length - 1]] > this.heights[x]) {
          this.R[stack.pop()] = x - 1;
        } else {
          break;
        }
      }

      stack.push(x);
    }

    while (stack.length > 0) {
      this.R[stack.pop()] = this.yard.length - 1;
    }
  }

  private getLefts() {
    const stack = [];

    for (let x = this.yard.length - 1; x >= 0; x--) {
      while (stack.length > 0) {
        if (this.heights[stack[stack.length - 1]] > this.heights[x]) {
          this.L[stack.pop()] = x + 1;
        } else {
          break;
        }
      }

      stack.push(x);
    }

    while (stack.length > 0) {
      this.L[stack.pop()] = 0;
    }
  }
}

const yard2: Array<Array<0 | 1>> = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// const yard: Array<Array<0 | 1>> = [
//   [0, 0, 0, 0, ],
//   [0, 0, 0, 1, ],
//   [1, 0, 0, 0, ],
//   [0, 0, 0, 1,],
// ];
// const yard: Array<Array<0 | 1>> = [
//   [0, 0, ],
//   [0, 1,  ],
// ];

const barn2 = new BarnN2(yard2);
barn2.getMaxSquare();