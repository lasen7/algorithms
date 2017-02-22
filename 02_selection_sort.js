/**
 *  삽입정렬: 가장 작은 값을 찾아서 0번째 인덱스 부터 교체 하는 방식
 *  시간복잡도: O(n2)
 *  최악, 최선, 평균의 시간복잡도는 같다
 */
const selectionSort = (array) => {
  const copiedArray = array.slice();

  let minValue = 0;
  let minIndex = -1;

  for (let i = 0; i < copiedArray.length; i++) {
    minIndex = -1;
    minValue = copiedArray[i];

    for (let j = i + 1; j < copiedArray.length; j++) {
      if (copiedArray[j] < minValue) {
        minValue = copiedArray[j];
        minIndex = j;
      }
    }

    // swap value
    if (minIndex !== -1) {
      let temp = copiedArray[i];
      copiedArray[i] = copiedArray[minIndex];
      copiedArray[minIndex] = temp;
    }
  }

  return copiedArray;
};

let array = [5, 91, 57, 7, -5, 0, -100, 10, 24];
let sortedArray = selectionSort(array);

console.log(sortedArray);
