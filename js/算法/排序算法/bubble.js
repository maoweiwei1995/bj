// time 最差 O(n2) 平均 O(n2) 最好O(n)   space O(1)
let bubble = (arr) =>{
    let len = arr.length
    console.log(len)
    let temp
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}
console.log(bubble([10, 2, 3, 4, 5, 6, 12,3,2,5,44,23,34]))