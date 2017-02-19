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
