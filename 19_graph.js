/**
 * (무방향) 그래프 G = (V, E)
 *  - V: 노드(node) 혹은 정점(vertex)
 *  - E: 노드쌍을 연결하는 에지(edge) 혹은 링크(link)
 *  - 개체(object)들 간의 이진관계를 표현
 *  - n= |V|, m= |E|
 * 
 * 방향 그래프
 *  - 에지 (u, v)는 u로부터 v로의 방향을 가짐
 * 
 * 가중치 그래프
 *  - 에지마다 가중치(weight)가 지정
 * 
 * 인정행렬
 *  - 2차원 배열로 노드와 노드간에 에지가 있으면 1 없으면 0으로 표시한다.
 *  - 저장 공간: O(n^2)
 *  - 어떤 노드 v에 인접한 모든 노드 찾기: O(n) 시간
 *  - 어떤 에지 (u,v)가 존재하는지 검사: O(1) 시간
 * 
 * 인접리스트
 *  - 정점 집합을 표현하는 하나의 배열과 각 정점마다 인접한 정점들의 연결 인접리스트
 *  - 저장 공간: O(n+m)
 *  - 어떤 노드 v에 인접한 모든 노드 찾기: O(degree(v)) 시간
 *  - 어떤 에지 (u,v)가 존재하는지 검사: O(degree(u)) 시간
 * 
 * 경로와 연결성
 *  - 무방향 그래프 G=(V,E)에서 노드 u와 노드 v를 연결하는 경로(path)가 존재할 때
 *    v와 u는 서로 연결되어 있다고 말함. 만약 u와 v가 직접 연결 되어 있으면 인접되어 있다고 함
 *  - 모든 노드 쌍들이 서로 연결된 그래프를 연결된(connected) 그래프라고 한다.
 *  - 연결요소: 연결 된 그래프를 묶어서 connected component 라고 한다.
 * 
 * 그래프 순회
 *  - 그래프의 모든 노드들을 방문하는 일
 *  - 대표적 두 가지 방법: 
 *    ● BFS(Breadth-First Search, 너비우선순회)
 *    ● DFS(Depth-First Search, 깊이우선순회)
 * 
 * 너비우선순회(BFS)
 *  - 출발 노드에서 부터 동심원을 그리듯이 떨어진 노드들을 방문
 *   1. L0 = {s}, 여기서 s는 출발 노드
 *   2. L1 = L0의 모든 이웃 노드들
 *   3. L2 = L1의 이웃들 중 L0에 속하지 않는 노드들 
 * 
 * 큐를 이용한 너비우선순회
 *  - 출발 노드를 큐에 넣고 출발 노드와 인접한 노드를 큐에 넣는 방식
 * 
 * BFS와 최단 경로
 *  - s에서 Li에 속한 노드까지의 최단 경로의 길이는 i이다. (여기서 경로의 길이는 경로에 속한 에지의 갯수를 의미한다)
 *  - BFS를 하면서 각 노드에 대해서 최단 경로의 길이를 구할 수 있다.
 *  - 입력: 방향 혹은 무방향 그래프
 *  - 출력: 모든 노드 v에 대해서 
 *    ● d[v] = s로 부터 v까지의 최단 경로의 길이(에지의 갯수)
 *    ● π[v] = s로 부터 v까지의 최단경로상에서 v의 직전 노드(predecessor)
 * 
 * 깊이우선순회(DFS)
 *  - 미로 찾기와 비슷하게 노드를 탐색하면서 더 이상 탐색할 노드가 없으면 뒤로 돌아간다.
 *  - 그래프가 disconnected 이거나 혹은 방향 그래프라면 DFS에 의해서 모든 노드가 방문되지 않을 수 있음
 *  - DFS를 반복하여 모든 노드 방문
 *  - 시간복잡도: O(n+m)
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
}

let graph = new Graph();
graph.insertVertex('A');
graph.insertVertex('X');
graph.insertVertex('G');
graph.insertVertex('H');
graph.insertVertex('P');
graph.insertVertex('E');
graph.insertVertex('Y');
graph.insertVertex('M');
graph.insertVertex('J');

graph.insertTwoWayEdge(1, 'A', 'X');
graph.insertTwoWayEdge(1, 'X', 'G');
graph.insertTwoWayEdge(1, 'X', 'H');
graph.insertTwoWayEdge(1, 'G', 'H');
graph.insertTwoWayEdge(1, 'G', 'P');
graph.insertTwoWayEdge(1, 'H', 'E');
graph.insertTwoWayEdge(1, 'H', 'P');
graph.insertTwoWayEdge(1, 'E', 'M');
graph.insertTwoWayEdge(1, 'E', 'Y');
graph.insertTwoWayEdge(1, 'Y', 'M');
graph.insertTwoWayEdge(1, 'M', 'J');

// graph.bfs();
graph.dfs();