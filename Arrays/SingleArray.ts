import { ArrayData, IArray } from './types';

export class SingleArray<T> implements IArray<T> {
  public array: ArrayData<T> = {} as ArrayData<T>;

  constructor(length?: number) {
    Object.defineProperty(this.array, 'length', {
      writable: true,
      enumerable: false
    });

    this.array.length = 0;

    if (typeof length === 'number' && length > 0) {
      for (let i = 0; i < length; i++) {
        this.array[i] = undefined;
      }
      this.array.length = length;      
    }
  }

  private resize() {
    let newArray: ArrayData<T> = new Object() as ArrayData<T>;

    if (!this.isEmpty()) {
      newArray = this.array;
      this.array = newArray;
      this.array[this.size()] = undefined;
    } else {
      this.array[0] = undefined;
    }

    this.array.length = this.array.length + 1;
  }

  public size(): number {
    return this.array.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public get(index: number) {    
    if (index >= this.array.length) {
      throw new Error('Out of bounds');
    }
    return this.array[index];
  }

  public put(el: T, index?: number) {
    if (index == undefined) {
      this.resize();
      this.array[this.size() - 1] = el;
    } else {
      this.array[index] = el;
      // if (index > this.size())
      //   this.fillEmptyIndexes(this.array.length, index);
      // }
    }
  }

  public remove(index: number): T {
    if (index >= this.size()) {
      throw new Error('Out of bounds');
    }

    const removedEl = this.get(index);
    
    const newArray = new Object() as ArrayData<T>;
    const currentLength = this.size();

    for (let i = 0; i < currentLength; i++) {      
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
    this.array.length = currentLength - 1;
    
    return removedEl;
  }

  // private fillEmptyIndexes(start, finish) {
  //   for (let i = start; i < finish; i++) {
  //     this.array[i] = undefined;
  //   }
  // }
}