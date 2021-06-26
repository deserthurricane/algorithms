import { performance } from 'perf_hooks';

/**
 * Узел АВЛ-дерева
 */
class AVLNode {
	key: number;
	L: AVLNode | null = null;
	R: AVLNode | null = null;
	height: number = 1;

	constructor(key: number) {
		this.key = key;
	}
}

/**
 * Реализация АВЛ-дерева
 */
class AVLTree {
	root: AVLNode | null = null;

	insert(root: AVLNode | null, key: number): AVLNode | null {
		if (root === null) {
			root = new AVLNode(key);
			return root;
		}

		if (key < root.key) {
			root.L = this.insert(root.L, key);
		}

		if (key > root.key) {
			root.R = this.insert(root.R, key);
		}

		// Исключаем дубликаты значений
		if (key === root.key) return root;

		// Увеличиваем высоту корня, так как добавился новый элемент
		root.height = 1 + this._getMax(this._getHeight(root.L), this._getHeight(root.R));

		// Делаем ребалансировку, когда это необходимо
		const balance = this._getBalance(root);

		if (balance > 1 && key < root.L.key) {			
			return this._smallRightRotation(root);
		}

		if (balance < -1 && key > root.R.key) {
			return this._smallLeftRotation(root);
		}

		if (balance > 1 && key > root.L.key) {
			return this._bigRightRotation(root);
		}

		if (balance < -1 && key < root.R.key) {
			return this._bigLeftRotation(root);
		}

		return root;
	}

	search(key: number): boolean {
		const found = this._search(this.root, key);
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
			found = this._search(root.L, key);
		}

		if (key > root.key) {
			found = this._search(root.R, key);
		}

		return found;
	}

	remove(root: AVLNode | null, key: number) {
		if (root == null) return root;

    // Поиск узла для удаления
		if (key < root.key) {
      root.L = this.remove(root.L, key);
    } else if (key > root.key) {
      root.R = this.remove(root.R, key);
    } else {
      // Найден узел для удаления
      // Ни одного или один ребенок
			if (root.L == null || root.R == null) {
				let temp = null;
				if (temp == root.L) {
          temp = root.R;
        } else {
          temp = root.L;
        }

				if (temp == null) {
					temp = root;
					root = null;
				} else {
          root = temp;
        }
			} else {
        // Оба ребенка
				const temp = this._getMin(root.R);
				root.key = temp.key;
				root.R = this.remove(root.R, temp.key);
			}
		}

		if (root == null) return root;

		// Делаем ребалансировку, когда это необходимо
		const balance = this._getBalance(root);

		if (balance > 1 && this._getBalance(root.L) >= 0)
			return this._smallRightRotation(root);

		if (balance > 1 && this._getBalance(root.L) < 0) {
      return this._bigRightRotation(root);
		}

		if (balance < -1 && this._getBalance(root.R) <= 0)
			return this._smallLeftRotation(root);

		if (balance < -1 && this._getBalance(root.R) > 0) {
      return this._bigLeftRotation(root);
		}

		return root;
	}

	/**
	 * Вычисление разницы между левым и правым листами
	 * @param root
	 */
	private _getBalance(root): number {
		if (root == null) return 0;

		return this._getHeight(root.L) - this._getHeight(root.R);
	}

	/**
	 * Геттер высоты узла
	 * @param root
	 */
	private _getHeight(root): number {
		if (root === null) return 0;

		return root.height;
	}

	/**
	 * Вспомогательная функция для вычисления макс значения
	 * @param a
	 * @param b
	 */
	private _getMax(a: number, b: number): number {
		return a > b ? a : b;
	}

  // Малый поворот направо
	_smallRightRotation(root: AVLNode): AVLNode {
		const newRoot = root.L;
		const leftChildRightChild = root.L.R;

		// Перемещаем корень в позицию правого ребенка
		newRoot.R = root;
		// Перевешиваем бывший правый лист
		root.L = leftChildRightChild;

    // Обновление высот старого и нового корня
		root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;
		newRoot.height = this._getMax(this._getHeight(newRoot.L), this._getHeight(newRoot.R)) + 1;

		return newRoot;
	}

  // Малый поворот налево
	_smallLeftRotation(root: AVLNode): AVLNode {
		const newRoot = root.R;
		const rightChildLeftChild = root.R.L;

		// Перемещаем корень в позицию левого ребенка
		newRoot.L = root;
		// Перевешиваем бывший левый лист
		root.R = rightChildLeftChild;

    // Обновление высот старого и нового корня
		root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;
		newRoot.height = this._getMax(this._getHeight(newRoot.L), this._getHeight(newRoot.R)) + 1;

		return newRoot;
	}

  // Большой поворот направо
	_bigRightRotation(root: AVLNode) {
		const firstRoot = this._smallLeftRotation(root.L);
		const secondRoot = this._smallRightRotation(firstRoot);
		return secondRoot;
	}

  // Большой поворот налево
	_bigLeftRotation(root: AVLNode) {		
		const firstRoot = this._smallRightRotation(root.R);
		const secondRoot = this._smallLeftRotation(firstRoot);
		return secondRoot;
	}

  // Минимальный элемент
	_getMin(root: AVLNode | null): AVLNode {
		let current = root;

		while (current.L != null) current = current.L;

		return current;
	}

  // Перечисление в текущем порядке
	preOrder(node: AVLNode) {
		if (node != null) {
			console.log(node.key + ' ');
			this.preOrder(node.L);
			this.preOrder(node.R);
		}
	}

  /**
	 * Выводит все элементы в порядке возрастания, по очереди L и R ветки
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

  /**
   * Заполнение случайными значениями
   */
  populateRandom(count: number) {
    this._measureRunTime(() => {
      for (let i = 0; i < count; i++) {
        const randomKey: number = Math.floor(Math.random() * count);
        this.root = this.insert(this.root, randomKey)
      }
    });
  }

  /**
   * Заполнение отсортированными по возрастанию значениями
   */
  populateAscend(count: number) {
    this._measureRunTime(() => {
      for (let i = 0; i < count; i++) {
				this.root = this.insert(this.root, i)
      }
    });
  }

	searchRandom(count: number) {
    const removeCount = count / 10;
    
    this._measureRunTime(() => {
      for (let i = 0; i < removeCount; i++) {
        const randomKey: number = Math.floor(Math.random() * count);
        this.search(randomKey)
      }
    });
  }

  removeRandom(count: number) {
    const removeCount = count / 10;
    
    this._measureRunTime(() => {
      for (let i = 0; i < removeCount; i++) {
        const randomKey: number = Math.floor(Math.random() * count);
        this.remove(this.root, randomKey)
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

const avl = new AVLTree();

const count = 100;

avl.populateAscend(count);
// avl.populateRandom(count)

// avl.removeRandom(count);
avl.searchRandom(count);
