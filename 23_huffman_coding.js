/**
 * 압축 기법
 * 
 * 가령 6개의 문자 a,b,c,d,e,f로 이루어진 파일이 있다고 할 때
 *  - Fixed-length code: 3비트로 알파벳을 치환한다. ex) a: 000, b: 110, c: 010
 *  - Variable-length: 가변길이를 사용한다. ex) a:0, b: 101, c: 100
 *  - 가변길이 코드를 사용하면 비트 수를 줄일 수 있다.
 * 
 * Prefix Code
 *  - 어떤 codeword도 다른 codeword의 prefix가 되지 않는 코드(여기서 codeword란 하나의 문자에 부여된 이진코드)
 *  - 모호함이 없이 decode가 가능함
 *  - prefix code는 하나의 이진트리로 표현 가능함
 *  - 모든 문자 노드들은 leaf 노드이다.(그래야만 prefix가 겹치지 않음)
 * 
 * Huffman Coding(무손실 압축)
 *  - 가장 작은 빈도수를 가진 노드를 합쳐서 트리로 만들고 반복한다.
 * 
 * Run-Length Encoding(무손실 압축)
 *  - 런은 동일한 문자가 하나 혹은 그 이상 연속해서 나오는 것을 의미한다.
 *    예를들어 str="aaabba"는 3개의 런으로 구성된다: "aaa", "bb", "a"
 *  - 각각의 런을 그 "런을 구성하는 문자"와 "런의 길이"의 순서쌍으로 인코딩한다.
 *    위의 str은 다음과 같이 코딩된다: 3a2b1a
 *  - 길이가 긴 런들이 많은 경우에 효과적이다. ex) 이미지 파일
 * 
 * Huffman Method with Run-Length Encoding
 *  - 파일을 구성하는 각각의 런들을 하나의 super-symbol로 본다.
 *    이 super-symbol들에 대해서 Huffman coding을 적용한다.
 *  - 예를들어 문자열 AAABAACCAABA는 5개의 super-symbol들 AAA, B, AA, CC, A로 구성된다
 * 
 *  1. Run과 frequency 찾기
 *  2. 허프만 트리
 *   - 매 단계에서 가장 frequency가 작은 두 트리를 찾아서 하나로 합친다
 *   - 최소 힙을 사용한다
 *  3. codeword 부여하기
 *  4. 인코딩
 *   - 압축파일의 맨 앞부분에 파일을 구성하는 run들에 대한 정보를 기록한다.
 *   - 원본 파일의 길이도 함께 기록한다. => 파일은 바이트 단위이기 때문에
 */