var primes = [
  2, 3, 5, 7, 11,
  13, 17, 19, 23, 29,
  31, 37, 41, 43, 47,
  53, 59, 61, 67, 71,
  73, 79, 83, 89, 97
];

const binarySearch = (want) => {
  let min = 0;
  let max = primes.length - 1;

  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    let prime = primes[mid];

    if (prime === want) {
      return mid;
    } else if (prime < want) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return -1;
}

const want = 73;
const result = binarySearch(want);
console.log(result);