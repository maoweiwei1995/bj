// let result = function(cb){
//     setTimeout(()=>{
//         cb(5)
//     }, 1000)
// }
// result(console.log)

const fs = require('fs')
const readFileAsArray = function(file, callback) {
    fs.readFile(file, (err, data) => {
        if (err) callback(err)
        const lines = data.toString().split('\n')
        callback(null, lines)
    })
}
readFileAsArray('./test.txt', (err, lines) => {
    if (err) console.log(err)
    const numbers = lines.map(Number)
    console.log(`共收到了${numbers}个红包`)
})