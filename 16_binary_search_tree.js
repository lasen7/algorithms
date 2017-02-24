/**
 * Dynamic Set
 *  - 여러 개의 키를 저장
 *  - 다음과 같은 연산들을 지원하는 자료구조: 
 *    ● INSERT - 새로운 키의 삽입
 *    ● SEARCH - 키 탐색
 *    ● DELETE - 키의 삭제
 * 
 * 정렬된 혹은 정렬되지 않은 배열 혹은 연결 리스트를 사용할 경우
 * INSERT, SEARCH, DELETE 중 적어도 하나는 O(n)
 * 
 * 이진탐색트리, 레드-블랙 트리, AVL-트리 등의 트리에 기반한 구조들
 * Direct Address Table, 해쉬 테이블 등
 * 
 * 
 * 검색트리
 *  - Dynamic set을 트리의 형태로 구현
 *  - 일반적으로 search, insert, delete 연산이 트리의 높이에 비례하는 시간복잡도를 가짐
 * 
 * 이진검색트리(BST)
 *  - 이진트리
 *  - 각 노드에 하나의 키를 저장
 *  - 각 노드 v에 대해서 그 노드의 왼쪽 부트리에 있는 키들은 key[v] 보다 작거나 같고,
 *    오른쪽 부트리에 있는 값은 크거나 같다.
 *  - 시간복잡도는 O(h), h는 트리의 높이
 *  - 최악의 경우 O(n)
 * 
 * Successor
 *  - 노드 x의 successor란 key[x] 보다 크면서 가장 작은 키를 가진 노드
 *  - 모든 키들이 서로 다르다고 가정
 * 
 * Successor 3가지 경우
 *  - 노드 x의 오른쪽 부트리가 존재할 경우, 오른쪽 부트리의 최소값
 *  - 오른쪽 부트리가 없는 경우, 부모를 따라 루트까지 올라가면서 처음으로 누군가의 왼쪽 자식이 된느 노드
 *  - 그런 노드가 존재하지 않을 경우 successor가 존재하지 않음(즉, x가 최대값)
 * 
 * Predecessor
 *  - 노드 x의 predecessor란 key[x] 보다 작으면서 가장 큰 키를 가진 노드
 *  - successor와 반대
 * 
 * Insert시 기존의 노드는 변경되지 않고 새로 추가된다.
 * 
 * Delete
 *  1. 자식 노드가 없는 경우: 그냥 삭제
 *  2. 자식노드가 1개인 경우: 자신의 자식노드를 원래 자신의 위치로
 *  3. 자식노드가 2개인 경우: 삭제하려는 노드의 successor를 찾아서 삭제하려는 노드로 데이터만 복사한다.
 *                           successor는 왼쪽 노드를 가지지 않으므로 successor노드를 삭제하기 위해서 1, 2번 방식이 사용된다.
 */


class MyNode {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.parent = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    let newNode = new MyNode(data);
    let next = this.root;
    let prev = null;

    while (next !== null) {
      if (next.data < data) {
        // right
        prev = next;
        next = next.right;
      } else {
        // left
        prev = next;
        next = next.left;
      }
    }

    if (prev === null) {
      // root
      this.root = newNode;
    } else {
      newNode.parent = prev;

      if (prev.data < data) {
        prev.right = newNode;
      } else {
        prev.left = newNode;
      }
    }
  }

  delete(data) {
    let node = this.search(data);
    if (node === null) {
      // not found
      return null;
    }

    // deleteNode는 0 또는 1개의 자식을 갖는다.
    // 그 이유는 if문에서 left 또는 right가 null인 것을 찾거나
    // successor는 왼쪽 자식을 갖지 않기 때문이다.
    let deleteNode = null;

    if (node.left === null || node.right === null) {
      deleteNode = node;
    } else {
      deleteNode = this.successor(node);
    }

    let childNode = null;

    if (deleteNode.left !== null) {
      childNode = deleteNode.left;
    } else {
      childNode = deleteNode.right;
    }

    if (childNode !== null) {
      // 삭제하려고 하는 노드의 자식 노드와 삭제하려는 노드의 부모 노드를 연결한다.
      childNode.parent = deleteNode.parent;
    }

    if (deleteNode.parent === null) {
      // 루트 노드라면 childNode가 루트가 된다
      this.root = childNode;
    } else {
      // 삭제하려는 노드가 부모노드의 왼쪽 노드라면 왼쪽 노드로 연결하고
      // 오른쪽 노드라면 오른쪽 노드에 연결한다.
      if (deleteNode === deleteNode.parent.left) {
        deleteNode.parent.left = childNode;
      } else {
        deleteNode.parent.right = childNode;
      }
    }

    if (deleteNode !== node) {
      // case 3: successor
      node.data = deleteNode.data;      
    }

    return deleteNode;
  }

  search(data) {
    let next = this.root;

    while (next !== null) {
      if (next.data === data) {
        return next;
      } else if (next.data < data) {
        // right
        next = next.right;
      } else {
        // left
        next = next.left;
      }
    }

    return null;
  }

  minimum(node = this.root) {
    // on the far left
    let next = node;
    while (next.left !== null) {
      next = next.left;
    }

    return next;
  }

  maximum(node = this.root) {
    // on the far right
    let next = node;
    while (next.right !== null) {
      next = next.right;
    }

    return next;
  }

  successor(node = this.root) {
    if (node.right !== null) {
      return this.minimum(node.right);
    }

    let parent = node.parent;
    let child = node;
    while (parent !== null && child === parent.right) {
      child = parent;
      parent = parent.parent;
    }

    return parent;
  }
}

let tree = new BST();
tree.add(5);
tree.add(3);
tree.add(8);
tree.add(1);
tree.add(7);
tree.add(2);
tree.add(10);

let search = tree.search(5);
console.log('search: ', search && search.data);

let minNode = tree.minimum(search);
console.log('minimum: ', minNode.data);

let maxNode = tree.maximum(search);
console.log('maximum: ', maxNode.data);

let successorNode = tree.successor(search);
console.log('successor: ', successorNode.data);

let deleteNode = tree.delete(5);
console.log('delete: ', deleteNode.data);