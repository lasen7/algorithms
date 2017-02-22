const maze = [
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 1, 0, 0],
];

const N = 8;

const PATHWAY = 0;
const WALL = 1;
const BLOCKED = 2;
const PATH = 3;

const findPath = (x, y) => {
  if (x < 0 || y < 0 || x >= N || y >= N) {
    return false;
  } else if (maze[x][y] !== PATHWAY) {
    // 이미 방문한 길이라면
    return false;
  } else if (x === N - 1 && y === N - 1) {
    return true;
  } else {
    maze[x][y] = PATH;
    if (findPath(x - 1, y) || findPath(x, y + 1)
      || findPath(x + 1, y) || findPath(x, y - 1)) {
      return true;
    }

    maze[x][y] = BLOCKED;
    return false;
  }
};

const printMaze = () => {
  for (let row of maze) {
    for (let col of row) {
      process.stdout.write(col + ' ');
    }
    console.log();
  }
};

findPath(0, 0);
printMaze();