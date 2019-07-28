// var Person = function(name){
//     this.name = name; // tip: 当函数执行时这个 this 指的是谁？
//   };
//   Person.prototype.getName = function() {
//       return this.name
//   }
//   var person1 = new Person('Mick');
//   console.log(person1.getName()); //Mick

// Person.prototype.constructor == Person;
// person1.__proto__ == Person.prototype;
// person1.constructor == Person;

var b = new Array();
console.log(b.__proto__ === Array.prototype)
console.log(b.constructor)

var c = new Date(); 
c.constructor === Date;
c.__proto__ === Date.prototype;

var d = new Function();
d.constructor === Function;
d.__proto__ === Function.prototype;

console.log(typeof Number)