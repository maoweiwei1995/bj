foo1 = {
    key: 1
}
foo2 = 1

function a1(obj){
    return {
        key:obj.key++
    }
}
function a2(obj){
    return obj++
}
a1(foo1)
a2(foo2)
console.log(foo1)
console.log(foo2)