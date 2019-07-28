# this指向

首先，分析this的指向共有四种类型，在分析之前，我们首先带好两个锦囊：
1.函数**被调用时（即运行时）**才会确定该函数内this的指向。因为在函数中this与arguments是两个特殊的变量，在函数被调用时才会取得它们，而且搜索这两个变量时只会在活动对象范围里面去搜。（有关活动对象与变量对象的知识，请移步到[js 中的活动对象 与 变量对象 什么区别？](https://www.zhihu.com/question/36393048)）
2.要确定函数中this的指向，必须先找到该函数被调用的位置。

### 认准第一种“test()”形式

```js
var a = 1
function test () {
    console.log(this.a)
}
test()
```

直接不带任何引用形式去调用函数，则this会指向全局对象，因为没有其他影响去改变this，this默认就是指向全局对象（浏览器是window，Node中是global）的。这个结论是在非严格模式的情况下，严格模式下这个this其实是undefined的。

### 认准第二种“xxx.test()”形式

```js
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test()
```

这种形式对比起第一种，很明显test()已经是名花有主的了！看清楚，是谁呼唤的test()？没错，就是obj，所以this的指向就不言而喻了。一句话，谁去调用这个函数的，这个函数中的this就绑定到谁身上。

```js
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var obj0 = {
    a: 3,
    obj 
}
obj0.obj.test()
```

即使是这种串串烧的形式，结果也是一样的，**test()中的this只对直属上司（直接调用者obj）负责**。再来看一个综合点的例子：

```js
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy()
```

嗯，聪明的你一定想到，换了个名字就能骗到我了！？虽然经过了一波改名换姓，但本质上还不是obj.test()嘛！结果一定和上面一样！唔，请F12在控制台试试，竟然……其实这里并不需要去思考什么，按照我们的套路，我们就认函数调时的样子，有没有看到最后调用的时候跟第一种情况一毛一样？我再介绍一个场景大家一定不会觉得陌生：

```js
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
setTimeout(obj.test)
```

你可以意淫一下setTimeout的本质，是不是相当于有一个setTimeout函数，接收两个参数：

```js
function setTimeout (fn, time) {
    // 这里干了一大波不可描述的事情，最后会去调一下你传进来的回调函数
    fn()
}
```

看到怎样调用你传进来的函数了吗！？再想想我们第一种形式的标题**认准第一种“test()”形式**。

### 认准第三种“test.call(xxx) / test.apply(xxx) / test.bind()”形式

看了上面两种形式之后，你可能会想，我非常讨厌上面那些矫情的扭扭捏捏的九曲十八弯的调用方式，让人毫无安全感，我要我自己指定this的指向，我要胜天半子！没问题，我的代码我做主：

```js
var a = 1
function test () {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
var testCopy = obj.test
testCopy.call(obj)
```

可以看到，我们通过call（apply跟call的区别只是传参，作用是一样的，bind有点区别，bind能让我们的函数延迟执行，apply与call调用就执行，所以bind这样的形式我们也称为函数柯里化，这些就不是我们这里要说的啦）来调用testCopy，并且传入了你想要this指向的上下文，那么this就会乖乖按照你的指示行事啦。看到这里，我们也可以想象第一、二种形式其实可以转化成call/apply的形式，有一篇比较棒的文章描述了这样的思考过程，大家也可以看看[this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)

### 认准第四种“new test()”形式

终于到了最后一种形式了，这种形式比较好认，因为有标志性的new：

```js
var a = 1
function test (a) {
    this.a = a
}
var b = new test(2)
console.log(b.a)
```

new这个操作符其实是new了一个新对象出来，而被new的test我们称为构造函数，我们可以在这个构造函数里定义一下将要到来的新对象的一些属性。那么在构造函数里，我们怎样去描述这个还未出生的新对象呢？没错，就是用this。所以构造函数里的this指的就是将要被new出来的新对象。

### One more thing

感谢大家看到这里，但还要说最后一种形式。等等，不是说好的只有四种形式吗！稍安勿躁，正常套路下确实只有上面四种，但是有个东西别忘了，就是大家最喜欢的箭头函数。

```js
var a = 1
var test = () => {
    console.log(this.a)
}
var obj = {
    a: 2,
    test
}
obj.test()
```

来，往上翻一下我们的第一个锦囊，“函数**被调用时（即运行时）**才会确定该函数内this的指向。”现在函数这两个字要加个词修饰一下，变成普通函数（非箭头函数）才能区别于箭头函数。箭头函数中的this在**函数定义的时候**就已经确定，它this指向的是它的外层作用域this的指向。