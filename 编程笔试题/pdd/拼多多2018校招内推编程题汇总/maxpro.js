let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let n = -1
let k = 0

rl.on('line', function(line){
    if (n === -1){
        n++
    } else {
        let arr = line.split(' ').map(item => parseInt(item))
        console.log(max(arr))
        n = -1
    }

})

function max(arr) {

    let max1 = Number.MIN_VALUE
    let max2 = Number.MIN_VALUE
    let max3 = Number.MIN_VALUE
    let min1 = Number.MAX_VALUE
    let min2 = Number.MAX_VALUE
    let maxPro1 = 0
    let maxPro2 = 0
    let len = arr.length
    // console.log(arr)
    for (let i = 0; i < len; i++) {
        if (arr[i] > max1) {
            max3 = max2
            max2 = max1
            max1 = arr[i]
        } else if (arr[i] > max2) {
            max3 = max2
            max2 = arr[i]
        } else if (arr[i] > max3) {
            max3 = arr[i]
        }
        if (arr[i] < min1) {
            min2 = min1
            min1 = arr[i]
        } else if (arr[i] < min2) {
            min2 = arr[i]
        } else {
            continue
        }
    }
    maxPro1 = max3 * max2 * max1
    maxPro2 = max1 * min2 * min1
    return Math.max(maxPro1, maxPro2)
}