/**
 * 
 * 
 * 遍历数组法
它是最简单的数组去重方法（indexOf方法）

实现思路：新建一个数组，遍历去要重的数组，当值不在新数组的时候（indexOf为-1）就加入该新数组中；
 */
let traversal = (arr) => {
    let ans = []
    for (let key in arr) {
        if (ans.indexOf(arr[key]) === -1){
            ans.push(arr[key])
        }
    }
    return ans
}
let test = [1,2,3,3,3, 5,6,6,6,9]
console.log(traversal(test))