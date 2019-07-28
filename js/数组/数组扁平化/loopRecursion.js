// let loopRecursion = (arr) => {
//     let ans = []
//     return flattern(arr, ans)
// }

// let flattern = (arr, ans) => {
//     for (let i in arr) {
//         if (Array.isArray(arr[i])) {
//             Array.push.apply(ans,flattern(arr[i]))
//         } else {
//             Array.push.apply(ans,arr[i])
//         }
//     }
//     return ans
// }
let loopRecursion = (arr) => {
    return flattern(arr)
}

let flattern = (arr) => {
    let ans = []
    for (let i in arr) {
        if (Array.isArray(arr[i])) {
            ans.push(...flattern(arr[i]))
        } else {
            ans.push(arr[i])
        }
    }
    return ans
}
var arr=[1,2,[3,4,[5,6,7]],9,[10,11]]
console.log(loopRecursion(arr))