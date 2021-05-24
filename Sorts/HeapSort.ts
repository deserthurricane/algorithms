export class HeapSort {
  array;

  constructor(arr: number[]) {
    this.array = [...arr];
  }

  swap(a: number, b: number) {
    const x = this.array[a];
    this.array[a] = this.array[b];
    this.array[b] = x;
  }

  main() {
    // Превращение массива в кучу
    const lastLeafParent = (this.array.length / 2) - 1;
    for (let root = lastLeafParent; root >= 0; root--) {
      this.moveMaxToRoot(root, this.array.length);
    }
    console.log(this.array, 'first sort'); // this.array[0] = MAX

    // Обход по всем элементам массива-кучи
    for (let i = this.array.length - 1; i >= 0; i--) {
      this.swap(0, i);
      this.moveMaxToRoot(0, i);
    }

    console.log(this.array);
    
  }

  moveMaxToRoot(root: number, size: number) {
    let x = root;
    const l = 2 * root + 1;
    const r = 2 * root + 2;

    if (l < size && this.array[l] > this.array[x]) {
      x = l;
    }

    if (r < size && this.array[r] > this.array[x]) {
      x = r;
    }

    if (x == root) {
      return;
    }

    this.swap(x, root);
    this.moveMaxToRoot(x, size);
  }
}

const heapSort = new HeapSort([15, 16, 13, 8, 5, 11, 10, 3, 4, 12, 7, 2, 6, 9, 14, 1]);

heapSort.main();


// [15, 16, 13, 8, 5, 11, 10, 3, 4, 12, 7, 2, 6, 9, 14, 1]
