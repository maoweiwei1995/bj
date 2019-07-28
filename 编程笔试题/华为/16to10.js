let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', function(line){
    console.log(trans(line.trim()))
})


function trans(num16){
    let arr16 = num16.trim()
    let map = {
        'A': 10,
        'B': 11,
        'C': 12,
        'D': 13,
        'E': 14,
        'F': 15
    }
    let sum = 0
    arr16 = arr16.slice(2)
    let len = arr16.length
    for (let i = 0; i < arr16.length; i++) {
        if (map[arr16[i]]) {
            sum += map[arr16[i]] * Math.pow(16, len - i - 1)
        } else {
            sum += arr16[i] * Math.pow(16, len - i - 1)
        }
    }
    return sum
}