function Person(name, age) {
    this.name = name
    this.age = age
    if (typeof this.sayName !== 'function'){
        Person.prototype.sayName = function () {
            console.log('初始化sayname')
        }
    }
}
Person.prototype = {
    constructor: Person,
    sayName(){
        console.log(this.name)
    }
}
let p1 = new Person('mww', 24)
console.log(p1.name)
console.log(p1.age)
p1.sayName()