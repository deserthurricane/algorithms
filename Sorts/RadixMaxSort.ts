export class RadixMaxSort {
  array: string[];
  radix: number;
  
  main(array) {
    this.array = array;

    this.sortByRadix();

    // console.log(this.array, 'sortedArray');
    // console.log(this.array[this.array.length - 1], 'last of sortedArray');

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