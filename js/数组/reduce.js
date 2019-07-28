let arr = [1, 2, 3, 4]
let sum = arr.reduce((temp, cur) => {
    return temp + cur*cur
}, 0)
console.log(sum)