### Promise

#### 1.概述

参考：<https://www.jianshu.com/p/a99030ac7a8a>

Promise是ES6中新增的一种异步编程的方式，用于解决回调的方式的各种问题，提供了更多的可能性。

Promise表示的是一个计算结果或网络请求的占位符。由于当前计算或网络请求尚未完成，所以结果暂时无法取得。

Promise对象一共有3种状态，**pending`，`fullfilled`（又称为`resolved`）和`rejected**：

- pending——任务仍在进行中。

- resolved——任务已完成。

- rejected——任务出错。

  

romise对象初始时处于pending状态，其生命周期内只可能发生以下一种状态转换：

- 任务完成，状态由pending转换为resolved。
- 任务出错返回，状态由pending转换为rejected。

**Promise对象的状态转换一旦发生，就不可再次更改**。这或许就是Promise之“承诺”的含义吧。

#### 2.基本用法

##### 2.1 创建Promise

`Javascript`提供了`Promise`构造函数用于创建`Promise`对象。格式如下：

```js
let p = new Promise(executor(resolve, reject));
//Promise 结构
class Promise{
    constructor(exector){
        function resolve(){
            
        }
        function reject(){
            
        }
        exector(resolve,reject)    
    }
    then(){
        
    }
}

```

代码中`executor`是用户自定义的函数，用于实现具体异步操作流程。**该函数有两个参数`resolve`和`reject`，它们是Javascript引擎提供的函数，不需要用户实现。**在`executor`函数中，如果异步操作成功，则调用`resolve`将`Promise`的状态转换为`resolved`，`resolve`函数以结果数据作为参数。如果异步操作失败，则调用`reject`将`Promise`的状态转换为`rejected`，`reject`函数以具体错误对象作为参数。

##### 2.2 `then`方法

`Promise`对象创建完成之后，我们需要调用`then(succ_handler, fail_handler)`方法指定成功和/或失败的回调处理。例如：

```js
let p = new Promise(function(resolve, reject) {
    resolve("finished");
});

p.then(function (data) {
    console.log(data); // 输出finished
}, function (err) {
    console.log("oh no, ", err.message);
});
```

在上面的代码中，我们创建了一个`Promise`对象，在`executor`函数中调用`resolve`将该对象状态转换为`resolved`。

进而`then`指定的成功回调函数被调用，输出`finished`。

```js
let p = new Promise(function(resolve, reject) {
    reject(new Error("something be wrong"));
});

p.then(function (data) {
    console.log(data);
}, function (err) {
    console.log("oh no, ", err); // 输出oh no,  something be wrong
});
```

以上代码中，在`executor`函数中调用`reject`将`Promise`对象状态转换为`rejected`。

进而`then`指定的失败回调函数被调用，输出`oh no, something be wrong`。

这就是最基本的使用`Promise`编写异步处理的方式了。但是，有几点需要注意：

（1） `then`方法**可以只传入成功或失败回调**。

（2）`executor`函数是立即执行的，而成功或失败的回调函数会到当前`EventLoop`的最后再执行。下面的代码可以验证这一点：

```js
let p = new Promise(function(resolve, reject) {
    console.log("promise constructor");
    resolve("finished");
});

p.then(function (data) {
    console.log(data);
});

console.log("end");
```

输出结果为：

```js
promise constructor
end
finished
```

（3） `then`方法返回的是一个新的`Promise`对象，所以可以链式调用：

```js
let p = new Promise(function(resolve) {
    resolve(5);
});

p.then(function (data) {
    return data * 2;
})
 .then(function (data) {
    console.log(data); // 输出10
});
```

（4）`Promise`对象的`then`方法可以被调用多次，而且可以被重复调用（不同于事件，同一个事件的回调只会被调用一次。）。

```js
let p = new Promise(function(resolve) {
    resolve("repeat");
});

p.then(function (data) {
    console.log(data);
});

p.then(function (data) {
    console.log(data);
});

p.then(function (data) {
    console.log(data);
});
```

输出：

```js
repeat
repeat
repeat
```

##### 2.3 `catch`方法

由前面的介绍，我们知道，可以由`then`方法指定错误处理。但是ES6提供了一个更好用的方法`catch`。直观上理解可以认为`catch(handler)`等同于`then(null, handler)`。

```js
let p = new Promise(function(resolve, reject) {
    reject(new Error("something be wrong"));
});

p.catch(function (err) {
    console.log("oh no, ", err.message); // 输出oh no, something be wrong
});
```

**通常不建议在`then`方法中指定错误处理，而是在调用链的最后增加一个`catch`方法用于处理前面的步骤中出现的错误。**

使用时注意一下几点：

- `then`方法指定两个处理函数，**调用成功处理函数抛出异常时，失败处理函数不会被调用**。
- `Promise`中未被处理的异常不会终止当前的执行流程，也就是说`Promise`会**“吞掉异常”**。

```js
let p = new Promise(function (resolve, reject) {
    throw new Error("something be wrong");
});

p.then(function (data) {
    console.log(data);
});

console.log("end");
// 程序正常结束，输出end
```

##### 2.4 其他创建Promise对象的方式

除了`Promise`构造函数，ES6还提供了两个简单易用的创建`Promise`对象的方式，即`Promise.resolve`和`Promise.reject`。

##### `Promise.resolve`

顾名思义，`Promise.resolve`创建一个`resolved`状态的`Promise`对象：

```js
let p = Promise.resolve("hello");

p.then(function (data) {
    console.log(data); // 输出hello
});
```

`Promise.resolve`的参数分为以下几种类型：

（1）参数是一个`Promise`对象，那么直接返回该对象。

（2） 参数是一个`thenable`对象，即拥有`then`函数的对象。这时`Promise.resolve`会将该对象转换为一个`Promise`对象，并且立即执行其`then`函数。

```js
let thenable = {
    then: function (resolve, reject) {
        resolve(25);
    };
};
let p = Promise.resolve(thenable);
p.then(function (data) {
    console.log(data); // 输出25
});
```

（3）其他参数（无参数相当于有一个undefined参数），创建一个状态为`resolved`的`Promise`对象，参数作为操作结果会传递给后续回调处理。

##### `Promise.reject`

`Promise.reject`不管参数为何种类型，都是创建一个状态为`rejected`的`Promise`对象。

#### 3.高级用法

##### 3.1 Flatten Promise

`then`**方法的成功回调函数可以返回一个新的`Promise`对象**，这时旧的`Promise`对象将会被冻结，**其状态取决于新`Promise`对象的状态。**

```js
let p1 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve("promise1");
    }, 3000);
});

let p2 = new Promise(function (resolve) {
    resolve("promise2");
});

p2.then(function (data) {
    return p1;  // (A)
})
  .then(function (data) { // (B)
    console.log(data); // 输出promise1
});
```

我们在(A)行直接返回了另一个`Promise`对象。后面的`then`方法执行取决于该对象的状态，所以在3s后输出`promise1`，不会输出`promise2`。

##### 3.2 Promise.all 方法

很多时候，我们想要等待多个异步操作完成后再进行一些处理。如果使用回调的方式，会出现前面提到过的回调地狱。例如：

```js
let fs = require("fs");

fs.readFile("file1", "utf8", function (data1, err1) {
    if (err1 != nil) {
        console.log(err1);
        return;
    }
    fs.readFile("file2", "utf8", function (data2, err2) {
        if (err2 != nil) {
            console.log(err2);
            return;
        }
        fs.readFile("file3", "utf8", function (data3, err3) {
            if (err3 != nil) {
                console.log(err3);
                return;
            }
            console.log(data1);
            console.log(data2);
            console.log(data3);
        });
    });
});
```

假设文件`file1`，`file2`，`file3`中的内容分别是"in file1"，"in file2"，"in file3"。那么输出如下：

```js
in file1
in file2
in file3
```

这种情况下，`Promise.all`就派上大用场了。`Promise.all`接受一个可迭代对象（即ES6中的Iterable对象），每个元素通过调用`Promise.resolve`转换为`Promise`对象。`Promise.all`方法返回一个新的`Promise`对象。该对象在所有`Promise`对象状态变为`resolved`时，其状态才会转换为`resolved`，参数为各个`Promise`的结果组成的数组。只要有一个对象的状态变为`rejected`，新对象的状态就会转换为`rejected`。使用`Promise.all`我们可以很优雅的实现上面的功能：

```js
let fs = require("fs");

let promise1 = new Promise(function (resolve, reject) {
    fs.readFile("file1", "utf8", function (err, data) {
        if (err != null) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

let promise2 = new Promise(function (resolve, reject) {
    fs.readFile("file2", "utf8", function (err, data) {
        if (err != null) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

let promise3 = new Promise(function (resolve, reject) {
    fs.readFile("file3", "utf8", function (err, data) {
        if (err != null) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

let p = Promise.all([promise1, promise2, promise3]);
p.then(function (datas) {
    console.log(datas);
})
 .catch(function (err) {
    console.log(err);
});
```

输出如下：

```
['in file1', 'in file2', 'in file3']
```

第二段代码我们可以进一步简化为：

```js
let fs = require("fs");

let myReadFile = function (filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, "utf8", function (err, data) {
            if (err != null) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

let promise1 = myReadFile("file1");
let promise2 = myReadFile("file2");
let promise3 = myReadFile("file3");

let p = Promise.all([promise1, promise2, promise3]);
p.then(function (datas) {
    console.log(datas);
})
 .catch(function (err) {
    console.log(err);
});
```

#### 3.3 Promise.race 方法

`Promise.race`与`Promise.all`一样，接受一个可迭代对象作为参数，返回一个新的`Promise`对象。不同的是，只要参数中有一个`Promise`对象状态发生变化，新对象的状态就会变化。也就是说哪个操作快，就用哪个结果（或出错）。利用这种特性，我们可以实现超时处理：

```js
let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject(new Error("time out"));
    }, 1000);
});

let p2 = new Promise(function (resolve, reject) {
    // 模拟耗时操作
    setTimeout(function () {
        resolve("get result");
    }, 2000);
});

let p = Promise.race([p1, p2]);

p.then(function (data) {
    console.log(data);
})
 .catch(function (err) {
    console.log(err);
});
```

对象`p1`在1s之后状态转换为`rejected`，`p2`在2s后转换为`resolved`。所以1s后，`p1`状态转换时，`p`的状态紧接着就转为`rejected`了。从而，输出为：

```js
time out
```

如果将对象`p2`的延迟改为0.5s，那么在0.5s后`p2`状态改变时，`p`紧随其后状态转换为`resolved`。从而输出为：

```js
get result
```

#### 4.使用案例

前面我们提到过，`then`方法会返回一个新的`Promise`对象。所以`then`方法可以链式调用，前一个成功回调的返回值会作为下一个成功回调的参数。例如：

```js
let p = new Promise(function (resolve, reject) {
    resolve(25);
});

p.then(function (num) { // (A)
    return num + 1;
})
 .then(function (num) { // (B)
    return num * 2;
})
 .then(function (num) { // (C)
    console.log(num);
});
```

对象`p`状态变为`resolved`时，结果为`25`。行(A)处函数最先被调用，参数`num`的值为`25`，返回值为`26`。`26`又作为行(B)处函数的参数，函数返回`52`。`52`作为行(C)处函数的参数，被输出。

下面给出结合AJAX的一个案例。

```js
let getJSON = function (url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
            }
        }
        xhr.send();
    });
}

getJSON("http://api.icndb.com/jokes/random")
 .then(function (responseText) {
    return JSON.parse(responseText);
})
 .then(function (obj) {
    console.log(obj.value.joke);
})
 .catch(function (err) {
    console.log(err.message);
});
```

`getJSON`函数接受一个`url`地址，请求json数据。但是请求到的数据是文本格式，所以在第一个`then`方法的回调中使用`JSON.parse`将其转为对象，第二个`then`方法回调再进行具体处理。