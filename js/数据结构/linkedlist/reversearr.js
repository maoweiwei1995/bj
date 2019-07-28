
function reverse(arr, start, end) {
    let len = (end-start)/2
    console.log(len)
    for( let i = 0; i <= len; i++)  {
        [arr[start+i], arr[end-i]] = [arr[end - i],arr[start+i]]
    }
    return arr
}
console.log(reverse([1,2,3,4,5,6,7,8,9], 2, 7))