// const { Bitboard1 } = require('./Bitboard1');
const { Bitboard2 } = require('./Bitboard2');
const { Bitboard3 } = require('./Bitboard3');
const { Tester } = require('./Tester');

class Program {
  static main() {
    const task = new Bitboard2();
    // const task = new Bitboard3();
    // const task = new Bitboard1();
    const path = `./tests/2.Bitboard`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();