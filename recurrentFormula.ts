/**
  Условие задачи
  
  Дано число N. Выяснить, сколько N-значных чисел можно составить,
  используя цифры 5 и 8, в которых три одинаковые цифры не стоят рядом?

  Начальные данные: натуральное число N.
  Диапазон значений: N от 1 до 88.
  Вывод результата: одно число - количество разных N-значных чисел по условию (сами числа выводить не надо).

  Например, при N = 3 ответ будет 6.
 */

/**
 * Поиск количества чисел, удовлетворяющих рекуррентной формуле
 */
function getRecurrentCount(n: number) {
  let p8 = 1;
  let f88 = 0;
  let f55 = 0;
  let p5 = 1;
  let sum = 2;

  for (let i = 1; i < n; i++) {
    const p8Next = f55 + p5;
    const f88Next = p8;
    const f55Next = p5;
    const p5Next = f88 + p8;

    p8 = p8Next;
    f88 = f88Next;
    f55 = f55Next;
    p5 = p5Next;
    
    sum = p8 + f88 + f55 + p5;
  }

  console.log(sum,' sum');
  
  return sum;
}

getRecurrentCount(3);
getRecurrentCount(4);