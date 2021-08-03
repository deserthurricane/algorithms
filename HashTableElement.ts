/**
 * Структура для хранения элемента в хэш-таблице
 */
export class HashTableElement {
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