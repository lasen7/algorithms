/**
 * 최소비용 신장 트리(Minimum spanning Tree)
 *  - 무방향 가중치 그래프
 *    ● 그래프의 모든 정점들이 서로 연결된다.
 *    ● 가중치의 합이 최소가 된다.
 * 
 * 왜 트리라고 부르나?
 *  - 싸이클이 없는 연결된 무방향 그래프를 트리라고 부른다.
 *  - MST 문제의 답은 항상 트리가 됨.
 * 
 * Generic MST 알고리즘
 *  - 어떤 MST의 부분집합 A에 대해서 AU{(u,v)}도 역시 어떤 MST의
 *    부분집합이 될 경우 에지 (u,v)는 A에 대해서 안전하다고 한다.
 *  1. 처음에는 A=공집합이다
 *  2. 집합 A에 대해서 안전한 에지를 하나 찾은 후 이것을 A에 더한다.
 *  3. 에지의 갯수가 n-1개가 될 때까지 2번을 반복한다.(트리이기 때문에 에지의 갯수는 n-1)
 * 
 * 안전한 에지
 *  - 그래프의 정점들을 두 개의 집합 S와 V-S(S를 제외한 부분)로 분할한 것을 컷이라고 부른다.
 *  - 에지 (u,v)에 대해서 u∈S 이고 v∈V-S 일 때 에지 (u,v)는 컷을 cross한다고 말한다.
 *  - 에지들의 부분집합 A에 속한 어떤 에지도 컷을 cross하지 않을 때 컷은 A를 존중한다고 말한다.
 * 
 * 정리
 *  - A가 어떤 MST의 부분집합이고, (S, V-S)는 A를 존중하는 컷이라고 하자.
 *    이 컷을 cross하는 에지들 중 가장 가중치가 작은 에지 (u,v)는 A에 대해서 안전하다.
 * 
 * Kruskal의 알고리즘
 *  - 에지들을 가중치의 오름차순으로 정렬한다.
 *  - 에지들을 그 순서대로 하나씩 선택해 간다. 단, 이미 선택된 에지들과 사이클을 형성하면 선택하지 않는다.
 *  - n-1개의 에지가 선택되면 종료한다.
 * 
 * 사이클 검사
 *  - 초기상태: 선태된 에지 없음
 *  - 각각의 연결요소를 하나의 집합으로 표현: ex) {a}, {b}, {c}
 *  - 가중치가 최소인 에지를 찾고 에지를 선택해서 합집합하여 하나의 집합으로 만든다: ex) {a}, {b,c}
 *  - 만약 에지가 같은 집합에 있다면 사이클을 만드므로 패스
 * 
 * 서로소인 집합들의 표현
 *  - 각 집합을 하나의 트리로 표현
 *  - 집합의 각 원소들이 트리의 노드가 됨. 누가 루트이고 누가 누구의 부모이든 상관없음
 *  - 트리의 각 노드는 자식노드가 아닌 부모노드의 주소를 가짐(상향식 트리)
 * 
 * Union
 *  - 한 트리의 루트를 다른 트리의 루트의 자식 노드로 만듦
 *  - 루트노드를 찾는데 o(h)
 * 
 * Weighted Union
 *  - 두 집합을 union 할 때 작은 트리의 루트를 큰 트리의 루트의 자식으로 만듦(크기는 노드의 갯수)
 * 
 * Prim의 알고리즘
 *  - 임의의 노드를 출발노드로 선택
 *  - 출발 노드를 포함하는 트리를 점점 키워 감
 *  - 매 단계에서 이미 트리에 포함된 노드와 포함되지 않은 노드를 연결하는
 *    에지들 중 가장 가중치가 작은 에지를 선택
 * 
 * 가중치가 최소인 에지 찾기
 *  - Va = 이미 트리에 포함된 노드들
 *  - Va에 아직 속하지 않은 각 노드 v에 대해서 다음과 같은 값을 유지
 *    ● key(v): 이미 Va에 속한 노드와 자신을 연결하는 에지들 중 가중치가 최소인 에지의 가중치
 *    ● π(v): 그 에지의 끝점
 */

class Edge {
  constructor(data, dest) {
    this.next = null;
    // data는 가중치로 쓰인다
    this.data = data;
    // destination는 vertex를 가리키기 위한 변수
    this.destination = dest;
  }
}

class Vertex {
  constructor(key) {
    // 다음 Vertex를 가리키기 위한 변수
    this.next = null;
    this.key = key;
    // 다음 edge를 가리키기 위한 변수
    this.edge = null;
    this.visited = false;
  }
}

class Graph {
  constructor() {
    this.count = 0;
    this.first = null;
  }

  insertVertex(key) {
    let vertex = new Vertex(key);
    let last = this.first;

    if (!last) {
      this.first = vertex;
    } else {
      while (last.next !== null) {
        last = last.next;
      }
      last.next = vertex;
    }

    this.count += 1;
  }

  insertEdge(data, fromKey, toKey) {
    let from = this.searchVertex(fromKey);
    let to = this.searchVertex(toKey);

    if (!from || !to) {
      return false;
    }

    let edge = new Edge(data, to);
    let fromLast = from.edge;

    if (!fromLast) {
      from.edge = edge;
    } else {
      while (fromLast.next !== null) {
        fromLast = fromLast.next;
      }
      fromLast.next = edge;
    }
  }

  insertTwoWayEdge(data, fromKey, toKey) {
    this.insertEdge(data, fromKey, toKey);
    this.insertEdge(data, toKey, fromKey);
  }

  deleteVertex(key) {
    let vertex = this.first;
    let prev = null;

    while (vertex !== null) {
      if (vertex.key === key) {
        break;
      }

      prev = vertex;
      vertex = vertex.next;
    }

    if (!vertex) {
      return false;
    }

    if (!prev) {
      this.first = vertex.next;
    } else {
      prev.next = vertex.next;
    }

    this.count -= 1;

    return true;
  }

  deleteEdge(fromKey, toKey) {
    let from = this.searchVertex(fromKey);
    let fromEdge = from.edge;
    let prevEdge = null;

    while (fromEdge !== null) {
      if (fromEdge.destination.key === toKey) {
        break;
      }

      prevEdge = fromEdge;
      fromEdge = fromEdge.next;
    }

    if (!fromEdge) {
      return false;
    }

    if (!prevEdge) {
      from.edge = fromEdge.next;
    } else {
      prevEdge.next = fromEdge.next;
    }
  }

  searchVertex(key) {
    let vertex = this.first;

    while (vertex !== null) {
      if (vertex.key === key) {
        return vertex;
      }
      vertex = vertex.next;
    }

    return null;
  }

  bfs() {
    // 너비우선탐색: 큐를 이용한다, 그냥 배열 씀
    let queue = [];
    let vertex = this.first;

    // visited를 초기화 한다.
    while (vertex) {
      vertex.visited = false;
      vertex = vertex.next;
    }

    vertex = this.first;
    queue.push(vertex);
    vertex.visited = true;

    while (queue.length) {
      vertex = queue.shift();
      vertex.visited = true;
      console.log(vertex.key);

      let edge = vertex.edge;
      while (edge) {
        if (!edge.destination.visited) {
          // 방문 하지 않은 vertex를 큐에 넣는다.
          queue.push(edge.destination);
          edge.destination.visited = true;
        }
        edge = edge.next;
      }
    }
  }

  dfs() {
    // 깊이우선탐색: 스택을 이용한다
    let stack = [];
    let vertex = this.first;

    // visited를 초기화 한다.
    while (vertex) {
      vertex.visited = false;
      vertex = vertex.next;
    }

    vertex = this.first;
    stack.push(vertex);
    vertex.visited = true;

    while (stack.length) {
      vertex = stack.pop();
      console.log(vertex.key);

      let edge = vertex.edge;
      while (edge) {
        if (!edge.destination.visited) {
          stack.push(edge.destination);
          edge.destination.visited = true;
        }

        edge = edge.next;
      }
    }
  }

  mst() {
    // 최소비용 신장트리, prim 알고리즘
    let first = this.first;
    let intreeCount = 0;

    // visited를 초기화 한다.
    while (first) {
      first.visited = false;
      first = first.next;
    }

    this.first.visited = true;
    intreeCount += 1;

    console.log(`${this.first.key} 버텍스가 추가되었습니다.`);

    let temp = this.first;
    let current = null;
    // 최소 에지
    let minEdge = null;
    // 최소 에지의 출발 버텍스
    let startVertex = null;
    let edge = null;

    while (intreeCount !== this.count) {
      while (temp) {
        current = temp;
        temp = temp.next;

        if (!current.visited) {
          // 방문한 노드가 아니면 패스
          continue;
        }

        edge = current.edge;

        while (edge) {
          // 모든 에지를 찾아가서 최소 에지를 구한다
          if (!edge.destination.visited) {
            if (!minEdge) {
              minEdge = edge;
            }

            if (minEdge.data > edge.data) {
              minEdge = edge;
              startVertex = current;
            }
          }
          edge = edge.next;
        }
      }

      minEdge.destination.visited = true;
      intreeCount += 1;

      console.log('%s 버텍스에서 %s 버텍스로 향하는 가중치 %d의 아크가 추가되었습니다.', startVertex.key, minEdge.destination.key, minEdge.data);
      minEdge = null;
      temp = this.first;
    }
  }
}

var graph = new Graph();
graph.insertVertex('A');
graph.insertVertex('B');
graph.insertVertex('C');
graph.insertVertex('D');
graph.insertVertex('E');
graph.insertVertex('F');
graph.insertTwoWayEdge(6, 'A', 'B');
graph.insertTwoWayEdge(3, 'A', 'C');
graph.insertTwoWayEdge(2, 'B', 'C');
graph.insertTwoWayEdge(5, 'B', 'D');
graph.insertTwoWayEdge(3, 'C', 'D');
graph.insertTwoWayEdge(4, 'C', 'E');
graph.insertTwoWayEdge(2, 'D', 'E');
graph.insertTwoWayEdge(3, 'D', 'F');
graph.insertTwoWayEdge(5, 'E', 'F');
graph.mst();