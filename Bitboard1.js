/**
 * Ходы короля
 */
class Bitboard1 {
  /**
   * 
   * @param {string} data 
   * @returns {[string, string]} - количество ходов и битовая маска
   */
  run(data) {
    const K = BigInt(1) << BigInt(data);

    const onlyVisibleBoard = BigInt('18446744073709551615');

    const noA = BigInt('18374403900871474942');
    const Ka = BigInt(noA & K);

    const noH = BigInt('9187201950435737471');
    const Kh = BigInt(noH & K);

    const movesMask = onlyVisibleBoard & (
      (Ka << BigInt(7))   | (K << BigInt(8))   | (Kh << BigInt(9))
      | (Ka >> BigInt(1))                    | (Kh << BigInt(1))
      | (Ka >> BigInt(9)) | (K >> BigInt(8)) | (Kh >> BigInt(7))
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
}

module.exports = { Bitboard1 };