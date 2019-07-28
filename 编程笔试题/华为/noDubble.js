let readline = require('readline')
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let k = 0
let n = -1
let arr = []
rl.on('line', function(data){
    if (n < 0){
        n = parseInt(data.trim())
    } else {
        arr.push(parseInt(data.trim()))
        k++
    }
    if (k === n) {
        noDubble(arr)
        n = -1
        arr = []
        k = 0
    }
})


function noDubble(arr) {
    arr = [...(new Set(arr))]
    arr.sort((a, b)=>{
        return a - b
    })
    for (let i = 0; i < arr.length;i++){
        console.log(arr[i])
    }
}