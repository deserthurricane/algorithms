const { Tester } = require('./Tester');
const { LuckyTicketsTask } = require('./LuckyTicketsTask');

class Program {
  static main() {
    const task = new LuckyTicketsTask();
    const path = `./tests/1.Tickets`;

    const tester = new Tester(task, path);
    tester.runTests();
  }
}

Program.main();