let doubleloop = (arr) => {
    let ans = []
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = i+1; j < len; j++) {
            if (arr[i] === arr[j]){
                i++
            }
        }
        ans.push(arr[i]) 
    }
    return ans
}

let test = [1,2,3,3,3, 5,6,6,6,9]
console.log(doubleloop(test))