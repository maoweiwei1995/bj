function quick(arr, l, r) {
    if (r - l < 1) {
        return
    }
    let key = arr[l]
    let i = l
    let j = r
    while (i < j) {
        while (i < j && key < arr[j]) {
            j--
        }
        arr[i] = arr[j]

        while (i < j && key > arr[i]) {
            i++
        }
        arr[j] = arr[i]
    }
    arr[i] = key
    quick(arr, l, i-1)
    quick(arr, i+1, r)
    return arr
}
console.log(quick([5,34,12,78,33,2,3,10], 0, 7))