let obj1 = {
    a: {
      b: 1
    },
    c: 2
 }
let obj2 = Object.assign({}, obj1)
console.log(obj2)
obj2.a.b = 10
console.log(obj1)
console.log(obj2)
