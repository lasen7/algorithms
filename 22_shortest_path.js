/**
 * 최단 경로
 * 
 * Single-source
 *  - 하나의 출발 노드 s로부터 다른 모든 노드까지의 최단 경로를 찾아라
 *  - 예: Dijkstra 알고리즘
 * 
 * Single-destination
 *  - 모든 노드로부터 하나의 목적지 노드까지의 최단 경로를 찾아라
 *  - Single-source 문제와 동일
 * 
 * Single-pair
 *  - 주어진 하나의 출발 노드 s로 부터 하나의 목적지 노드 t까지의 최단 경로를 찾아라
 *  - 최악의 경우 시간 복잡도에서 Single-source 문제보다 나은 알고리즘이 없음
 * 
 * All-pairs
 *  - 모든 노드 쌍에 대해서 최단 경로를 찾아라
 * 
 * 최단경로와 음수 가중치
 *  - 음수 사이클이 있으면 최단 경로가 정의되지 않음
 *  - 알고리즘에 따라 음수 가중치가 있어도 작동하는 경우도 있고 그렇지 않은 경우도 있음
 * 
 * 최단경로의 기본 특성
 *  - 최단 경로의 어떤 부분경로도 역시 최단 경로이다.
 *  - 최단 경로는 사이클을 포함하지 않는다.
 * 
 * Dijkstra 알고리즘
 *  - 음수 가중치가 없다고 가정
 *  - s로부터의 최단경로의 길이를 이미 알아낸 노드들의 집합 s를 유지. 맨 처음엔 s=공집합
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

  shortest() {
    let next = this.first;
    let current = null;
    let edge = null;

    while (next) {
      next.distance = Infinity;
      next = next.next;
    }

    next = this.first;
    next.distance = 0;

    while (next) {
      current = next;
      next = next.next;
      edge = current.edge;

      while (edge) {
        if (edge.destination.distance > current.distance + edge.data) {
          edge.destination.distance = current.distance + edge.data;
        }

        edge = edge.next;
      }
    }

    next = this.first;

    while (next) {
      console.log('%s까지의 최단 거리는 %d입니다', next.key, next.distance);
      next = next.next;
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

graph.shortest();

