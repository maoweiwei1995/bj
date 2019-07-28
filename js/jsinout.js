// node
var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.on('line', function (line) {
    var tokens = line.split(' ')
    console.log(parseInt(tokens[0])+ parseInt(tokens[1]))
})
// V8
// while(line = readline()) {
//     var lines = line.split(' ')
//     var a = parseInt(lines[0])
//     var b = parseInt(lines[1])
//     print(a+b)
// }

while(line = readline()) {
    var lines = line.split(' ')
    var a = parseInt(lines[0])
    var b = parseInt(lines[1])
    print(a+b)
}
