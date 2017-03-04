/**
 * 동적계획법
 * 
 * Memoization
 *  - 예를들어 피보나치 수열을 리커전으로 계산시 이전 값들을 중복해서 계산하게 된다.
 *    중간 계산 결과를 caching 함으로써 중복 계산을 피하는 것
 *  - top-down 방식
 * 
 * Dynamic programming
 *  - bottom-up 방식
 *  - f[1] = f[2] = 1;
 *    for(int i=3; i<=n; i++) {
 *      f[n] = f[n-1] + f[n-2];
 *    }
 *  - 밑에서 부터 올라가면서 계산하면서 중복계산을 피함
 *  
 *  Longest Common Subsequence(LCS)
 *  - <bcdb>는 문자열 <abcbdab>의 subsequence이다.
 *  - <bca>는 문자열 <abcdbab>와 <bdcaba>의 common subsequence이다.
 *  - common subsequence들 중 가장 긴 것
 */