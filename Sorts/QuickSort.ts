export class QuickSort {
  array
  
  main(array): any[] {
    this.array = array;
    this.sort(0, this.array.length-1);
    // console.log(this.array, 'sortedArray');
    // console.log(this.array[this.array.length-1], 'last of sortedArray');
    return this.array;
  }
  
  sort(start: number, end: number) {
    // условие выхода - массив, состоящий лишь из одного элемента
    if (start >= end) return;

    // сортируем массив и выбираем новый опорный элемент
    const pivot = this.partition(start, end);
    // сортируем левую часть
    this.sort(start, pivot - 1);
    // сортируем правую часть
    this.sort(pivot + 1, end);
  }

  partition(start, end) {
    // Сравниваем все элементы с последним
    const pivot = this.array[end];

    let newPivot = start - 1;  

    for (let i = start; i <= end; i++) {
      if (this.array[i] <= pivot) {
        newPivot++;
        const temp = this.array[newPivot];
        this.array[newPivot] = this.array[i];
        this.array[i] = temp;
      }
    }

    return newPivot;
  }
}