export class RadixMaxSort {
  array: string[];
  radix: number;
  
  main(array, radix = 16) {
    this.array = array;

    // Проходимся по всем разрядам, начиная с младшего
    // for (let r = radix-1; r >= 0; r--) {
      this.sortByRadix();
    // }
    console.log(this.array, 'sortedArray');
    console.log(this.array[this.array.length - 1], 'last of sortedArray');

    // console.log(this.array[Math.floor(this.array.length / 2)], 'mid of sortedArray');

    return this.array;
  }

  sortByRadix() {
    /**
     * В объекте строковые ключи сортируются по возрастанию автоматически
     * - получаем объект с отсортированными значениями от 0 до 9
     */ 
    let radixValueCountMap = {};

    for (let i = this.array.length - 1; i >= 0; i--) {
      const radixKey = this.array[i];
      const radixValue = radixValueCountMap[radixKey];

      if (radixValueCountMap.hasOwnProperty(radixKey)) {
        radixValueCountMap[radixKey] = radixValue + 1;
      } else {
        radixValueCountMap[radixKey] = 1;
      }
    }

    const sortedKeys = Object.keys(radixValueCountMap).sort((a,b) => a > b ? 1 : -1);
    const sortedKeysMap = {};
    sortedKeys.forEach(key => {
      sortedKeysMap[key] = radixValueCountMap[key];
    });

    let currentCount = 0;

    Object.keys(sortedKeysMap).forEach(key => {
      currentCount += sortedKeysMap[key];
      sortedKeysMap[key] = currentCount;
    })

    // let currentCountArray = [];

    // for (let i = this.array.length - 1; i >= 0; i--) {
    //   const radixKey = this.array[i];
    //   const radixValue = currentCountArray[radixKey];

    //   if (radixValue != undefined) {
    //     currentCountArray[radixKey] = radixValue + 1;
    //   } else {
    //     currentCountArray[radixKey] = 0;
    //   }
    // }

    const m = new Array(this.array.length);

    for (let i = this.array.length - 1; i >= 0; i--) {      
      const radixKey = this.array[i];

      // Уменьшаем текущий индекс на 1 и присваиваем в него значение из исходного массива
      m[--sortedKeysMap[radixKey]] = this.array[i];

    }

    // Обновляем исходный массив по текущему разряду
    this.array = m;
  }
}

// new RadixSort().main(['301', '123', '202', '202', '103', '231'], 3);