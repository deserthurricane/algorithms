/**
 * Узел дирамиды
 */
class TreapNode {
  key: number; 
  priority: number;
  left: TreapNode | null = null;
  right: TreapNode | null = null; 
};

/**
 * Дирамида
 */
class Treap {
  root: TreapNode | null = null;

  /* T1, T2 and T3 are subtrees of the tree rooted with y
  (on left side) or x (on right side)
                y                               x
               / \     Right Rotation          / \
              x   T3   – – – – – – – >        T1  y
             / \       < - - - - - - -           / \
            T1  T2     Left Rotation           T2  T3 */
  /**
   * Правый поворот 
   */          
  private rightRotate(root: TreapNode): TreapNode {
      const x = root.left;  
      const T2 = x.right;
   
      // Поворот
      x.right = root;
      root.left = T2;
   
      // Возвращаем новый корень
      return x;
  }

  /**
   * Левый поворот 
   */ 
  private leftRotate(root: TreapNode): TreapNode {
    const y = root.right; 
    const T2 = y.left;
 
    // Поворот
    y.left = root;
    root.right = T2;
 
    // Возвращаем новый корень
    return y;
  }

  /**
   * Создание нового узла
   */
  private newNode(key: number): TreapNode {
    const temp = new TreapNode();
    temp.key = key;
    temp.priority = Math.floor(Math.random() * 1000); // вычисление рандомного числа
    temp.left = null;
    temp.right = null;
    return temp;
  }

  /**
   * Поиск узла по ключу
   */
  private searchNode(root: TreapNode, key: number): TreapNode {
      // Базовый случай - ключ совпадает с ключом корня или вообще не найден
      if (root === null || root.key === key) {
        return root;
      }
   
      // Ключ больше ключа корня - идем направо
      if (root.key < key) {
        return this.searchNode(root.right, key);
      }
   
      // Ключ меньше ключа корня - идем налево
      return this.searchNode(root.left, key);
  }

  public search(key: number): TreapNode {
    return this.searchNode(this.root, key);
  }

  /**
   * Вставка нового узла 
   */
  private insertNode(root: TreapNode, key: number): TreapNode {
    // Базовый случай: корень отсутствует - добавляем новый узел в это место
    if (root === null) {
      root = this.newNode(key);
      return root;
    }
    
    // Ключ меньше ключа корня или равен ему
    if (key <= root.key) {
      // Вставка в левое поддерево
      root.left = this.insertNode(root.left, key);

      // Поворот направо, для "калибровки" по рандомному значению кучи
      if (root.left.priority > root.priority) {
        root = this.rightRotate(root);
      }
    } 
    // Ключ больше ключа корня
    else {
      // Вставка в правое поддерево
      root.right = this.insertNode(root.right, key);

      // Поворот налево, для "калибровки" по рандомному значению кучи
      if (root.right.priority > root.priority) {
        root = this.leftRotate(root);
      }
    }

    return root;
  }

  public insert(key: number): TreapNode {
    if (!this.root) {
      this.root = this.newNode(key);
      return this.root;
    }

    return this.insertNode(this.root, key);
  }

  /**
   * Удаление узла по ключу 
   */
  private deleteNode(root: TreapNode, key: number): TreapNode {
    // Ключ НЕ в корневом узле
    if (key < root.key) {
      root.left = this.deleteNode(root.left, key);
    } else if (key > root.key) {
      root.right = this.deleteNode(root.right, key);
    }
 
    // Ключ в корневом узле
 
    // Если отсутствует левое поддерево
    else if (root.left === null && root.right !== null) {
      const temp = root.right;
      root = temp;  // Правый лист становится корнем
    }
 
    // Если отсутствует правое поддерево
    else if (root.right == null && root.left !== null) {
      const temp = root.left;
      root = temp;  // Левый лист становится корнем
    }
 
    // Если узел является листом
    else if (root.left.priority < root.right.priority) {
      root = this.leftRotate(root);
      root.left = this.deleteNode(root.left, key);
    } else {
      root = this.rightRotate(root);
      root.right = this.deleteNode(root.right, key);
    }
 
    return root;
  }

  public delete(key: number): never | TreapNode {
    if (!this.root) {
      throw new Error('Treat is empty');
    }

    return this.deleteNode(this.root, key);

  }

  /**
   * Вывод узлов дирамиды в консоль 
   */
  private printTreapNodes(root: TreapNode, type: 'root' | 'left' | 'right') {
    console.log("type: ", type, " | key: ", root.key, " | priority: ", root.priority);

    if (root.left !== null) {
      this.printTreapNodes(root.left, 'left');
    }

    if (root.right !== null) {
      this.printTreapNodes(root.right, 'right');
    }
  }

  public printTreap() {
    this.printTreapNodes(this.root, 'root');
  }
}