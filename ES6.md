### ES6

#### 1.变量声明const和let

在ES6之前，我们都是用`var`关键字声明变量。无论声明在何处，都会被视为声明在**函数的最顶部**(不在函数内即在**全局作用域的最顶部**)。这就是函数**变量提升**例如:

```js
  function aa() {
    if(flag) {
        var test = 'hello man'
    } else {
        console.log(test)
    }
  }
```

以上的代码实际上是：

```js
  function aa() {
    var test // 变量提升，函数最顶部
    if(flag) {
        test = 'hello man'
    } else {
        //此处访问 test 值为 undefined
        console.log(test)
    }
    //此处访问 test 值为 undefined
  }
```

所以不用关心flag是否为 `true` or `false`。实际上，无论如何 test 都会被创建声明。

接下来ES6主角登场：
我们通常用 `let` 和 `const` 来声明，`let` 表示**变量**、`const` 表示**常量**。`let` 和 `const` 都是块级作用域。怎么理解这个块级作用域？

- 在一个函数内部
- 在一个代码块内部

> 说白了只要在**{}花括号内**的代码块即可以认为 `let` 和 `const` 的作用域。

看以下代码：

```js
  function aa() {
    if(flag) {
       let test = 'hello man'
    } else {
        //test 在此处访问不到
        console.log(test)
    }
  }
```

**let的作用域是在它所在当前代码块，但不会被提升到当前函数的最顶部**。

再来说说 `const`
`const` 声明的变量必须提供一个值，而且会被认为是常量，意思就是它的值被设置完成后就不能再修改了。

```js
    const name = 'lux'
    name = 'joe' // 再次赋值此时会报错
```

还有，如果 `const` 的是一个对象，对象所包含的值是可以被修改的。抽象一点儿说，就是对象所指向的地址不能改变，而变量成员是可以修改的。

```js
    const student = { name: 'cc' }
    // 没毛病
    student.name = 'yy'
    // 如果这样子就会报错了
    student  = { name: 'yy' }
```

说说TDZ(暂时性死区)，想必你早有耳闻。

```js
    {
        console.log(value) // 报错
        let value = 'lala'
    }
```

我们都知道，JS引擎扫描代码时，如果发现变量声明，用 `var` 声明变量时会将声明提升到函数或全局作用域的顶部。但是 `let` 或者 `const`，会将声明关进一个小黑屋也是TDZ(暂时性死区)，只有执行到变量声明这句语句时，变量才会从小黑屋被放出来，才能安全使用这个变量。

哦了，说一道面试题

```js
    var funcs = []
    for (var i = 0; i < 10; i++) {
        funcs.push(function() { console.log(i) })
    }
    funcs.forEach(function(func) {
        func()
    })
```

这样的面试题是大家很常见，很多同学一看就知道输出十次10
但是如果我们想依次输出0到9呢？
有两种解决方法，直接看一下代码：

```js
    // ES5知识，我们可以利用“立即调用函数”解决这个问题
    var funcs = []
    for (var i = 0; i < 10; i++) {
        funcs.push(
          (function(value) {
            return function() {
                console.log(value)
            }
        })(i)
      )
    }
    funcs.forEach(function(func) {
        func()
    })
  // 再来看看es6怎么处理的
    const funcs = []
    for (let i = 0; i < 10; i++) {
        funcs.push(function() {
            console.log(i)
        })
    }
    funcs.forEach(func => func())
```

达到相同的效果，ES6 简洁的解决方案是不是更让你心动！！！

#### 2.字符串

ES6模板字符简直是开发者的福音啊，解决了 ES5 在字符串功能上的痛点。

**第一个用途**，**基本的字符串格式化**。将表达式嵌入字符串中进行拼接。用${}来界定。

```js
    //ES5 
    var name = 'lux'
    console.log('hello' + name)
    //es6
    const name = 'lux'
    console.log(`hello ${name}`) //hello lux
    
```

**第二个用途**，在ES5时我们通过反斜杠(\)来做多行字符串或者字符串一行行拼接。ES6反引号(``)直接搞定。

```js
    // ES5
    var msg = "Hi \
    man!
    "
    // ES6
    const template = `<div>
        <span>hello world</span>
    </div>`
```

对于字符串 ES6+ 当然也提供了很多厉害也很有意思的方法😊 说几个常用的。

```js
    // 1.includes：判断是否包含然后直接返回布尔值
    const str = 'hahay'
    console.log(str.includes('y')) // true

    // 2.repeat: 获取字符串重复n次
    const str = 'he'
    console.log(str.repeat(3)) // 'hehehe'
    //如果你带入小数, Math.floor(num) 来处理
    // s.repeat(3.1) 或者 s.repeat(3.9) 都当做成 s.repeat(3) 来处理

    // 3. startsWith 和 endsWith 判断是否以 给定文本 开始或者结束
    const str =  'hello world!'
    console.log(str.startsWith('hello')) // true
    console.log(str.endsWith('!')) // true
    
    // 4. padStart 和 padEnd 填充字符串，应用场景：时分秒
    setInterval(() => {
        const now = new Date()
        const hours = now.getHours().toString()
        const minutes = now.getMinutes().toString()
        const seconds = now.getSeconds().toString()
        console.log(`${hours.padStart(2, 0)}:${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`)
    }, 1000)
```

关于模板字符串现在比较常出现的面试题有两道。同学们不妨写试试看？

- **模拟一个模板字符串的实现。**

```js
    let address = '北京海淀区'
    let name = 'lala'
    let str = `${name}在${address}上班...`
    // 模拟一个方法 myTemplate(str) 最终输出 'lala在北京海淀区上班...'
    function myTemplate(str) {
        // try it
    }
    console.log(myTemplate(str)) // lala在北京海淀区上班...
```

- **实现标签化模板(自定义模板规则)。**

```js
    const name = 'cc'
    const gender = 'male'
    const hobby = 'basketball'
    // 实现tag最终输出 '姓名：**cc**，性别：**male**，爱好：**basketball**'
    function tag(strings) {
        // do it
    }
    const str = tag`姓名：${name}，性别：${gender}，爱好：${hobby}`
    console.log(str) // '姓名：**cc**，性别：**male**，爱好：**basketball**'
```

#### 3.函数

**函数默认参数**

在ES5我们给函数定义参数默认值是怎么样？

```js
    function action(num) {
        num = num || 200
        //当传入num时，num为传入的值
        //当没传入参数时，num即有了默认值200
        return num
    }
```

但细心观察的同学们肯定会发现，num传入为0的时候就是false，但是我们实际的需求就是要拿到num = 0，此时num = 200 明显与我们的实际想要的效果明显不一样

ES6为参数提供了默认值。在定义函数时便初始化了这个参数，以便在参数没有被传递进去时使用。

```js
    function action(num = 200) {
        console.log(num)
    }
    action(0) // 0
    action() //200
    action(300) //300
```

**箭头函数**

ES6很有意思的一部分就是函数的快捷写法。也就是箭头函数。

箭头函数最直观的三个特点。

- 不需要 `function` 关键字来创建函数
- 省略 `return` 关键字
- 继承当前上下文的 `this` 关键字

```js
//例如：
    [1,2,3].map(x => x + 1)
    
//等同于：
    [1,2,3].map((function(x){
        return x + 1
    }).bind(this))
```

**说个小细节。**

当你的函数**有且仅有**一个参数的时候，是可以省略掉括号的。当你函数返回**有且仅有**一个表达式的时候可以省略{} 和 return；例如:

```js
    var people = name => 'hello' + name
    //参数name就没有括号
```

作为参考

```
    var people = (name, age) => {
        const fullName = 'hello' + name
        return fullName
    } 
    //如果缺少()或者{}就会报错
```

要不整一道笔试题？哈哈哈哈哈哈哈哈。我不管我先上代码了

```js
    // 请使用ES6重构以下代码
    
    var calculate = function(x, y, z) {
      if (typeof x != 'number') { x = 0 }
      if (typeof y != 'number') { y = 6 }

      var dwt = x % y
      var result

      if (dwt == z) { result = true }
      if (dwt != z) { result = false }
      
      return result
    }
    const calculate = (x, y, z) => {
      x = typeof x !== 'number' ? 0 : x
      y = typeof y !== 'number' ? 6 : y
      return x % y === z
    }
```

#### 4.拓展的对象功能

对象初始化简写

ES5我们对于对象都是以**键值对**的形式书写，是有可能出现键值对重名的。例如：

```js
    function people(name, age) {
        return {
            name: name,
            age: age
        };
    }
```

键值对重名，ES6可以简写如下：

```js
    function people(name, age) {
        return {
            name,
            age
        };
    }
```

ES6 同样改进了为对象字面量方法赋值的语法。ES5为对象添加方法：

```
    const people = {
        name: 'lux',
        getName: function() {
            console.log(this.name)
        }
    }
```

ES6通过省略冒号与 `function` 关键字，将这个语法变得更简洁

```js
    const people = {
        name: 'lux',
        getName () {
            console.log(this.name)
        }
    }
```

**ES6 对象提供了 `Object.assign()`这个方法来实现浅复制。**
`Object.assign()` 可以把任意多个源对象**自身可枚举**的属性拷贝给目标对象，然后返回目标对象。第一参数即为目标对象。在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}

```js
    const objA = { name: 'cc', age: 18 }
    const objB = { address: 'beijing' }
    const objC = {} // 这个为目标对象
    const obj = Object.assign(objC, objA, objB)

    // 我们将 objA objB objC obj 分别输出看看
    console.log(objA)   // { name: 'cc', age: 18 }
    console.log(objB) // { address: 'beijing' }
    console.log(objC) // { name: 'cc', age: 18, address: 'beijing' }
    console.log(obj) // { name: 'cc', age: 18, address: 'beijing' }

    // 是的，目标对象ObjC的值被改变了。
    // so，如果objC也是你的一个源对象的话。请在objC前面填在一个目标对象{}
    Object.assign({}, objC, objA, objB)
```

#### 5.更方便的数据访问--解构

数组和对象是JS中最常用也是最重要表示形式。为了简化提取信息，ES6新增了**解构**，这是将一个数据结构分解为更小的部分的过程

ES5我们提取对象中的信息形式如下：

```js
    const people = {
        name: 'lux',
        age: 20
    }
    const name = people.name
    const age = people.age
    console.log(name + ' --- ' + age)
```

是不是觉得很熟悉，没错，在ES6之前我们就是这样获取对象信息的，一个一个获取。现在，解构能让我们从对象或者数组里取出数据存为变量，例如

```js
    //对象
    const people = {
        name: 'lux',
        age: 20
    }
    const { name, age } = people
    console.log(`${name} --- ${age}`)
    //数组
    const color = ['red', 'blue']
    const [first, second] = color
    console.log(first) //'red'
    console.log(second) //'blue'
```

要不来点儿面试题，看看自己的掌握情况？

```js
    // 请使用 ES6 重构一下代码

    // 第一题
    var jsonParse = require('body-parser').jsonParse

    // 第二题
    var body = request.body
    var username = body.username
    var password = body.password
    // 1.
    import { jsonParse } from 'body-parser'
    // 2. 
    const { body, body: { username, password } } = request
```

#### 6.Spread Operator 展开运算符

ES6中另外一个好玩的特性就是Spread Operator 也是三个点儿...接下来就展示一下它的用途。

组装对象或者数组

```js
    //数组
    const color = ['red', 'yellow']
    const colorful = [...color, 'green', 'pink']
    console.log(colorful) //[red, yellow, green, pink]
    
    //对象
    const alp = { fist: 'a', second: 'b'}
    const alphabets = { ...alp, third: 'c' }
    console.log(alphabets) //{ "fist": "a", "second": "b", "third": "c"
}
```

有时候我们想获取数组或者对象除了前几项或者除了某几项的其他项

```js
    //数组
    const number = [1,2,3,4,5]
    const [first, ...rest] = number
    console.log(rest) //2,3,4,5
    //对象
    const user = {
        username: 'lux',
        gender: 'female',
        age: 19,
        address: 'peking'
    }
    const { username, ...rest } = user
    console.log(rest) //{"address": "peking", "age": 19, "gender": "female"
}
```

对于 Object 而言，还可以用于组合成新的 Object 。(ES2017 stage-2 proposal) 当然如果有重复的属性名，右边覆盖左边

```js
    const first = {
        a: 1,
        b: 2,
        c: 6,
    }
    const second = {
        c: 3,
        d: 4
    }
    const total = { ...first, ...second }
    console.log(total) // { a: 1, b: 2, c: 3, d: 4 }
```

#### 7.import 和 export

import导入模块、export导出模块

```js
//全部导入
import people from './example'

//有一种特殊情况，即允许你将整个模块当作单一对象进行导入
//该模块的所有导出都会作为对象的属性存在
import * as example from "./example.js"
console.log(example.name)
console.log(example.age)
console.log(example.getName())

//导入部分
import {name, age} from './example'

// 导出默认, 有且只有一个默认
export default App

// 部分导出
export class App extend Component {};
```

以前有人问我，导入的时候有没有大括号的区别是什么。下面是我在工作中的总结：

```js
1.当用export default people导出时，就用 import people 导入（不带大括号）

2.一个文件里，有且只能有一个export default。但可以有多个export。

3.当用export name 时，就用import { name }导入（记得带上大括号）

4.当一个文件里，既有一个export default people, 又有多个export name 或者 export age时，导入就用 import people, { name, age } 

5.当一个文件里出现n多个 export 导出很多模块，导入时除了一个一个导入，也可以用import * as example
```

#### 8. Promise

> 在promise之前代码过多的回调或者嵌套，可读性差、耦合度高、扩展性低。通过Promise机制，扁平化的代码机构，大大提高了代码可读性；用同步编程的方式来编写异步代码，保存线性的代码逻辑，极大的降低了代码耦合性而提高了程序的可扩展性。

**说白了就是用同步的方式去写异步代码。**

发起异步请求

```js
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => ({ data }))
      .catch(err => ({ err }));
```

今天看到一篇关于面试题的很有意思。

```js
setTimeout(function() {
    console.log(1) // 5
}, 0);
new Promise(function executor(resolve) {
    console.log(2); // 1
    for( var i=0 ; i<10000 ; i++ ) {
        i == 9999 && resolve();
    }
    console.log(3); //2
})
.then(function() {
console.log(4); //4
})
console.log(5); //3

// 2 3 5 4 1
```

[Excuse me？这个前端面试在搞事！](https://zhuanlan.zhihu.com/p/25407758)  *********这道题不错

#### 9.Generators

生成器（ generator）是能返回一个**迭代器**的函数。**生成器函数也是一种函数**，最直观的表现就是比普通的function多了个星号*，在其函数体内可以使用yield关键字,有意思的是**函数会在每个yield后暂停**。

这里生活中有一个比较形象的例子。咱们到银行办理业务时候都得向大厅的机器取一张排队号。你拿到你的排队号，机器并不会自动为你再出下一张票。也就是说取票机“暂停”住了，直到下一个人再次唤起才会继续吐票。

OK。说说迭代器。**当你调用一个generator时，它将返回一个迭代器对象**。**这个迭代器对象拥有一个叫做next的方法来帮助你重启generator函数并得到下一个值**。next方法不仅返回值，它返回的对象具有两个属性：done和value。value是你获得的值，done用来表明你的generator是否已经停止提供值。继续用刚刚取票的例子，每张排队号就是这里的value，打印票的纸是否用完就这是这里的done。

```js
    // 生成器
    function *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
    
    // 生成器能像正规函数那样被调用，但会返回一个迭代器
    let iterator = createIterator();
    
    console.log(iterator.next().value); // 1
    console.log(iterator.next().value); // 2
    console.log(iterator.next().value); // 3
```

那生成器和迭代器又有什么用处呢？

围绕着生成器的许多兴奋点都与**异步编程**直接相关。异步调用对于我们来说是很困难的事，我们的函数并不会等待异步调用完再执行，你可能会想到用回调函数，（当然还有其他方案比如Promise比如Async/await）。

**生成器可以让我们的代码进行等待。**就不用嵌套的回调函数。使用generator可以确保当异步调用在我们的generator函数运行一下行代码之前完成时暂停函数的执行。

那么问题来了，咱们也不能手动一直调用next()方法，你需要一个能够调用生成器并启动迭代器的方法。就像这样子的

```js
    function run(taskDef) { //taskDef即一个生成器函数

        // 创建迭代器，让它在别处可用
        let task = taskDef();

        // 启动任务
        let result = task.next();
    
        // 递归使用函数来保持对 next() 的调用
        function step() {
    
            // 如果还有更多要做的
            if (!result.done) {
                result = task.next();
                step();
            }
        }
    
        // 开始处理过程
        step();
    
    }
```

> 生成器与迭代器最有趣、最令人激动的方面，或许就是可创建外观清晰的异步操作代码。你不必到处使用回调函数，而是可以建立貌似同步的代码，但实际上却使用 yield 来等待异步操作结束。

#### 10.数组方法

##### 1.数组的创建

1. **使用`Array`构造函数的方式**

```js
new Array();  // 创建一个数组
new Array([size]);  // 创建一个数组并指定长度，注意不是上限，是长度
new Array(element0, element1, ..., elementn);  // 创建一个数组并赋值

const array = new Array();
array[0] = '1';
```

1. **采用字面量的方法**

```js
const array = []; //创建一个空数组
const array2 = [1, 2, 3]; //创建一个有三个元素的数组
```

在使用数组字面量表示法时，**不会调用`Array`构造函数**。

##### 2.数组自带属性

```js
constructor // 返回创建数组对象的原型函数
length // 返回数组对象的长度
prototype // 可以增加数组的原型方法和属性
```

**关于数组的length属性**

（1）关于数组的的`length`属性，**这个属性不是只读的，数组的该属性可读可写**；通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项。

```js
// 将其 length 属性设置为 2 会移除最后一项结果再访问 colors[2]就会显示 undefined 了
var colors = ["red", "blue", "green"];     // 创建一个包含 3 个字符串的数组 
colors.length = 2; 
console.log(colors[2]);                 //undefined
```

（2）如果将其 `length` 属性设置为大于数组 项数的值，则新增的每一项都会取得`undefined` 值。

```js
var colors = ["red", "blue", "green"];    // 创建一个包含 3 个字符串的数组 
colors.length = 4; 
console.log(colors[3]);                 //undefined
```

（3）利用 `length` 属性可以方便地在数组末尾添加新项。

```js
var colors = ["red", "blue", "green"];   // 创建一个包含 3 个字符串的数组 
colors[colors.length] = "black";         //（在位置 3）添加一种颜色
 colors[colors.length] = "brown";         //（在位置 4）再添加一种颜色
```

##### 3.检测是否为数组

1. **使用`instanceof`方法**

`instanceof` 用于判断一个变量是否是某个对象的实例

```js
const array = new Array();
array instanceof Array; //true
```

2.**使用`constructor`属性**

`constructor` 属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数。

```js
const array = new Array();
array.constructor === Array; // true
```

**3.使用`isArray()`方法**

对支持`isArray`的浏览器,直接使用`isArray`方法。

```js
const array = new Array();
Array.isArray(array); //true
```

如果浏览器不支持`Array.isArray()`则需进行必要判断。

```js
/**
 * 判断一个对象是否是数组，参数不是对象或者不是数组，返回false
 *
 * @param {Object} arg 需要测试是否为数组的对象
 * @return {Boolean} 传入参数是数组返回true，否则返回false
 */
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}
```

##### 4.数组元素的增加与删除

1. `array.push(e1, e2, ...eN)` 将一个或多个元素添加到数组的末尾，并返回新数组的长度。

```js
const array = [1, 2, 3];
const length = array.push(4, 5);
// array: [1, 2, 3, 4, 5]; length: 5
```

2.`array.unshift(e1, e2, ...eN)`将一个或多个元素添加到数组的开头，并返回新数组的长度。

```js
const array = [1, 2, 3];
const length = array.unshift(4, 5);
// array: [ 4, 5, 1, 2, 3]; length: 5
```

3. `array.pop()`从数组中删除最后一个元素，并返回最后一个元素的值，原数组的最后一个元素被删除。数组为空时返回`undefined`。

```js
const array = [1, 2, 3];
const poped = array.pop();  
// array: [1, 2]; poped: 3
```

4. `array.shift()`删除数组的第一个元素，并返回第一个元素，原数组的第一个元素被删除。数组为空时返回`undefined`。

```js
const array = [1, 2, 3];
const shifted = array.shift();  
// array: [2, 3]; shifted: 1
```

5.`array.splice(start[, deleteCount, item1, item2, ...])`从数组中添加/删除元素，**返回值是由被删除的元素组成的一个新的数组**，如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

**会改变原数组**

> - `start` 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从1计数）。
> - `deleteCount` (可选)，从`start`位置开始要删除的元素个数。如果 `deleteCount` 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果`deleteCount`大于`start`之后的元素的总数，则从`start`后面的元素都将被删除（含第 `start` 位）。
> - `item1, item2, …`(可选)，要添加进数组的元素,从`start`位置开始。如果不指定，则 `splice()` 将只删除数组元素。

```js
const array = [1, 2, 3, 4, 5];

const deleted = array.splice(2, 0, 6); // 在索引为2的位置插入6
// array 变为 [1, 2, 6, 3, 4, 5]; deleted为[]
```

##### 5.数组与字符串的相互转化

1. **数组转字符串**

`array.join(separator=',')`将数组中的元素通过`separator`连接成字符串，并返回该字符串，separator默认为","。

**返回字符串，不会改变原数组**

```js
const array = [1, 2, 3];
let str = array.join(',');
// str: "1,2,3"
```

`toLocaleString()`、`toString()`、`valueOf()`：所有对象都具有这三个方法，数组继承的这个三个方法，可以看作是`join()`的特殊用法，不常用。

```js
var colors = ["red", "blue", "green"];   
// 调用数组的 toString()方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串
console.log(colors.toString());     // red,blue,green
// 调用 valueOf()返回的还是数组
console.log(colors.valueOf());      // ["red", "blue", "green"]
console.log(colors.toLocaleString()); //  red,blue,green
```

如果数组中的某一项的值是 `null` 或者 `undefined`，那么该值在`join()`、 `toLocaleString()`、`toString()`和 `valueOf()`方法返回的结果中以**空字符串**表示。

2.**字符串转数组**

> `string.split(separator,howmany)`用于把一个字符串分割成字符串数组。
> `separator` (必需)，字符串或正则表达式，从该参数指定的地方对字符串进行分割。
> `howmany` (可选)，该参数可指定返回的数组的最大长度。

```js
let str = "abc,abcd,aaa";
let array = str.split(",");// 在每个逗号(,)处进行分解。
// array: [abc,abcd,aaa]

const array1 = "helloworld";
let str1 = s1.split('');  
//["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
```

##### 6.数组的截取和合并

1. 数组的截取 -  `array.slice(start, end)` 方法

`slice()`通过索引位置，从数组中返回`start`下标开始，直到`end`下标结束（**不包括**）的新数组，该方法**不会修改原数组，只是返回一个新的子数组**。

> - `start` (必填)，设定新数组的起始位置（下标从0开始算起）；如果是负数，则表示从数组尾部开始算起（**-1 指最后一个元素**，-2 指倒数第二个元素，以此类推）。
> - `end` (可选)，设定新数组的结束位置；如果不填写该参数，默认到数组结尾；如果是负数，则表示从数组尾部开始算起（-1 指最后一个元素，-2
>   指倒数第二个元素，以此类推）。

```js
// 获取仅包含最后一个元素的子数组
let array = [1,2,3,4,5];
array.slice(-1); // [5]

// 获取不包含最后一个元素的子数组
let array2 = [1,2,3,4,5];
array2.slice(0, -1); // [1,2,3,4]
```

**该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 array.splice()。**

1. 数组的合并 - `array.concat([item1[, item2[, . . . [,itemN]]]])`方法

`conact()`是将多个数组（也可以是字符串，或者是数组和字符串的混合）连接为一个数组，返回连接好的新的数组。**不改变原数组**

```js
const array = [1,2].concat(['a', 'b'], ['name'],7);
// [1, 2, "a", "b", "name",7]
```

##### 7.数组元素的排序

1. `array.sort()`方法

`sort()`方法用于对数组的元素进行排序，并**返回原数组**。如果不带参数，按照字符串`UniCode`码的顺序进行排序。

```js
const array = ['a', 'd', 'c', 'b'];
array.sort();  //['a', 'b', 'c', 'd']
```

为`sort()`中传入排序规则函数可实现自定义排序。

> 排序函数规则：(1)**传两个形参**；(2)**当返回值为正数时，交换传入两形参在数组中位置**。

**按照数值大小进行排序-升序**

```js
[1, 8, 5].sort((a, b) => {
  return a-b; // 从小到大排序
});
// [1, 5, 8]
```

**按照数值大小进行排序-降序**

```js
[1, 8, 5].sort((a, b) => {
  return b-a; // 从大到小排序
});
// [8, 5, 1]
```

1. `array.reverse()`方法
   `reverse()` 方法将数组中**元素的位置颠倒**，第一个数组元素成为最后一个数组元素，最后一个数组元素成为第一个。**在原数组上操作，然后返回原数组**。

```js
let arr = [1,2,3,4,5]
console.log(arr.reverse())    // [5,4,3,2,1]
console.log(arr)    // [5,4,3,2,1]
```

**数组的sort()和reverse()方法都对原数组进行了修改，返回值是经过排序之后的数组。**

##### 8.元素在数组中的位置

1. `indexOf()`与`lastIndexOf()` 

> - `indexOf(searchElement[, fromIndex = 0])` 方法返回某个指定的字符串值在字符串中**首次出现的位置**。
> - `lastIndexOf(searchElement[, fromIndex = 0])` 方法返回一个指定的字符串值**最后出现的位置**，在一个字符串中的指定位置从后向前搜索。
> - 这两个方法都接受两个参数：`searchElement`：要查找的元素；`fromIndex`：开始查找的索引位置。
> - 这两个方法**都返回查找的项在数组中的位置，或者在没找到的情况下返回-1**。

```js
[2, 9, 7, 8, 9].indexOf(9); // 1
[2, 9, 7, 8, 9].lastIndexOf(9); // 4
```

1. `find()` 与 `findIndex()` 

(1) `find(callback[, thisArg])`方法，用于**找出第一个符合条件的数组元素**。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

```js
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

`find()`方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

(2) `findIndex(callback[, thisArg])`返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

1. `includes(searchElement[, fromIndex = 0])`方法返回一个布尔值，表示某个数组是否包含给定的值。

这个方法都接受两个参数：`searchElement`：要查找的元素；`fromIndex`：开始查找的索引位置。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true   node里报错
```

##### 9.数组的遍历与迭代

1. `array.filter(callback, thisArg)`方法使用指定的函数测试所有元素,并创建一个包含所有通过测试的元素的新数组。

参数说明：

> - `callback` 用来测试数组的每个元素的函数，返回`true`表示保留该元素（通过测试），`false`则不保留。
> - `thisArg` 可选。执行 `callback` 时的用于 `this` 的值。

```js
// callback定义如下，三个参数： element:当前元素值；index：当前元素下标； array:当前数组
function callback(element, index, array) {
  // callback函数必须返回true或者false，返回true保留该元素，false则不保留。
  return true || false;
}

const filtered = [1, 2, 3].filter(element => element > 1);
// filtered: [2, 3];
```

1. `array.every(callback[, thisArg])`方法检测数组中的每一个元素是否都通过了`callback`测试，全部通过返回`true`，否则返回`false`。

```js
// callback定义如下： element:当前元素值；index：当前元素下标； array:当前数组
function callback(element, index, array) {
  // callback函数必须返回true或者false告知every是否通过测试
  return true || false;
}

let a = [1, 2, 3, 4, 5];
let b = a.every((item) => {
    return item > 0;
});
let c = a.every((item) => {
    return item > 1;
});
console.log(b); // true
console.log(c); // false
```

1. `array.some(callback[, thisArg])`判断数组中是否包含可以通过`callback`测试的元素，与`every`不同的是，这里只要某一个元素通过测试，即返回`true`。`callback`定义同上。

```js
[2, 5, 8, 1, 4].some(item => item > 6);
// true
```

1. `array.map(callback[, thisArg])`方法返回一个由原数组中的每个元素调用`callback`函数后的返回值组成的新数组。

```js
let a = [1, 2, 3, 4, 5];

let b = a.filter((item) => {
    return item > 3;
});
console.log(b); // [4 ,5]

let bb = [];
let str1 = a.map((item) => {
    if (item > 3) {
        bb.push(item);
        return true // 返回值是一个return后面的东西组成的数组 
    }
});
console.log(a);    // [1, 2, 3, 4, 5] 不改变原数组
console.log(bb);    // [4, 5]        
console.log(str1);    // [ undefined, undefined, undefined, true, true ]

let bbb = a.map((item) => {
    return item + 1;
});
console.log(bbb);   // [2, 3, 4, 5, 6]
```

1. `array.forEach(callbak)`为数组的每个元素执行对应的方法。

```js
// callback定义如下： element:当前元素值；index：当前元素下标； array:当前数组

不改变原值 无返回值 没有return 
let a = [1, 2, 3, 4, 5];

let b = [];
let ss = a.forEach((item) => {
    b.push(item + 1);
});
console.log(b); // [2,3,4,5,6]
console.log(a)  // [1,2,3,4,5]
console.log(ss) // undefined
```

1. **遍历数组的方法：`entries()`、`values()`、`keys()**` 

这三个方法都是返回一个遍历器对象，可用`for...of`循环遍历，唯一区别：`keys()`是对键名的遍历、`values()`对键值的遍历、`entries()`是对键值对的遍历。

```js
for(let item of ['a','b'].keys()){
    console.log(item);
    //0
    //1
}
for(let item of ['a','b'].values()){
    console.log(item);
    //'a'
    //'b'
}
let arr4 = [0,1];
for(let item of arr4.entries()){
    console.log(item);  
    //  [0, 0]
    //  [1, 1]
}
for(let [index,item] of arr4.entries()){
    console.log(index+':'+item);
    //0:0
    //1:1
}
```

1. `array.reduce(callback[, initialValue])`方法返回针对数组每项调用`callback`函数后产生的累积值。

```js
const total = [0, 1, 2, 3].reduce((sum, value) => {
  return sum + value;
}, 0);
// total is 6

const flattened = [[0, 1], [2, 3], [4, 5]].reduce((a, b) => {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

参数说明：`initialValue`：累加器初始值， `callback`函数定义如下：

```js
function callback(accumulator, currentValue, currentIndex, array) {
}
```

以上`callback`的参数中`accumulator`代表累加器的值，初始化时，如果`initialValue`有值，则`accumulator`初始化的值为`initialValue`，整个循环从第一个元素开始；`initialValue`无值，则`accumulator`初始化的值为数组第一个元素的值，`currentValue`为数组第二个元素的值，整个循环从第二个元素开始。`initialValue`的数据类型可以是任意类型，不需要跟原数组内的元素值类型一致。

```js
const newArray = [{ name: 'aa', age: 1 }, { name: 'bb', age: 2 }, { name: 'cc', age: 3 }].reduce((arr, element) => {
  if (element.age >= 2) {
    arr.push(element.name);
  }
  return arr; 
  // 必须有return，因为return的返回值会被赋给新的累加器，否则累加器的值会为undefined。
}, []);
// newArray is ["bb", "cc"];

// 上面代码的同等写法：
const newArray = [{ name: 'aa', age: 1 }, { name: 'bb', age: 2 }, { name: 'cc', age: 3 }].filter(element => element.age >= 2).map(item => item.name);
// newArray is ["bb", "cc"];
```

##### 10.其他方法

1. `Array.from()`方法

`Array.from()`方法是用于将类似数组的对象（**即有length属性的对象**）和可遍历对象转为真正的数组。
 比如，使用·Array.from()·方法，可以轻松将·JSON·数组格式转为数组。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

1. `Array.of()`方法

`Array.of()`方法是将一组值转变为数组。

```js
let arr0 = Array.of(1,2,33,5);
console.log(arr0);//[1,2,33,5]

let arr1 = Array.of('你好','hello');
console.log(arr1);//["你好", "hello"]
```

#### 11.class

#### 12.set--集合

```js
let arr = [1,2,2,2,NaN,NaN,undefined,undefined,null,null,1233,22,33,33]
let arr2 = new Set(arr)
arr2 = Array.from(arr2) // Set { 1, 2, NaN, undefined, null, 1233, 22, 33 }
let arr2 = [...new Set(arr)] // [ 1, 2, NaN, undefined, null, 1233, 22, 33 ]
console.log(arr2) // [ 1, 2, NaN, undefined, null, 1233, 22, 33 ]
```

ES6 提供了新的数据结构 Set。

**1.特性**

似于数组，但它的一大特性就是所有元素都是唯一的，没有重复。

我们可以利用这一唯一特性进行数组的去重工作。

单一数组的去重。

```js
let set6 = new Set([1, 2, 2, 3, 4, 3, 5])
console.log('distinct 1:', set6)
```

结果：

```js
distinct 1: Set { 1, 2, 3, 4, 5 }
```

多数组的合并去重

```js
let arr1 = [1, 2, 3, 4]
let arr2 = [2, 3, 4, 5, 6]
let set7 = new Set([...arr1, ...arr2])
console.log('distinct 2:', set7)
```

结果：

```js
distinct 2: Set { 1, 2, 3, 4, 5, 6 }
```

 

**2.操作**

1.向Set中添加元素。

```js
let set1 = new Set()
set1.add(1)
set1.add(2)
set1.add(3)
console.log('added:', set1)
```

结果：

```js
added: Set { 1, 2, 3 }
```

 

2.从Set中删除元素。

```js
let set1 = new Set()
set1.add(1)
set1.add(2)
set1.add(3)
set1.delete(1)
console.log('deleted:', set1)
```

结果：

```js
deleted: Set { 2, 3 }
```

3.判断某元素是否存在。

```js
let set1 = new Set()
set1.add(1)
set1.add(2)
set1.add(3)
set1.delete(1)
console.log('has(1):', set1.has(1))
console.log('has(2):', set1.has(2))
```

结果：

```js
has(1): false
has(2): true
```

4.清除所有元素。

```js
let set1 = new Set()
set1.add(1)
set1.add(2)
set1.add(3)
set1.clear()
console.log('cleared:', set1)
```

结果：

```js
cleared: Set {}
```

**3.Set和Array互转**

1.数组转Set

```js
let set2 = new Set([4,5,6])
console.log('array to set 1:', set2)

let set3 = new Set(new Array(7, 8, 9))
console.log('array to set 2:', set3)
```

结果：

```js
array to set 2: Set { 4, 5, 6 }
array to set 3: Set { 7, 8, 9 }
```

2.Set转数组

```js
let set4 = new Set([4, 5, 6])
console.log('set to array 1:', [...set4])
console.log('set to array 2:', Array.from(set4))
```

结果：

```js
set to array 1: [ 4, 5, 6 ]
set to array 2: [ 4, 5, 6 ]
```

**4.遍历**

可以使用Set实例对象的keys()，values()，entries()方法进行遍历。

由于**Set的键名和键值是同一个值**，它的每一个元素的key和value是相同的，所有keys()和values()的返回值是相同的，entries()返回的元素中的key和value是相同的。

```js
let set5 = new Set([4, 5, 'hello'])
console.log('iterate useing Set.keys()')
for(let item of set5.keys()) {
  console.log(item)
}

console.log('iterate useing Set.values()')
for(let item of set5.values()) {
  console.log(item)
}

console.log('iterate useing Set.entries()')
for(let item of set5.entries()) {
  console.log(item)
}
```

结果：

```js
iterate useing Set.keys()
4
5
hello

iterate useing Set.values()
4
5
hello

iterate useing Set.entries()
[ 4, 4 ]
[ 5, 5 ]
[ 'hello', 'hello' ]
```

**其他特性**

在向Set加入值时，Set不会转换数据类型，内部在判断元素是否存在时用的类似于精确等于(===)的方法，“2”和2是不同的，NaN等于其自身。

```js
let set8 = new Set()
set8.add(NaN)
set8.add(NaN)
console.log('NaN===Nan is true:', set8)
```

结果：

```js
NaN===Nan is true: Set { NaN }
```

> forEach()方法

可以使用`forEach`方法来遍历Set中的数据项，该方法传入一个回调函数`callback`，还可以传入一个`this`，用于回调函数之中：

回调函数callback中有三个参数：

1. 元素值；

2. 元素索引；

3. 将要遍历的对象；

   ```js
    let set = new Set([1,2,3,3,3,3]);
    set.forEach(function (value,key,ownerSet) {
        console.log(value);
        console.log(key);           
    })
   ```

Set中的value和key是相同的，这是为了让Set的forEach方法和数组以及Map的forEach方法保持一致，都具有三个参数。

在forEach方法中传入`this`，给回调函数使用：

```js
let set = new Set([1,2,3,3,3,3]);
let operation = {

    print(value){
        console.log(value);
    },
    iterate(set=[]){
        set.forEach(function(value,key,ownerSet){
            this.print(value);
            this.print(key);
        },this);
    }
}
operation.iterate(set);

// 输出：1 1 2 2 3 3
```

**如果回调函数使用箭头函数的话，就可以省略`this`的入参，这是因为箭头函数会通过作用域链找到当前this对象**，将上面的示例代码使用箭头函数来写：

```
let set = new Set([1,2,3,3,3,3]);
let operation ={

    print(value){
        console.log(value);
    },

    iterate(set=[]){
        set.forEach((value,key)=>{
            this.print(value);
            this.print(key);
        })
    }

}

operation.iterate(set);
```

> 将Set转换成数组

将数组转换成Set十分容易，可以将数组传入Set构造器即可；而将Set转换成数组，需要使用扩展运算符。扩展运算符能将数组中的数据项切分开，作为独立项传入到函数，如果将扩展运算符用于可迭代对象的话，就可以将可迭代对象转换成数组：

```js
let [...arr]=set;
console.log(arr); // [1,2,3]
```

> Weak Set

Set在存放对象时，实际上是存放的是对象的引用，即Set也被称之为Strong Set。如果所存储的对象被置为null，但是Set实例仍然存在的话，对象依然无法被垃圾回收器回收，从而无法释放内存：

```js
let set = new Set();
let key={};
let key2 = {};
set.add(key);
set.add(key2);
console.log(set.size); //2

key=null;
console.log(set.size); //2
```

可以看出就算对象key置为null，但是由于是强引用的方式，Set实例还存在，对象key依然不会被回收。

如果想让对象key正常释放的话，可以使用Weak Set，此时，**存放的是对象的弱引用，当对象只被Set弱引用的话，并不会阻止对象实例被回收**。**Weka Set同Set的用法几乎一致**。可以使用add()方法增加数据项，使用has()方法检查Weak Set中是否包含某项，以及使用delete()方法删除某一项。

```js
let set = new WeakSet();
let key = {};   
set.add(key);
console.log(set.has(key)); //true
set.delete(key);
console.log(set.has(key)); //false
```

但需要注意的是：**Weak Set构造器不接受基本类型数据，只接受对象**。同样的可以使用可迭代的对象如数组，来作为构造器参数，来创建Weak Set。

> Weak Set和Set之间的差异

对于Weak Set和Set之间的**重要差异**：

1. 对于Weak Set实例，若调用了add()方法时传入了非对象的参数，则会抛出错误。如果在has()或者delete()方法中传入了非对象的参数则会返回false；
2. Weak Set不可迭代，因此不能用于for-of循环；
3. Weak Set 无法暴露出任何迭代器（例如 keys() 与 values() 方法） ，因此没有任何编程手段可用于判断 Weak Set 的内容；
4. Weak Set没有forEach()方法；
5. Weak Set没有size属性；

#### 13.map--字典

**数据结构map基本概念**

字典map是用来储存不重复的key的hash结构。不同于集合set的是字典map使用的是[键，值]的形式储存数据的。**JavaScript的对象只能使用字符串当做key，这给它的使用带来了很大的限制**，为了解决这个问题，ES6提供了map数据结构。它类似于对象。是键值对的集合，但是键的返回不限制于字符串，各种类型的值都可以作为键，**也就是说Object提供了key---value的对应。map结构提供了value，value的对应关系，是一种更完善的hash结构。**

------

首先我们来回顾一下对象的知识：

```js
var data1={a:1},data2={b:2},obj={};
obj[data1] = 1;
obj[data2] = 2;
console.log(obj); //{[object Object]: 2}
console.log(data1.toString() == data2.toString()); // true
```

如何创建一个map；

```js
const map = new Map([['a',1],['b',2]]);
console.log(map);  //{"a" => 1, "b" => 2}
```

map自带的属性
 `console.log(map.size) // 2`
 map类的方法
 1 set(key, value) 设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

```js
map.set('qwe', '123').set('new', 'fq').set('yu', 'li');
console.log(map); //{"a" => 1, "b" => 2, "qwe" => "123", "new" => "fq", "yu" => "li"}
```

2 get(key) get方法读取key对应的键值，如果找不到 key，返回undefined。

```js
console.log(map.get('new')); //true
console.log(map.get('x')); //false
```

3 delete(key) 删除某个键，返回true。如果删除失败，返回false。

```js
console.log(map.delete('a')); //true
console.log(map); //{ "b" => 2, "qwe" => "123", "new" => "fq", "yu" => "li"}
console.log(map.delete('a')); //false
```

4 has(key) 方法返回一个布尔值，表示某个键是否在当前Map对象之中。

```js
console.log(map.has('yu')); //true
console.log(map.has('a')); //false
```

5 clear() 清除所有数据，没有返回值。
 `map.clear(); console.log(map); // {}`
 6 keys() 返回键名的遍历器
 `console.log(map.keys());`
 7 values() 返回键值的遍历器
 `console.log(map.values());`
 8 entries() 返回键值对的遍历器
 `console.log(map.entries());`
 9 forEach() 使用回调函数遍历每个成员

```js
map.forEach(function (key, value, map){
   console.log(key + ':' + value);
 })
```

Map 在使用过程中的一些注意事项：

```js
map.set(NaN, 10).set(NaN, 100); 
console.log(map); //{NaN => 100}
map.set({}, 'x').set({}, 'y');
console.log(map); //{NaN => 100, Object {} => "x", Object {} => "y"}
console.log({} === {});//false
```

map对比的是引用地址，引用地址不同则视为不相同。

> Weak Map

Weak Map对Map而言，就像是Weak Set相对于Set一样：**Weak Map(或者Weak Set)都是存储对象弱引用的方式，在Weak Map（或者Weak Set）中，所有的键都必须是对象（尝试使用非对象的键会抛出错误），而且这些对象都是弱引用，不会干扰到垃圾回收。当Weak Map中的键在Weak Map之外不存在引用时，该键值对会被移除。**

> Weak Map的操作

1.Weak Map的初始化

Weak Map的键必须是对象，值可以是任意类型，初始化同Map一样，也可是使用数组来创建一个 Weak Map ：

```js
//使用数组来创建一个Weak Map
let key = {};
let key2 = {};
let map = new WeakMap([[key,'hello'],[key2,'world']]);
console.log(map.get(key)); //hello
console.log(map.get(key2)); //world
```

2.has方法以及delete方法

与Map一样，可以使用has()方法来检查Weak Map中是否存在某一个键值对，使用delete()方法可以删除一个键值对。clear() 方法不存在，这是因为没必要对键进行枚举，并且枚举 Weak Map 也是不可能的，这与 Weak Set 相同：

```js
let key = {};
let key2 = {};
let map = new WeakMap([[key,'hello'],[key2,'world']]);

map.delete(key);
console.log(map.has(key)); //false
```

> Weak Map 的用法与局限性

当决定是要使用 Weak Map 还是使用正规 Map 时，首要考虑因素在于你是否只想使用对象类型的键。如果你打算这么做，那么最好的选择就是 Weak Map 。因为它能确保额外数据在不再可用后被销毁，从而能优化内存使用并规避内存泄漏。

要记住 Weak Map 只为它们的内容提供了很小的可见度，因此你**不能使用 forEach() 方法、size 属性或 clear() 方法来管理其中的项**。如果你确实需要一些检测功能，那么正规 Map会是更好的选择，只是一定要确保留意内存的使用。

**4. 总结**

1. Set 是无重复值的有序列表。根据 `Object.is()`方法来判断其中的值不相等，以保证无重复。 Set 会自动移除重复的值，因此你可以使用它来过滤数组中的重复值并返回结果。 Set并不是数组的子类型，所以你无法随机访问其中的值。但你可以使用`has()` 方法来判断某个值是否存在于 Set 中，或通过 `size` 属性来查看其中有多少个值。 Set 类型还拥有`forEach()`方法，用于处理每个值。
2. Weak Set 是只能包含对象的特殊 Set 。其中的对象使用弱引用来存储，意味着当 Weak Set中的项是某个对象的仅存引用时，它不会屏蔽垃圾回收。由于内存管理的复杂性， Weak Set的内容不能被检查，因此最好将 Weak Set 仅用于追踪需要被归组在一起的对象。
3. Map 是有序的键值对，其中的键允许是任何类型。与 Set 相似，通过调用 `Object.is()`方法来判断重复的键，这意味着能将数值 5 与字符串 "5" 作为两个相对独立的键。使用`set()` 方法能将任何类型的值关联到某个键上，并且该值此后能用 `get()` 方法提取出来。Map 也拥有一个 `size` 属性与一个 `forEach()` 方法，让项目访问更容易。
4. Weak Map 是只能包含对象类型的键的特殊 Map 。与 Weak Set 相似，键的对象引用是弱引用，因此当它是某个对象的仅存引用时，也不会屏蔽垃圾回收。当键被回收之后，所关联的值也同时从 Weak Map 中被移除。

### ES6--Class

#### class的基本用法

##### 概述

JavaScript语言的传统方法是通过构造函数，定义并生成新对象。下面是一个例子:

```js
//声明一个函数 Point 
function Point(x,y){
    this.x = x;
    this.y = y;
}
//创建构造函数
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);//p:{x:1,y:2}
```

 ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。基本上，ES6的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写。

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

上面代码定义了一个“类”，可以看到里面有一个`constructor(构造器)`方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5的构造函数`Point`，对应ES6的`Point`类的构造方法。
 `Point`类除了构造方法，还定义了一个`toString`方法。注意，定义“类”的方法的时候，**前面不需要加上`function`这个关键字**，直接把函数定义放进去了就可以了。另外，**方法之间不需要逗号分隔**，加了会报错。

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

**上面代码表明，类的数据类型就是函数，类本身就指向构造函数。**
 *使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。*

```js
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff() // "stuff"
```

构造函数的`prototype`属性，在ES6的“类”上面继续存在。事实上，***<u>类的所有方法都定义在类的`prototype`属性上面</u>***。

```js
class Point {
  constructor(){
    // ...
  }
  toString(){
    // ...
  }
  toValue(){
    // ...
  }
}
// 等同于
Point.prototype = {
  toString(){},
  toValue(){}
};
```

**在类的实例上面调用方法，其实就是调用原型上的方法。**

```js
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
b.__proto__.constructor === B.prototype.constructor // true
```

上面代码中，`b`是B类的实例，它的`constructor`方法就是B类原型的`constructor`方法。
 由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

`prototype`对象的`constructor`属性，直接指向“类”的本身，这与ES5的行为是一致的。

```js
Point.prototype.constructor === Point // true
```

另外，**类的内部所有定义的方法，都是不可枚举的（non-enumerable）**。
 属性的枚举性会影响以下三个函数的结果：**for…in、Object.keys()、Object.values()、JSON.stringify**

```js
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码中，`toString`方法是`Point`类内部定义的方法，它是不可枚举的。这一点与ES5的行为不一致。

```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码采用ES5的写法，`toString`方法就是可枚举的。

类的属性名，可以采用表达式。

```js
let methodName = "getArea";
class Square{
  constructor(length) {
    // ...
  }
  [methodName]() {
    // ...
  }
}
```

上面代码中，`Square`类的方法名`getArea`，是从表达式得到的。

#### constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

```js
constructor() {}
```

`constructor`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

上面代码中，`constructor`函数返回一个全新的对象，结果导致实例对象不是`Foo`类的实例。

类的构造函数，不使用`new`是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

#### 类的实例对象

生成类的实例对象的写法，与ES5完全一样，也是使用`new`命令。如果忘记加上`new`，像函数那样调用`Class`，将会报错。

```js
// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

与ES5一样，**实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）**。

```js
//定义类
class Point {

  constructor(x, y) {
  //实例属性
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

上面代码中，`x`和`y`都是实例对象`point`自身的属性（因为定义在`this`变量上），所以`hasOwnProperty`方法返回`true`，而`toString`是原型对象的属性（因为定义在`Point`类上），所以`hasOwnProperty`方法返回`false`。这些都与ES5的行为保持一致。

与ES5一样，类的所有实例共享一个原型对象。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

上面代码中，`p1`和`p2`都是Point的实例，它们的原型都是Point.prototype，所以`__proto__`属性是相等的。

这也意味着，可以通过实例的`__proto__`属性为Class添加方法。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

上面代码在`p1`的原型上添加了一个`printName`方法，由于`p1`的原型就是`p2`的原型，因此`p2`也可以调用这个方法。而且，此后新建的实例`p3`也可以调用这个方法。这意味着，**使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变Class的原始定义，影响到所有实例**。

#### 不存在变量提升

Class不存在变量提升（hoist），这一点与ES5完全不同。

```js
new Foo(); // ReferenceError
class Foo {}
```

上面代码中，`Foo`类使用在前，定义在后，这样会报错，因为ES6不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

```js
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```

上面的代码不会报错，因为`Bar`继承`Foo`的时候，`Foo`已经有定义了。但是，如果存在`class`的提升，上面代码就会报错，因为`class`会被提升到代码头部，而`let`命令是不提升的，所以导致`Bar`继承`Foo`的时候，`Foo`还没有定义。

Class表达式

与函数一样，类也可以使用表达式的形式定义。

```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`MyClass`而不是`Me`，`Me`只在Class的内部代码可用，指代当前类。

```js
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

上面代码表示，`Me`只在Class内部有定义。

如果类的内部没用到的话，可以省略`Me`，也就是可以写成下面的形式。

```js
const MyClass = class { /* ... */ };
```

采用Class表达式，可以写出立即执行的Class。

```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

上面代码中，`person`是一个立即执行的类的实例。

私有方法

私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

```js
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```

上面代码中，`_bar`方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```

上面代码中，`foo`是公有方法，内部调用了`bar.call(this, baz)`。这使得`bar`实际上成为了当前模块的私有方法。

还有一种方法是利用`Symbol`值的唯一性，将私有方法的名字命名为一个`Symbol`值。

```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

上面代码中，`bar`和`snaf`都是`Symbol`值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

#### this的指向

类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`**会指向该方法运行时所在的环境**，因为找不到`print`方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定`this`，这样就不会找不到`print`方法了。

```js
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}  ???
```

另一种解决方法是使用箭头函数。

```js
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

还有一种解决方法是使用`Proxy`，获取方法的时候，自动绑定`this`。

```js
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

严格模式

类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

#### name属性

**由于本质上，ES6的类只是ES5的构造函数的一层包装，所以函数的许多特性都被`Class`继承，包括`name`属性。**

```js
class Point {}
Point.name // "Point"
```

`name`属性总是返回紧跟在`class`关键字后面的类名。

#### Class的继承

##### 基本用法

Class之间可以通过`extends`关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```js
class ColorPoint extends Point {}
```

上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个`Point`类。下面，我们在`ColorPoint`内部加上代码。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中，`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。

**子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错**。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。

```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

上面代码中，`ColorPoint`继承了父类`Point`，但是它的构造函数没有调用`super`方法，导致新建实例时报错。

ES5的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。**ES6的继承机制完全不同，实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。**

如果子类没有定义`constructor`方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有`constructor`方法。

```js
constructor(...args) {
  super(...args);
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，**只有`super`方法才能返回父类实例**。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

上面代码中，子类的`constructor`方法没有调用`super`之前，就使用`this`关键字，结果报错，而放在`super`方法之后就是正确的。

下面是生成子类实例的代码。

```js
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象`cp`同时是`ColorPoint`和`Point`两个类的实例，这与ES5的行为完全一致。

##### 类的prototype属性和__proto__属性

大多数浏览器的ES5实现之中，**每一个对象都有`__proto__`属性，指向对应的构造函数的prototype属性**。Class作为构造函数的语法糖，同时有prototype属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

上面代码中，子类`B`的`__proto__`属性指向父类`A`，子类`B`的`prototype`属性的`__proto__`属性指向父类`A`的`prototype`属性。

这样的结果是因为，类的继承是按照下面的模式实现的。

```js
class A {
}

class B {
}

// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
const b = new B();

// B的实例继承A的静态属性
Object.setPrototypeOf(B, A);
const b = new B();
```

《对象的扩展》一章给出过`Object.setPrototypeOf`方法的实现。

```js
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

因此，就得到了上面的结果。

```js
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```

这两条继承链，可以这样理解：作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）；作为一个构造函数，子类（`B`）的原型（`prototype`属性）是父类的实例。

```js
Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

Extends 的继承目标

`extends`关键字后面可以跟多种类型的值。

```js
class B extends A {
}
```

上面代码的`A`，只要是一个有`prototype`属性的函数，就能被`B`继承。由于函数都有`prototype`属性（除了`Function.prototype`函数），因此`A`可以是任意函数。

下面，讨论三种特殊情况。

第一种特殊情况，子类继承Object类。

```js
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，`A`其实就是构造函数`Object`的复制，`A`的实例就是`Object`的实例。

第二种特殊情况，不存在任何继承。

```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Funciton.prototype`。但是，`A`调用后返回一个空对象（即`Object`实例），所以`A.prototype.__proto__`指向构造函数（`Object`）的`prototype`属性。

第三种特殊情况，子类继承`null`。

```js
class A extends null {
}

A.__proto__ === Function.prototype // true Function
A.prototype.__proto__ === undefined // true
```

这种情况与第二种情况非常像。`A`也是一个普通函数，所以直接继承`Funciton.prototype`。但是，A调用后返回的对象不继承任何方法，所以它的`__proto__`指向`Function.prototype`，即实质上执行了下面的代码。

```js
class A extends null {
  constructor() { return Object.create(null); }
}
```

##### Object.getPrototypeOf()

`Object.getPrototypeOf`方法可以用来从子类上获取父类。

```js
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

**super 关键字**

`super`这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

上面代码中，子类`B`的构造函数之中的`super()`，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。

注意，`**super`虽然代表了父类`A`的构造函数，但是返回的是子类`B`的实例**，即`super`内部的`this`指的是`B`，因此`super()`在这里相当于`A.prototype.constructor.call(this)`。

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

上面代码中，`new.target`指向当前正在执行的函数。可以看到，在`super()`执行时，它指向的是子类`B`的构造函数，而不是父类`A`的构造函数。也就是说，`super()`内部的`this`指向的是`B`。

作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。

```js
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

上面代码中，`super()`用在`B`类的`m`方法之中，就会造成句法错误。

第二种情况，`super`作为对象时，指向父类的原型对象。

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

上面代码中，子类`B`当中的`super.p()`，就是将`super`当作一个对象使用。这时，`super`指向`A.prototype`，所以`super.p()`就相当于`A.prototype.p()`。

这里需要注意，**由于`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的**。

```js
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined
```

上面代码中，`p`是父类`A`实例的属性，`super.p`就引用不到它。

如果属性定义在父类的原型对象上，`super`就可以取到。

```js
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();
```

上面代码中，属性`x`是定义在`A.prototype`上面的，所以`super.x`可以取到它的值。

**ES6 规定，通过`super`调用父类的方法时，`super`会绑定子类的`this**`。

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

上面代码中，`super.print()`虽然调用的是`A.prototype.print()`，但是`A.prototype.print()`会绑定子类`B`的`this`，导致输出的是`2`，而不是`1`。也就是说，实际上执行的是`super.print.call(this)`。

由于绑定子类的`this`，所以如果通过`super`对某个属性赋值，这时`super`就是`this`，赋值的属性会变成子类实例的属性。

```js
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

上面代码中，`super.x`赋值为`3`，这时等同于对`this.x`赋值为`3`。而当读取`super.x`的时候，读的是`A.prototype.x`，所以返回`undefined`。

注意，使用`super`的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

```js
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
```

上面代码中，`console.log(super)`当中的`super`，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明`super`的数据类型，就不会报错。

```js
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super.valueOf() instanceof B); // true
  }
}

let b = new B();
```

上面代码中，`super.valueOf()`表明`super`是一个对象，因此就不会报错。同时，由于`super`绑定`B`的`this`，所以`super.valueOf()`返回的是一个`B`的实例。

最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。

```js
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

##### 实例的__proto__属性

子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

上面代码中，`ColorPoint`继承了`Point`，导致前者原型的原型是后者的原型。

因此，通过子类实例的`__proto__.__proto__`属性，可以修改父类实例的行为。

```js
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
```

上面代码在`ColorPoint`的实例`p2`上向`Point`类添加方法，结果影响到了`Point`的实例`p1`。

##### 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个`Array`的子类。

```js
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

上面代码定义了一个继承Array的`MyArray`类。但是，这个类的行为与`Array`完全不一致。

```
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。原生构造函数会忽略`apply`方法传入的`this`，也就是说，原生构造函数的`this`无法绑定，导致拿不到内部属性。

ES5是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新`length`属性，这个内部属性无法在子类获取，导致子类的`length`属性行为不正常。

下面的例子中，我们想让一个普通对象继承`Error`对象。

```js
var e = {};

Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []
```

上面代码中，我们想通过`Error.call(e)`这种写法，让普通对象`e`具有`Error`对象的实例属性。但是，`Error.call()`完全忽略传入的第一个参数，而是返回一个新对象，`e`本身没有任何变化。这证明了`Error.call(e)`这种写法，无法继承原生构造函数。

ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。下面是一个继承`Array`的例子。

```
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

上面代码定义了一个`MyArray`类，继承了`Array`构造函数，因此就可以从`MyArray`生成数组的实例。这意味着，ES6可以自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。

上面这个例子也说明，`extends`关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

```
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]

x.revert();
x // [1, 2]
```

上面代码中，`VersionedArray`结构会通过`commit`方法，将自己的当前状态存入`history`属性，然后通过`revert`方法，可以撤销当前版本，回到上一个版本。除此之外，`VersionedArray`依然是一个数组，所有原生的数组方法都可以在它上面调用。

下面是一个自定义`Error`子类的例子。

```
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
```

注意，继承`Object`的子类，有一个[行为差异](https://link.jianshu.com?t=http://stackoverflow.com/questions/36203614/super-does-not-pass-arguments-when-instantiating-a-class-extended-from-object)。

```
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
console.log(o.attr === true);  // false
```

上面代码中，`NewObj`继承了`Object`，但是无法通过`super`方法向父类`Object`传参。这是因为ES6改变了`Object`构造函数的行为，一旦发现`Object`方法不是通过`new Object()`这种形式调用，ES6规定`Object`构造函数会忽略参数。

Class的取值函数（getter）和存值函数（setter）

与ES5一样，在Class内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

存值函数和取值函数是设置在属性的descriptor对象上的。

```
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true
```

上面代码中，存值函数和取值函数是定义在`html`属性的描述对象上面，这与ES5完全一致。

##### Class的Generator方法

如果某个方法之前加上星号（`*`），就表示该方法是一个Generator函数。

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

父类的静态方法，可以被子类继承。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod(); // 'hello'
```

上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。

静态方法也是可以从`super`对象上调用的。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod();
```

Class的静态属性和实例属性

静态属性指的是Class本身的属性，即`Class.propname`，而不是定义在实例对象（`this`）上的属性。

```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性`prop`。

目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。

```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

ES7有一个静态属性的[提案](https://link.jianshu.com?t=https://github.com/jeffmo/es-class-properties)，目前Babel转码器支持。

这个提案对实例属性和静态属性，都规定了新的写法。

（1）类的实例属性

类的实例属性可以用等式，写入类的定义之中。

```
class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
```

上面代码中，`myProp`就是`MyClass`的实例属性。在`MyClass`的实例上，可以读取这个属性。

以前，我们定义实例属性，只能写在类的`constructor`方法里面。

```
class ReactCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```

上面代码中，构造方法`constructor`里面，定义了`this.state`属性。

有了新的写法以后，可以不在`constructor`方法里面定义。

```
class ReactCounter extends React.Component {
  state = {
    count: 0
  };
}
```

这种写法比以前更清晰。

为了可读性的目的，对于那些在`constructor`里面已经定义的实例属性，新写法允许直接列出。

```
class ReactCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  state;
}
```

（2）类的静态属性

类的静态属性只要在上面的实例属性写法前面，加上`static`关键字就可以了。

```
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myProp); // 42
  }
}
```

同样的，这个新写法大大方便了静态属性的表达。

```
// 老写法
class Foo {
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。

new.target属性

`new`是从构造函数生成实例的命令。ES6为`new`命令引入了一个`new.target`属性，（在构造函数中）返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

```
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

上面代码确保构造函数只能通过`new`命令调用。

Class内部调用`new.target`，返回当前Class。

```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，`new.target`会返回子类。

```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}

var obj = new Square(3); // 输出 false
```

上面代码中，`new.target`会返回子类。

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

上面代码中，`Shape`类不能被实例化，只能用于继承。

注意，在函数外部，使用`new.target`会报错。

Mixin模式的实现

Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。

```
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的`mix`函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```

