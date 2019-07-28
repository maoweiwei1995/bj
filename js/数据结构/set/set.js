function Set(){
    this.items = {}
}
Set.prototype.has = function(value){
    return this.items.hasOwnProperty(value)
}
Set.prototype.add = function(value){
    if (this.has(value)) {
        return false
    }
    this.items[value] = value
    return true
}
Set.prototype.remove = function(value){
    if (!this.has(value)) {
        return false
    }
    delete this.items[value]
    return true
}
Set.prototype.clear = (value) => {
    this.items = {}
}

Set.prototype.size = function(value) {
    return Object.keys(this.items).length
}
Set.prototype.values = function (value){
    return Object.keys(this.items)
}

let s1 = new Set()
s1.add('aaa')
s1.add('bbb')
s1.add('ccc')
s1.add('ddd')
console.log(s1.size())
console.log(s1.values())
console.log(s1.remove('bbb'))
console.log(s1.values())
