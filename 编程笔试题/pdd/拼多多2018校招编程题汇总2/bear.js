let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let bear = []
let candy = []
let n = -1
let k = -1
let cur = 0
rl.on('line', function(line){
    if ( k === -1) {
        k++
        n = parseInt(line.trim().split(' ')[0])
        // console.log('n:', n)
    } else if (k === 0){
        candy = line.trim().split(' ').map(item => parseInt(item))
        k++
    } else {
        bear.push(line.trim().split(' ').map(item => parseInt(item)))
        cur++
        // console.log('cur:', cur)
    }
    if (cur === n) {
        bbb(bear, candy)
        n = -1
        k = -1
        cur = 0
        bear = []
        candy = []
    }
})


function bbb(bear, candy) {
    let blen = bear.length
    let ans = []
    bear.sort((a, b) => b[0] - a[0])
    candy.sort((a, b) => b - a)
    for (let i = 0; i < blen; i++) {
        ans[i] = bear[i][1]
    }
    let i = 0, j = 0
    while (bear[i] && candy[j]) {
        while (ans[i] > 0 && candy[j]) {
            while (candy[j] && ans[i] < candy[j]) {
                j++
            }
            if (!candy[j]){
                continue
            }
            ans[i] -= candy[j]
            candy.splice(j, 1)
        }
        i++
        j = 0
    }
    for (let i = 0; i < blen; i++) {
        console.log(ans[i])
    }
}
