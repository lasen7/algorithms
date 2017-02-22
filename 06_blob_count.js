const BACKGROUND_COLOR = 0;
const IMAGE_COLOR = 1;
const ALREADY_COUNTED = 2;

const grid = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0]
];

const N = 5;

const countCells = (x, y) => {
  if (x < 0 || y < 0 || x >= N || y >= N) {
    return 0;
  } else if (grid[x][y] !== IMAGE_COLOR) {
    return 0;
  } else {
    grid[x][y] = ALREADY_COUNTED;
    return 1 + countCells(x - 1, y + 1) + countCells(x, y + 1)
      + countCells(x + 1, y + 1) + countCells(x - 1, y)
      + countCells(x + 1, y) + countCells(x - 1, y - 1)
      + countCells(x + 1, y) + countCells(x - 1, y - 1)
      + countCells(x, y - 1) + countCells(x + 1, y - 1);
  }
};

let count = countCells(2, 2);
console.log('count: ', count);