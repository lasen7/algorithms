/**
 * 카운팅 정렬
 *  - 선형시간 정렬 알고리즘
 *  - 카운팅 정렬은 stable 하다.
 *  - k가 클 경우 비실용적
 * 
 * 시간 복잡도는 O(n)
 * 
 * Stable 정렬 알고리즘
 *  - 입력에 동일한 값이 있을 때 입력에 먼저 나오는 값이 출력에서도 먼저 나온다
 */

/**
 * n개의 정수를 정렬하라. 단 모든 정수는 0에서 k사이의 정수이다.
 */
const countingSort = (arr, k) => {
  let counter = [];
  let sorted = [];

  for (let i = 0; i < k; i++) {
    counter[i] = 0;
  }

  // 카운팅
  for (let value of arr) {
    counter[value] += 1;
  }

  // 누적 합
  for (let i = 1; i < k; i++) {
    counter[i] = counter[i] + counter[i - 1];
  }

  // 역순부터 데이터를 정렬하는데 counter의 값이 정렬될 인덱스를 나타낸다.
  // 정렬이 되면 counter의 값을 하나 빼서 다음에 같은 값이 들어갈 인덱스를 나타낸다.
  for (let i = arr.length - 1; i >= 0; i--) {
    sorted[counter[arr[i]] - 1] = arr[i];
    counter[arr[i]] -= 1;
  }

  return sorted;
};

let arr = [2, 5, 3, 0, 2, 3, 1, 0, 3];
arr = countingSort(arr, 10);

console.log(arr);