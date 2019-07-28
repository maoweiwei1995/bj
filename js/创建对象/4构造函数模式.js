function Person(name, age) {
    this.name = name
    this.age = age
    this.sayName = function(){
        console.log(this.name)
    }
}
let p1 = new Person('mww', 24)
console.log(p1.name)
console.log(p1.age)
console.log(p1 instanceof Person)
console.log(p1 instanceof Object)
console.log(p1.constructor)
console.log(p1.__proto__)
p1.sayName()

/**
 * new操作符干了这几件事
 *     //1、创建一个新对象。2、将构造函数作用域赋值给新对象person1。
    //3、执行构造函数中代码。4、返回新对象。
 */