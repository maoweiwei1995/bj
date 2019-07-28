
let flattern = (arr) => {
    arr = arr || []
    return arr.reduce((prev, cur) => {
        return Array.isArray(cur)?  prev.concat(flattern(cur)) :  prev.concat(cur)
    }, [])

}
let arr = [1,2,[3,{name: ['mww','arr']},[5,6,7]],9,[10,11]]
console.log(flattern(arr))