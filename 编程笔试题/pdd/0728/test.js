// demo01  出自于上面我引用文章的一个例子，我们来根据上面的结论，一步一步分析具体的执行过程。
// 为了方便理解，我以打印出来的字符作为当前的任务名称
// setTimeout(function() {
//     console.log('timeout1');  // 5
// })

// new Promise(function(resolve) {
//     console.log('promise1');     // 1
//     for(var i = 0; i < 1000; i++) { 
//         i == 99 && resolve();
//     }
//     console.log('promise2');        //2
// }).then(function() {
//     console.log('then1');            // 4
// })

// console.log('global1');               // 3


// console.log('1');                  // 1

// setTimeout(function() {
//     console.log('2');                                  2.1
//     process.nextTick(function() {                      2..1
//         console.log('3');                          
//     })
//     new Promise(function(resolve) {
//         console.log('4');                              2.2
//         resolve();
//     }).then(function() {
//         console.log('5')                               2..2
//     })
// })
// process.nextTick(function() {               //.1
//     console.log('6');
// })
// new Promise(function(resolve) {
//     console.log('7');                       // 2
//     resolve();
// }).then(function() {
//     console.log('8')                        // .2
// })

// setTimeout(function() {                               2.3
//     console.log('9');
//     process.nextTick(function() {                     2..3
//         console.log('10');
//     })
//     new Promise(function(resolve) {                   2.4
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')                             2..4
//     })
// })


// 1  7  6  8    

console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})