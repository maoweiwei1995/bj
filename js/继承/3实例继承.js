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
    let instance = new Animal()
    instance.name = name
    return instance
} 
let cat = new Cat('bingo')

console.log(cat.name)
cat.eat('fish')   
cat.sleep()
console.log(cat instanceof Animal)
console.log(cat instanceof Cat) // cat 实际上是返回的instance 而instance 是Animal的实例。。