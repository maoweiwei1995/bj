
let loopRecursion = (arr) => {
    return flattern(arr)
}

let flattern = (arr) => {
    let ans = []
    arr.forEach((item) => {
        Array.isArray(item)? ans.push(...flattern(item)) : ans.push(item)
    })
    return ans
}
var arr=[1,2,[3,{name: ['mww','arr']},[5,6,7]],9,[10,11]]
console.log(loopRecursion(arr))