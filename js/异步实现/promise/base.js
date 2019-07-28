//创建一个promise对象
let p = new Promise(function(resolve, reject){
    resolve('resolve')
})
// 指定成功或者失败的回调
p.then(function(data){
    console.log(data)
}, function(err){
    console.log(err.message)
})

//创建一个promise对象
let p = new Promise(function(resolve, reject){
    reject('reject')
})
// 指定成功或者失败的回调
p.then(function(data){
    console.log(data)
}, function(err){
    console.log(err.message)
})

