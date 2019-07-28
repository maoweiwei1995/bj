let p = new Promise(function(resolve, reject) {
    reject(new Error('something is wrong'))
})
p.catch(function(err) {
    console.log(err.message)
})