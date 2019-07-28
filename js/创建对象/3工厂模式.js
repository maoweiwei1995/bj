function createPerson(name, age) {
    let obj = new Object()
    obj.name = name
    obj.age = age
    obj.say = function () {
        console.log('hhhh')
    }
    return obj
}
let p1 = createPerson('mww', 24)
console.log(p1.name)
console.log(p1.age)
console.log(p1 instanceof Object)
p1.say()

//不能识别对象