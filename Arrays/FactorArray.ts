import { ArrayData, IArray } from './types';

export class FactorArray<T> implements IArray<T> {
  public array: ArrayData<T> = {} as ArrayData<T>;
  private _size: number;

  constructor() {
    Object.defineProperty(this.array, 'length', {
      writable: true,
      enumerable: false
    });

    for (let i = 0; i < 100000; i++) {
      this.array[i] = undefined;
    }

    this._size = 100000;
    this.array.length = 100000;
  }

  private resize() {    
    this.fillEmptyIndexes(this.array.length + 1, this.array.length * 2);
    this.array.length = this.array.length * 2;
  }

  public size(): number {
    return this._size;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public get(index: number) {    
    if (index >= this._size) {
      throw new Error('Out of bounds');
    }
    return this.array[index];
  }

  public put(el: T, index?: number) {
    if (this.array.length === this._size || index > this.array.length) {
      this.resize();
    }

    if (index == undefined) {
      this.array[this._size] = el;
      this._size++;
    } else {      
      if (index > this._size) {
        this._size = index + 1;
      }

      this.array[index] = el;
    }
  }

  public remove(index: number): T {
    if (index >= this.size()) {
      throw new Error('Out of bounds');
    }

    const removedEl = this.get(index);
    
    const newArray = new Object() as ArrayData<T>;

    for (let i = 0; i <= this._size; i++) {      
      if (i < index) {
        newArray[i] = this.array[i];
      } else if (i === index) {
        // пропускаем этот элемент
        continue;
      } else {
        newArray[i - 1] = this.array[i];
      }
    }

    this.array = newArray;
    this._size--;
    
    return removedEl;
  }

  private fillEmptyIndexes(start, finish) {
    for (let i = start; i < finish; i++) {
      this.array[i] = undefined;
    }
  }
}