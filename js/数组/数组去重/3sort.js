/**
 * 
3.排序后相邻去除法 

实现思路：给传入的数组排序，排序后相同的值会相邻，然后遍历排序后数组时，新数组只加入不与前一值重复的值。
 */
let sort = (arr) => {
    arr.sort((a, b) => {
        return a-b
    })
    let ans = [arr[0]]
    for (let i in arr) {
        if (ans[ans.length-1] !== arr[i]) {
            ans.push(arr[i])
        }
    }
    return ans
}
let test = [1,2,3,3,3, 5,6,6,6,9]
console.log(sort(test))