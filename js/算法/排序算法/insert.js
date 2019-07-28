// time 最差 O(n2) 平均 O(n2) 最好O(n)   space O(1)
let insert = (arr) => {
    let len = arr.length
    if (len === 0 || len === 1) {
        return arr
    }
    let ans = []
    ans.push(arr[0])
    for (let i = 1; i < len ;i++ ) {
        let len2 = ans.length 
        let j = len2 -1
       while (j >= 0 && arr[i] < ans[j]) {
            ans[j+1] = ans[j]
            j--
        }
       ans[j+1] = arr[i]
    }
    return ans
}
console.log(insert([1,2,3,2,22,3,4,7,4,6]))