/**
 * RLE - алгоритм сжатия, эффективный для повторяющихся подряд символов
 * Самая простая реализация
 */
function RLE(data: string): [number, string] {
  const result = [];

  if (data.length < 2) {
    return [data.length, data[0] || ''];
  }

  let count = 1;

  for (let i = 1; i <= data.length; i++) {
    console.log(data[i], 'i');
    
    if (data[i] === data[i-1]) {
      count++;
    } else {
      result.push([count, data[i-1]]);
      count = 1;
    }
  }

  return result as [number, string];
}

/**
 * Реализация RLE с использованием отрицательных чисел -
 * серии уникальных символов, идущих подряд
 */
function enchancedRLE1(data: string): [number, string] {
  const result = [];

  if (data.length < 2) {
    return [data.length, data[0] || ''];
  }

  let matchCount = 1;
  let noMatchCount = 0;
  let unmatchedSubstring = '';

  for (let i = 1; i <= data.length; i++) {    
    if (data[i] === data[i-1]) {
      if (noMatchCount > 0) {
        result.push([-noMatchCount, unmatchedSubstring.slice(0, unmatchedSubstring.length - 1)]);
        unmatchedSubstring = '';
        noMatchCount = 0;
      }
      matchCount++;
    } else {
      if (matchCount > 1) {
        result.push([matchCount, data[i-1]]);
        matchCount = 1;

        unmatchedSubstring = data[i];
      } else {
        unmatchedSubstring += data[i];
        console.log(unmatchedSubstring, 'unmatchedSubstring');
        
        noMatchCount++;
      }
    }
  }

  return result as [number, string];
}