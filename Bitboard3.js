/**
 * Ходы ладьи
 */
class Bitboard3 {
  static onlyH = BigInt('9259542123273814144');
  static onlyA = BigInt('72340172838076673');
  static onlyVisibleBoard = BigInt('18446744073709551615');

  L = BigInt(0);

  /**
   * 
   * @param {string} data 
   * @returns {[string, string]} - количество ходов и битовая маска
   */
  run(data) {
    this.L = BigInt(1) << BigInt(data);

    const rightMask = this._getHorizontalMaskByDirection('right');
    console.log(rightMask.toString(10), 'rightMask')

    const leftMask = this._getHorizontalMaskByDirection('left');
    console.log(leftMask.toString(10), 'leftMask')

    const upMask = this._getVerticalMaskByDirection('up');
    console.log(upMask, 'upMask');

    const downMask = this._getVerticalMaskByDirection('down');
    console.log(downMask, 'downMask');

    const movesMask = Bitboard3.onlyVisibleBoard & (
      leftMask  |
      rightMask |
      downMask  |
      upMask
    );

    const count = this._getCount(movesMask).toString();
    console.log('count', count);
    console.log('movesMask', movesMask);
    return [count, movesMask.toString(10)];
  }

  _getCount(bits) {
    let count = 0;

    const ul = BigInt(1);

    while (bits > 0) {
      if ((bits & ul) == 1) {
        count++;
      }
      bits >>= ul;
    }

    return count;
  }

  /**
   * @private
   * 
   * @param {'right' | 'left'} direction - направление движения по горизонтали
   * @returns {BigInt} - маска движения направо или налево
   */
  _getHorizontalMaskByDirection(direction) {
    let mask = BigInt(0);

    // Если фигура уже стоит на правом или левом краю - не можем двигаться в эту сторону
    if (
      (direction === 'right') && (this.L & Bitboard3.onlyH)
      || (direction === 'left') && (this.L & Bitboard3.onlyA)
    ) {
      return mask;
    }

    let nextPosition = this.L;
    let move = 1;
    const MAX_MOVE = 7; // ладья может максимум пойти на 7 клеток в сторону
    let isEdgeReached = false; // флаг достижения края доски

    const step = BigInt(1); // сколько клеток преодолеваем за одну итерацию

    while (move <= MAX_MOVE) {
      if (!isEdgeReached) {
        nextPosition = this._getNewPosition(direction, step, nextPosition);
        mask = mask | nextPosition;
      }

      // Проверяем пересечение с краями доски A и H
      if ((nextPosition & Bitboard3.onlyH) || (nextPosition & Bitboard3.onlyA)) {
        isEdgeReached = true;
      }

      move++;
    }
    
    return mask;
  }

  /**
   * @private
   * @param {'up' | 'down'} direction 
   * @returns {BigInt} маска движения вверх или вниз
   */
  _getVerticalMaskByDirection(direction) {
    const step = BigInt(8);
    const MAX_MOVE = 7; // максимально можно сдвинуться на 7 рядов вверх или вниз
    
    let count = 0;
    let newPosition = this.L;
    let mask = BigInt(0);

    while (count < MAX_MOVE) {
      newPosition = this._getNewPosition(direction, step, newPosition);
      mask = mask | newPosition;

      count++;
    }

    return mask;
  }

  /**
   * @private
   * 
   * @param {'right' | 'left' | 'up' | 'down'} direction - направление налево или направо двигать на один бит
   * @param {BigInt} step - сколько клеток преодолеваем за одну итерацию
   * @param {BigInt} position - текущая клетка шахматной фигуры
   * 
   * @returns {BigInt} - новое положение фигуры после сдвига
   */
  _getNewPosition(direction, step, position) {
    let newPosition = position;

    if ((direction === 'right') || (direction === 'up')) {
      newPosition = position << step;
    }

    if ((direction === 'left') || (direction === 'down')) {
      newPosition = position >> step;
    }

    return newPosition;
  }
}

module.exports = { Bitboard3 };