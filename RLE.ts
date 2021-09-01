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

    // if (i === data.length - 1) {
    //   result.push([count, data[i-1]]);
    // }
  }

  return result as [number, string];
}


// function enchancedRLE3(data: string): [number] {
//   const result = [];

//   let substr = '';
//   let matchCount = 1;

//   for (let i = 1; i <= data.length; i++) {
//     if (data[i] === data[i-1] && substr.length > ) {
//       result.push(matchCount);
//     } else {

//     }
//   }

//   return result as [number];
// }

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

function enchancedRLE2(data: string): [number, string] {
  const result = [];

  if (data.length < 2) {
    return [data.length, data[0] || ''];
  }

  let matchCount = 1;
  let noMatchCount = 0;
  let unmatchedSubstring = '';

  for (let i = 1; i <= data.length; i++) {
    if (i === 17) {
      // '#########....#.###.#.##..#...#########'
      console.log('17 before');
      
      
      console.log(data[i]);
      console.log(matchCount, 'matchCount');
      console.log(noMatchCount, 'noMatchCount');
      console.log(unmatchedSubstring, 'unmatchedSubstring');
      
    }

    if (data[i] === data[i-1]) {
      matchCount++;

      if (noMatchCount > 3 && matchCount <= 2) {
        result.push([-noMatchCount, unmatchedSubstring.slice(0, unmatchedSubstring.length - 1)]);
        unmatchedSubstring = '';
        noMatchCount = 0;

        matchCount = 1;
      } else {
        noMatchCount++;
        unmatchedSubstring += data[i];
      }   
    } else {
      // noMatchCount++;

      if (matchCount > 2) {
        if (noMatchCount > 2) {
          const realNoMatchCountLength = noMatchCount - matchCount;
          result.push([-(realNoMatchCountLength), data.substr(i - noMatchCount, realNoMatchCountLength)]);
        }
        result.push([matchCount, data.substr(i - matchCount, matchCount)]);

        matchCount = 1;
        noMatchCount = 0;
        unmatchedSubstring = data[i];

        // unmatchedSubstring += data[i];
      } else {
        if (i === 13) {
          console.log('HERE');
          
        }
        unmatchedSubstring += data[i];
        // console.log(unmatchedSubstring, 'unmatchedSubstring');
      }

      noMatchCount++;

    }

    if (i === 13) {
      // '#########....#.###.#.#.##..#...#########'
      
      console.log(data[i]);
      console.log(matchCount, 'matchCount');
      console.log(noMatchCount, 'noMatchCount');
      console.log(unmatchedSubstring, 'unmatchedSubstring');
      
    } 

    if (i === 14) {
      // '#########....#.###.#.#.##..#...#########'
      
      console.log(data[i]);
      console.log(matchCount, 'matchCount');
      console.log(noMatchCount, 'noMatchCount');
      console.log(unmatchedSubstring, 'unmatchedSubstring');
      
    }
    
    if (i === 15) {
      // '#########....#.###.#.#.##..#...#########'
      
      console.log(data[i]);
      console.log(matchCount, 'matchCount');
      console.log(noMatchCount, 'noMatchCount');
      console.log(unmatchedSubstring, 'unmatchedSubstring');
      
    }

    if (i === 16) {
      // '#########....#.###.#.#.##..#...#########'
      
      console.log(data[i]);
      console.log(matchCount, 'matchCount');
      console.log(noMatchCount, 'noMatchCount');
      console.log(unmatchedSubstring, 'unmatchedSubstring');
      
    }

    if (i === 17) {
      // '#########....#.###.#.#.##..#...#########'
      console.log('17 after');
      
      
      console.log(data[i]);
      console.log(matchCount, 'matchCount');
      console.log(noMatchCount, 'noMatchCount');
      console.log(unmatchedSubstring, 'unmatchedSubstring');
      
    }
  }

  return result as [number, string];
}

function enchancedRLE4(data: string): any[] {
  let result = [];
  let matchCount = 1;
  let noMatchCount = 0;

  for (let i = 1; i <= data.length; i++) {
    console.log(i, 'i');
    console.log(data[i], 'data[i]');
    console.log(matchCount, 'matchCount');
    console.log(noMatchCount, 'noMatchCount');

    if (data[i] === data[i-1]) {
      matchCount++;

      if (matchCount <= 2 && noMatchCount >= 2) {
        result.push(-noMatchCount);
        // noMatchCount = 0;
      }
    } else {
      noMatchCount++;

      if (noMatchCount - matchCount >= 2) {
        result.push(-noMatchCount);
        noMatchCount = 0;
      } else {
        if (matchCount >= 2) {
          result.push(matchCount);
          noMatchCount = 0;
        } else {
          // noMatchCount++;
        }
      }

      // Всегда сбрасываем matchCount
      matchCount = 1;
    }
  }

  return result;
}


// console.log(RLE('#########....#.###.#.#.##..#...#########'));
// console.log(enchancedRLE1('#########....#.###.#.#.##..#...#########'));
// console.log(enchancedRLE2('#########....#.###.#.#.##..#...#########'));
console.log(enchancedRLE4('#########....#.###.#.#.##'));