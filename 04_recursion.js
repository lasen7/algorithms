// const func = (n) => {
//   if (n <= 0) {
//     return;
//   } else {
//     console.log('Hello');

//     func(n - 1);
//   }
// };

// func(4);

// const func = (n) => {
//   if (n <= 1) {
//     return 1;
//   } else {
//     return n + func(n - 1);
//   }
// };

// let result = func(10);
// console.log(result);

// const factorial = (n) => {
//   if (n == 0) {
//     return 1;
//   } else {
//     return n * factorial(n - 1);
//   }
// };

// let result = factorial(5);
// console.log(result);

// const power = (number, count) => {
//   if (count === 0) {
//     return 1;
//   } else {
//     return number * power(number, count - 1);
//   }
// };

// let result = power(2, 10);
// console.log(result);

// const fibonachi = (n) => {
//   if (n < 2) {
//     return n;
//   } else {
//     return fibonachi(n - 1) + fibonachi(n - 2);
//   }
// };

// let result = fibonachi(9);
// console.log(result);

// const gcd = (m, n) => {
//   // 최대 공약수 구하기
//   // uclid method

//   // if (m < n) {
//   //   [m, n] = [n, m];
//   // }

//   // if (m % n === 0) {
//   //   return n;
//   // } else {
//   //   return gcd(n, m % n);
//   // }

//   if (n === 0) {
//     return m;
//   } else {
//     return gcd(n, m % n);
//   }
// };

// let result = gcd(120, 15);
// console.log(result);

// const length = (str) => {
//   if(!str) {
//     return 0;
//   } else {
//     return 1 + length(str.substring(1));
//   }
// };

// let result = length('hello world!!!');
// console.log(result);

const binary = (n) => {
  // 2진수 변환  
  if (n < 2) {
    console.log(n);
  } else {
    binary(n / 2);
    console.log(n % 2);
  }
};

let result = binary(16);
console.log(result);

/**
 * 매개변수를 명시화한다.
 */
const search = (data, begin, end, target) => {
  if (begin > end) {
    return -1;
  } else if (target === data[begin]) {
    return begin;
  } else {
    return search(data, begin + 1, end, target);
  }
};