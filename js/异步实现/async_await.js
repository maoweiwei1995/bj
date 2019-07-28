const fs = require('fs')

const readFileAsArray = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err)
            } else {
                const lines = data.toString().split('\n')
                resolve(lines)
            }
        })
    })
}

async function result() {
    try {
        const lines = await readFileAsArray('./numbers.txt')
        const numbers = lines.map(Number)
        console.log(`收到了${numbers}个红包`)
    } catch (err) {
        console.log('出错了')
        console.log(err)
    }
}

result()