/**
 * 삽입정렬: 자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된
 * 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘이다.
 * 최악의 경우: O(n2)
 * 최선의 경우: O(n)
 */

const insertionSort = (array) => {
  let copiedArray = array.slice();

  for (let i = 1; i < copiedArray.length; i++) {
    let insertValue = copiedArray[i];

    let j = i - 1;
    while ((j >= 0) && (copiedArray[j] > insertValue)) {
      copiedArray[j + 1] = copiedArray[j];
      j--;
    }
    copiedArray[j + 1] = insertValue;
  }

  return copiedArray;
};

let array = [5, 91, 57, 7, -5, 0, -100, 10, 24];
let sortedArray = insertionSort(array);

console.log(sortedArray);