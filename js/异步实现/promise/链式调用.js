let p = new Promise(function(resolve, reject) {
    resolve(5)
})

p.then(function(data){
    console.log(data)
    return data*2
})
.then(function(data){
    console.log(data)
    return data*2
})