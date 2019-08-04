// console.log(1)
// setTimeout(function(){
//     console.log(2)
// },1000)
// new Promise(function(resolve){
//     console.log('promise里的宏任务')
//     resolve('微任务')
// }).then(data => {
//     console.log(data)
// })
// new Promise(function(resolve){
//     console.log('promise里的宏任务1')
//     resolve('微任务1')
// }).then(data => {
//     console.log(data)
// })
// console.log(3)


/**
 * 1. 程序先执行同步任务，在执行异步任务
 * 2.同步任务分为宏任务和微任务
 */

async function testSometing() {
    console.log("执行testSometing");
    return "testSometing";
  }
  
async function testAsync() {
    console.log("执行testAsync");
    return Promise.resolve("hello async");
}
  
async function test() {
    console.log("test start...");             // 1
    new Promise(resolve => {
        console.log("async 里面的promise");      // 2 
        resolve("async里面的promise里面的then");   
    }).then(data => { 
        console.log(data);                      // .1
    });
    const v1 = await testSometing();            // 3
    console.log(v1);                            // 4
    const v2 = await testAsync();               // 5
    console.log(v2);                            // 6
    console.log(v1, v2);                        // 7
}
  
test();

var promise = new Promise(resolve => {              
console.log("promise start..");                     // 8
resolve("promise");                                 
}); //3
promise.then(val => console.log(val));              // .2
setTimeout(() => {
console.log("setTime1");                            //10                        
}, 3000);                   
console.log("test end...");                         // 9
  
  /*
  
  1. 程序从上到下执行,遇到test()函数执行,执行test函数里面的代码，同样分为同步异步的情况
    1）输出 “test start...”  
    2）Promise是一个宏任务 输出 “async 里面的promise” 后续代码会被推入微任务队列
    3）遇见 await await后面的会被转换为Promise Promise里面的代码是宏任务，then()里面的代码是微任务，所以执行后面的 testSometing 这个函数，需要分析 testSomething 这个函数 输出“执行testSometing” 遇到函数的返回值，对应 await 来说，这个return的值作为 then 里面的参数，会被 v1这个变量接收 await 会阻止后续代码的执行 test() 目前执行完毕
    4）遇见 promise 输出 ‘promise start..’ 后续代码推入到微任务
    5）后续遇见定时器，异步任务，推入异步队列
    6）输出 “test end” 全部宏任务执行完毕，检查微任务队列
    7）第一个微任务是执行 test()函数推入的 输出“async里面的promise里面的then”
    8）还记得 test() 里面的await 后面的 微任务执行 输出 “test something”
    9) 继续向下执行 执行 testAsync 输出 "执行testAsync" 
    10) 再次推入微任务
    11）执行 promise 那一个微任务 输出 promise
    12）10步的时候推入了一个微任务，继续执行 输出 “hello async”
    13）遇见 console 执行 “testSometing hello async”
    14）微任务执行完毕 执行异步任务，就是定时器 输出 “setTime1”
   */