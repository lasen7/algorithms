/**
 * 힙 정렬
 * 
 * 시간복잡도 O(nlog2n)
 * 
 * 이진 힙 자료구조를 사용
 *  - Full binary tree: 모든 레벨에 노드들이 꽉 차있는 형태
 *  - Complete binary tree: 마지막 레벨을 제외하면 완전히 꽉 차있고, 
 *                           마지막 레벨에는 가장 오른쪽부터 연속된 몇 개의 노드가 비어 있을 수 있음
 * 
 * 힙은 complete binary tree이면서 heap property를 만족해야 한다.
 *  - max heap property: 부모는 자식보다 크거나 같다
 *  - min heap property: 부모는 자식보다 작거나 같다
 * 
 * 동일한 데이터를 가진 서로 다른 힙이 있을 수 있다.
 * 
 * 힙은 일차원 배열로 표현가능: A[1..n]
 *  - 루트노드: A[1]
 *  - A[i]의 부모 = A[i/2]
 *  - A[i]의 왼쪽 자식 = A[2i]
 *  - A[i]의 오른쪽 자식 = A[2i + 1]
 * 
 * Max-HEAPIFY 연산
 *  - 트리의 전쳄 모양은 complete binary tree이다
 *  - 유일하게 루트만이 heap property를 만족 안한다
 *  - 두 자식들 중 더 큰쪽이 나보다 크면 변경한다.
 * 
 * 오른쪽에서 왼쪽으로 연산한다.
 * 
 * 순서:
 *  1. 주어진 데이터로 힙을 만든다.
 *  2. 힙에서 최대값(루트)을 가장 마지막 값과 바꾼다.
 *  3. 힙의 크기가 1 줄어든 것으로 간주한다.
 *  4. 루트노드에 대해서 HEAPIFY(1) 한다.
 *  5. 2~4번을 반복한다.
 */

let heapSize = 0;

const maxHeapify = (arr, index) => {
  let left = (index * 2) + 1;
  let right = (index * 2) + 2;
  let length = arr.length;
  let largest = index;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    maxHeapify(arr, largest);
  }
};

const buildMaxHeap = (arr) => {
  let index = parseInt(arr.length / 2);
  heapSize = arr.length;

  for (let i = index; i >= 0; i--) {
    maxHeapify(arr, i);
  }
};

const heapsort = (arr) => {
  buildMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapSize -= 1;
    maxHeapify(arr, 0);
  }
};

var a = [-5, 91, 57, 7, -5, 0, 10, 24];
heapsort(a);
console.log(a);
