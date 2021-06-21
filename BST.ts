import { performance } from 'perf_hooks';

/**
 * Узел двоичного дерева
 */
class TreeNode {
  key: number;
  L: TreeNode | null = null;
  R: TreeNode | null = null;

  constructor(key: number) {
    this.key = key;
  }
}

/**
 * Реализация двоичного дерева поиска
 */
class BST {
  root: TreeNode | null = null;

  /**
   * Выводит все элементы в порядке возрастания
   */
  printSorted() {
    this._printSorted(this.root);
  }

  _printSorted(root: TreeNode | null) {
    if (root === null) return;

    this._printSorted(root.L);
    console.log(root.key);
    this._printSorted(root.R);
  }

  insert(key: number) {
    this.root = this._insert(this.root, key);
  }

  _insert(root: TreeNode | null, key: number): TreeNode | null {
    if (root === null) {
      root = new TreeNode(key);
      return root;
    }

    if (key < root.key) {
      root.L = this._insert(root.L, key);
    }

    if (key > root.key) {
      root.R = this._insert(root.R, key)
    }

    return root;
  }

  search(key: number): boolean {
    const found = this._search(this.root, key);
    // console.log(found, 'found');
    return found;
  }

  _search(root: TreeNode | null, key: number): boolean {
    if (root === null) {
      return false;
    }

    let found = false;

    if (root.key === key) {
      found = true;
    }

    if (key < root.key) {
      found = this._search(root.L, key)
    }

    if (key > root.key) {
      found = this._search(root.R, key)
    }
    
    return found;
  }

  remove(key: number) {
    this._remove(this.root, key)
  }

  _remove(root: TreeNode | null, key: number) {
    /**
     * Мы нашли нужный узел - удаляем и выходим из рекурсии
     */
    if (root && root.key === key) {
      // Если root - это лист
      if (root.L === null && root.R === null) {
        root = null;
        return root; // сразу возвращаем после присваивания, чтобы не спровоцировать ошибку ниже
      }

      // Если есть левый дочерний узел
      if (root.L && root.R === null) {
        root = root.L;
      }

      // Если есть правый дочерний узел
      if (root.L === null && root.R) {
        root = root.R;
      }

      // Если есть оба дочерних узла
      if (root.L && root.R) {
        root.key = this._getMinValue(root.R); // записываем в корень минимальный ключ правого поддерева

        // Удаляем дублирующийся узел-"донор" из правого поддерева
        root.R = this._remove(root.R, root.key);
      }

      return root;
    }

    /**
     * Мы ещё не нашли нужный узел
     */
    if (root && key < root.key) {
      root.L = this._remove(root.L, key);
    }

    if (root && key > root.key) {
      root.R = this._remove(root.R, key);
    }

    return root;
  }

  _getMinValue(root: TreeNode | null): number {
    let minValue = root.key;

    while (root.L !== null) {
      minValue = root.L.key;
      root = root.L;
    }

    return minValue;
  }

  /**
   * Заполнение случайными значениями
   */
  populateRandom() {
    this._measureRunTime(() => {
      for (let i = 0; i < 100; i++) {
        const randomKey: number = Math.floor(Math.random() * 100);
        this.insert(randomKey)
      }
    });
  }

  /**
   * Заполнение отсортированными по возрастанию значениями
   */
  populateAscend() {
    this._measureRunTime(() => {
      for (let i = 0; i < 100; i++) {
        this.insert(i)
      }
    });
  }

  searchRandom(count) {
    const removeCount = count / 10;
    
    this._measureRunTime(() => {
      for (let i = 0; i < removeCount; i++) {
        const randomKey: number = Math.floor(Math.random() * count);
        this.search(randomKey)
      }
    });
  }

  removeRandom(count) {
    const removeCount = count / 10;
    
    this._measureRunTime(() => {
      for (let i = 0; i < removeCount; i++) {
        const randomKey: number = Math.floor(Math.random() * count);
        this.remove(randomKey)
      }
    });
  }

  _measureRunTime(cb) {
    const start = performance.now();
    const result = cb(this);
    const finish = performance.now();

    const runTime = finish - start;
    console.log('runTime:', runTime);

    return result;
  }
}

const tree = new BST();

tree.populateRandom();
// tree.populateAscend();
tree.removeRandom(100);
// tree.searchRandom(10000);

// tree.printSorted()