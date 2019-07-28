function Stack() {
    this.data = []
    //栈顶位置
    this.top = 0
    this.push = push // 入栈
    this.pop = pop //出栈
    this.peek = peek //查看栈顶元素
    this.clear = clear 
    this.length = length
}

function push (ele) {
    // this.data.push(ele)
    this.data[this.top++] = ele
}
function pop() {
    return this.data[--this.top]
}
function peek() {
    return this.data[this.top-1]
}
function clear() {
    this.data = []
}
function length() {
    return this.length
}

let s = new Stack()
s.push('aaa')
s.push('ccc')
s.push('bbb')
console.log(s.pop())
console.log(s.pop())