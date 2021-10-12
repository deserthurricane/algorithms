class BloomFilter {
  // Количество хэш-функций
  private hashFnCount: number;
  // Буфер для хранения значений Блум Фильтра
  private storage: ArrayBuffer;

  constructor(hashFnCount: number) {
    this.hashFnCount = hashFnCount;
    this.storage = new ArrayBuffer(256);
  }

  private getHashes(key: string): number[] {
    let hashNumbers: number[] = [];

    for (let i = 0; i < this.hashFnCount; i++) {
      hashNumbers.push(
        Math.abs(
          key.split('').reduce((a, b) => ((a << i) - a + b.charCodeAt(0)) | 0, 0)
        )
      );
    }

    // console.log(hashNumbers, 'hashNumbers');
    return hashNumbers;
  }

  /**
   * Добавление значений в Блум-фильтр
   */
  public addValue(value: string) {
    const indexes = this.getHashes(value);
    indexes.forEach((index) => this.storage[index] = 1);
  }

  /**
   * Проверка значений в Блум-фильтре
   */
  public checkValue(value: string) {
    const hashes = this.getHashes(value);
    const result = hashes.filter(index => this.storage[index] === 1);
    console.log(result.length === this.hashFnCount, 'result');

    return result.length === this.hashFnCount;
  }
}

/** TEST */
const bloomFilter = new BloomFilter(2);
// bloomFilter.addValue('cat');
// bloomFilter.addValue('dog');

const wordPresent = ['abound', 'abounds', 'abundance', 'abundant', 'accessable',
  'bloom', 'blossom', 'bolster', 'bonny', 'bonus', 'bonuses',
  'coherent', 'cohesive', 'colorful', 'comely', 'comfort',
  'gems', 'generosity', 'generous', 'generously', 'genial'];

wordPresent.forEach(word => bloomFilter.addValue(word));

const wordAbsent = ['bluff', 'cheater', 'hate', 'war', 'humanity',
  'racism', 'hurt', 'nuke', 'gloomy', 'facebook',
  'geeksforgeeks', 'twitter'];

const testWords = ['abound', 'abounds', 'abundance', 'abundant', 'accessable',
  'bloom', 'blossom', 'bolster', 'bonny', 'hurt', 'nuke', 'gloomy', 'facebook',
  'geeksforgeeks', 'twitter'].sort(() => (Math.random() > 0.5) ? 1 : -1);

console.log(testWords, 'testWords shuffled');


testWords.forEach(word => bloomFilter.checkValue(word));

// bloomFilter.checkValue('cat');
// bloomFilter.checkValue('dog');
// bloomFilter.checkValue('dick');
// bloomFilter.checkValue('bat');