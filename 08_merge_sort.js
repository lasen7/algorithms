/**
 * 분할정복법
 *  - 분할: 해결하고자 하는 문제를 작은 크기의 동일한 문제들로 분할
 *  - 정복: 각각의 작은 문제를 순환적으로 해결
 *  - 합병: 작은 문제의 해를 합하여(merge) 원래 문제에 대한 해를 구함
 */

const merge = (data, p, q, r) => {
  let i = p;
  let j = q + 1;
  let k = p;
  let tmp = [];

  while (i <= q && j <= r) {
    if (data[i] <= data[j]) {
      tmp[k++] = data[i++];
    } else {
      tmp[k++] = data[j++];
    }
  }

  while (i <= q) {
    tmp[k++] = data[i++];
  }

  while (j <= r) {
    tmp[k++] = data[j++];
  }

  for (let i = p; i <= r; i++) {
    data[i] = tmp[i];
  }
};

const mergeSort = (data, p, r) => {
  if (p < r) {
    let q = Math.floor((p + r) / 2);
    mergeSort(data, p, q);
    mergeSort(data, q + 1, r);
    merge(data, p, q, r);
  }
};

let array = [5, 91, 57, 7, -5, 0, -100, 10, 24];
mergeSort(array, 0, array.length - 1);
console.log(array);