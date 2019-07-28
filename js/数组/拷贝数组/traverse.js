function arrCopy(arr) {
    let newArr = []
    for (let i in arr) {
        newArr.push(arr[i])
    }
    return newArr
}

let arr1 =  [1,2,3,4]
let arr2 =  arrCopy(arr1)
arr2.push(1,2)
console.log(arr1,arr2)