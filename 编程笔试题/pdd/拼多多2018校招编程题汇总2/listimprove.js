//列表补全
let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


rl.on('line', function(line){
    line = line.split(' ')
    improve(line)
})
// improve([4,1,3,3])
function improve(arr){
    let offset = parseInt(arr[0])
    let n = parseInt(arr[1])
    let l1 = parseInt(arr[2])
    let l2 = parseInt(arr[3])

    let s1 = 0
    let e1 = 0
    let s2 = 0
    let e2 = 0
    if (offset <= l1) {
        if (offset + n <= l1) {
            s1 = offset
            e1 = offset + n
            s2 = 0
            e2 = 0
        } else if (offset + n > l1 && offset + n <= l1 + l2){
            s1 = offset
            e1 = l1
            s2 = 0
            e2 = offset + n - l1
        } else {
            s1 = offset
            e1 = l1
            s2 = 0
            e2 = l2
        }
    } else if (offset > l1 && offset <= l1 + l2) {
        if (offset + n <= l1 + l2) {
            s1 = l1
            e1 = l1
            s2 = offset - l1
            e2 = offset + n - l1    
        } else {
            s1 = l1
            e1 = l1
            s2 = offset  - l1
            e2 = l2
        }
    } else {
        s1 = l1
        e1 = l1
        s2 = l2
        e2 = l2
    }
    let ans = `${s1} ${e1} ${s2} ${e2}`
    console.log(ans)
}
