// 父构造函数
function Animal(name='Animal') {
    this.name = name
    this.sleep = function(){
        console.log(this.name+':sleep')
    }
}
// 父原型
Animal.prototype.eat = function(food){
    console.log(this.name+':eat'+' '+food)
}

// 子构造函数
function Cat() {

}
// 子原型 = n父实例
Cat.prototype = new Animal()

let cat = new Cat()
Cat.prototype.name = 'cat'
console.log(cat.name)
cat.eat('fish')
cat.sleep()
console.log(cat instanceof Animal)
console.log(cat instanceof Cat)