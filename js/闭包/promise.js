// let tasks = []
// let output = (i) => {
//     return new Promise((resolve) => {
//         setTimeout(()=>{
//             console.log(i)
//             resolve()
//         },1000*i)
//     })
// }
// for (var i = 0; i < 5; i++) {
//     tasks.push(output(i))
// }
// Promise.all(tasks).then(()=>{
//     setTimeout(()=>{
//         console.log(i)
//     }, 1000)
// })
let p = new Promise((resolve, reject) => {
    resolve()
    })
p.then(()=>{
    console.log('aaa')
})