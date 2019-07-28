function arrCopy(arr) {
    let newArr = arr.slice()
    return newArr
}
let arr1 = [1, 2, 3, 4]
let arr2 = arrCopy(arr1)
arr2.push(1)
console.log(arr1, arr2)