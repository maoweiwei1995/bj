// function quick(arr, l, r){
//     if (l < r) {
//         let i = l, j = r
//         // 以最左边的数作为pivot
//         let key = arr[l]   
//         while (i < j) {
//             // 找到右边大于key的值
//             while (i < j && arr[j] > key) {
//                 j--
//             }
//             // 找到后 赋值给左边指针
//             arr[i] = arr[j]
//             // 找到左边小于key的值
//             while (i < j && arr[i] < key) {
//                 i++
//             }
//             // 找到后赋值给右边指针
//             arr[j] = arr[i]
//         }
//         // 结束后把pivot赋值给终点
//         arr[i] = key
//         // 以终点为界进行递归操作
//         quick(arr, l, i-1)
//         quick(arr, i+1, r)
//         // 返回值为原数组
//         return arr 
//     }

// }

function quick(arr, l, r) {
    if (r-l < 1) {
        return arr
    }
    let i = l, j = r
    let key = arr[i]
    while (i < j) {
        while (i < j && arr[j] > key) {
            j--
        }
        arr[i] = arr[j]

        while (i < j && arr[i] < key) {
            i++
        }
        arr[j] = arr[i]
    }
    // i=j
    arr[i] = key

    // 递归
    quick(arr, l, i-1)
    quick(arr, i+1, r)
    return arr
}
// const quickSort = (arr) => {
//     let len = arr.length 
//     if (len === 0 || len === 1){
//         return arr
//     }
//     return quick(arr, 0, len-1)
// }
console.log(quick([1,14,42,15,78,34,54], 0, 6))


// function quickSort(arr) {
//     let len = arr.length
//     if (len <= 1) {
//         return arr
//     }
//     let left = []
//     let right = []
//     // 最右边作为基准值
//     let base = arr[len-1]
//     for (let i = 0; i < len-1; i++) {
//         if (arr[i] >= base) {
//             right.push(arr[i])
//         } else {
//             left.push(arr[i])
//         }
//     }
//     return [...quickSort(left), base, ...quickSort(right)]
// }

// let test = [3,7,9,6,3,2,6,7,9,14,52,5,1,25]
// console.log(quickSort(test))