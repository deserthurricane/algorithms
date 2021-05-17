import { ArrayData, IArray } from './types';

export class VectorArray<T> implements IArray<T> {
  public array: ArrayData<T> = {} as ArrayData<T>;
  private _size: number;
  private vector: number;

  constructor(vector: number = 10) {
    this.vector = vector;
    this._size = 0;

    Object.defineProperty(this.array, 'length', {
      writable: true,
      enumerable: false
    });

    for (let i = 0; i < vector; i++) {
      this.array[i] = undefined;
    }

    this.array.length = vector;
  }

  private resize() {
    this.fillEmptyIndexes(this._size + 1, this.vector);
    this.array.length += this.vector;
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
    if (index == undefined) {
      this.resize();
      this.array[this._size] = el;
      this._size++;
    } else {      
      if (index > this.array.length) {
        const newArrayLength = index + (this.vector - Math.floor(index % this.vector));
        
        this.fillEmptyIndexes(this.array.length, newArrayLength);
        this.array.length = newArrayLength;        
      }

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
    let newArrayLength = this.array.length; 

    // Освобождаем ячейки памяти размером 1 вектор, если необходимо
    if (this._size - 1 === this.array.length - this.vector) {
      newArrayLength = this.array.length - this.vector;
    }

    for (let i = 0; i < newArrayLength; i++) {      
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