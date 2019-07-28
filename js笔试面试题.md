# js笔试面试题

## js基础知识

1.javascript typeof**返会的数据类型有哪些**？

null undefined  string number boolean object function

2.列举三种强制类型转换和两种隐式类型转换

强制类型转换：Number()   Boolean() String()  parseInt(),parseFloat()

隐式： true == 1?             1+'1'  !!

判断变量a为非空，未定义或者非空串才能执行方法体的内容

```js
var a;
if(a!=null&&typeof(a)!=undefined&&a!=''){
    //a有内容才执行的代码  
}
```


实际上我们只需要写一个判断表达：

```js
if(!!a){
    //a有内容才执行的代码...  
}
```

3.数组相关集合

3.1创建数组的方法

```js
let arr = new Array()
let arr = Array(n).fill()
let arr = []
let arr = Array.of(1,2)
```

3.2判断是否为数组

```js
console.log(Array.isArray(arr))
console.log(arr instanceof Array)
console.log(arr.constructor === Array)

```

3.3 pop(),push(),unshift(),shift()

- pop()尾部删除

- push()尾部插入

- unshift()头部插入

- shift()头部删除

  

  **4.DOM0 DOM2**

- 不支持添加多个事件，后面的会覆盖前面的
- 无法取消

```js
var btn = document.getElementById("button");
btn.onclick = function(){
    console.log(1);
}
btn.onclick = function(){
    console.log(2);
}       //只弹出2
```

dom2

- 可以添加多个事件
- 不兼容低版本IE
- 支持事件冒泡，事件捕获

```js
var btn = document.getElementById("button");
btn.addEventListener("click",function(){
    console.log("1");
})
btn.addEventListener("click",function(){
    console.log("2");
})              //先弹出1，再弹出2
```

**7. IE和DOM事件流的区别**

- 执行顺序不一样
- 参数不一样 低版本ie没有回调函数，只能进行冒泡
- 第一个参数是否加"on",低版本IE不支持addEventListener(),支持attachEvent,第一个参数需要加"on"
- this指向问题，IE指向windows,不指向触发的函数

**8. IE标准下有哪些兼容性写法**

```js
let ev = ev||window.event

document.documentElement.clientWidth||document.body.clientWidth

var target = ev.srcElement||ev.target
```

9. **call apply** **bind**

改变this的指向，
其中call的写法

```js
function add(a,b)  
{  
    console.log(a+b);  
}  
function sub(a,b)  
{  console.log(a-b);  
}  
  
add.call(sub,3,1);   
```

这个例子中的意思就是用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：console.log(4); // 注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。
apply写法

```js
function add(a,b)  
{  
    console.log(a+b);  
}  
function sub(a,b)  
{  console.log(a-b);  
}  
add.apply(sub,[4,2]);　
```

不同就在于第二个参数，apply写成数组

bind写法

```js
function add(a,b)  
{  
    console.log(a+b);  
}  
function sub(a,b)  
{  console.log(a-b);  
}  
add.bind(sub,[4,2])();　
```

bind是返回了一个**改变上下文的一个函数**，可以稍后调用，而apply，call是立即执行函数

**10. b继承a的方法（js面向对象复习）**

- **原型链继承**  
- **构造函数继承**
- 实例继承
- 组合继承
- 拷贝继承
- **寄生组合继承**

**11. 如何阻止事件冒泡和默认事件**

```js
//非ie
e.stopPropagation()
e.preventDefault()
//ie
e.cancelBubble = true
e.returnValue = false
//组织链接默认跳转
return false;
```

**12. 操作DOM节点的方法**

```js
// 获取节点方法
let div1 = document.getElementById('div1')
let div1 = document.getElementsByTagName('div')[i]
let div1 = document.getElementsByClassName('test')[i]
// 访问关系的获取
// 父节点
let div1 = document.getElementById('div1')
let divf = div1.parentNode
// 兄弟节点
let divb = div1.nextSibling
let divb = div1.previousSibling
let divb = nextElementSibling
let divb = previousElementSibling
// 子节点
let divc = div1.firstChild
let divc = div1.lastChild
let divc = div1.firstElementChild
let divc = div1.lastElementChild
// 所有子节点
let divac = div1.children  //	（子元素 element）
let divac = div1.childNodes  // 所有子节点（元素+文本+属性）

// 创建元素节点
let d = document.createElement('div')
// 创建文本节点
let t = document.createTextNode('asdfasdfa')
// 添加节点
(父)document.appendChild(d)(子)
// 删除
(父)document.removeChild(d)(子)
//替换
document.replaceChild(d, t)
// 插入
(父)doucment.insertBefore(新的子节点d,t作为参考的子节点)(子)
nodeType
这里讲一下nodeType。

nodeType == 1 表示的是元素节点（标签） 。记住：元素就是标签。

nodeType == 2 表示是属性节点 了解

nodeType == 3 是文本节点 了解
```

**13. window.onload和$(document).ready的区别**

- window.onload只能出现一次，$(document).ready能出现多次
- window.onload需要等所有文件都加载完才开始加载，$(document).ready只需等文档结构加载完了就开始加载

**14. == 和 === 区别**

前者会自动转换类型
后者不会

**15. javascript的同源策略（跨域问题）**

跨域是什么：**实际上就是一个网站不能执行其他网站上的网址，是由浏览器同源策略造成的，是浏览器对js施加的安全限制**
所谓同源，实际上是指**域名，协议，端口都相同**
也就是说当，域名或者协议，或者端口不同的时候，就是跨域，

**15.1. 解决方法：**

**jsonp**

json with padding,是一种json的一种使用模式
产生的原因，**ajax不支持跨域，由于浏览器的同源策略，但是script的src支持跨域**
主要的原理是**动态创建一个script标签的，通过src调用服务器提供的js脚本**，该脚本的内容是一个函数调用，该函数在本地js文件中进行定义，其中的参数就是，本地函数请求的数据，也就是服务器所将返回的数据

与ajax的不同，ajax是通过xhr获取非本页面的数据内容，而jsonp获取的是服务器提供js脚本

**代理**

- 例如www.123.com/index.html需要调用
- www.456.com/server.php，可以写一个接口
- www.123.com/server.php，由这个接口在后端去调用
- www.456.com/server.php并拿到返回值，然后再返回给 index.html，这就是一个代理的模式。相当于绕过了浏览器端，自然就不存在跨域问题。

> PHP端修改header（XHR2方式）
> 在php接口脚本中加入以下两句即可：
> header('Access-Control-Allow-Origin:*');//允许所有来源访问
> header('Access-Control-Allow-Method:POST,GET');//允许访问的方式

**16. javascript是一种什么样的语言**

- 解释性脚本语言，代码不进行预编译
- 主要用来向HTML页面添加交互行为
- 可以直接嵌入HTML页面，但单独写成js文件有利于结构和行为的分离
- 跨平台性，在绝大多数浏览器支持下，可以在多种平台下运行，linux,windows

**17. javascript基本数据类型和引用数据类型**

**基本数据类型**：null undefined string number boolean

特点：

- 基本类型的值是不能改变的
- 基本类型不能添加属性和方法
- 基本类型的比较是值的比较
- 基本类型变量存放在栈区（栈内存）
- 也就是说基本类型在赋值操作后，两个变量是相互不受影响的。

**引用数据类型**：object Function Array ExpReg Date Error

特点：

- 引用类型可以添加属性和方法，属性方法内又可以添加基本类型
- 引用类型的值是可变的
- 引用类型的值时同时保存在栈内存和堆内存里的对象，准确地说，引用类型的存储需要内存的栈区和堆区（堆区是指内存里的堆内存）共同完成，栈区内存保存变量标识符和指向堆内存中该对象的指针，
- 引用类型的比较是引用的比较 引用类型时按引用访问的，换句话说就是比较两个对象的堆内存中的地址是否相同，那很明显，person1和person2在堆内存中地址是不同的
- 引用类型的赋值其实是对象保存在栈区地址指针的赋值，因此两个变量指向同一个对象，任何的操作都会相互影响

**18. js原生不要与jq搞混**

- document.getELementById("ID").value

获取值的时候原生不是方法，不带括号

- 获取所有checkbox

```js
var boxs =document.getELementsByTagName("input");
var boxArray = [];
var len = boxs.length;
while(len--){
    if(boxs[len].type == 'checkbox'){
        boxArray.push(boxs[len]);
    }
}
```

- 设置div html内容以及设置样式

```js
var dom = document.getElementById("ID");
dom.innerHTML = "xxxx"
dom.style.color="#000"
```

**19. DOM,BOM**

javascript由**ECMAScript,DOM,BOM**三部分组成，

- ECMAScript也是一种语言，也就是对规定的语法，操作，关键字，语句等的一个描述，**javascript实现了ECMAScript**
- **DOM是文档对象模型**，包括了**获取元素，修改样式，操作元素**三方面内容，也是我们进行最多的操作，有很多兼容性写法
- BOM是**浏览器对象模型**，**包括浏览器的一些操作**，**window.onload,window.open等还有浏览器事件**，监听窗口的改变onresize,监听滚动事件onscroll等

**20. null和undefind的区别**

- null是表示一个**空的对象**，转为数值为0，u**ndefind表示一个空的原始值**，转为数值为NAN
- undefind指本该有一个值，但却并有定义，null表示没有对象，不应该有值

**21. XML和JSON的区别**

- JSON相对于XML来讲代码量校，传递速度更快
- JSON与js的交互更容易，解析更方便

22. **cookies 和 webstorage的区别**

调用localStorage,cookies等本地存储进行存储相关信息
三者的共同点：都保存在浏览器。
三者的区别：

**与服务器的交互**

- cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。
- 而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。**cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。**

**存储大小限制也不同，**

- cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。
- sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

**数据有效期不同，**

- sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；
- localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
- cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。

**作用域不同，**

- sessionStorage**不**在不同的浏览器窗口中共享，即使是同一个页面**；
- localStorage 在所有同源窗口中都是共享的；
- cookie也是在所有同源窗口中都是共享的。

**23. 哪些操作会造成内存泄露**

**内存泄露指任何对象在不再拥有或不再需要它之后依然存在**

- setTimeout第一个参数是字符串而不是函数的时候就会造成内存泄露
- 闭包
- 控制台日志
- 循环引用（两个对象彼此引用且彼此保留）

**24. js垃圾回收方式**

- **标记清除**：这是js最常用的垃圾回收方法，当一个变量进入执行环境时，例如函数中声明一个变量，将其标记为进入环境，**当变量离开环境时**，（函数执行结束），标记为离开环境
- **引用计数**: 跟踪记录每个值被引用的次数，声明一个变量，并将引用类型赋值给这个变量，则这个值的引用次数+1，当变量的值变成了另一个，则这个值的引用次数-1，当值的引用次数为0的时候，就回收

**25. 闭包**

- 函数嵌套函数
- 子级函数调用父级函数的参数或变量

**经典闭包**

```js
function outer(){
    var a = 1;
    function inner(){
        alert(a);
    }
    return inner
}
var inn = outer();
inn();
```

**点击li返回li下标**

```html
<ul id="test">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>

<script>
    var oUL = document.getElementById("test");
    var oLi = oUL.getElementsByTagName("li");
    for(var i=0;i<oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = function(){
            alert(this.index);
        }
    }
</script>
<!-- 闭包 -->
<script>
    var oUL = document.getElementById("test");
    var oLi = oUL.getElementsByTagName("li");
    for(var i=0;i<oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = (function(a){
            return function(){
                alert a;
            }
        })(i)
    }

</script>
```

**26. this指向问题**

> 普通函数调用，指向windows

```js
window.value=1;
function getValue(){
 console.log(this.value);
}
getValue();//输出1，此时的this指向window
```

> 对象的方法调用，指向对象

```js
var Obj={
  value:2,
  getValue:function(){
       console.log(this.value);//输出2,this指向Obj
  }   
}
```

构造器方法调用，指向构造函数实例出来的对象

```js
function Main(val){
  this.value=val;
}
Main.prototype.getValue=function(){
  console.log(this.value);
}

var fun=new Main(3);
fun.getValue();
fun.value;//输出3，this指向main的实例对象fun
```

> call,apply,bind可以自定义this指向第一个参数

```js
function showValue(){
  console.log(this.value);
}
var obj={
  value:4
}
showValue.call(obj)//输出4，this指向了obj对象
```



```js
function showValue(){
  console.log(this.value);
}
var obj={
  value:4
}
var showValue2=showValue.bind(obj);
showValue2()//输出4，this指向了obj对象
```

27. **高阶函数**

- 函数作为参数传递，
- 函数作为返回值输出

**28. new操作符到底干了什么**

- 创建一个新对象
- 将构造函数的作用域赋值给新对象（所以this指向了这个新对象）
- 执行构造函数的代码（为这个新对象添加属性）
- 返会新对象

**29. js严格模式**

"use strict"
消除js一些不合理的用法
消除代码运行的一些不安全之处
增加运行速度
为未来新版本js做铺垫

- 变量必须声明
- 对象不能出现重复属性名
- arguments改变，不会影响函数参数
- eval，arguments变为关键字，不能作为变量名
- 不允许使用with
- **不用call，apply，bind改变this指向**，一般函数调用指向null

**30. 事件代理事件委托**

- 原理是使用dom的冒泡，将事件绑定到父元素上，让父元素进行监听，提高性能

**31.什么是版本控制，**

版本控制是一种记录一个或若干文件内容变化，以便将来查阅修改以及更新。

**32.ajax请求**

ajax请求四步

- 创建一个xhr对象 var xhr = new XmlHttpRequest()
- 判断就绪状态为4时执行代码

```js
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        console.log(responseText);
    }
}
```

- 创建请求 xhr.open('get','url',true)
- 发送请求 xhr.send(null)

**33.在浏览器中输入URL到整个页面显示在用户面前时这个过程中到底发生了什么**

- DNS解析
- TCP连接
- 发送HTTP请求
- 服务器处理请求并返回HTTP报文
- 浏览器解析渲染页面
- 连接结束

**34.ajax和json**

> ajax用于web页面中实现异步数据交互，实现页面局部内容刷新

- 优点：**能够进行内容局部加载刷新，减少带宽**，**避免用户不断刷新以及页面跳转，提高用户体验**

- 缺点：对搜索引擎不友好；浏览器不支持ajax的后退；

  **json**

- 优点：json是一种请求轻量级的数据交互格式，便于人的阅读理解，便于机器解析

**35.http考点**

常用的HTTP方法有哪些

GET:
POST:
PUT:
DELETE:

**GET与POST方法的区别**

- **get主要是从服务器获取资源，post主要是向服务器发送数据**
- get传输数据通过url请求，利用k=v的形式放在url后面，用?连接，多个用&连接而post是存放在，ajax中的data里的，get传递的参数使用户可见 的，而post是对用户不可见的。post较get更安全一些
- get传输的数据量小，因为受url的长度限制，但是效率高，post能上传的数据量大
- get方式传递的中文字符可能会乱码，post支持标准字符集，可以正确传递中文字符

**http请求报文与响应报文格式**

请求报文包含三部分：

- 请求行：包含请求方法、URI、http版本信息
- 请求首部字段
- 空行
- **请求内容实体**

响应报文包含三部分：

- 状态行：包含HTTP版本、状态码、状态码的原因短语
- 响应首部字段
- 空行
- 响应内容实体

http状态码

- 100-199：成功接收请求，但需要进行下一步请求
- 200-299：成功接收请求，并完成整个处理过程
- 300-399：为完成全部请求，客户需近一步细化需求
- 400-499：客户端请求有错误，包括语法错误或不能正常执行
- 500-599：服务器端出现错误

**http缺点与https**

- 通信使用明文不加密，内容可能被窃听
- 不验证通信方身份，可能遭到伪装
- 无法验证报文完整性，可能被篡改

https就是加上加密处理（一般是SSL安全通信线路）+认证+完整性保护

常用：

- 200 正常，表示一切正常，返会的是正常请求结果
- 302/307 临时重定向，表示请求的文档，已被临时移动到别处**
- 304 未修改，调用缓存的数据
- 403 服务器拒绝客户请求
- 404 服务器不存在客户想要找的资源
- 500 服务器内部错误

**36.数组去重的一种相对好理解的方法**

利用indexOf方法的去重

indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。

```js
var arr = [1,1,2,3,4,2,6,4,5,7];
var nArr = [];
function removeItem(arr){
    for(var i=0;i<arr.length;i++){
        if(nArr.indexOf(arr[i])==-1){
            nArr.push(arr[i]);
        }
    }
    return nArr;
}
console.log(removeItem(arr));
```

es6

> let const

- let相当于给js新增了块级作用域，声明的变量只在let命令所在的代码块内有效
- const也是声明变量，它声明的变量，不能改变，可以用来声明第三方库变量的应用

> class extends super

- class定义一个类，其中有一个construct方法，construct方法中的this代表实例对象，construct以外还有其他的方法，construct内定义的方法属性是实例对象自己的，construct外的方法属性是所有实例对象共享的
- class之间可以通过extends实现继承
- super指代父类的实例，子类construct中必须先调用super()方法，因为子类没有自己的this对象，是继承父类的this对象

> arrow function(箭头函数)

除了书写简洁了很多，最大的优点是this指向，使用箭头函数，函数内部的this就是定义时所在的对象。箭头函数根本没有自己的this，this是继承外面的，它内部的this就是外层代码块的this

> template string(模板字符串)

ajax调用数据库，需要向文档中插入大段html的时候，传统的字符串拼接太麻烦，引入模板工具库会稍微好点，不过还是没有es6的template string简单，可以直接用反单引号包括代码块``,用${}来引用变量，所有的空格缩进都会保留到输出中

> destructuring(解构赋值)

es6按照一定模式，从数组和对象中提取值，对变量进行赋值，这就成为解构，也就是说，运用es5的方法，数组和对象中的变量需要，一个个进行赋值，而es6可以一步到位

> default,rest(默认值，扩展语法)

当函数忘记传参的时候，给它一个默认值，传统方法是在函数中运用||，es6可以直接在参数中写上

```js
function animal(type){
    type = type || 'cat'  
    console.log(type)
}
animal()
function animal(type = 'cat'){
    console.log(type)
}
animal()
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```

**1.请简述一下javascript的执行环境（执行上下文）以及所涉及到到一些概念？**

*每当控制器转到可执行环境时，就会进入一个执行环境*。

而执行环境大致分为三类：

- 全局环境
- 函数环境
- eval（个人不了解，开发也不会用到不做讲解）

**执行环境是靠栈来存储，每当开始执行js代码的时候，就进入到了全局执行环境，于是乎，就把全局执行环境压到了这个栈（我们暂时称它为执行环境栈）中。**

**而在全局代码中，会定义很多函数，函数中又会定义很多函数，而每当控制器执行到函数时，则就进入到了这个函数的执行环境中。**

> [http://www.jianshu.com/p/cd3fee40ef59](https://www.jianshu.com/p/cd3fee40ef59)

**2.sessionStorage,localStorage,cookie区别**

- 共同点：都是浏览器端的数据存储，同源；
- 不同点：

1. cookie在同源的http请求中携带，浏览器与服务器之前回传。cookie有路径的概念；
2. cookie大小不超过4k。sessionStorage和localStorage达到5M或者更大。
3. cookie在设置的有效期前有效,sessionStorage（浏览器关闭窗口前有效）|localStorage（一直有效）
4. session不在不同的浏览器窗口中共享，local，cookie共享。
5. sessionStorage和localStorage支持事件机制

**3.localStorage应该如何进行存储？**

```js
// 将数据存在loaclStorage中

export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__; 
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
```

**4.GET与POST的区别？**

- HTTP要求，GET把数据放在url上，所以GET常用于发少量的数据用于查询；POST把数据放在body中，数据量相对较大用来存储。

- GET和POST还有一个重大区别，简单的说： 
  GET产生一个TCP数据包；POST产生两个TCP数据包。

  长的说： 
  对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）； 
  而对于POST，浏览器先发送header，服务器响应**100 continue**，浏览器再发送data，服务器响应200 ok（返回数据）。

**5.同源策略指的是什么？**

- 同源指的是以下三个都相同： 
  - 协议相同
  - 域名相同
  - 端口相同
- 所谓同源策略指的是：**浏览器对不同源的脚本或者文本的访问方式进行的限制。比如源a的js不能操作引入的源b的元素属性。**
- 限制主要为： 
  - Cookie、LocalStorage 和 IndexDB 无法读取。
  - **DOM无法获取**
  - **AJAX请求不能发送**

**6.如何才能跨域，跨域方式有哪些？**

- 设置document.domain

**Cookie是服务器写入浏览器的一小段信息**，只有同源的网页才能共享。但是，两个网页的一级域名相同，只是二级域名不相同，浏览器允许通过设置**document.domain**共享Cookie。

在 [www.a.com/a.html](https://link.jianshu.com?t=http://www.a.com/a.html) 中

```js
document.domain = 'a.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://www.script.a.com/b.html';
ifr.display = none;
document.body.appendChild(ifr);
ifr.onload = function(){
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    // 这里就能b.html的cookie了
    ifr.cooike = doc.cookie;
};
```

在 script.a.com/b.html 中

```js
document.cookie = "test1=hello";
document.domain = 'a.com';
```

这样不仅能访问b的cookie，还可以访问b的dom，但是无法访问到LocalStorage 和 IndexDB，而且**主要限制是a,b必须一级域名必须相同**。

- window.name

浏览器窗口都有window.name这个属性，这个属性最大的特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页就可以读取它。

在b.com/data.html中有这样的数据

```js
<script>
    window.name = '我是你们想要的数据。';
</script>  
```

现在a.com/index.html想获取这个数据应该怎么办？**通过iframe充当中间人**

```js
<script>
    function getDate(url){
        var iframe = document.createElement('iframe');
        iframe.style.display='none';
        var state = 0;
        
        iframe.onload = function(){
            if(state == 1){
                var dataPage = iframe.contentWindow;
                var data = dataPage.name;
                console.log(data);
                dataPage.document.write('');
                dataPage.close();
                document.body.remove(iframe);
            }else
            {
                state = 1;
                iframe.contentWindow.location = url;
            }
        };
        
        // 代理源，创建好且设置了document.name
        iframe.src = 'a.com/b.html';
    }
    
    getData('b.com/data.html');
</script>  
```

**些人可能会问为什么不直接把iframe的src设置为目的源（b.com/data.html）来获取数据，而是在设置为目的源之后，还要把src设置为同域名下的其他源(a.com/b.html)才获取数据？**

如果直接设置src，那么iframe和本网页(a.com/index.html)会因为同源策略限制不能访问。而把iframe先设置为目的源，再设置为同域名下的其他源，那么同域名下的其他源就和目的源共享了一个窗口，故拥有同样window.name，并且由于是同域名下的源，并且设置了domain，故可以访问目标源的window.name。

**state用来干什么** ？

每次设置src，都会刷新，state是标志位，让获取了数据就销毁掉。

- window.postMessage

上面的方法都是破解，H5提供了官方的API：window.postMessage。允许跨窗口通信，不论这两个窗口是否同源。

```js
// 举例来说，父窗口http://aaa.com向子窗口http://bbb.com发消息，调用postMessage方法就可以了。
var popup = window.open('http://bbb.com', 'title');
popup.postMessage('Hello World!', 'http://bbb.com');
```

postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为*，表示不限制域名，向所有窗口发送。

```js
// 子窗口向父窗口发送消息的写法类似。
window.opener.postMessage('Nice to see you', 'http://aaa.com');

// 父窗口和子窗口都可以通过message事件，监听对方的消息。
window.addEventListener('message', function(e) {
  console.log(e.data);
},false);

// event.source：发送消息的窗口
// event.origin: 消息发向的网址
// event.data: 消息内容
```

下面的例子是，子窗口通过event.source属性引用父窗口，然后发送消息。

```js
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  event.source.postMessage('Nice to see you!', '*');
}
```

- AJAX

利用jsonp

```js
// 首先，网页动态插入<script>元素，由它向跨源网址发出请求。

function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

> 阮一峰老师：[浏览器同源政策及其规避方法](https://link.jianshu.com?t=http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

**7. AJAX模型是什么**？

- AJAX全称为“AsynchronousJavaScript and XML” 异步的JavaScript和Xml，是一种创建交互式网页应用开发的新技术。



![img](https:////upload-images.jianshu.io/upload_images/4111182-d1c3ebce04e73605.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/901/format/webp)



- 运用AJAX

```js
// 创建xmlHttpRequest对象
function createXmlHttp(){
    var xmlHttp;
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }else{
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xmlHttp;
}

var xhr = createXmlHttp();

// 发送请求GET或者POST
// 第三个参数代表是否异步
xhr.open('GET',url+'?date='+ new Date().getTime(),true);

//GET发送的数据在url上 POST发送的数据在send()中
xhr.send();

// 回调函数响应
xhr.onreadystatechange=function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        document.getElementById("myDiv").innerHTML=xhr.responseText;
    }
}
    
// xhr.readyState存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪

// status：状态码

// 如果是同步，直接调用xhr.responseText即可
```

**8.为什么说jsonp不是真正的ajax？**

- 为什么说jsonp是ajax？

**因为他们目的一样，都是请求一个url，然后把服务器返回的数据进行处理**。故jquery把jsonp封装为ajax的一种形式。

- 那为什么jsonp不是真正的ajax？

ajax和jsonp其实本质上是不同的东西，**ajax的核心通过XmlHttpRequest获取非本页面内容，而jsnop的核心是动态加载script来调用服务器提供的js脚本**。

> [ajax 和jsonp 不是一码事 细读详解
>  ](https://link.jianshu.com?t=http://blog.csdn.net/superhosts/article/details/9057301)

**9.property 和 attribute有什么区别？**

- property表示DOM的基础属性。

```
<input id='ipt' value='123' other='1111' />

console.log(document.getElementById('ipt'));
```

可以发现有attributes，value，id，以及很多我们并没有赋值的属性，但是并没有other属性。value，id这样的就叫做DOM的基础属性。

- 正如打印出来的结果还有一个叫attributes的属性，类型是NamedNodeMap。这里就可以说attributes是DOM 的property的其中一个。

点击开这个你会发现有

```js
0: id
1: value
2: other
length: 3
__proto__: NamedNodeMap
```

这个属性包含了显示定义在标签上的属性。

```js
console.log(ipt.attributes.other); // other="1111";
```

并且

```js
console.log(typeof ipt.attributes.other); // object
```

返回的是一个对象。

- property能够从attribute中得到同步，attribute不会同步property上的值；

```js
in1.value = 'new value of prop';
console.log(in1.value);             // 'new value of prop'
console.log(in1.attributes.value);  // 'value="1"'

in1.attributes.value.value = 'new value of attr';
console.log(in1.value);             // 'new value of attr'
console.log(in1.attributes.value);  // 'new value of attr'
```

**10. 关于==的强制类型转换**



![img](https:////upload-images.jianshu.io/upload_images/4111182-a44097a0362ad096?imageMogr2/auto-orient/strip%7CimageView2/2/w/600/format/webp)

1. 重点：
   1. Number与String比较，String转Number。
   2. Number与Object比较，Object转String。
   3. 当比较中出现Boolean，无论另一个数据是什么类型，都先把Boolean转为Number。
   4. undefined与null，undefined与undefined，
       null与null都返回true。
   5. **Object 与 Object只有引用相同返回true。**
2. 数据类型转化为Boolean的规则：
   1. String的 “” 转换为Boolean为false其他都为true
   2. Number的0和NaN转换为Boolean为false其他都为true
   3. Object的null转换为Boolean为false其他都为true
   4. Undefined转换为false 不能转换为true

```js
[] == ![] //true

// 1.由于!的优先级比较高，先执行![]，[]是空数组，数组是对象，由2.3(需要了解的知识文字序号)，则[]转换为boolean结果为true，![]结果就为false，表达式变为判断 []==false
// 2.根据1.3，将false转为Number,结果为0，表达式变为判断 [] == 0
// 3.根据1.2，将[]变为String，结果为""，表达式变为判断 "" == 0
// 4.根据1.1，将""变为Number，结果为0，表达式变为判断 0 == 0
返回结果 true

console.log(1 == true); // 文字1.3，Number(true) = 1  ->  1 == 1 true
console.log(2 == true); // 文字1.3，Number(true) = 2  ->  2 == 1 false
console.log(0 == false);//文字 1.3，Number(false)= 0  ->  0 == 0 true
console.log(NaN == NaN);// 图片1.c.i/1.c.ii false
console.log({} == {});// 图片1.f {}是对象，比较引用指向的空间，因为是两个不同的空对象，地址也不一样 false
console.log([] == []);// 同理
console.log(null == 0);//false 文字1.2 null是对象，String(null) == "null"  -> "null" == 0 ，文字1.1 Number("null") == NaN -> NaN == 0 false
console.log(undefined == 0);// 这里将执行String(undefined)，之后执行步骤同上

总结：
undefined == null，结果是true。且它俩与所有其他值比较的结果都是false。

String == Boolean，需要两个操作数同时转为Number。

String/Boolean == Number，需要String/Boolean转为Number。

Object == Primitive，需要Object转为Primitive(具体通过valueOf和toString方法)。
```

**11.支持正则表达式的方法：**

- RegExp 对象方法

```js
// 1. complie() 用于编译正则表达式或改变正则表达式
let str = 'woman1manm';
let patt = /(wo)?man/g;
let str2 = str.replace(patt,'2222'); // 222212222m
let patt2 = /2222/g;
patt.compile(patt2); // 改变了正则表达式
let str3 = str2.replace(patt,'woman'); // 返回 woman1womanmm

// 2. exec() 未匹配到返回一个null，匹配到则返回一个数组arr
// arr[0]表示匹配到的这个字符串，arr[1]...arr[n]表示依次匹配到的圆括号的值，如果有的话
// 并且arr有两个属性，index表示第一次匹配到的字符串下标，input表示需要匹配的字符串本身
let str = '22222womanmmmmmmmanmmmmman';
let patt = /(wo)?(man)/g;
let what = patt.exec(str); 
console.log(what);

// 返回 ：
// [ 'woman',
//   'wo',
//   'man',
//   index: 5,
//   input: '22222womanmmmmmmmanmmmmman' ]

// 因为patt是全局搜索，所以exec还可以继续搜索，并且这个时候patt还有一个属性lastIndex表示 匹配文本的最后一个字符的下一个位置

console.log(patt.lastIndex) // 10
what = patt.exec(str);
console.log(what);

// 返回 ：
// [ 'man',
//   'undefined',
//   'man',
//   index: 16,
//   input: '22222womanmmmmmmmanmmmmman' ]
//当patt再也匹配不到时，lastIndex会被重置为0

//3. test(str) 检索字符串是否有这个模式，有返回true否则false
```

- String对象方法

```js
// 1. search(patt)，搜索字符串是否含有这个匹配，如果有就返回其实位置下标，没有就返回-1。

// 2. match(patt), 在字符串内检索指定的模式，返回存放匹配结果的数组，该数组内容依赖于regexp是否具有g。
// 如果没有g，则返回的结果与exec相同。既，str.match(patt) 和 patt.exec(str)的返回结果相同。如果有g，是全局匹配，则会返回所有匹配结果。

let str = '22222womanmmmmmmmanmmmmman';
let patt = /(wo)?(man)/g;
let result = str.match(patt);
console.log(result); // [ 'woman', 'man', 'man' ]

// 3. replace(patt，str) ，返回一个新的字符串，如果有g将所有匹配值换成目标字符串，没有则替换第一个。
// $1、$2、...、$99代表圆括号所匹配的值
var name = "Doe, John";
console.log(name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1")); // John Doe
```

**12.常用的正则表达式：**

- 匹配邮箱

  1、纯数字       　　123456@qq.com 
  2、纯字母 　　　　 zhangsan@qq.com
  3、字母数字混合  　zhang123@qq.com
  4、带点的 　　　　 zhang.san@qq.com
  5、带下划线 　　　 zhang_san@qq.com
  6、带连接线　　　  zhang-san@qq.com

   

  邮箱@后缀的类型：

  1、123456@qq.com

  2、123456@vip.qq.com

  *至少有两处单词

  *顶级域名一般为2~4位（如cn、com、club）

  默认前缀、后缀不以'_'、'-'、'.'结尾，所以正则可以写成：

  ```js
  ^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$
  ```

  \d：表示[0-9]

- 匹配ip地址：

根据规则：每段相同，范围都在 0 ~ 255
 0~255 对应的正则表达式为 `` 2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2} ``

下面简单介绍它的组成 `` 2(5[0-5]{1}|[0-4]\d{1}) ` 和 ` [0-1]?\d{1,2} ``

```js
一：` 2(5[0-5]{1}|[0-4]\d{1}) `

1.  5[0-5]{1}    # 匹配：50 ~ 55
2.  [0-4]\d{1}   # 匹配：0 ~ 49

那么完整的 ` 2(5[0-5]{1}|[0-4]\d{1}) ` 匹配的就是 200 ~ 255

二：` [0-1]?\d{1,2} ` 
它匹配的是 0 ~ 199

所以整段表达式匹配的就是 0 ~ 255
```

 0 到 255 的式子已经写出来了，那么一共四段再加上中间的点就很容易了

```js
最终版

(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})

其实是可以再简化的，重复 `点和数字` 三次就可以了

(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}
```

- 匹配电话号码

```js
/^[1][34578][0-9]{9}$/
/^1[3456789]\d{9}$/
    \d = [0-9]
```

- 检查输入字符串是否是带小数的数字格式,可以是负数

```js
/^-?(\d+)[\.]?(\d+)$/
```

**13. es6中的let,const和var有什么区别？**

- **let的作用域是外层块，不是外层函数，而var是外层函数。**

```js
if(true){
    let a =0;
    var b =0;
}
console.log(a) // 报错，未定义
console.log(b) // 就是0
```

- let没有变量提升，但是有暂时性死区。

```js
console.log(a); // 结果是报错，不是undefined
let a = 0; 


if(true){
    var c = 0; // 报错，因为c已经定义在此区域了。
    let c = 0;
}
```

- 重新声明会报错
- const与let一样，不同在于const引用的地址不能改变,值也不能改变。声明必须赋值。

**14.var f = function g(){ return 23; };  typeof g()结果是什么？为什么？**

- typeof f :function，因为f本来就是一个函数。
- typeof f()：number，因为f()先执行，返回了一个数字，23.
- typeof g：undefined，因为typeof一个未声明的变量，都默认返回undefined。
- typeof g()：报错，g未定义。因为function是函数表达式的形式，并且赋值给了f，所以这个函数就算f，而g只是一个匿名，只能在函数f中使用，在全局访问不到。

#### 15.最完美的数组去重：

```js
function normalize(arr) {
    // 判断传入的是否是数组
    if (arr && Object.prototype.toString.call(arr) !== '[object Array]') {
        return;
    }

    // 当作为对象属性时，会发生强制类型转换，为了区别类型，创建不同对象来去重。
    // 例如： 1，'1' 都会被转化为 obj['1']，导致去重出错, 故区别类型。
    const objectSet = {};

    // Object.create(null), 以防和原型上的函数名冲突。
    // 例如： obj[toString]， 本来是没有重复的，但是obj[toString]会查找到
    // 原型上的toString方法，“temp in map”会为true，故利用Object.create(null)
    // 使原型为空
    objectSet.number = Object.create(null);
    objectSet.string = Object.create(null);
    objectSet.array = Object.create(null);
    objectSet.boolean = Object.create(null);
    objectSet.object = Object.create(null);
    objectSet.undefined = Object.create(null);

    let len = arr.length, temp, type, map;

    for (let i = len - 1; i >= 0; i--) {
        temp = arr[i];
        // 取相应的去重对象。
        if(Object.prototype.toString.call(temp) === '[object Array]'){
            map = objectSet.array;
        }else{
            type = typeof temp;
            map = objectSet[type];
        }
        if (temp in map) {
            arr.splice(i, 1);
        } else {
            map[temp] = true;
        }
    }
    return arr;
}

const arr = [1, '1', 1, 'toString', ['toString'], 1, '', 2, '', null, 'null', 2, 2, null, 3, 3];
console.log(normalize(arr));
```

**16. 把字符串转化为大小写：**

```js
toUpperCase(): 转大写
toLowerCase(): 转小写
```

**17. 为什么js是阻塞加载的？**

当引用了js的时候，浏览器发送一个js请求，就会一直等待请求的返回，因为浏览器需要一个稳定的dom结构，而js中很有可能直接改变了dom结构，为了防止渲染好的树又被js代码修改，所以就会阻塞其他的下载和呈现。

18. **数组长度问题：**

- 为什么结果不是3？

```js
 var arr = [];
arr[0]  = 'a';
arr[1]  = 'b';
arr.foo = 'c';
console.log(arr.length); //2 
```

length返回的是array数组索引长度。

```js
var arr = [];
arr[9] = 1;
console.log(arr.length); // 10;
console.log(arr[8]); // undefined;
```

**19. ToPrimitive()是什么？**

简单来说，**就是将对象（object）转化为原始类型**（undefined, null, boolean ,string, number）的方法，在计算一些强制类型转换时，都需要将对象转化为原始类型再进行计算。

> ToPrimitive(obj)等价于，obj.valueOf()，如果为原始值则返回结果，否则，计算obj.toString()，如果是原始值返回，否则抛出异常。

注：此处有个例外，即Date类型的对象，它会先调用toString()方法，后调用valueOf()方法。

- 不同对象的valueOf，toString结果不同

```js
// Array
console.log([,2,'ss'].valueOf());  // 返回数组本身[,2,'ss'] ，仍然不是原始类型
console.log([,2,'ss'].toString()); // 返回每个元素中间以逗号隔开的字符串：,2,ss

// Object
console.log({a:11,b:'uu'}.valueOf()); // 返回对象本身{ a: 11, b: 'uu' }
console.log({a:11,b:'uu'}.toString()); // 返回字符串 [object Object]

console.log(function(){return 1}.valueOf()); // 返回[Function]代表函数本身
console.log(function(){return 1}.toString()); // 返回函数定义的字符串 ：function (){return 1}
```

**20. '+new Array(017)' 的结果？**

- 017是8进制，为15 -> + new Array(15);
- +为强制类型转Number -> Number(new Array(15));
- new Array(15) -> ToPrimitive([,,,,,,,,,,,,]);
- ToPrimitive([,,,,,,,,,,,,]) -> [,,,,,,,,,,].valueOf() 结果为 [,,,,,,,,,,]
- [,,,,,,,,,,].toString() -> ',,,,,,,,,'
- Number(,,,,,,,,,) 为NaN

**21. 不能用变量提升的思路取思考**

```js
var foo = {n: 1};
var bar = function(foo){
    console.log(foo.n)
    var foo = {n:2};
}
bar(foo);
```

这里有正常的传参和执行。

**22. innerHTML, outerHTML, innerText, outerText的区别？**



![img](https:////upload-images.jianshu.io/upload_images/4111182-ff8ed1d5ff0b3b17.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/443/format/webp)



```html
<div id="div1"><span>abcd</span></div>

//写
//div.innerHTML = "<p>大米</p>";    //div保留
//div.outerHTML = "<p>大米</p>";    //div也被取代了
//div.innerText = "米老鼠";
//console.log(div);           //div中包裹米老鼠
div.outerText = '<p>www</p>'  //将原来单元素直接变成了纯文本，包括外围<div>
```

**23. Array方法的返回结果？**

- 返回本身，会改变数组：reverse(),sort()  

- 返回一个副本：concat(),slice(),map(),filter

- 返回其他： 

  - 改变数组： 

    - pop：返回arr最后一个元素
    - push：返回新的长度
    - shift：返回arr第一个元素
    - unshift：返回新的长度
    - **splice：返回被删除的项目**

  - 不改变： 

    - join：返回字符串
    - some/every：boolean
    - findIndex：下标

    只要记住改变的是 splice reverse sort push pop unshift shift

**24. 常用排序时间复杂度？**

![img](https:////upload-images.jianshu.io/upload_images/4111182-99659031b3f9cefe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/630/format/webp)

#### 25. AMD 和 CMD 的区别有哪些？

- AMD规范：[github.com/amdjs/amdjs-api/wiki/AMD](https://link.jianshu.com?t=github.com/amdjs/amdjs-api/wiki/AMD)，是RequireJS在推广过程中对模块化定义的规范化产出。
- CMD规范：[github.com/seajs/seajs/issues/242](https://link.jianshu.com?t=github.com/seajs/seajs/issues/242)CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
- 区别 
  1. 对于模块的依赖，AMD是提前执行，CMD是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
  2. CMD 推崇依赖就近，AMD 推崇依赖前置。
  3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

```js
// CMD
define(function (require, exports, module) {
    var a = require('./a')
    a.doSomething()   // 此处略去 100 行   
    var b = require('./b') // 依赖可以就近书写   
    b.doSomething()
    // ... 
})
// AMD 默认推荐的是
define(['./a', './b'], function (a, b) {
    // 依赖必须一开始就写好  
    a.doSomething()    // 此处略去 100 行   
    b.doSomething()   // ...
})
```

- 世界上，有两种比较流行的 JavaScript 模块化体系，一个是 Node 实现的 CommonJS，另外一个是 AMD。很多类库都同时支持 AMD 和 CommonJS，但是不支持 CMD。或许国内有很多 CMD 模块，但并没有在世界上流行起来。

**26.keydown、keypress、keyup的区别**

- keypress主要用来捕获数字（shift+数字的符号）、字母（区分大小写）、小键盘等除了F1-12、SHIFT、Alt、Ctrl、Insert、Home、PgUp、Delete、End、PgDn、ScrollLock、Pause、NumLock、{菜单键}、{开始键}和方向键外的ANSI字符。keypress事件不能对系统功能键（例如：删除，后退等，还有中文输入法）进行正常的响应。
- keypress只能响应单个字符
- keydown和keyup可以响应除prscrn的所有按键，可以捕捉组合键。
- keydown和keyup不可以判断字符大小写，**keypress可以**。（keyCode）
- keypress事件的which值无法区分主键盘上的数字键和附键盘数字键的，而keydown、keyup的which值对主附键盘的数字键敏感。

**27. 原生实现点击按钮切换弹框的隐藏，且点击弹框以外的地方使弹框隐藏：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        html {
            height: 100%;
        }
        
        body {
            height: 100%;
        }
        
        .div {
            height: 300px;
            width: 300px;
            background-color: rosybrown;
            transition: opacity 0.4s ease;
        }
    </style>
</head>

<body>
    <button class="btn1">toggle</button>
    <div class="div" style="opacity: 1;">
        <button class="btn2">console1</button>
        <button class="btn3">console2</button>
    </div>
    <br />
    <div class="div"></div>
    <script>
        var toggle = document.getElementsByTagName('button')[0];
        var console1 = document.getElementsByTagName('button')[1];
        var console2 = document.getElementsByTagName('button')[2];
        var div = document.getElementsByClassName('div')[0];
        var isShow = true;

        toggle.onclick = function () {
            if (isShow) {
                div.style.opacity = '0';
                isShow = false;
            } else {
                div.style.opacity = '1';
                isShow = true;
            }
        }

        div.addEventListener('click', function (e) {
            e.stopPropagation();
        }, false);

        console1.addEventListener('click', function (e) {
            console.log(1);
            // e.stopPropagation();
        }, false);

        console2.onclick = function (e) {
            console.log(2);
            // e.stopPropagation();
        }

        document.body.addEventListener('click', function (e) {
            var target = e.target;
            // 点击toggle事件也会冒泡到body上，本身toggle的效果就没了，所以事件在toggle时直接退出不执行
            if(target === toggle){
                return;
            }
            div.style.opacity = '0';
            isShow = false;
        }, false);
    </script>
</body>

</html>
```

思路：切换隐藏很简单，主要是点击周围的地方隐藏弹框。那么就在body上绑定一个事件，点击页面任何一个地方都隐藏，然后再去除弹框区域就行了。如何去除，就在弹框上绑定一个click事件，此事件发生后停止冒泡，那么点击弹框上任何内容的时候，事件都会冒泡到弹框上，然后弹框再停止冒泡，那么事件就不会走到body上，也就不会在弹框区域触发隐藏弹框事件。

**28. js单例模式：**

```js
var Universe;

(function () {

    var instance;

    Universe = function Universe() {

        if (instance) {
            return instance;
        }

        instance = this;

        // 其它内容
        this.start_time = 0;
        this.bang = "Big";
    };
} ());

//测试代码
var a = new Universe();
var b = new Universe();
alert(a === b); // true
a.bang = "123";
alert(b.bang); // 123
var single = (function(){
    var unique;
    function getInstance(){
        if( unique === undefined ){
            unique = new Construct();
        }
        return unique;
    }
    function Construct(){
        // ... 生成单例的构造函数的代码
    }
    return {
        getInstance : getInstance
    }
})();
```

