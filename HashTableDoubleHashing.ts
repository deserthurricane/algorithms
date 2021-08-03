import { HashTableElement } from "./HashTableElement";

/**
 * Для двойного хэширования нужно использовать взаимно простые числа
 * Для упрощения задачи возьмем в качестве второго числа любое простое число
 */
const RANDOM_PRIME = 19;

/**
 * Реализация хэш-таблицы для хранения строковых значений
 * методом двойного хэширования
 */
class HashTableDoubleHashing {
  protected count: number = 0; // счётчик добавленных элементов
  protected maxCount: number = 5; // Number.MAX_SAFE_INTEGER;
  protected capacity: number = 0.75; // значение заполненности хэш-таблицы, при котором нужно увеличивать ее вместимость и проводить рехэширование
  protected table: HashTableElement[] = new Array(this.maxCount);

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

    this.table[index] = new HashTableElement(hashCode, value);
  }

  /**
   * Получение элемента в формате HashTableElement
   */
  public get(value: string): HashTableElement | never {
    const hashCode = this._getHashCode(value);
    const index = this._getTableIndex(hashCode);

    const el = this.table[index];

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

    if (this.table[index] == undefined) {
      throw new Error('No such element');
    }

    const deleteEl = this.table[index];

    if (!deleteEl) {
      throw new Error('No such element')
    }

    delete this.table[index];
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

  protected _getTableIndex(hashCode: number): number {
    let p = 0; // пробинг
    let index = 0; // свободный индекс для сохранения элемента в хэш-таблице

    outer: while (p < this.maxCount) {
      index = ((hashCode % this.maxCount) + (p * (hashCode % RANDOM_PRIME))) % this.maxCount;

      if (this.table[index] == undefined) {
        break outer;
      }

      p++;
    }

    return index;
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

    oldTable.forEach((el) => {
      if (el) {
        this.add(el.get().value);
      }
    });
  }

  /**
   * Проверка на дубликаты значений
   */
  protected _exists(value: string, index: number): boolean {
    return this.table[index]?.get().value === value;
  }
}



// test
const table = new HashTableDoubleHashing();
table.add('cat');
table.add('das');
table.add('dog');
table.add('key');
table.add('act');
table.delete('dog')


console.log(table);


