/**
 * Реализация хэш-таблицы для хранения строковых значений
 * методом цепочек (buckets)
 */
class HashTable {
  protected count: number = 0; // счётчик добавленных элементов
  protected maxCount: number = 5; // Number.MAX_SAFE_INTEGER;
  protected capacity: number = 0.75; // значение заполненности хэш-таблицы, при котором нужно увеличивать ее вместимость и проводить рехэширование
  protected table: Array<HashTableElement[]> = new Array(this.maxCount);

  /**
   * Добавление нового элемента
   */
  public add(value: string) {
    if (this._hasReachedLimit()) {
      this._rehash();
    }

    const hashCode = this._getHashCode(value);
    const index = this._getTableIndex(hashCode);

    if (this._exists(value, index)) {
      throw new Error('Element already exists');
    }

    this.count++;

    const el = new HashTableElement(hashCode, value);

    if (Array.isArray(this.table[index])) {
      this.table[index].push(el);
    } else {
      this.table[index] = [el];
    }
  }

  /**
   * Получение элемента в формате HashTableElement
   */
  public get(value: string): HashTableElement | never {
    const hashCode = this._getHashCode(value);
    const index = this._getTableIndex(hashCode);

    const el = this.table[index].filter(el => el.get().value === value)[0];

    if (!el) {
      throw new Error('No such element')
    }

    return el;
  }

  /**
   * Удаление элемента
   */
  public delete(value: string): HashTableElement | never {
    const hashCode = this._getHashCode(value);
    const index = this._getTableIndex(hashCode);

    const bucketIndex = this.table[index].findIndex(el => el.get().value === value);

    if (bucketIndex === -1) {
      throw new Error('No such element');
    }

    const deleteEl = this.table[index][bucketIndex];

    if (!deleteEl) {
      throw new Error('No such element')
    }

    this.table[index].splice(bucketIndex, 1);
    this.count--;

    return deleteEl;
  }

  /**
   * Получение хэш-кода по UTF-16
   */
  protected _getHashCode(value: string): number {
    return value
      .split('')
      .map(char => char.charCodeAt(0))
      .reduce((prev, next) => prev + next);
  }

  /**
   * Получить индекс цепочки (ведра) для действий над элементами хэш-таблицы
   */
  protected _getTableIndex(hashCode: number) {
    return hashCode % this.maxCount;
  }

  /**
   * Проверка на достижение capacity
   */
  protected _hasReachedLimit(): boolean {
    if (this.count >= Math.ceil(this.maxCount * this.capacity)) {
      return true;
    }

    return false;
  }

  /**
   * Рехэширование имеющихся данных в хэш-таблице
   * при увеличении ее вместимости
   */
  protected _rehash() {
    this.maxCount *= 2;

    const oldTable = [...this.table]; // копируем текущие данные хэш-таблицы
    this.table = []; // создаем новую пустую хэш-таблицу
    this.count = 0; // обнуляем счётчик добавленных элементов для корректной работы метода add

    oldTable.forEach((bucket) => {
      if (Array.isArray(bucket)) {
        bucket.forEach(el => {
          this.add(el.get().value);
        });
      }
    })
  }

  /**
   * Проверка на дубликаты значений
   */
  protected _exists(value: string, index): boolean {
    return !!this.table[index]?.find(el => el.get().value === value) ?? false;
  }
}

/**
 * Структура для хранения элемента в хэш-таблице
 */
class HashTableElement {
  protected hashCode: number;
  protected value: string;

  constructor(hashCode: number, value: string) {
    this.hashCode = hashCode;
    this.value = value;
  }

  /**
   * Получение хэш-кода и исходного значения
   */
  public get() {
    return {
      hashCode: this.hashCode,
      value: this.value
    }
  }

  /**
   * Обновление хэш-кода
   */
  public updateHashCode(newHashCode: number) {
    this.hashCode = newHashCode;
  }
}

// test
const table = new HashTable();
table.add('cat');
table.add('das');
table.add('dog');
table.add('key');
table.add('act');
table.delete('dog')


console.log(table);


