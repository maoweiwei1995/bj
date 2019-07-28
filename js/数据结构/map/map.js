function Map() {
    this.items = {}
}
Map.prototype.has = function (key) {
    return this.items.hasOwnProperty(key)
}
Map.prototype.set = function (key, value) {
    this.items[key] = value
}
Map.prototype.get = function (key) {
    if (this.has(key)) {
        return this.items[key]
    }
    return false
}
Map.prototype.remove = function (key) {
    if (!this.has(key)) {
        return false
    }
    delete this.items[key]
    return true
}
Map.prototype.clear = function (key) {
    this.items = {}
}
Map.prototype.size = function (key) {
    return this.size().length
}
Map.prototype.keys = function (key) {
    return Object.keys(this.items)
}
Map.prototype.values = function (key) {
    return Object.values(this.items)
}

let map = new Map()
map.set('age', 18)
map.set('name', 'Coderwhy')
map.set('height', 1.8)
map.set('address', 'shenzhen')
console.log(map.keys())
console.log(map.remove('age'))
console.log(map.keys())
