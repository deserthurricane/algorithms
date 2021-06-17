class AVL {
  root: AVLNode | null = null;

  _getBalance(root): number {
    if (root == null)
        return 0;

    return this._getHeight(root.left) - this._getHeight(root.right);
  }

  _getHeight(root): number {
    if (root == null)
    return 0;

    return root.height;
  }

  _getMax(a: number, b: number) {
    return (a > b) ? a : b;
  }

  _rebalance(root: AVLNode, key: number) {
    // if (Math.abs(root.L.height - root.R.height) <= 1) return;

    // if (
    //   // высота левого узла больше правого
    //   root.L.height > root.R.height &&
    //   // высота левого потомка левого узла >= высоте его правого потомка 
    //   root.L.L.height >= root.L.R.height) 
    // {
    //   this._smallRightRotation(root);
    // }
            /* 3. Get the balance factor of this ancestor
              node to check whether this node became
              unbalanced */
        const balance: number = this._getBalance(root);
 
        // If this node becomes unbalanced, then there
        // are 4 cases Left Left Case
        if (balance > 1 && root.key < root.L.key)
            return this._smallRightRotation(root);
 
        // Right Right Case
        if (balance < -1 && key > root.R.key)
            return this._smallLeftRotation(root);
 
        // Left Right Case
        if (balance > 1 && key > root.L.key) {
          return this._bigRightRotation(root);
        }
 
        // Right Left Case
        if (balance < -1 && key < root.R.key) {
          return this._bigLeftRotation(root);
        }
 
        /* return the (unchanged) node pointer */
        return root;
  }

  _smallRightRotation(root: AVLNode): AVLNode {
    const newRoot = root.L;
    newRoot.R = root;
    newRoot.R.L = newRoot.R;

    // Update heights
    newRoot.height = this._getMax(this._getHeight(newRoot.L), this._getHeight(newRoot.R)) + 1;
    root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;

    return newRoot;
  }

  _smallLeftRotation(root: AVLNode): AVLNode {
    const newRoot = root.R;
    newRoot.L = root;
    newRoot.L.R = newRoot.L;

    // Update heights
    newRoot.height = this._getMax(this._getHeight(newRoot.L), this._getHeight(newRoot.R)) + 1;
    root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;

    return newRoot;
  }

  _bigRightRotation(root: AVLNode) {
    const newRoot = this._smallLeftRotation(root);
    this._smallRightRotation(newRoot);
  }

  _bigLeftRotation(root: AVLNode) {
    const newRoot = this._smallRightRotation(root);
    this._smallLeftRotation(newRoot);
  }

  /**
   * Выводит все элементы в порядке возрастания
   */
  printSorted() {
    this._printSorted(this.root);
  }

  _printSorted(root: AVLNode | null) {
    if (root === null) return;

    this._printSorted(root.L);
    console.log(root.key);
    this._printSorted(root.R);
  }

  insert(key: number) {
    this.root = this._insert(this.root, key);
  }

  _insert(root: AVLNode | null, key: number): AVLNode | null {
    if (root === null) {
      root = new AVLNode(key);
      return root;
    }

    if (key < root.key) {
      root.L = this._insert(root.L, key);
    }

    if (key > root.key) {
      root.R = this._insert(root.R, key)
    }

    root.height = 1 + this._getMax(this._getHeight(root.L), this._getHeight(root.R));

    this._rebalance(root, key);

    return root;
  }

  search(key: number): boolean {
    const found = this._search(this.root, key);
    console.log(found, 'found');
    return found;
  }

  _search(root: AVLNode | null, key: number): boolean {
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

  _remove(root: AVLNode | null, key: number) {
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

  _getMinValue(root: AVLNode | null): number {
    let minValue = root.key;

    while (root.L !== null) {
      minValue = root.L.key;
      root = root.L;
    }

    return minValue;
  }

  preOrder(node: AVLNode) {
        if (node != null) {
            console.log(node.key + " ");
            this.preOrder(node.L);
            this.preOrder(node.R);
        }
    }
}

class AVLNode {
  key: number;
  L: AVLNode | null = null;
  R: AVLNode | null = null;
  height: number = 1;

  constructor(key: number) {
    this.key = key;
  }

  _getHeight(root) {
    return Math.max(root.L.height + root.R.height) + 1
  }
}

const avl = new AVL();
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

        /* The constructed AVL tree would be
      30
    /  \
  20   40
  /  \     \
10  25    50
*/
avl.preOrder(avl.root);