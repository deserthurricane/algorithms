/**
 * Построить сарай на максимально свободном квадратном участке "двора"
 */
class Barn {
  // Матрица, обозначающая "двор"
  yard: Array<Array<0 | 1>>;

  constructor(yard: Array<Array<0 | 1>>) {
    this.yard = yard;
  }

  public getMaxSquare() {
    let maxSquare = 0;

    for (let y = 0; y < this.yard.length; y++) {
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
      const height = this.getHeightAt(x + width - 1, y, minHeight);
      // console.log(x, 'x');
      // console.log(y, 'y');
      // console.log(width, 'width');
      // console.log(height, 'height');
      
      if (minHeight === 0) break;

      if (minHeight > height) {
        minHeight = height;
      }

      const square = width * minHeight;

      if (maxSquare < square) {
        maxSquare = square;
      }
    }
    // console.log(maxSquare, x, y, 'maxSquare for each X');
    
    return maxSquare;
  }

  private getHeightAt(x: number, y: number, minHeight: number): number {
    let height = 0;

    while (height < minHeight && this.yard[x][y - height] === 0 && y - height >= 0) {
      height++;
    }

    return height;
  }
}

const yard: Array<Array<0 | 1>> = [
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

const barn = new Barn(yard);
barn.getMaxSquare();