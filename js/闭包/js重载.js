// https://www.cnblogs.com/yugege/p/5539020.html
function addMethod(object, name, fn) {
　　var old = object[name]; //把前一次添加的方法存在一个临时变量old里面
　　object[name] = function() { // 重写了object[name]的方法
　　　　// 如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
　　　　if(fn.length === arguments.length) {
　　　　　　return fn.apply(this, arguments);
　　　　// 否则，判断old是否是函数，如果是，就调用old
　　　　} else if(typeof old === "function") {
　　　　　　return old.apply(this, arguments);
　　　　}
　　}
}



var people = {
　　values: ["Dean Edwards", "Alex Russell", "Dean Tom"]
};
    
/* 下面开始通过addMethod来实现对people.find方法的重载 */
    
// 不传参数时，返回peopld.values里面的所有元素
addMethod(people, "find", function() {
　　return this.values;
});
    
// 传一个参数时，按first-name的匹配进行返回
addMethod(people, "find", function(firstName) {
　　var ret = [];
　　for(var i = 0; i < this.values.length; i++) {
　　　　if(this.values[i].indexOf(firstName) === 0) {
　　　　　　ret.push(this.values[i]);
　　　　}
　　}
　　return ret;
});
    
// 传两个参数时，返回first-name和last-name都匹配的元素
addMethod(people, "find", function(firstName, lastName) {
　　var ret = [];
　　for(var i = 0; i < this.values.length; i++) {
　　　　if(this.values[i] === (firstName + " " + lastName)) {
　　　　　　ret.push(this.values[i]);
　　　　}
　　}
　　return ret;
});
    
// 测试：
console.log(people.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(people.find("Dean")); //["Dean Edwards", "Dean Tom"]
console.log(people.find("Dean Edwards")); //["Dean Edwards"]