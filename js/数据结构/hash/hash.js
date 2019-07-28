// 哈希函数
function hashFunc(str, max) {
    let hashCode = 0
    for (let i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    return hashCode % max
}

console.log(hashFunc('abc', 7))
console.log(hashFunc('mma', 7))
console.log(hashFunc('ddd', 7))
console.log(hashFunc('eee', 7))