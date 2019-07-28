// for (var i = 0; i < 5; i++) {
//     (function(j){
//         setTimeout(function(){
//             console.log(new Date, j)
//         }, 1000*j)
//     })(i)
// }

// setTimeout(function(){
//     console.log(new Date, i)
// }, 1000 * i)

// var output = function (i) {
//     setTimeout(function() {
//     console.log(new Date, i);
//     }, 1000*i);
//    };
    
//    for (var i = 0; i < 5; i++) {
//     output(i); // 这里传过去的 i 值被复制了
//    }
    
// setTimeout(function(){
//     console.log(new Date, i)
// }, 1000 * i)

//promise
// var tasks = []
// function output(i) {
//     return new Promise((resolve)=>{
//         setTimeout(() => {
//             console.log(new Date, i)
//             resolve()
//         }, i * 1000)
//     })
// }
// for (var i = 0; i < 5; i++) {
//     tasks.push(output(i))
// }

// Promise.all(tasks).then(()=>{
//     setTimeout(()=>{
//         console.log(new Date, i)
//     },1000)
// })

function sleep(timeout){
    return new Promise((resolve => {
        setTimeout(resolve, timeout)
    }))
}
(async () => {
    for (var i = 0; i < 5; i++) {
        if (i > 0) {
            await sleep(1000)
        }
        console.log(new Date, i)
    }
    await sleep(1000)
    console.log(new Date, i)
})()
