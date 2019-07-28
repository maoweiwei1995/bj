Promise.resolve().then(()=>{
    return 'hello world'
})
.then((value)=>{
    console.log(`${value}:mww`)
    return value
})
.then((value)=>{
    console.log(`${value}:mww`)
})
.catch((err)=>{
    console.log(err)
})
