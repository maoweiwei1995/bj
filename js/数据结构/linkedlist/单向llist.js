// 创建一个node类
function Node(ele) {
    this.ele = ele
    this.next = null
}
// 创建一个llist类
function LList () {
    this.head = new Node('head')
    this.find = find
    this.findPre = findPre
    this.insert = insert
    this.display = display
    this.remove = remove
}
// 查找节点
function find (ele) {
    let curNode = this.head
    while ( !!curNode && curNode.ele != ele) {
        curNode = curNode.next
    }
    return curNode
}
// 查找目标节点上一个节点
function findPre (ele) {
    let curNode = this.head
    let preNode = null
    while ( !!curNode && curNode.ele != ele) {
        preNode = curNode
        curNode = curNode.next
    }
    return preNode
}

// 插入节点
function insert (newEle, target) {
    let newNode = new Node(newEle)
    let tarNode =  this.find(target)
    newNode.next = tarNode.next
    tarNode.next = newNode
}

// 显示链表
function display () {
    let curNode = this.head
    while (!!curNode) {
        console.log(curNode.ele)
        curNode = curNode.next
    }
}
// 删除元素
function remove (ele) {
    let pre = this.findPre(ele)
    let removeNode = pre.next
    pre.next = removeNode.next
    return removeNode.ele
} 
var fruits = new LList();
fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
fruits.display()
fruits.remove('Pear')
fruits.display()