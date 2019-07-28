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

function Cat(name='Tom') {
    Animal.call(this)
    this.name = name
}
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

let cat = new Cat()
console.log(cat.name)
cat.eat('fish')   
cat.sleep()
console.log(cat instanceof Animal)
console.log(cat instanceof Cat) // 