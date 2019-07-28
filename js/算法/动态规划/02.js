let w = [0,2,3,5,5]
let v = [0,2,4,3,7]
function bag(w, v, capacity) {
    let dp = []
    let len = w.length
    for (let i = 0; i < len; i++) {
        dp[i] = []
        for (let j = 0; j <= capacity; j++) {
            if (j === 0) {
                dp[i][j] = 0
                continue
            }
            if (j < w[i]) {
                if (i === 0) {
                    dp[i][j] = 0
                } else {
                    dp[i][j] = dp[i][j-1]
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
console.log(bag(w, v, 10))