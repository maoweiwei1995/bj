# 异步编程终极大法async/await入门

[![96](https://upload.jianshu.io/users/upload_avatars/2470298/f37c902f6094?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96)](https://www.jianshu.com/u/eec05fd43014) 

# 前言

async 函数是目前解决JS异步编程的终极解决方案，学习它之前你可以先看看我写的[我对Promises的理解](https://www.jianshu.com/p/b497eab58ed7)和[理解 ES6 Generator 函数](https://www.jianshu.com/p/e0778b004596)，因为async/await需要联合Promises使用，而且是Generator函数的语法糖，所以必须先学Promises和Generator，最少，需要先学Promises。

async函数在较低版本的Chrome浏览器中，需要开启“实验性 JavaScript”才能使用，55版本以上默认支持。

# 例1：a/a的最简单举例

一个最简单的使用a/a的范例如下：

```
function type(delayedTime) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(delayedTime);
            resolve();
        }, delayedTime);
    });
}

async function asyncFunc() {
    await type(3000);
    await type(2500);
    console.log(1);
};
asyncFunc();
```

最终执行结果是：**等三秒，打印3000，然后等2.5秒，打印2500，然后紧跟输出1。**

一、先看type函数，他是一个普通函数，内部返回一个Promise对象。除此之外没有特别的。

二、然后看asyncFunc函数，它不是普通函数，它前面有async关键字，这意味着asyncFunc函数是一个异步函数，async就是异步的意思，很好理解，比Promise（允诺）和Generator（生成器）要好理解的多。

三、看async函数的内部，**async函数的内部一定会有await关键字，**await也容易理解，就是等待。也就是说，等await后面的表达式执行完了，才执行下一个表达式。

最后可以看出，虽然我说你必须先学Promises和Generator，但是这不意味着a/a最难学，相反，它才是最好学的，因为它完全符合第一天学习JS的初学者对JS的错误理解：

> “我写JS只需要从上到下一行一行的写下去，代码就肯定会是一行一行的从上到下执行下去，每一句都会等上一句执行完了才执行。”

虽然这种理解绝对是错误的认知，但是，其实，这才是异步编程的最理想解决方案：“你根本看不出它是异步代码，你只需要像写同步代码一样写异步代码就好了。”

**总结起来，a/a大法的最基本用法就是：**

**1. 首先定义一个或多个普通函数，函数必须返回的是Promise对象（事实上你可以返回其他数据，但这就失去了a/a的威力）。Promise对象中可以写任意异步语句，必须有resolve()。**

**2. 然后定义一个async函数，函数语句就是执行那些个普通函数，注意，每个执行语句前面都加上await关键字。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。（await后面也可以跟原始类型，但没意义。）**

**3. 执行这个async函数即可。async函数的返回值是Promise对象，你可以用Promise对象的.then()方法指定下一步的操作。**

# 例2：把例1用Generator函数写法写出来

```
function type(delayedTime) {
    setTimeout(function () {
        console.log(delayedTime);
        it.next();
    }, delayedTime);
}

function* asyncFunc() {
    yield type(3000);
    yield type(2500);
    console.log(1);
}

var it = asyncFunc();

it.next();
```

**可以看出a/a跟Generator函数的区别：**

1. Generator函数的执行必须靠执行器（例子中是`it.next()`），每一个普通函数中通常会有一个执行器，多个普通函数中有多个执行器，实践中如果偶尔忘了写执行器，那么整个代码就不会正常执行；而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行`asyncFunc()`。
2. async和await，比起星号和yield，语义更清楚。
3. async函数的返回值是Promise对象，这比Generator函数的返回值是迭代器对象方便得多。

# 例3：把例1用Promises方式写出来

```
function type(delayedTime) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(delayedTime);
            resolve();
        }, delayedTime);
    });
}

type(3000)
.then(function() {
    return type(2500);
})
.then(function(){
    console.log(1);
});
```

**可以看出a/a与Promises写法的区别：**

1. Promises写法每一步要为下一步的.then返回一个Promise对象，注意，`return type(1000);`的`return`不要忘了写，不要以为函数里有return，这里就可以省略。而a/a写法，在async函数中不需要有return关键字。
2. Promises写法每一个`.then`都要接收一个回调函数作为参数，而a/a完全不用这么麻烦，await等待的虽然是promise对象，但不必写`.then(..)`，直接可以得到返回值。所以说await是then的语法糖。
3. 当然了，async函数执行之后，也返回一个Promise对象，也就是说，不光是async函数内部的await有then的作用，而且async函数本身也可以连缀then，等于肚子里可以连缀then，肚子外还可以连缀then。

# async函数连缀.then的最基本写法

上面说了，async函数永远返回一个Promise对象，所以它当然可以连缀.then方法。

复习一下刚才的命题，3秒之后打印`3000`，然后2.5秒之后打印`2500`，然后立即打印`1`，对吧？现在我打算增加后续：

打印`1`之后，再等2秒，打印`2000`，再等1.5秒，打印`1500`。

代码如下：

```
function type(delayedTime) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(delayedTime);
            resolve(delayedTime);
        }, delayedTime);
    });
}

async function asyncFunc() {
    await type(3000);
    await type(2500);
    console.log(1);
};

asyncFunc()
.then(function () {
    return type(2000);
})
.then(function () {
    return type(1500);
});
```

关键点在于`return`关键字，它用于返回一个Promise对象。

# async函数内部await传递数据的写法

现在的命题是，我想要先延迟3秒，打印`3000`，然后把3000这个数字减去500（也就是得到2500），作为下一个延迟的毫秒数，然后打印这个毫秒数，然后继续减去500（也就是得到2000），作为再下一个延迟的毫秒数，然后打印这个毫秒数，然后再继续减去500（也就是得到1500），然后打印这个毫秒数。

总共打印4个数。写法如下：

```
function type(delayedTime) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(delayedTime);
            resolve(delayedTime);
        }, delayedTime);
    });
}

async function asyncFunc() {
    var t1 = await type(3000);
    var t2 = await type(t1 - 500);
    var t3 = await type(t2 - 500);
    type(t3 - 500);
};
asyncFunc();
```

关键点有2个，一个是`resolve(delayedTime)`，它用于发出数据，一个是`var t1 = await type(3000);`，这里注意，`type(3000)`返回的是Promise对象，await返回的是delayedTime的值。

我们这个例子是每次减500，甚至可以使用for循环来执行，并不会打乱顺序。

# async函数外部连缀then并且还要传递数据的写法

除了内部能传递数据，外部也一样可以。代码如下：

```
function type(delayedTime) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(delayedTime);
            resolve(delayedTime);
        }, delayedTime);
    });
}

async function asyncFunc() {
    return await type(3000);
}

asyncFunc()
.then(function (result) {
    return type(result - 500);
})
.then(function (result) {
    return type(result - 500);
})
.then(function (result) {
    type(result - 500);
});
```

可以看出，外部连缀then的写法，代码比较冗余，所以尽量在内部使用await实现。因为await已经有then的作用，没必要在外部连缀then。

# async函数有多种使用形式

### 函数声明形式，也是最基本的形式

```
async function foo() {}
```

### 函数表达式形式

```
const foo = async function () {};
```

### 对象的方法形式

```
let obj = { async foo() {} };
obj.foo().then(...)
```

### Class的方法

```
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);
```

### 箭头函数

```
const foo = async () => {};
```

# 错误处理

在不考虑出错的情况下，async/await就以上这么点东西，其实就是async、await、return这三个关键字各种倒腾，每一步都要返回Promise对象就行了。

下面考虑错误处理。

首先我还是假设你已经懂了Promises的错误处理机制。复习一下：

> Promises利用`reject()`来传递错误，利用.then的第二个回调函数，或利用.catch来捕获错误。

a/a也是如此，举个栗子：

```
function f() {
    return new Promise(function (resolve, reject) {
        reject('出错了');
    });
}

async function asyncFunc() {
    await f();
};

asyncFunc().then(function (e) {
    console.log(1111);
}, function (e) {
    console.log(e); // 出错了
});

asyncFunc().catch(function (e) {
    console.log(e); // 出错了
});
```

**之前说过，await能够起到.then的作用，await如果等待到的是失败的结果，就必须先处理这个结果，才能进入下一个流程。这一点很重要。**

比如，上面例子如果我成这样：

```
async function asyncFunc() {
    await f();
    await f();
};
```

第一个f()的执行，只会得到失败的结果，这个结果如果不被处理，那么第二个f()根本不会执行。验证一下：

```
function f(data) {
    return new Promise(function (resolve, reject) {
        reject(data);
    });
}

async function asyncFunc() {
    await f('data1'); // await发现这个Promise的错误没有得到处理，所以不会进入下个环节
    await f('data2'); // 那么这一步就不执行
};

asyncFunc().catch(function (e) {
    console.log(e); // data1 也就是只会捕获到第一个环节的错误
});
```

现在我略加改动，给`f('data1')`做失败处理，你再看看：

```
function f(data) {
    return new Promise(function (resolve, reject) {
        reject(data);
    });
}

async function asyncFunc() {
    await f('data1').catch(function (e) {
        console.log(e); // data1
    });
    await f('data2');
};

asyncFunc().catch(function (e) {
    console.log(e); // data2
});
```

**所以你可以看到，async内部也可以有.then和.catch级联，外部也可以继续级联，a/a的宇宙，就是Promise的状态和数据不断传递的宇宙。a/a就是Promises的超集。**

**同时我们也可以看到，async内部和外部都可以有.then和.catch级联，所以你就要思考到底是在内部写流程，还是外部写流程，怎样才能写出最清晰的代码。我个人建议优先考虑在内部写小流程，在外部写大流程。**

### 谈谈try {} catch(e) {}

你会在一些参考文章里看到`try {} catch(e) {}`的用法，它也用于在async函数内部实现错误捕获。就比如下面这种：

```
function f(data) {
    return new Promise(function (resolve, reject) {
        reject(data);
    });
}

async function asyncFunc() {
    try {
        await f('data1');
    } catch(e) {
        console.log(e); // data1
    }

    await f('data2');
};

asyncFunc().catch(function (e) {
    console.log(e); // data2
});
```

也就是说，既然你认为第一步可能出错，那么就try一下，这个写法当然是可以运行的，但是尽量不要这么做，因为在a/a领域，已经有.then和.catch来负责错误分支，就根本没必要引入`try {} catch(e) {}`的写法，这种写法徒增代码复杂度。

# a/a与Promises特有方法的配合

了解Promises规范（可以参看我的https://www.jianshu.com/p/b497eab58ed7），就会知道Promise.all()和Promise.race()，这两个特有方法的用法见我写的文档，跟a/a的结合使用也很简单，比如Promise.all()：

```
// 例1，有一个失败就进入下一个环节
function f(data) {
    return new Promise(function (resolve, reject) {
        reject(data);
    });
}

async function asyncF() {
    await Promise.all([f('data1'),f('data2')]).catch(function (e) {
        console.log(e); // data1
    });
};

asyncF();

// 例2，全部成功才进入下一个环节
function g(data) {
    return new Promise(function (resolve, reject) {
        resolve(data);
    });
}

async function asyncG() {
    await Promise.all([g('data1'),g('data2')]).then(function (e) {
        console.log(e); // ["data1", "data2"]
    });
};

asyncG();
```

Promise.race()跟a/a的结合也很简单，本质都是Promise对象的状态变化和数据传递，不多说。