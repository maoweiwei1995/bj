
import BinaryNode from './BinaryNode'
// 二叉搜索树
export default class BinarySearchTree {
    constructor () {
        this.root = null
        this.values = new Array()
    }

    // 插入节点
    insert(val) {
        this.values.push(val)
        let node = new BinaryNode(val)
        if (!this.root) {
            this.root = node
        } else {
            this._insertNode(this.root, node)
        }
    }

    // 移除节点
    remove(val) {
        this.root = this._removeNode(this.root, val)
    }
    
    // 搜索节点
    search(val) {
        let values = this.inOrderTraverse()
        return values.includes(val)
    }

    //返回最小值
    min() {
        let values = this.inOrderTraverse()
        return values[0]
    }

    //返回最大值
    max() {
        let values = this.inOrdrTraverse()
        return values[valuee.length-1]
    }

    //是否为空
    isEmpty() {
        return this.root === null
    }

    // 中序遍历
    inOrderTraverse() {
        let result = new Array()
        this._inOrderTraverseNode(this.root, function(node) {
            result.push(node.value)
        })
        return result
    }
    // 先序遍历
    preOrderTraverse() {
        let result = new Array()
        this._preOrderTraverseNode(this.root, function(node) {
            result.push(node.value)
        })
        return result
    }
    // 中序遍历
    postOrderTraverse() {
        let result = new Array()
        this._postOrderTraverseNode(this.root, function(node) {
            result.push(node.value)
        })
        return result
    }
    //插入节点
    _insertNode(node, newNode) {
        if (node.value > newNode.value) {
            if (node.left) {
                this._insertNode(node.left, newNode)
            } else {
                node.left = newNode
            }
        } else {
            if (node.right) {
                this._insertNode(node.right, newNode)
            } else {
                node.right = newNode
            }
        }
    }
    // 移除
    _removeNode(node, val) {
        if (node === null) {
            return node
        }
        if (node.value > val) {
            this._removeNode(node.left, val)
            return node
        } else if(node.value < val) {
            this._removeNode(node.right, val)
            return node
        } else {
            // 叶子节点
            if (node.left === null && node.right === null) {
                node = null
                return node
            } 
            // 一个子节点
            if (node.left === null ) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }
            // 两个子节点 ???
            let min_node = this._findMinNode(node)
            node.value = min_node.value
            node.right = this._removeNode(node.right, min_node.value)
            return node
        }
    }
        // 中序遍历
        _inOrderTraverseNode (node, callback) {
            if (node) {
                _inOrderTraverseNode(node.left, callback)
                callback(node)
                _inOrderTraverseNode(node.right, callback)
            }
        }
        // 前序遍历
        _preOrderTraverseNode (node, callback) {
            if (node) {
                callback(node)
                _preOrderTraverseNode(node.left, callback)
                _preOrderTraverseNode(node.right, callback)
            }
        }
        // 后序遍历
        _postOrderTraverseNode (node, callback) {
            if (node) {
                _postOrderTraverseNode(node.left, callback)
                _postOrderTraverseNode(node.right, callback)
                callback(node)
            }
        }
    // 找到最小节点
    _findMinNode(node) {
        while(node && node.left) {
            node = node.left
        }
        return node
    }
    // 广度优先遍历 队列实现
    breadthFirstSearch() {
        let result = []
        let queue = []
        let curNode = null
        queue.push(this.root)
        while (queue.length) {
            curNode = queue.shift()
            result.push(curNode.value)
            if (curNode.right) {
                queue.push(curNode.right)
            }
            if (curNode.left) {
                queue.push(curNode.left)
            }
        }
        return result
    }

    // 深度优先遍历 栈实现 ????
    depthFirstSearch() {
        let stack = []
        let curNode = null
        let result = []
        stack.push(this.root)
        while (stack.length) {
            curNode = stack.pop()
            result.push(curNode)
            if (curNode.left) {
                stack.push(curNode.left)
            }
            if (curNode.right) {
                stack.push(curnOde.right)
            }
        }
        return result
    }
}