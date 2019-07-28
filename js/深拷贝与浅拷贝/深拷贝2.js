function deepCopy(obj) {
    let _obj = JSON.stringify(obj)
    let newObj = JSON.parse(_obj)
    return newObj
}
let a = [1,2, [3,4],5]
let obj1 = {
    fun:function(){
       alert(123);
    }
 }
let b = deepCopy(a)
b[2][0] = 10
console.log(b)
console.log(a)
let obj2 = deepCopy(obj1)
console.log(typeof obj1.fun)
console.log(typeof obj2.fun)

/**&
 *  Number, String, Boolean, Array, 扁平对象，
 * 也就是说，只有可以转成JSON格式的对象才可以这样用，像function没办法转成JSON；
 */