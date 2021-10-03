/**
 * Нахождение наибольшего общего делителя
 */
function gcd(a: number, b: number) {
  console.log(a, b);
  
  if (a === b) {
    return a;
  }

  if (a === 0) {
    return b;
  }

  if (b === 0) {
    return a;
  }

  if (a % 2 === 0 && b % 2 === 0) {
    a = a >> 1;
    b = b >> 1;
    
    return 2 * gcd(a, b);
  }

  if (a % 2 === 0 && b % 2 > 0) {
    a = a >> 1;
    return gcd(a, b);
  }

  if (a % 2 > 0 && b % 2 === 0) {
    b = b >> 1;
    return gcd(a, b)
  }

  if (a > b) {
    return gcd(a - b, b);
  }

  if (b > a) {
    return gcd(a, b - a);
  }
}

function getFractionParts(str): [number, number] {
  const sum = str.split('+');
  
  const [a, b] = sum[0].split('/');
  const [c, d] = sum[1].split('/');

  return [(a * d + c * b), b * d]

}

const result = gcd(
  ...getFractionParts('1/4+1/6')
);

console.log(result, 'result')