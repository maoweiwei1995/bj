// 封装ArrayList类
function ArrayList() {
    this.array = []
    ArrayList.prototype.insert = function (item) {
        return this.array.push(item)
    }
    ArrayList.prototype.toString = function () {
        return this.array.join()
    }
}


ArrayList.prototype.swap = function (m, n) {
    let temp = this.array[m]
    this.array[m] = this.array[n]
    this.array[n] = temp
}

// 冒泡
ArrayList.prototype.bubbleSort = function(){
    let len = this.array.length
    for (let i; i < len; i++) {
        for (let j = 0; j < len-1-i; j++) {
            if (this.array[j] > this.array[j+1]) {
                this.swap(j, j+1)
            }
        }
    }   
}

// 选择
ArrayList.prototype.selectionSort = function() {
    let len = this.array.length
    let temp = 0
    for (let i = 0; i < len-1; i++) {
        temp = i
        for (let j = i+1; j < len; j++) {
            if (this.array[temp] > this.array[j]){
                temp = j
            }
        }
        // 交换
        this.swap(i, temp)
    }
}

// 插入
ArrayList.prototype.insertSort = function() {
    let len = this.array.length
    let temp = 0
    for (let i = 1; i < len; i++) {
        temp = this.array[i]
        let j = i-1
        while(j>=0 && this.array[j] > temp) {
            this.array[j+1] = this.array[j]
            j-- 
        }
        //找到位置后插入
        this.array[j+1] = temp 
    }
}

let list = new ArrayList()
list.insert(3)
list.insert(6)
list.insert(7)
list.insert(10)
list.insert(5)
list.insert(2)
list.insert(8)
console.log(list)
// list.bubbleSort()
list.insertSort()
console.log(list)

