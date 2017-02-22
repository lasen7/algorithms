/**
 * 분할정복법
 *  - 분할: 피벗을 기준으로 작은 값과 큰 값으로 나눈다.
 *  - 정복: 각 부분을 순환적으로 정렬한다.
 *  - 합병: 이미 피벗을 기준으로 정렬이 되어 있기 때문에 필요가 없다.
 * 최악의 경우: O(n2)
 * 최선의 경우: O(nlogn)
 * 최악의 경우를 피하기 위해 피벗을 랜덤으로 선택하는 경우도 있다.
 */

const partition = function (arr, p, r) {
  let pivot = arr[r];

  // 피벗 보다 작은 값 영역의 인덱스
  let i = p - 1;
  for (let j = p; j < r; j++) {
    if (arr[j] <= pivot) {
      i += 1;

      // swap value
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];

  return i + 1;
};

/**
 * p is start index
 * r is end index
 */
const quicksort = function (arr, p, r) {
  if (p < r) {
    let q = partition(arr, p, r);
    quicksort(arr, p, q - 1);
    quicksort(arr, q + 1, r);
  }
};

let array = [-5, 91, 57, 7, -5, 0, 10, 24];
quicksort(array, 0, array.length - 1);
console.log(array);