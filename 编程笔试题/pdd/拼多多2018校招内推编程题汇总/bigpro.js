let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', function(line){
    line = line.split(" ")
    console.log(bigpro(line[0], line[1]))
})
function bigpro(a, b) {
    let len = a.length + b.length
    let len1 = a.length
    let len2 = b.length
    let ans = []
    for (let i = 0; i < len; i++) {
        ans[i] = 0
    }

    for (let i = 0; i < len1; i++) {
        for (let j = 0; j < len2; j++) {
            ans[i + j + 1] += parseInt(a[i]) * parseInt(b[j])
        }
    }

    // 处理进位
    let carry = 0
    for (let i = len-1; i >= 0; i--) {
        ans[i] = ans[i] + carry
        if (ans[i] >= 10) {
            carry = parseInt(ans[i] / 10)
            ans[i] = ans[i] % 10
        } else {
            carry = 0
        }
    }
    if(ans[0] === 0) {
        ans.shift()
    }
    return ans.join('')
}