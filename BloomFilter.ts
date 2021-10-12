const chalk = require('chalk');

/**
 * Фильтр Блума
 * Вероятностная структура данных, позволяющая проверять принадлежность элемента к множеству
 */
class BloomFilter {
  /** Количество хэш-функций */
  private hashFnCount: number;
  /** Буфер для хранения значений Блум-фильтра */
  private buffer: ArrayBuffer;
  /** Максимальное значение для хранения данных в Блум-фильтре, в байтах */
  private size: number;

  constructor(hashFnCount: number, size: number) {
    this.hashFnCount = hashFnCount;
    this.buffer = new ArrayBuffer(size);
    this.size = size;
  }

  /**
   * Обработка значения несколькими хэш-функциями
   */
  private getHashes(value: string): number[] {
    const hashNumbers: number[] = [];

    // Получаем несколько разных хэш-кодов для добавляемого/проверяемого значения
    for (let i = 0; i < this.hashFnCount; i++) {
      const hashCode = this.getHashCode(value, i);
      hashNumbers.push(hashCode);
    }

    // console.log(hashNumbers, 'hashNumbers');
    return hashNumbers;
  }

  /**
   * Получение одного хэш-кода
   */
  private getHashCode(value: string, i: number): number {
    return value
      .split('')
      .map(char => char.charCodeAt(0) + i)
      .reduce((prev, next) => prev + next);
  }

  /**
   * Получение индекса значения хэш-кода в буфере 
   */
  private getBufferIndex(hashCode: number) {
    return hashCode % this.size;
  }

  /**
   * Добавление значений в буфер Блум-фильтра
   */
  public addValue(value: string) {
    const hashCodes = this.getHashes(value);
    const indexes = hashCodes.map(hashCode => this.getBufferIndex(hashCode));
    indexes.forEach((index) => this.buffer[index] = 1);
  }

  /**
   * Проверка наличия значений в Блум-фильтре
   */
  public checkValue(value: string): boolean {
    const hashCodes = this.getHashes(value);
    const indexes = hashCodes.map(hashCode => this.getBufferIndex(hashCode));
    const result = indexes.filter(index => this.buffer[index] === 1);

    return result.length === this.hashFnCount;
  }
}

/** TEST */
const bloomFilter = new BloomFilter(6, 256);

const wordPresent = ['abound', 'abounds', 'abundance', 'abundant', 'accessable',
  'bloom', 'blossom', 'bolster', 'bonny', 'bonus', 'bonuses',
  'coherent', 'cohesive', 'colorful', 'comely', 'comfort',
  'gems', 'generosity', 'generous', 'generously', 'genial'
];

wordPresent.forEach(word => bloomFilter.addValue(word));

const wordAbsent = ['bluff', 'cheater', 'hate', 'war', 'humanity',
  'racism', 'hurt', 'nuke', 'gloomy', 'facebook',
  'geeksforgeeks', 'twitter'];

const testWords = ['abound', 'bluff', 'abundance', 'abundant', 'accessable',
  'bloom', 'blossom', 'bolster', 'bonny', 'hurt', 'nuke', 'gloomy', 'facebook',
  'geeksforgeeks', 'twitter'].sort(() => (Math.random() > 0.5) ? 1 : -1);

// 1 результат из 15 (bluff) оказывается ложно положительным
testWords.forEach(word => {
  const isFound = bloomFilter.checkValue(word);
  const isPresent = wordPresent.includes(word);
  console.log(`word ${chalk.blue(word)} is found: ${chalk.yellow(isFound)}, and is present: ${isPresent === isFound ? chalk.yellow(isPresent) : chalk.red(isPresent)}`);
  console.log('---------------------------------------------------------------');
});