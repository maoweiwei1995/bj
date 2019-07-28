# JS中的执行上下文(Execution Context)和栈(stack)

#### 一：什么是执行上下文？

当JavaScript代码运行的时候，确定它运行所在的环境是非常重要的。运行环境由下面三种不同的代码类型确定

- 全局代码（Global Code）：代码首次执行时候的默认环境
- 函数代码（Function Code）：每当执行流程进入到一个函数体内部的时候
- Eval代码（Eval Code）：当eval函数内部的文本执行的时候

您可以在网上找到大量关于`scope`的参考资料。为了更易于理解，我们将execution context简单视为运行当前代码的environment/scope。好了，话不多说，先让我们看个例子，其中包含了global context和function/local context 代码。



![img](https://upload-images.jianshu.io/upload_images/5006242-51da3f3458f65413.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/554/format/webp)

Example 1

在上图中，我们有1个**全局上下文(Global Context)**，使用紫色边框表示；有3个不同的函数上下文(**Function Context**)由绿色，蓝色，和橙色边框表示。注意！全局上下文有且只有一个，程序中其他任意的上下文都可以访问全局上下文。

你可以拥有任意数量的函数上下文。每一次

函数调用

都会创建一个新的上下文，它会创建一个私有域，函数内部做出的所有声明都会放在这个私有域中，并且这些声明在当前函数作用域外无法直接访问。在上面的例子中，一个函数可以访问它所在的上下文尾部的变量，但是一个外部的上下文无法访问内部函数内部声明的变量/函数。为什么会发生这样的情况？代码究竟是如何被解析的呢？



#### 二：执行上下文栈

浏览器中的JS解释器是单线程的。也就是说在浏览器中同一时间只能做一个事情，其他的action和event都会被排队放入到执行栈中(Execution Stack)。下图表示了一个单线程栈的抽象视图



![img](https://upload-images.jianshu.io/upload_images/5006242-599e5eff9f1a5a2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/555/format/webp)

Execution Context Stack

如我们所知，当一个浏览器第一次load你的代码的时候，首先它会进入到一个全局执行上下文中。如果在你的全局代码中，你调用了一个函数，那么程序的执行流程会进入到被调用的函数中，并创建一个新的执行上下文，并将这个上下文推入到执行栈顶。
如果在当前的函数中，你由调用了一个函数，那么也会执行同样的操作。执行流程计入到刚被调用的函数内部，重新**创建一个新的执行上下文，并再次推入到执行栈顶**。浏览器会一直执行当前栈顶的执行上下文，一旦函数执行完毕，该上下文就会被推出执行栈。下面的例子展示了一个递归函数以及该程序的执行栈：

```js
(function foo(i) {
  if (i === 3) {
    return;
  }
  else {
    foo(++i);
  }
}(0));
```



![img](https://upload-images.jianshu.io/upload_images/5006242-f510689f91fc2a5d.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/390/format/webp)

es1.gif

这个代码循环调用了三次，每次对i累加1。每次函数foo调用的时候，都会有一个创建新的执行上下文。一旦上下文完成了执行，就会推出栈，将控制流返回给它下面的执行上下文，这样一直到全局上下文。
关于执行栈，有5点需要记住：

- 单线程
- 同步执行
- 一个全局上下文
- 无数的函数上下文
- 每次函数调用都会创建一个新的执行上下文，即使是调用自身

#### 三：执行上下文详解

我们已经知道每当一个函数调用发生，都会创建一个新的执行上下文。但是在JS解释器内部，每次调用一个执行上下文都分为两个步骤

1. **创建阶段**[在函数被调用，但还未执行任何代码之前]

- 创建[作用域链](http://davidshariff.com/blog/javascript-scope-chain-and-closures/).
- 创建参数、变量和函数
- 决定[`"this"`](http://davidshariff.com/blog/javascript-this-keyword/)的值

1. **激活/代码执行阶段**：

- 分配变量，以及到函数的引用，然后解析/执行代码

一个执行上下文从概念上可以视为一个包含三个property的Object

```js
executionContextObj = {
    'scopeChain': { /* variableObject + all parent execution context's variableObject */ },
    'variableObject': { /* function arguments / parameters, inner variable and function declarations */ },
    'this': {}
}
```

#### 四： Activation / Variable Object [AO/VO]

当调用函数的时候，就会创建`executionContextObj`对象，此时真正的函数逻辑还未执行。这就是第一阶段---创建阶段。在这里，解释器会扫描函数，根据获取到的**参数/传参**和**内部函数声明/内部变量声明**，来创建`executionContextObj`对象。扫描的结果存放在`executionContextObj`对象的`variableObject`属性中。

**下面是解释器解析代码的流程概述**:

1. 找到被调用函数的代码内容

2. 在执行`function`代码前，先创建执行上下文`execution context`

3. 进入创建阶段

   - 初始化 [`作用域链`](http://davidshariff.com/blog/javascript-scope-chain-and-closures/).

   - 创建variable object：

     - 创建 `arguments object`；检查上下文获取入参，初始化形参名称和数值，并创建一个引用拷贝
- 扫描上下文获取内部函数声明：
       - 对发现的每一个内部函数，都在`variable object`中创建一个和函数名一样的property，该property作为一个引用指针指向函数代码在内存中的地址
       - 如果在`variable object`中已经存在相同名称的property，**那么相应的property会被重写**
     - 扫描上下文获取内部变量声明：
  - 对发现的每一个内部变量声明，都在`variable object`中创建一个和变量名一样的property，并且将其初始化为 [`undefined`](http://davidshariff.com/blog/javascripts-undefined-explored/)
       - 如果在`variable object`中已经存在相同变量名称的property，那么就跳过，不做任何动作，继续扫描

   - 决定在上下文中[`"this"`](http://davidshariff.com/blog/javascript-this-keyword/) 的值
  
4. 激活/代码执行阶段:

   - 执行上下文中的函数代码，逐行运行JS代码，并给变量赋值

让我们看个例子

```js
function foo(i) {
    var a = 'hello';
    var b = function privateB() {
    };
    function c() {
    }
}
foo(22);
```

当刚调用`foo(22)`函数的时候，创建阶段的上下文大致是下面的样子：

```js
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {  // 创建了参数对象
            0: 22,
            length: 1
        },
        i: 22,  // 检查上下文，创建形参名称，赋值/或创建引用拷贝
        c: pointer to function c()  // 检查上下文，发现内部函数声明，创建引用指向函数体
        a: undefined,  // 检查上下文，发现内部声明变量a，初始化为undefined
        b: undefined   // 检查上下文，发现内部声明变量b，初始化为undefined，此时并不赋值，右侧的函数作为赋值语句，在代码未执行前，并不存在
    },
    this: { ... }
}
```

参见代码中的备注，在创建阶段除了**形参参数**进行了定义和赋值外，其他只定义了property的名称，并没有赋值。一旦创建阶段完成，执行流程就进入到函数内部进入激活/代码执行阶段。在执行完后的上下文大致如下：

```js
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```

#### 五：关于提升（Hoisting）

网上有很多资源会提到JS特有的变量提升(Hoisting)，其中会解释说JS会将变量和函数声明提升到函数作用域的顶部。但是，并没有人详细解释为什么会出现这种情况。在掌握了关于解释器如何创建上下文的知识后，这就非常容易解释了。看下面的代码：

```js
(function() {

    console.log(typeof foo); // function pointer
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };

    function foo() {
        return 'hello';
    }
    console.log(typeof foo); // string
}());
```

我们现在可以回答的问题是：

- **为什么我们可以在声明foo之前就访问它？**
  - 如果我们遵循`creation stage`，我们知道变量在`activation / code execution stage`之前就创建了。所以当功能流程开始执行时，在上下文中，`foo`已经做了定义。
- **foo是声明了两次，为什么显示foo的是** `function` **，不是** `undefined` **而是** `string`**？**
  - 即使`foo`声明了两次，我们也知道在`creation stage`阶段，在上下文中，函数是在变量之前创建的，并且如果上下文中一个变量名称的属性名已经存在，我们就会忽略掉这个变量声明。
  - 因此，`function foo()`首先在上下文中创建一个名为`foo`的引用property，当解释器到达时`var foo`时，我们看到属性名称`foo`已经存在，所以代码什么都不做并继续执行。
- **为什么bar是** [`undefined`](http://davidshariff.com/blog/javascripts-undefined-explored/)**？**
  - `bar`实际上是一个具有函数赋值的变量，我们知道变量是在`creation stage`阶段创建的，但它们是用值会被初始化为[`undefined`](http://davidshariff.com/blog/javascripts-undefined-explored/)。
- **为什么最后foo是**`string`**？**
  - `foo`在创造阶段按照规则被赋予了function的类型，但在执行阶段，随着`var foo = 'hello'`的执行，将其变为了String类型，下面的函数声明在创造阶段已经执行，因此跳过后，foo还是String类型

#### 六：总结

希望到现在您已经很好地掌握了JavaScript中解释器是如何处理您的代码的。理解执行上下文和栈可以让您了解为什么代码运行的结果和你最初预期的不同的原因。