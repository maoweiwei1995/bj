let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let n = 0
let h = []
let w = []
rl.on('line', function(line){
    if (n === 0) {
        n++
    } else if (n === 1) {
        h = line.split(' ')
        n++
    } else if (n === 2) {
        n++
    } else if(n === 3) {
        w = line.split(' ')
        console.log(children(h, w))
    } else {
        n = 0
    }
})
function children(h , w) {
    h.sort((a, b) => parseInt(a) - parseInt(b))
    w.sort((a, b) => parseInt(a) - parseInt(b))
    let ans = 0
    let i = 0, j = 0
    while(h[i] && w[j]) {
        if (parseInt(h[i]) <= parseInt(w[j])) {
            i++
            j++
            ans++
        } else {
            j++
        }
    }
    return ans
}