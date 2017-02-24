/**
 * 트리
 *  - 계층적인 구조를 표현: 조직도, 디렉토리와 서브디렉토리, 가계도
 *  - 부모-자식 관계
 *  - 노드(node)들과 노드들을 연결하는 링크(link)들로 구성됨
 *  - 부모가 동일한 노드들을 형제(sibling) 관계라고 부름
 *  - 자식이 없는 노드들을 leaf 노드라고 부름
 *  - 리프노드가 아닌 노드들을 내부(internal) 노드라고 부름
 *  - 부모-자식 관계를 확장한 조상(ancestor)-자손(descendant) 관계
 *  - 트리에서 어떤 한 노드와 그 노드의 자손들로 이루어진 트리를 부트리(sub tree)라고 부른다
 *  - 레벨, 높이
 * 
 * 트리의 기본적인 성질
 *  - 노드가 N개인 트리는 항상 N-1개의 링크를 가진다
 *  - 트리에서 루트에서 어떤 노드로 가는 경로는 유일하다. 또한 임의의 두
 *    노드간의 경로도 유일하다.
 * 
 * 이진 트리(binary tree)
 *  - 이진 트리에서 각 노드는 최대 2개의 자식을 가진다.
 *  - 각각의 자식 노드는 자신이 부모의 왼쪽 자식인지 오른쪽 자식인지가 지정된다.
 * 
 * Full and Complete binary tree
 *  - 높이가 h인 full binary tree는 2의 h제곱 -1개의 노드를 가진다
 *  - 노드가 N개인 full 혹은 complete 이진 트리의 높이는 O(logN)이다
 * 
 * 이진트리의 표현
 *  - 링크드 리스트
 * 
 * 이진트리의 순회(traversal)
 *  - 순회: 이진 트리의 모든 노드를 방문하는 일
 *  - 중순위(inorder) 순회: 왼쪽 -> 루트 -> 오른쪽
 *  - 선순위(preorder) 순회: 루트 -> 왼쪽 -> 오른쪽
 *  - 후순위(postorder) 순회: 왼쪽 -> 오른쪽 -> 루트
 *  - 레벨오더(level-order) 순회: 레벨 순으로 방문, 동일 레벨에서는 왼쪽에서 오른쪽 순서로, 큐를 이용하여 구현
 */