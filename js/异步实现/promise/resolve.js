// let p = Promise.resolve('hello')
// p.then(function(data){
//     console.log(data)
// })

let p1 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve("promise1");
    }, 3000);
});

let p2 = new Promise(function (resolve) {
    resolve("promise2");
});

p2.then(function (data) {
    return p1;  // (A)
})
  .then(function (data) { // (B)
    console.log(data); // 输出promise2
});