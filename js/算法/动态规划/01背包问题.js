/**
 * 状态转移方程
 * dp[i][j] = d[i-1][j]  j<w[i]
 * dp[i][j] = Math.max(dp[i-1][j], dp[i][j-w[i]] + v[i])   j>=w[i]
 * https://www.codercto.com/a/21456.html
 * 
 */

 let w = [0,2,3,5,5]
 let v = [0,2,4,3,7]

 function knapSack(w, v, capacity) {
    let len = w.length
    let dp = []
    for (let i = 0; i < len; i++) {
        dp[i] = []
        for (let j = 0; j <= capacity; j++) {
            // 容量为0什么东西都放不进去
            if (j === 0) {
                dp[i][j] = 0
                continue
            }
            //
            if (j < w[i]) {
                if (i === 0) {
                    dp[i][j] = 0
                } else {
                    dp[i][j] = dp[i-1][j]
                }
            } else {
                if (i === 0) {
                    dp[i][j] = v[i]
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-w[i]]+v[i])
                }
            }
        }
    }
    return dp[len-1][capacity]
 }
 console.log(knapSack(w, v, 10))