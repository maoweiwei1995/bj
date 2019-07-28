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

(function(){
    // 创建一个没有实例属性和方法 只有原型是目标父类的原型的对象
    let Super = function(){

    }
    Super.prototype = Animal.prototype
    Cat.prototype = new Super()
})()

let cat = new Cat()
console.log(cat.name)
cat.eat('fish')   
cat.sleep()
console.log(cat instanceof Animal)
console.log(cat instanceof Cat) // 