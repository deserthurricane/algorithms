/**
 * Построить сарай на максимально свободном квадратном участке "двора"
 * Кубическая сложность
 */
class BarnN3 {
  // Матрица, обозначающая "двор"
  yard: Array<Array<0 | 1>>;
  heights: number[] = [];

  constructor(yard: Array<Array<0 | 1>>) {
    this.yard = yard;
  }

  public getMaxSquare() {
    let maxSquare = 0;

    for (let y = 0; y < this.yard.length; y++) {
      this.getHeights(y);

      for (let x = 0; x < this.yard.length; x++) {
        const square = this.getSquareAt(x, y);

        if (maxSquare < square) {
          maxSquare = square;
        }
      }
    }

    console.log(maxSquare, 'maxSquare final');
    
    return maxSquare;
  }

  private getSquareAt(x: number, y: number): number {
    let minHeight = this.yard.length;
    let maxSquare = 0;

    for (let width = 1; width + x - 1 < this.yard.length; width++) {
      const height = this.heights[x + width - 1];
      console.log(x, 'x');
      console.log(y, 'y');
      console.log(width, 'width');
      console.log(height, 'height');
      
      if (minHeight === 0) break;

      if (minHeight > height) {
        minHeight = height;
      }

      const square = width * minHeight;

      if (maxSquare < square) {
        maxSquare = square;
      }
    }
    console.log(maxSquare, x, y, 'maxSquare for each X');
    
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
}

const yard3: Array<Array<0 | 1>> = [
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

const barn3 = new BarnN3(yard3);
barn3.getMaxSquare();