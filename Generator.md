# 阮一峰es6要点总结——Generator

1. ## 基本概念

核心目的：异步编程解决方案

关键概念：状态机，执行权限的传递，数据的传入传出

- **写法**

> 

- `function`关键字和函数名之间有一个星号
- 函数内部，使用`yield`语句，定义内部状态
- 作为对象属性，可以简写

```
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

调用Generator函数，函数并不执行，而是返回一个遍历器对象。必须调用遍历器对象的`next`方法，将函数执行到下一个`yield`语句的地方。

当遇到`yield`语句，就暂停执行，并将`yield`后边的表达式的值，作为返回对象的`value`属性值。

`yield`语句如果用在一个表达式之中，必须放在圆括号里面

`yield`语句用作函数参数或放在赋值表达式的右边，可以不加括号

`return`语句，将返回表达式后边的值，并结束函数。

- **传入与传出**

通过`yield`后的表达式，可以实现传出

通过`next(value)`方法中，传入参数，可以实现传入。value将作为上一个`yield`语句的返回值。

> 我们都知道，一个运算符，都有返回值，比如`+`号，比如`=`号，比如`,`号。正常情况下，`yield`语句的返回值，是`undefined`，当我们为`next`方法传入参数时候，在恢复执行之前，会将`yield`的返回值替换为我们传入的参数。

```
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

所以，我们是可以对函数的行为进行控制的。这就非常方便了，比如，函数执行权的交替。

1. 

### 碎知识

- 与`for...of`配合
  比如，实现对象的遍历

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

也可以直接加到对象的`Symbol.iterator`上

```
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

- `Generator.prototype.throw()`
  Generator函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

```
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

`throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。

不管内外，必须有`try...catch`语句来捕获错误，不然程序将报错。

`throw`方法被捕获以后，会附带执行到下一条`yield`语句。（他就是它本身带了一个`next`方法）

一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象，即JavaScript引擎认为这个Generator已经运行结束了。

```
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
```

- `Generator.prototype.return()`

Generator函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历Generator函数。

如果`return(value)`方法传值了，那就返回传入的那个值，如果没有传值，就返回`undefined`

如果Generator函数内部有`try...finally`代码块，那么当遇到`return`时候，不会立刻结束，而是会把`finally`代码块中的执行完，然后再`return`

```
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

- yield*
  在Generator函数调用另一个Generator函数时候，要用yield*

等价于，在yield*位置，展开另一个Generator函数的状态。

```
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

任何数据结构只要有Iterator接口，就可以被yield*遍历

如果被代理的Generator函数有`return`语句，那么就可以向代理它的Generator函数返回数据。

```
function *foo() {
  yield 2;
  yield 3;
  return "foo";
}

function *bar() {
  yield 1;
  var v = yield *foo();
  console.log( "v: " + v );
  yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}
```

yield*命令可以很方便地取出嵌套数组的所有成员。

```
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

- Generator函数中的this

Generator函数，不能跟`new`操作符一起使用，会报错

把Generator函数，当成构造函数，会失效，因为它总是返回遍历器对象，而不是那个新创建的对象。

一个方法解决

```
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

1. 

### Generator 与 协程

协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。

协程既可以用单线程实现，是一种特殊的子例程。
也可以用多线程实现，是一种特殊的线程。

- 协程与子例程的差异

传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以**多占用内存为代价**，实现多任务的并行。

- 协程与普通线程的差异

不难看出，协程适合用于多任务运行的环境。在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

由于ECMAScript是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈。这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。

Generator函数是ECMAScript 6对协程的实现，但属于不完全实现。Generator函数被称为“半协程”（semi-coroutine），意思是只有Generator函数的调用者，才能将程序的执行权还给Generator函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

如果将Generator函数当作协程，完全可以将多个需要互相协作的任务写成Generator函数，它们之间使用yield语句交换控制权。

1. 

### 应用

**改写异步操作——同步化表达**

例子一：Ajax操作

```
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();
```

注意request方法里边，请求到后，调用`next`方法，要传参数进去。

例子二：逐行读取文本

```
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
```

**控制流管理**

例子一：同步方法的流管理

```
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```

例子二：利用`for...of`

```
let steps = [step1Func, step2Func, step3Func];

function *iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}
```

以上将任务，分成多个步骤

```
let jobs = [job1, job2, job3];

function *iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield *iterateSteps(job.steps);
  }
}
```

又将项目，分成多个任务。

最后，用`for...of`循环，一次性执行所有任务的所有步骤。

```
for (var step of iterateJobs(jobs)){
  console.log(step.id);
}
```

**部署Iterator接口**

```
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

1. 

### 异步应用

#### 异步编程的方法

- 回调函数
- 事件监听
- 发布/订阅模式
- Promise 对象

ES6，有了Generator

#### 几种方法的分析

回调函数，在写法上，会出现多重嵌套的问题（回调地狱）

Promise解决了这个问题，但是引入了大量的Promise语法。总体来说，没有新意。

Generator函数是协程的ES6实现，通过执行权的交替，实现了异步编程。

### Generator的自动流程管理

- 回到函数，封装Thunk函数
- Promise

#### Thunk 函数

**参数的求职策略**

即，函数的参数到底何时求值？

- 传值调用
  在进入函数体之前。c用的传值调用
- 传名调用
  在真正用到时候，再求值。

Thunk函数，在传名调用实现中，将参数放入一个临时函数之中，再将这个临时函数，传入函数体。这个临时函数，就是Thunk函数。

```
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```

**JavaScript的Thunk函数**

js是传值调用，它的Thunk函数，替换的是多参数函数，将其替换成，**只接受回调函数**作为参数的单参数函数。

```
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

也就是说，我们通过thunk将回到函数，普通参数分离开来传入。这为我们交替执行权做准备。

下边是简单的Thunk函数转换器

```
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
var Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```

使用方法

```
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```

**生产环境的Thunk**

建议使用Thunkify模块
它的源码，与上边的很像

```
function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```

它的源码主要多了一个检查机制，变量called确保回调函数只运行一次。

**重点：利用Thunk的 Generator函数自动流程管理**

由于多个异步操作，需要保证前一步执行完，再执行后一步。可以这样

```
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
```

两个异步操作，在执行他们时候，把执行权交给了另一个函数，然后，在另一个函数（`readFileThunk`）中，当异步操作完成，我们再把执行权返还给`gen`，这样就保证了前一步完成，再执行下一步。

现在我们有Thunk函数，有了Generator函数，关键就是，自动执行的函数怎么写。

我们的目的是，在Thunk的回调函数与Generator之间进行切换

```
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
    // 注意这一步，result.value是gen函数中的readFileThunk，
    // 它是一个Thunk函数，也就是说，这一步等价于readFileThunk(file1)(next)
  }

  next();
}

function* g() {
  // ...
}

run(g);
```

上边的函数中：
第一步——next就是Thunk函数的回调函数，首先将执行权还给gen函数
第二步——gen 函数执行到yield语句，将执行权交给next函数，并把需要的异步操作一并传给next函数。
第三步——run函数收到返回的对象，判断流程是否结束，如果没有结束，直接调用传回的异步操作，即result.value(next)，等价于readFileThunk(file1)(next)
第四步——异步操作完成，将会调用回到函数next，并将请求的数据传入next函数。此时，next函数重复第一步，并将数据传回gen函数。

如此往复循环，知道结束

也就是说，异步操作的回调函数，用来控制流程，并且将数据原封不动的传回给gen函数。真正对请求数据的操作不是在回调函数里做的，而是在gen函数里。

### co模块——基于Promise对象的Generator函数自动流程管理

TJ Holowaychuk发布的小工具，就是上边的run函数，只不过用的是Promise

一个例子：

```
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

首先将异步操作封装成Promise（上一部分是封装成Thunk）。

如果手动执行：

```
var g = gen();

g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});
```

其实就是一堆then，，，

ok，接下来写自动执行器

```
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);
```

跟上一部分没什么差别。用Promise编程而已

**来看看co的源码**

最外层，co接受一个Generator，返回一个Promise

```
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
  });
}
```

在返回的Promise对象中，首先检查`gen`是否为Generator，如果是，就执行，如果不是，就返回，并将Promise的状态`resolved`

```
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
  });
}
```

co将next方法抽象为两部分，1-执行权交给gen,2-调用自身。在第一部分加入了出错处理，使得方法更健壮。

```
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);// 关键部分
    }
  });
}
```

最关键的是新的next函数

```
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  );
}
```

如果gen结束了，那执行器也结束
第二行，保证gen传过来的每一步，都是Promise
第三行，如果确实是Promise，就执行异步操作，并设置onFulfilled为成功的回调函数。
第四行，如果参数不符合要求，终止执行，并将返回的Promise状态改为rejected。

**co支持并发的异步操作**
并发，即，某些操作同时进行，等到他们全部完成，才执行下一步

将并发的操作放在数组/对象里边，跟在yield语句后边即可

```
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);
```

另一个例子

```
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return y
}
```

**处理Stream**

Stream，就是将整个数据，一块块挨着处理。

Stream模式使用EventEmitter API，会释放三个事件

- `data`事件：下一块数据准备好了
- `end`事件：整个数据流处理完了
- `error`事件：发生错误

利用`Promise.race()`函数，可以判断只有当`data`事件发生，才进入下一个数据块的处理。

```
const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});
```

