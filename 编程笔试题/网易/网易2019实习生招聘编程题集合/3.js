let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', function(line){
    line = line.trim().split(' ').map(item => parseInt(item))
    console.log(zhenchu(line[0], line[1]))
})

function zhenchu(l, r) {
    let count = 0
    let dp = []
    dp[1] = false
    let sum = [0, 1]
    for (let i = 2; i <= r; i++) {
        sum[i] = sum[i-1] + i
        if (dp[i-1] === true) {
            dp[i] = dp[i-1] && (i % 3 === 0)
        } else {
            dp[i] = sum[i] % 3 === 0
        }
    }
    for (let i = l; i <= r; i++) {
        if (dp[i] === true) {
            count++
        }
    }
    return count
}