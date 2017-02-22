/**
 * 상태공간트리: 찾는 해를 포함하는 트리
 * 깊이우선탐색
 */

let cols = [];
const N = 4;

const promising = (level) => {
  for (let i = 1; i < level; i++) {
    if (cols[i] === cols[level]) {
      // 같은 열에 놓였는지 검사
      return false;
    } else if ((level - i) === Math.abs(cols[level] - cols[i])) {
      // 같은 대각선에 놓였는지 검사
      return false;
    }
  }

  return true;
};

const queens = (level) => {
  if (!promising(level)) {
    return false;
  } else if (level === N) {
    for (let i = 1; i < cols.length; i++) {
      process.stdout.write(cols[i] + ' ');
    }
    return true;
  }

  for (let i = 0; i <= N; i++) {
    cols[level + 1] = i;
    if (queens(level + 1)) {
      return true;
    }
  }

  return false;
};

queens(0);