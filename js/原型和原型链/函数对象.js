var o1 = {}; 
var o2 =new Object();
var o3 = new f1();

function f1(){}
let f2 = new Function()
let f3 = function(){}

console.log(typeof Object); //function 
console.log(typeof Function); //function  

console.log(typeof f1); //function 
console.log(typeof f2); //function 
console.log(typeof f3); //function   

console.log(typeof o1); //object 
console.log(typeof o2); //object 
console.log(typeof o3); //object