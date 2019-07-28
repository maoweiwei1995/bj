let a = new Set([1, 2, 4, 5, 6, 10])
let b = new Set([1, 2, 3, 5, 6, 10])
let c = new Set([...a].filter(item => b.has(item)))
console.log(Array.of(...c))