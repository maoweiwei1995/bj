let p = new Promise(function(resolve, reject) {
    resolve('repeat')
})
p.then(function(data){
    console.log(data)
})
p.then(function(data){
    console.log(data)
})
p.then(function(data){
    console.log(data)
})