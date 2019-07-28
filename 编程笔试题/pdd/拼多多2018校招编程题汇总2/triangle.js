//三角形
/**
 *  利用向量判断三点是否共线 (x1-x2)*(y1-y3) = (y1-y2)*(x1-x3)
 等式成立则三点共线
 */
let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let n = -1
let k = 0
let arr = []
rl.on('line', function(line){
    if (n < 0) {
        n = parseInt(line.trim())
    } else {
        line = line.trim().split(" ").map(item => parseInt(item))
        arr[k] = line
        k++
    }
    if (n === k) {
        triangle(arr)
        n = -1
        k = 0
    }
})

function triangle(arr) {
    let count = 0
    let len = arr.length
    let a = 0, b = 0
    for (let i = 0; i < len - 2; i++) {
        for (let j = i+1; j < len - 1; j++) {
            for (let k = j+1; k < len; k++) {
                a = (arr[i][0] - arr[j][0]) * (arr[i][1] - arr[k][1])
                b = (arr[i][1] - arr[j][1]) * (arr[i][0] - arr[k][0])
                if (a !== b) {
                    count++
                }
            }
        }
    }
    console.log(count)
}