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
    this.name = name
    let animal = new Animal()
    for (let key in animal) {
        Cat.prototype[key] = animal[key]
    }
}
let cat = new Cat()
console.log(cat.name)
cat.eat('fish')   
cat.sleep()
console.log(cat instanceof Animal)
console.log(cat instanceof Cat) // 