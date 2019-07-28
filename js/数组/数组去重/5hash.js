let hash = (arr) => {
    let hash = []
    let ans = []
    for (let i in arr) {
        if (hash[arr[i]] === undefined) {
            hash[arr[i]] = 0
            ans.push(arr[i])
        }
    }
    return ans
}
let test = [1,2,3,3,3, 5,6,6,6,9]
console.log(hash(test))