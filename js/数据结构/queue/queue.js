function Queue() {
    this.data = []
    this.enqueue = enqueue
    this.dequeue = dequeue
    this.front = front
    this.back = back
    this.toString = toString
    this.isEmpty = isEmpty
    this.count = count
}
function enqueue(ele) {
    this.data.push(ele)
}
function dequeue(ele) {
    return this.data.shift()
}
function front () {
    return this.data[0]
}
function back () {
    return this.data[this.data.length-1]
}
function toString() {
    let retStr = ''
    this.data.forEach(item => {
        retStr += item + '&nbsp;'
    })
    return retStr
}
function isEmpty() {
    return this.data.length === 0 
}
function count() {
    return this.data.length
}

