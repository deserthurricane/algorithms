export class RadixSort {
  array: string[];
  radix: number;
  
  main(array, radix = 16) {
    this.array = array;

    // Проходимся по всем разрядам, начиная с младшего
    for (let r = radix-1; r >= 0; r--) {
      this.sortByRadix(r);
    }
    console.log(this.array, 'sortedArray');
    console.log(this.array[this.array.length - 1], 'last of sortedArray');
    return this.array;
  }

  sortByRadix(radix) {
    /**
     * В объекте строковые ключи сортируются по возрастанию автоматически
     * - получаем объект с отсортированными значениями от 0 до 9
     */ 
    let radixValueCountMap = {};

    for (let i = this.array.length - 1; i >= 0; i--) {
      const radixKey = this.array[i][radix];
      const radixValue = radixValueCountMap[radixKey];

      if (radixValueCountMap.hasOwnProperty(radixKey)) {
        radixValueCountMap[radixKey] = radixValue + 1;
      } else {
        radixValueCountMap[radixKey] = 1;
      }
    }

    let currentCount = 0;

    Object.keys(radixValueCountMap).forEach(key => {
      currentCount += radixValueCountMap[key];
      radixValueCountMap[key] = currentCount;
    })

    const m = new Array(this.array.length);

    for (let i = this.array.length - 1; i >= 0; i--) {      
      const radixKey = this.array[i][radix];

      // Уменьшаем текущий индекс на 1 и присваиваем в него значение из исходного массива
      m[--radixValueCountMap[radixKey]] = this.array[i];

    }

    // Обновляем исходный массив по текущему разряду
    this.array = m;
  }
}

// new RadixSort().main(['301', '123', '202', '202', '103', '231'], 3);