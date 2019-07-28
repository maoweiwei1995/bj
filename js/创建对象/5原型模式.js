function Person(){

}
Person.prototype.name = 'mww'
Person.prototype.age = '24'
Person.prototype.sayName = function() {
    console.log(this.name)
}
let p1 = new Person()
let p2 = new Person()
console.log(p1.name)
console.log(p1.age)
console.log(p1.sayName === p2.sayName)
p1.sayName()