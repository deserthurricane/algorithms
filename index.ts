import { Tester } from './Tester';

class Program {
  static main() {
    const task = new Function();
    const path = `./sorting-tests/3.revers`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();