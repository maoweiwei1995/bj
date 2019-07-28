### CSS前端面试

##### 系列文章：

[HTML及HTTP面试笔试题](https://www.jianshu.com/p/d40facd78a88)
 [JavaScript面试笔试题](https://www.jianshu.com/p/3f03996d6502)

#### 1.CSS有什么书写顺序？


 位置属性：position，top等，z-index，display，float等。**2.** 大小：width，height，padding，margin。**3.** 文字系列：font系列，line-height，letter-space，color等。**4.** 背景与边框：background，border。**5.** 其他animation，transition

#### 2.CSS其他书写规范？

属性写压缩属性，**去掉小数点前的0**，命名用全称，颜色缩写，**中划线连接**，**多用类不名用id**

#### 3.移动端中什么是设备像素比？怎么应用？

我们首先应该知道，在css规范中
 ，长度可以分为两类，一类是绝对的，一类是相对的，而**px就是一个相对的单位（CSS pixels）**，相对的是设备像素。而这里我们所说的**设备像素（Device pixels）就是一个物理概念**，比如iPhone5的分辨率是640 x 1136px。
 那么，1cp的px和1dp的px相等吗？
 这里就引出的一个概念就是：**设备像素比（device pixel ratio）**，由于手机的每英寸像素不同，导致了，CSS px和设备像素产生了比例，而这个比例就叫做**设备像素比**，简称dpr。

那么他们到底有什么关系呢，如下图所示：



![img](https:////upload-images.jianshu.io/upload_images/4111182-4e0fe981e481f025.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500/format/webp)

image

意思就是，标准设备dpr为1，例如电脑，那么电脑分辨率的1px就能用css的1px表示，但是像iphone这样的视网膜屏幕上，dpr为2，那么分辨率的1px，就需要css中的0.5px去表示。 简言之 **dp = cp * dpr;** 所以在设计的时候，我想要手机上呈现4px宽的log，css就只用写成2px。

**CSSpx的好处在于什么？**

由于csspx是相对的，那么我编程写的1px，在不同dpr的设备上就能呈现出不同分辨率px，以适应更广泛的手机。

#### 4.说说对vertical-align的理解

vertical-align是指文字垂直方向上的对其方式，属性值有top，text-top，bottom，text-bottom，baseline（默认），middle，长度，百分比。百分百和长度都是相对于baseline，百分百的值相对于line-height。然后bottom，text-bottom区别在于，bottom指到是父元素标签到底部，而text-bottom指的是与父标签的文字底部对齐。

```html
.dot{
    display: inline-block;
    height: 4px;
    width: 4px;
    background-color: red;
    vertical-align: top;
}
.b
{
    background-color: gray;
    color: white;
    line-height: 8px;
}
<div class="b"> 
    woooooooooooooooooooooooo  <span class="dot"></span>
</div>
```

比如这段代码，如果值是bottom，那么div的高度为8px（==撑开div的是行高不是文字大小==），而且点在div的底部；如果值是text-bottom的话，那么div的高度为15px，因为英文字母有默认line-height，小点要到文字的地步，就向下撑开了line-height，故撑开了div。

#### 5.什么是BFC？

BFC全称 Box Formatting Context

Box：是**CSS布局的对象和基本单位，一个网页由很多Box组成。**
 Formatting context：它是页面中的一块渲染区域，并且有一套渲染规则，它决定其子元素将如何定位，以及和其他元素的关系和相互作用。

BFC：直译为"块级格式化上下文"。它是一个独立的渲染区域，只有block-level box参与，他规定了内部的block-level box如何布局，**并且这个区域与外界毫不相干**。

#### BFC布局的规则：

- 内部的box在垂直方向一个接一个的放
- 垂直方向上，属于同一个BFC的相邻两个box的上下margin会发生重叠。

- BFC内块级元素的左边margin会和包含块的左边border相接触。
- BFC区域不会与**float box**相重合，故可以做自定义两栏布局。
- 计算高度时，float元素也会计算，故可以由此来解决浮动。
- BFC是页面上一个**独立的容器**，子元素与外界无关。

#### 满足下列条件之一就可以触发BFC：

- 根元素，即HTML元素
- float不为none
- overflow不为visible
- display为inline-block、table-cell、table-caption
- position的值为absolute或者fixed

#### 6.说说如何清除浮动

- 添加额外标签，并设置clear

```html
<div style="clear:both;"></div>
```

或

```html
<br clear="all" />
```

缺点在于难维护，并会添加很多无意义的空标签。**坚决不使用**，只时候新手学习

- 激发BFC（上一文讲了BFC会计算浮动元素的高度，从而消除浮动）

a.设置overflow

```
 <div class="wrap" id="float3" style="overflow:hidden; *zoom:1;">
<h2>父元素设置 overflow </h2>
<div class="main left">.main{float:left;}</div>
<div class="side left">.side{float:right;}</div>
</div>
<div class="footer">.footer</div>
```

由于ie6还需要设置*zoom：1来激发haslayout，计算浮动元素高度。

b.父元素float：不建议，会造成布局混乱

c.父元素设置display:table：**display:table 本身并不会创建BFC，但是它会产生匿名框(anonymous boxes)，而匿名框中的display:table-cell可以创建新的BFC**

- 清除浮动最佳实践：伪元素

```css
.clearfix{
  display: inline-block;// 激发BFC,若是block可以不要此条
  *zoom：1; // ie6激发haslayout
  }
.clearfix:after{
    display: block; // 使生成元素以块级元素显示，占满剩余空;
    content: "."; // 写什么都可以
    height: 0; // 不产生额外高度破坏原有布局高度
    line-height: 0; // 同上
    clear: both; // 清除浮动
    visibility: hidden; // 使生成的多余内容不显示，且防止生产的多余内容阻止了原有内容的点击交互
}
```

#### 7. 常见的可继承属性？

-  **所有元素都可以继承**：visibility，cursor
-  **内联元素可继承**：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction（**文字相关属性**）。
-  **块级元素可继承**：text-indent、text-align。
-  **列表元素可继承**：list-type、list-type-style、list-style-position、list-style-image。
-  **表格元素可继承**：**border-collapse。**

#### 8. 说说white-space、word-wrap、word-break？

- white-space表示空白符的处理方式： 
  - normal（默认）：空白都会被忽略。
  - pre：空白都会被保留，类似于 <pre>标签。
  -  **nowrap**：文本不会换行知道遇见
    为止。
  - pre-wrap：保留空白符序列，但是正常地进行换行（遇见
    ）。
  - pre-line：合并空白符号，但是保留换行符。
- word-wrap单词断行： 
  - normal：当下一个单词太长时，会自动换行。！！！！**但是，如果换行了，容器还是包裹不了这个单词怎么办？这个单词就会在新的一行冲出容器**！！
  - break-word：这个属性值就代表了，如果单词要冲出边界了，那么允许在这个单词内断行。比如我的单词，ammmmmmmmmm，在ammmmm时就到达了边界，那么剩下的mmmm就可以被换到下一行。
- word-break直接单词断行： 
  - break-all：就像word-wrap那样，它首先考虑的是把长单词换到下一行，如果换到了下一行，容器还是不能包裹，那么才在单词内断行，而break-all，则是，**一遇到了边界，不管这个单词长短，直接就把单词断行**。
  - keep-all：与上面对立，无论遇到什么情况，都不断行。保持浏览器状态。
  - normal：默认值。

```
// 强制不换行：
.text{
    white-space: nowrap;
}

// 自动换行
.text{
    word-wrap: break-word;
    word-break: normal;
}


// 强制英文单词自动换行
.text{
    word-break:break-all;
}
```

#### 9. display,position,float之间的定义关系？

- 如果display为none，则忽略position和float属性。
- 否则，position值为fixed或者absolute，display默认为block且float为none。
- 否则，float的值不为none，则display默认为block。
- 否则，应用指定的其他block属性
- 不论之前是什么类型的元素（display:none除外），只要设置了position:absolute或float，都会让元素以display:block的方式显示，可以设置长宽，**默认宽度并不占满父元素**

#### 10. display:inline的元素

padding-top/padding-bottom, margin-top/margin-bottom, width/height无效。

#### 11. 伪类和伪元素是什么？

- 伪类：用于向某些选择器加特殊的效果。（:active, :focus, :hover, :link, :visited, :first-child, :lang）
- 伪元素：用于将特殊的效果添加到选择器。（:first-letter, :first-line, :before, :after）
- **伪类的效果可以通过添加一个实际的类来达到**，而**伪元素的效果则需要通过添加一个实际的元素才能达到**，这也是为什么他们一个称为伪类，一个称为伪元素的原因。

#### 12. 选择器匹配顺序：从右到左

浏览器CSS匹配不是从左到右进行查找，而是从右到左进行查找。比如#divBox p span.red{color:red;}，浏览器的查找顺序如下：先查找html中所有class='red'的span元素，找到后，再查找其父辈元素中是否有p元素，再判断p的父元素中是否有id为divBox的div元素，如果都存在则匹配上。浏览器从右到左进行查找的好处是为了**尽早过滤掉一些无关的样式规则和元素**。

#### 13. css中的px, em, rem, %详解

- px：像素，虚拟长度，计算机系统的数字化图片长度单位，浏览器默认字体大小16px。
- em：相对长度单位，相对当前对象内文本的字体尺寸。默认1em=16px。
- rem：**相对html根元素大小**。除了IE8及更早版本外，所有浏览器均已支持rem。
- 百分比：**相对长度，相对父元素字体大小**。
- 百分比与em区别：在font-size上没有什么具体区别，区别在于**text-indent，设置百分比是相对与父元素宽度，而em相对于当前字体大小。**

#### 14. border:none与border:0的区别?

- border:none浏览器不会渲染border
- border:0，浏览器内存依然保存了border，只是值为0，页面上的效果和border:none一样，都没有边框
- 区别和visibility:hidden 和 display:none的区别相似。

#### 15. 伪类和类选择器，谁的优先级大一些？`一样大` 

#### 16. 什么是CSSRules？

在网页加载过程中， 浏览器将每个css文件解析为样式表对象CSSStyleSheet，每个对象包含css规则对象CSSRule，css规则对象CSSRule包含选择器和声明对象，以及其他一些符合css语法的对象。



![img](https:////upload-images.jianshu.io/upload_images/4111182-a8955b8ff1a25e08.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/500/format/webp)



修改这个对象：

```
console.log(document.styleSheets.item(0).cssRules[0].style.backgroundColor = 'blue');
```

每一个选择器对应的样式就是一个cssRules。

#### 17. 获取css属性的方法？

- 获取內联样式（可读写）：`element.style.color = red`或者`element.setAttribute('style','color: red')`;

- 通过CSSStyleDeclaration对象的cssText属性和setProperty()，removeProperry()方法：

  ```js
  element.style.cssText
  ```

  

  ```
  element.style.removeProperty('color')
  ```

  

  ```
  element.style.setProperty('color','green','important')
  ```

  - cssText：可读写样式声明文本
  - length：多少条声明
  - parentRule：包含声明的的那条规则
  - getPropertyPriority()：返回优先级
  - getPropertyValue()：返回特定属性值
  - item()：索引访问

- 通过`document.styleSheets`查看所有样式表

- window对象的getComputedStyle方法，第一个参数是element，第二个是null,空字符串,或者伪类字符串，返回一个只读的计算样式（最终表现样式）。同ie的**element.currentStyle**。

> [原生js操作css总结](https://link.jianshu.com?t=http://www.cnblogs.com/susufufu/p/5749922.html)

