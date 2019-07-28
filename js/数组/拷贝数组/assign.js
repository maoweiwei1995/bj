function arrCopy(arr) {
    let newArr = []
    Object.assign(newArr, arr)
    return newArr
}
let arr1 =  [1,2,3,4]
let arr2 =  arrCopy(arr1)
arr2.push(1,2)
console.log(arr1,arr2)