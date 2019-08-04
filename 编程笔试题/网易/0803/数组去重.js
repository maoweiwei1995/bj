// function noDup(arr) {
//     let set = new Set(arr)
//     return [...set]
// }
// let arr = [1,1,3,3,4,54,44]
// console.log(noDup(arr))
let arr = [
    {key: '01', value: '乐乐'},
    {key: '01', value: '乐乐'},
    {key: '02', value: '乐乐1'},
    {key: '02', value: '乐乐3'},
    {key: '03', value: '乐乐3'},
    {key: '04', value: '乐乐3'},
    {key: '04', value: '乐乐5'}
]
// function noDup(arr) {
//     let ans = []
//     let hash = {}
//     arr.forEach(item => {
//         if (!hash[item.key]) {
//             hash[item.key] = 1
//             ans.push(item)
//         }
//     })
//     return ans
// }
// console.log(noDup(arr))

// function noDup(arr) {
//     let ans = []
//     let hash = {}
//     arr.forEach(item => {
//         if (!hash[item.value]) {
//             hash[item.value] = 1
//             ans.push(item)
//         }
//     })
//     return ans
// }
// console.log(noDup(arr))

// function noDup(arr) {
//     let ans = []
//     let hash = {}
//     arr.forEach(item => {
//         if (!hash[item.key] && !hash[item.value]) {
//             hash[item.key] = 1
//             hash[item.value] = 1
//             ans.push(item)
//         }
//     })
//     return ans
// }
// console.log(noDup(arr))
