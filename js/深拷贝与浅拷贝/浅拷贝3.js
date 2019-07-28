var obj1 = {
    a: 1,
    b: 2,
    c: {
      d: 3
    }
  }
  var obj2 = Object.create(obj1)
console.log(obj2)
console.log(obj1)

obj2.b = 10
obj2.c.d = 12
console.log(obj2)
console.log(obj1)
