/**
 * Ходы коня
 */
class Bitboard2 {
  /**
   * 
   * @param {string} data 
   * @returns {[string, string]} - количество ходов и битовая маска
   */
  run(data) {
    const K = BigInt(1) << BigInt(data);
    const onlyVisibleBoard = BigInt('18446744073709551615');

    const noA = BigInt('18374403900871474942');
    const noAB = BigInt('18229723555195321596');
    const noH = BigInt('9187201950435737471');
    const noGH = BigInt('4557430888798830399');

    const movesMask = onlyVisibleBoard & (
      noA & (K >> BigInt(16 - 1) | K << BigInt(16 + 1))
      | noAB & (K >> BigInt(8 - 2) | K << BigInt(8 + 2))
      | noH & (K >> BigInt(16 + 1) | K << BigInt(16 - 1))
      | noGH & (K >> BigInt(8 + 2) | K << BigInt(8 - 2))
    );

    const count = this._getCount(movesMask).toString();
    console.log('count', count);
    console.log('movesMask', movesMask.toString(10));
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
}

module.exports = { Bitboard2 };