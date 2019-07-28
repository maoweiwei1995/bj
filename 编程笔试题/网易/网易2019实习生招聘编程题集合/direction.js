let readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', function(line){
    line = line.trim()
    direction(line)
})
function direction(str) {
    let count = 0
    let maparr = {
        0: 'N',
        1: 'E',
        2: 'S',
        3: 'W'
    }
    for(let i = 0, len = str.length; i < len; i++) {
        if (str[i] === 'L') {
            count--
        } else {
            count++
        }
    }
    count = count % 4
    if (count < 0) {
        count += 4
    }
    console.log(maparr[count])
}