const fs = require('fs')

const readFileAsArray = function(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err)
            const lines = data.toString().split('\n')
            resolve(lines)
        })
    })
} 

readFileAsArray('./numbers.txt').then(lines => {
    const numbers = lines.map(Number)
    console.log(`抢到了${numbers}个红包`)
}).catch(error => console.log(error))