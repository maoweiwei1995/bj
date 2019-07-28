function deepCopy(obj) {
    // 1.根据参考对象类型创建一个空对象
    let newObj = Array.isArray(obj)? []:{}
    for (let key in obj) {
        if (obj[key] === obj) {
            continue
        }
        // 如果是对象则递归处理
        if (obj.hasOwnProperty(key)) {
            if ( obj[key] && typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}

var obj1 = {
    a: 1,
    b: 2,
    c: {
      d: 3
    }
  }
  var obj2 = deepCopy(obj1)
  console.log(obj2)
  obj2.c.d = 5
  console.log(obj1)
  console.log(obj2)
