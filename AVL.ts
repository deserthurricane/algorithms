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

	_getHeight(root) {
		return Math.max(root.L.height + root.R.height) + 1;
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

		root.height = 1 + this._getMax(this._getHeight(root.L), this._getHeight(root.R));

		/**
		 * Делаем ребалансировку, когда это необходимо
		 */
		const balance = this._getBalance(root);

		if (balance > 1 && key < root.L.key) {
			return this._smallRightRotation(root);
		}

		if (balance < -1 && key > root.R.key) {
			return this._smallLeftRotation(root);
		}

		if (balance > 1 && key > root.L.key) {
			root.L = this._smallLeftRotation(root.L);
			return this._smallRightRotation(root);
		}

		if (balance < -1 && key < root.R.key) {
			root.R = this._smallRightRotation(root.R);
			return this._smallLeftRotation(root);
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

    // Обновление высоты
		root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;

		// Ребалансировка
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
	 * @returns
	 */
	private _getBalance(root): number {
		if (root == null) return 0;

		return this._getHeight(root.L) - this._getHeight(root.R);
	}

	/**
	 * Геттер высоты узла
	 * @param root
	 * @returns
	 */
	private _getHeight(root): number {
		if (root == null) return 0;

		return root.height;
	}

	/**
	 * Вспомогательная функция для вычисления макс значения
	 * @param a
	 * @param b
	 * @returns
	 */
	private _getMax(a: number, b: number) {
		return a > b ? a : b;
	}

  // Малый поворот направо
	_smallRightRotation(root: AVLNode): AVLNode {
		console.log('_smallRightRotation');

    const newRoot = root.L;
    const newLeftLeaf = newRoot.R;

		newRoot.R = root;
		root.L = newLeftLeaf;

    // Обновление высот нового и старого корня
		newRoot.height = this._getMax(this._getHeight(newRoot.L), this._getHeight(newRoot.R)) + 1;
		root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;

		return newRoot;
	}

  // Малый поворот налево
	_smallLeftRotation(root: AVLNode): AVLNode {
		console.log('_smallLeftRotation');

		const newRoot = root.R;
    const newRightLeaf = newRoot.L;

		newRoot.L = root;
		root.R = newRightLeaf;

    // Обновление высот нового и старого корня
		newRoot.height = this._getMax(this._getHeight(newRoot.L), this._getHeight(newRoot.R)) + 1;
		root.height = this._getMax(this._getHeight(root.L), this._getHeight(root.R)) + 1;

		return newRoot;
	}

  // Большой поворот направо
	_bigRightRotation(root: AVLNode) {
		console.log('_bigRightRotation');
		
		const newRoot = this._smallLeftRotation(root.L);
		const updatedRoot = this._smallRightRotation(newRoot);
		return updatedRoot;
	}

  // Большой поворот налево
	_bigLeftRotation(root: AVLNode) {
		console.log('_bigLeftRotation');
		
		const newRoot = this._smallRightRotation(root.R);
		const updatedRoot = this._smallLeftRotation(newRoot);
		return updatedRoot;
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
  populateRandom() {
    this._measureRunTime(() => {
      for (let i = 0; i < 1000; i++) {
        const randomKey: number = Math.floor(Math.random() * 100);
        this.root = this.insert(this.root, randomKey)
      }
    });
  }

  /**
   * Заполнение отсортированными по возрастанию значениями
   */
  populateAscend() {
    this._measureRunTime(() => {
      for (let i = 0; i < 20; i++) {
				console.log(i, 'key')
				this.root = this.insert(this.root, i)
				console.log(this.root, 'avl.root')
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

avl.populateAscend();
// avl.populateRandom()
