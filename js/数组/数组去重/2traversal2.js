/**
 * 调用indexOf方法，性能和方法1差不多

实现思路：如果当前数组的第 i 项在当前数组中第一次出现的位置不是 i，那么表示第 i 项是重复的，忽略掉。否则存入结果数组。
 */
let traversal2 = (arr) => {
    let ans = []
    for (let key in arr) {
        if (arr.indexOf(arr[key]) == key){  //key是string 不能用===
            ans.push(arr[key])
        }
    }
    return ans
}
let test = [1,2,3,3,3, 5,6,6,6,9]
console.log(traversal2(test))