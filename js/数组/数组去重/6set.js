let setMethod = (arr) => {
    let ans = new Set(arr)
    return [...ans]
}
let test = [1,2,3,3,3, 5,6,6,6,9]
console.log(setMethod(test))