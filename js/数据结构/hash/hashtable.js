function HashTable() {
    // 定义属性
    this.storage = []
    this.count = 0
    this.limit = 8
}
HashTable.prototype.hashFunc = function(str, max) {
    // 初始化
    let hashCode = 0
    // 霍纳算法
    for (let i = 0; i < str.length; i++) {
        hashCode = 37*hashCode + str.charCodeAt(i)
    }
    //取模运算
    hashCode = hashCode % max
    return hashCode
}
// 添加
HashTable.prototype.put = function (key, value) {
    //1.获取哈希值
    let index = this.hashFunc(key, this.limit)

    //2.取出数组
    let bucket = this.storage[index]

    //3.如果不存在则创建一个
    if (bucket === undefined) {
        bucket = []
        this.storage[index] = bucket
    }
    //4.判断是新增还是修改原来的值
    let override = false
    for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i]
        if (tuple[0] === key) {
            tuple[1] = value
            override = true
            break
        }
    }
    //5. 新增
    if (override === false) {
        bucket.push([key, value])
        this.count++
        if (this.count > this.limit * 0.75) {
            let primeNum = this.getPrime(this.limit*2)
            this.resize(primeNum)
        }
    }
    console.log(this.storage)

}

// 获取存放的数据
HashTable.prototype.get = function (key) {
    //1.获取哈希值
    let index = this.hashFunc(key, this.limit)
    //2.获取对应的桶
    let bucket = this.storage[index]
    //3.如果不存在
    if (bucket === undefined) {
        return null
    }
    //4.查找对应
    for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i]
        if (tuple[0] === key) {
            return tuple[1]
        }
    }
    //5.没找到
    return null
}

// 删除
HashTable.prototype.remove = function (key) {
    //1求哈希值
    let index = this.hashFunc(key, this.limit)
    //2找到bucket
    let bucket = this.storage[index]
    //3没有创建
    if (bucket === undefined) {
        return null
    }
    //4.查找
    for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i]
        if (tuple[0] === key) {
            bucket.splice(i, 1) 
            this.count--
            //判断缩容
            if (this.limit > 7 && this.count < this.limit*0.25){
                let primeNum = this.getPrime(Math.floor(this.limit/2))
                this.resize(primeNum)
            }
        }
        return tuple[1]
    }
    //5 没找到
    return null
}

// 是否为空
HashTable.prototype.isEmpty = () => {
    return this.count == 0
}
// 数据个数
HashTable.prototype.size = () => {
    return this.count
}

// 扩容
HashTable.prototype.resize = (newLimit) {
    //1.保存原数据
    let oldStorage = this.storage
    
    //2. 重新初始化
    this.limit = newLimit
    this.storage = []
    this.count = 0

    //3.把原数据添加到新容器内
    oldStorage.foreach((bucket) => {
        //bucket为空
        if (bucket == null) {
            continue
        }
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            this.put(tuple[0], tuple[1])
            this.count++
        }
    })
}
HashTable.prototype.isPrime = (num) => {
    let len = parseInt(Math.sqrt(num))
    for (let i = 2; i <= len; i++) {
        if (num % i === 0) {
            return false
        }
    }
    return true
}
HashTable.prototype.getPrime = (num) {
    while(!this.isPrime(num)){
        num++
    }
    return num
}

let ht = new HashTable()
ht.put('abc', '123')
ht.put('cba', '321')
ht.put('nba', '521')
ht.put('mba', '520')
console.log(ht.get('nba'))

ht.put("abc", "111")
console.log(ht.get('abc'))
console.log(ht.remove('abc'))
console.log(ht.get('abc'))

