var readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
});
rl.on('line', function(line) {
    let m = parseInt(line.trim())
    if (m === 0) {
        return 
    }
    console.log(spriteBottle(m))
})
function spriteBottle (n) {
    let sum = 0
    let temp = 0
    let newN = n
    while (newN !== 0 && newN !== 1) {
        if (newN === 2) {
            sum += 1
            return sum
        }
        temp = parseInt(newN / 3)
        c =  newN % 3
        sum += temp
        newN = temp + c
    }
    return sum
}