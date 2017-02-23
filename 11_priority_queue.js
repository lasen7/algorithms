/**
 * 힙의 응용: 우선순위 큐
 * 
 * 최대 우선순위 큐는 다음의 두 가지 연산을 지원하는 자료구조
 *  - INSERT(x): 새로운 원소 x를 삽입
 *  - EXTRACT_MAX(): 최대값을 삭제하고 반환, 그리고 마지막 노드를 루트 노드로 한 후 heapify한다
 * 
 * 최소 우선순위 큐도 있음
 */

const maxHeapify = (arr, index) => {
  let left = (index * 2) + 1;
  let right = (index * 2) + 2;
  let length = arr.length;
  let largest = index;

  if (left < arr.length && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < arr.length && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    maxHeapify(arr, largest);
  }
};

const getParentIndex = (index) => {
  return index % 2 === 1 ?
    parseInt(index / 2) : parseInt(index / 2) - 1;
}

const maxHeapInsert = (arr, key) => {
  let length = arr.length;
  arr[length] = key;

  let i = length;
  let parent = getParentIndex(i);

  while (i > 0 && arr[parent] < arr[i]) {
    [arr[i], arr[parent]] = [arr[parent], arr[i]];
    i = parent;
    parent = getParentIndex(i);
  }
};

const heapExtractMax = (arr) => {
  if (arr.length < 1) {
    throw new Error('heap underflow');
  }

  let max = arr[0];
  arr[0] = arr[arr.length - 1];
  arr.splice(arr.length - 1);
  maxHeapify(arr, 0);
  return max;
};

let arr = [];

maxHeapInsert(arr, 5);
maxHeapInsert(arr, 2);
maxHeapInsert(arr, 7);
maxHeapInsert(arr, 10);
maxHeapInsert(arr, -5);
maxHeapInsert(arr, -5);
maxHeapInsert(arr, 22);

while (arr.length > 0) {
  console.log(heapExtractMax(arr));
}