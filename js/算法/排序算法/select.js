// time 最差 O(n2) 平均 O(n2) 最好O(n)   space O(1)
let select = (arr) => {
    let len = arr.length
    if (len === 0 || len === 1) {
        return arr
    }
    let pos
    let temp
    for (let i = 0; i < len - 1; i++) {
        pos = i
        for (let j = i + 1; j < len; j++) {
            if (arr[pos] > arr[j]) {
                pos = j
            }
        }
        if (arr[pos] !== arr[i]) {
            temp = arr[pos]
            arr[pos] = arr[i]
            arr[i] = temp
        }
    }
    return arr
}
console.log(select([15,2]))