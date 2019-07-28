// let a = new Set([1, 2, 4, 5, 6, 10])
// let b = new Set([1, 2, 3, 5, 6, 10])
// let c = new Set([...a].filter(item => !b.has(item)))
// console.log(Array.of(...c))
function difference(arr1, arr2) {
    let set1 = new Set(arr1)
    let set2 = new Set(arr2)
    let ans = new Set([...set1].filter(item => {
        return !set2.has(item)
    }))
    return [...ans]
}
console.log(difference([1,2,3,4,5,5,7,8], [2,3,6,7,8]))
