function Node(key) {
    this.key = key
    this.left = null
    this.right = null
}
// 建立二叉搜索树类
function BinarySearchTree() {
    // 1.节点构造函数
    // 2.保存根属性
    this.root = null
    // 相关方法
}
// 1. 插入节点
BinarySearchTree.prototype.insert = function (key) {
    let newNode = new Node(key)
    // 判断根节点是否有值
    if (this.root === null) {
        this.root = newNode
    } else {
        this.insertNode(this.root, newNode)
    }
}
BinarySearchTree.prototype.insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode
        } else {
            this.insertNode(node.left, newNode)
        }
    } else {
        if (node.right === null) {
            node.right = newNode
        } else {
            this.insertNode(node.right, newNode)
        }
    }
}

// 遍历
// 前序
BinarySearchTree.prototype.preOrderTraversal = function (handler) {
    this.preOrderTraversalNode(this.root, handler)
}
BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
    if (node === null) {
        return 
    }
    handler(node.key)
    this.preOrderTraversalNode(node.left, handler)
    this.preOrderTraversalNode(node.right, handler)
}
// 中序
BinarySearchTree.prototype.inOrderTraversal = function (handler) {
    this.inOrderTraversalNode(this.root, handler)
}
BinarySearchTree.prototype.inOrderTraversalNode = function (node, handler) {
    if (node === null) {
        return 
    }
    this.inOrderTraversalNode(node.left, handler)
    handler(node.key)
    this.inOrderTraversalNode(node.right, handler)
}
// 后序
BinarySearchTree.prototype.postOrderTraversal = function (handler) {
    this.postOrderTraversalNode(this.root, handler)
}
BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
    if (node === null) {
        return 
    }
    this.postOrderTraversalNode(node.left, handler)
    this.postOrderTraversalNode(node.right, handler)
    handler(node.key)
}

// max min
BinarySearchTree.prototype.max = function() {
    let node = this.root
    if (node === null) {
        return null
    }
    while (node.right !== null) {
        node = node.right
    }
    return node.key

}

BinarySearchTree.prototype.min = function() {
    let node = this.root
    if (node === null) {
        return null
    }
    while (node.left !== null) {
        node = node.left
    }
    return node.key

}

// 搜索特定值
BinarySearchTree.prototype.search = function (key) {
    return this.searchNode(this.root, key)
}
BinarySearchTree.prototype.searchNode = function (node, key) {
    if (node === null) {
        return false
    }
    // 1.大于去右子树找
    if (key > node.key) {
        return this.searchNode(node.right, key)
    // 2.小于去左子树找
    } else if (key < node.key) {
        return this.searchNode(node.left, key)
    } else {
        return true
    }
}

let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12) 
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
console.log(bst.max())
console.log(bst.min())
console.log(bst.search(36))