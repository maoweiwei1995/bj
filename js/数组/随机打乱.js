
/**
 * fisher-Yates shuffles
 */
const arr = [1,2,3,4,5,6,7,8,9,10]
// let ran = (arr) => {
//     for (let i = 1; i < arr.length; i++) {
//         const r = Math.floor(Math.random()*(i+1));
//         [arr[i], arr[r]] = [arr[r], arr[i]]
//     }
//     return arr
// }

arr.sort(()=>{
    return Math.random() - 0.5
})
console.log(arr)