export interface IArray<T> {
  size: () => number;
  isEmpty: () => boolean;
  get: (index: number) => T;
  put: (el: T, index?: number) => void;
  remove: (index: number) => T;
};

export type ArrayData<T> = {
  [key: number]: T;
  /** Свойство length автоматически обновляется при изменении массива. 
   * Если быть точными, это не количество элементов массива, 
   * а наибольший цифровой индекс плюс один. */
  length: number;
}