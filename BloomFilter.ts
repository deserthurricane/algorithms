const chalk = require('chalk');
const murmurHash3 = require('murmurhash3js');

/**
 * Фильтр Блума
 * Вероятностная структура данных, позволяющая проверять принадлежность элемента к множеству
 */
class BloomFilter {
  /** Количество хранимых в фильтре значений */
  private elementsCount: number;
  /** Количество допустимых false positives */
  private probability: number;
  /** Количество хэш-функций */
  private hashFnCount: number;
  /** Буфер для хранения значений Блум-фильтра */
  private buffer: ArrayBuffer;
  /** Максимальное значение для хранения данных в Блум-фильтре, в битах */
  private size: number;

  constructor(elementsCount: number, probability: number) {
    this.elementsCount = elementsCount;
    this.probability = probability;

    this.getSize();
    this.getHashFnCount();
    this.buffer = new ArrayBuffer(Math.round(this.size / 8));
    
    console.log(this.buffer.byteLength, 'this.buffer.byteLength');
    console.log(this.size, 'size in bits');
    console.log(this.hashFnCount, 'hashFnCount');
  }

  private getSize() {
    this.size = Math.round(-(this.elementsCount * Math.log(this.probability))/(Math.pow(Math.log(2), 2)));
  }

  private getHashFnCount() {
    this.hashFnCount = Math.round((this.size/this.elementsCount) * Math.log(2));
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
    // return murmurHash3.x86.hash32(value, i);
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
const bloomFilter = new BloomFilter(20, 0.05);

const wordPresent = ['abound', 'abounds', 'abundance', 'abundant', 'accessable',
  'bloom', 'blossom', 'bolster', 'bonny', 'bonus', 'bonuses',
  'coherent', 'cohesive', 'colorful', 'comely', 'comfort',
  'gems', 'generosity', 'generous', 'generously', 'genial'
];

wordPresent.forEach(word => bloomFilter.addValue(word));

const wordAbsent = ['bluff', 'cheater', 'hate', 'war', 'humanity',
  'racism', 'hurt', 'nuke', 'gloomy', 'facebook',
  'geeksforgeeks', 'twitter'];

const testWords = ['abound', 'bluff', 'cheater', 'hate', 'war', 'humanity',
'racism', 'abundance', 'abundant', 'accessable',
  'bloom', 'blossom', 'bolster', 'bonny', 'hurt', 'nuke', 'gloomy', 'facebook',
  'geeksforgeeks', 'twitter'].sort(() => (Math.random() > 0.5) ? 1 : -1);

// 1 результат из 20 (cheater) оказывается ложно положительным
testWords.forEach(word => {
  const isFound = bloomFilter.checkValue(word);
  const isPresent = wordPresent.includes(word);
  console.log(`word ${chalk.blue(word)} is found: ${chalk.yellow(isFound)}, and is present: ${isPresent === isFound ? chalk.yellow(isPresent) : chalk.red(isPresent)}`);
  console.log('---------------------------------------------------------------');
});