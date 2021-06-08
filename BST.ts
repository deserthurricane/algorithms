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
    console.log(found, 'found');
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
}

class TreeNode {
  key: number;
  L: TreeNode | null = null;
  R: TreeNode | null = null;

  constructor(key: number) {
    this.key = key;
  }
}

const tree = new BST();

  /* Let us create following BST
        50
      /     \
    30      70
    /  \    /  \
  20   40  60   80 */
  tree.insert(50);

  // console.log(tree, 'tree')
  tree.insert(30);
    // console.log(tree, 'tree')
  tree.insert(20);
  tree.insert(40);
  tree.insert(70);
  tree.insert(60);
  tree.insert(80);
  // tree.insert(75);
  // tree.insert(90);
  tree.remove(50);
    
  // Print inorder traversal of the BST
  tree.printSorted();

  // tree.search(80);