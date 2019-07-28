function simpleCopy(obj) {
    let newObj = Array.isArray(obj)? []: {}
    for (let key in obj) {
        newObj[key] = obj[key]
    }
    return newObj
}
let obj1 = {
    a: 1,
    b: 2,
    c: {
        d: 4
    }
}
let obj2 = simpleCopy(obj1)
console.log(obj2)
obj2.b = 10
obj2.c.d = 12
console.log(obj2)
console.log(obj1)
/**
 * { a: 1, b: 2, c: { d: 4 } }
{ a: 1, b: 10, c: { d: 12 } }
{ a: 1, b: 2, c: { d: 12 } }
 */