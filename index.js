const { Bitboard1 } = require('./Bitboard1');
const { Tester } = require('./Tester');

class Program {
  static main() {
    const task = new Bitboard1();
    const path = `./tests/1.Bitboard`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();