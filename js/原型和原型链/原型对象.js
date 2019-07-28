// function Person() {}
// Person.prototype.name = 'Zaxlct';
// Person.prototype.age  = 28;
// Person.prototype.job  = 'Software Engineer';
// Person.prototype.sayName = function() {
//   console.log(this.name);
// }
  
// var person1 = new Person();
// person1.sayName(); // 'Zaxlct'

// var person2 = new Person();
// person2.sayName(); // 'Zaxlct'

// console.log(person1.constructor === Person.prototype.constructor); //true
// console.log(person1.__proto__ === Person.prototype); //



function Person(){};
 console.log(Person.prototype) 
 console.log(typeof Person.prototype) 
 console.log(typeof Function.prototype) // function
 console.log(typeof Object.prototype) 
 console.log(typeof Function.prototype.prototype)

 let a = new Function()
 Function.prototype = a