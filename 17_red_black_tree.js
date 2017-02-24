/**
 * 레드-블랙 트리
 *  - 이진탐색트리의 일종
 *  - 균형잡힌 트리: 높이가 O(log2n)
 *  - Search, Insert, Delete 연산을 최악의 경우에도 O(log2n) 시간
 * 
 * NIL 노드
 *  - 각 노드는 하나의 키(key), 왼쪽 자식(left), 오른쪽 자식(right), 그리고 부모노드(p)의 주소를 저장
 *  - 자식노드가 존재하지 않을 경우 NIL 노드라고 부르는 특수한 노드가 있다고 가정
 *  - 따라서 모든 리프노드는 NIL 노드
 *  - 루트의 부모도 NIL 노드라고 가정
 *  - 노드들은 내부노드와 NIL 노드로 분류
 * 
 * 다음의 조건을 만족하는 레드-블랙 트리:
 *  1. 각 노드는 red 혹은 black 이다
 *  2. 루트노드는 black 이다
 *  3. 모든 리프노드(NIL 노드)는 black 이다
 *  4. red 노드의 자식노드들은 전부 black이다 (red 노드는 연속되어 등장하지 않는다)
 *  5. 모든 노드에 대해서 그 노드로부터 자손인 리프노드에 이르는 모든 경로에는 동일한 갯수의 black 노드가 존재한다.
 * 
 * 레드-블랙 트리의 높이
 *  - 노드 x의 높이 h(x)는 자신으로부터 리프노드까지의 가장 긴 경로에 포함된 에지의 갯수이다.
 *  - 노드 x의 블랙-높이 bh(x)는 x로부터 리프노드까지의 경로상의 블랙노드의 갯수이다. (노드 x 자신은 불포함)
 *  - 높이가 h인 노드의 블랙-높이는 bh>=h/2 이다.
 *  - 노드 x를 루트로하는 임의의 부트리는 적어도 2의 bh(x) 제곱 -1개의 내부노드를 포함한다.
 *  - n개의 내부노드를 가지는 레드블랙트리의 높이는 2log2(n+1)이하이다.
 * 
 * Left and Right Rotation
 *  - 시간복잡도 O(1)
 *  - 이진탐색트리의 특성을 유지
 */

class MyNode {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.parent = null;
    this.right = null;
    this.color = null;
  }
}

class RBT {
  constructor() {
    this.root = null;
  }

  add(data) {
    let newNode = new MyNode(data);
    let prev = null;
    let next = this.root;

    while (next !== null) {
      prev = next;

      if (newNode.data < next.data) {
        next = next.left;
      } else {
        next = next.right;
      }
    }

    newNode.parent = prev;

    if (prev === null) {
      // 비어있는 트리이므로 새 노드가 루트가 된다.
      this.root = newNode;
    } else {
      if (newNode.data < prev.data) {
        prev.left = newNode;
      } else {
        prev.right = newNode;
      }
    }

    newNode.left = null;
    newNode.right = null;
    newNode.color = 'RED';

    this.insertFixup(newNode);
  }

  leftRotate(node) {
    // node의 right가 NIL이 아니라고 가정
    // 루트노드의 부모도 NIL이라고 가정
    let rightNode = node.right;
    node.right = rightNode.left;

    if (rightNode.left !== null) {
      rightNode.left.parent = node;
    }
    rightNode.parent = node.parent;

    if (node.parent === null) {
      this.root = rightNode;
    } else {
      if (node === node.parent.left) {
        node.parent.left = rightNode;
      } else {
        node.parent.right = rightNode;
      }
    }

    rightNode.left = node;
    node.parent = rightNode;
  };

  rightRotate(node) {
    // node의 right가 NIL이 아니라고 가정
    // 루트노드의 부모도 NIL이라고 가정
    let leftNode = node.left;
    node.left = leftNode.right;

    if (leftNode.right !== null) {
      leftNode.right.parent = node;
    }
    leftNode.parent = node.parent;

    if (node.parent === null) {
      this.root = leftNode;
    } else {
      if (node === node.parent.right) {
        node.parent.right = leftNode;
      } else {
        node.parent.left = leftNode;
      }
    }

    leftNode.right = node;
    node.parent = leftNode;
  };

  insertFixup(node) {
    // Red-Red 위반을 없애는 함수
    while (node.parent && node.parent.color === 'RED') {
      if (node.parent === node.parent.parent.left) {
        // y는 삼촌 노드
        let y = node.parent.parent.right;
        if (y && y.color === 'RED') {
          // Case 1: node의 삼촌이 red
          node.parent.color = 'BLACK';
          y.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            // Case 2: node의 삼촌이 black, node가 부모의 오른쪽 자식인 경우
            node = node.parent;
            this.leftRotate(node);
          }

          // Case 3: node의 삼촌이 black, node가 부모의 왼쪽 자식인 경우
          node.parent.color = 'BLACK';
          node.parent.parent.color = 'RED';
          this.rightRotate(node.parent.parent);
        }
      } else {
        // y는 삼촌 노드
        let y = node.parent.parent.left;
        if (y.color === 'RED') {
          // Case 4
          node.parent.color = 'BLACK';
          y.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            // Case 5
            node = node.parent;
            this.leftRotate(node);
          }

          // Case 6
          node.parent.color = 'BLACK';
          node.parent.parent.color = 'RED';
          this.rightRotate(node.parent.parent);
        }
      }
    }

    this.root.color = 'BLACK';
  }
}

let tree = new RBT();
tree.add(5);
tree.add(3);
tree.add(8);
tree.add(1);
tree.add(7);
tree.add(2);
tree.add(10);
tree.add(9);
tree.add(4);

console.log(tree);