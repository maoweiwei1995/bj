# Canvas绘图详解

- HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。
- 画布是一个矩形区域，您可以控制其每一像素。
- canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
- 浏览器支持
  - Internet Explorer 9、Firefox、Opera、Chrome 以及 Safari 支持`<canvas>` 及其属性和方法。
  - 注释：Internet Explorer 8 以及更早的版本不支持 `<canvas>` 元素。
- [HTML 5 Canvas 参考手册](https://link.jianshu.com/?t=http%3A%2F%2Fwww.w3school.com.cn%2Ftags%2Fhtml_ref_canvas.asp)

> **1、基本用法**

**(1)创建 Canvas 元素**

- 向 HTML5 页面添加 canvas 元素。
- 规定元素的 id、宽度和高度。
- 开始和结束标签中的内容是后备信息，如果浏览器不支持`<canvas>`元素，就会显示这些信息。

```html
<canvas id = "drawing" width = "200" height= "200">A drawing of something</canvas>
```

**(2)通过 JavaScript 来绘制**

- canvas 元素本身是没有绘图能力的。**所有的绘制工作必须在 JavaScript 内部完成**。
- 要在这块画布（canvas）上绘图，需要取得绘图上下文。而取得绘图上下文对象的引用，需要调用getContext()方法并传入上下文的名字。

```js
var drawing = document.getElementById("drawing");
//确定浏览器支持<canvas>元素
if (drawing.getContext){
    var context = drawing.getContext("2d");
    //更多代码
}
```

- 使用toDataURL()方法，可以导出在`<canvas>`元素上绘制的图像。这个方法接受一个参数，即图像的MIME 类型格式，而且适合用于创建图像的任何上下文。

```js
var drawing = document.getElementById("drawing");
//确定浏览器支持<canvas>元素
if (drawing.getContext){

    //取得图像的数据URI
    var imgURI = drawing.toDataURL("image/png");
    
    //显示图像
    var image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image);
}
```

> **2、2D上下文**

- 使用2D 绘图上下文提供的方法，可以绘制简单的2D 图形，比如矩形、弧线和路径。
- 2D 上下文的坐标开始于`<canvas>`元素的左上角，原点坐标是(0,0)。所有坐标值都基于这个原点计算，x 值越大表示越靠右，y 值越大表示越靠下。
- 默认情况下，width 和height 表示水平和垂直两个方向上可用的像素数目。

> **2.1 填充和描边**

- 填充，就是用指定的样式（颜色、渐变或图像）填充图形；
- 描边，就是只在图形的边缘画线。

| 属性        | 描述                                     |
| ----------- | ---------------------------------------- |
| fillStyle   | 设置或返回用于填充绘画的颜色、渐变或模式 |
| strokeStyle | 设置或返回用于笔触的颜色、渐变或模式     |

- 这两个属性的值可以是字符串、渐变对象或模式对象，而且它们的默认值都是"#000000"。
- 如果为它们指定表示颜色的字符串值，可以使用CSS中指定颜色值的任何格式，包括颜色名、十六进制码、rgb、rgba、hsl 或hsla。

```js
var drawing = document.getElementById("drawing");

//确定浏览器支持<canvas>元素
if (drawing.getContext){
    var context = drawing.getContext("2d");
    context.strokeStyle = "red";
    context.fillStyle = "#0000ff";
}
```

> **2.2 绘制矩形**

- 矩形是唯一一种可以直接在2D上下文中绘制的形状。
- 与矩形有关的有四个方法。

| 方法         | 描述                         |
| ------------ | ---------------------------- |
| rect()       | 创建矩形                     |
| fillRect()   | 绘制“被填充”的矩形           |
| strokeRect() | 绘制矩形（无填充）           |
| clearRect()  | 在给定的矩形内清除指定的像素 |

- 这几个方法都能接收4个参数

| 参数   | 描述                 |
| ------ | -------------------- |
| x      | 矩形左上角的 x 坐标  |
| y      | 矩形左上角的 y 坐标  |
| width  | 矩形的宽度，以像素计 |
| height | 矩形的高度，以像素计 |

```html
<!--示例画布-->
<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.
</canvas>
```

**(1) rect()**

- 使用 stroke() 或 fill() 方法在画布上实际地绘制矩形。
- javascript 语法

```js
context.rect(x,y,width,height);
```

- 示例

```js
/**通过 rect() 方法来创建三个矩形**/

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

// 红色矩形
ctx.beginPath();
ctx.lineWidth="6";
ctx.strokeStyle="red";
ctx.rect(5,5,290,140);  
ctx.stroke();

// 绿色矩形
ctx.beginPath();
ctx.lineWidth="4";
ctx.strokeStyle="green";
ctx.rect(30,30,50,50);
ctx.stroke();

// 蓝色矩形
ctx.beginPath();
ctx.lineWidth="10";
ctx.strokeStyle="blue";
ctx.rect(50,50,150,80);
ctx.stroke();
```

![rect().png](http://static.zybuluo.com/meggie/v7fcygad34tdlff7nninx0zx/image_1c1pcbr1s1eo1ie117n1b631u6bm.png)

rect().png

**(2)fillRect()**

- fillRect()方法在画布上绘制的矩形会填充指定的颜色。填充的颜色通过fillStyle 属
  性指定。
- javascript 语法

```js
context.fillRect(x,y,width,height);
```

- 示例

```js
/**绘制填充矩形**/

var c=document.getElementById("myCanvas");
var context=c.getContext("2d");

//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);

//绘制半透明的蓝色矩形
context.fillStyle = "rgba(0,0,255,0.5)";
context.fillRect(30, 30, 50, 50);
```

![fillRect.png](http://static.zybuluo.com/meggie/vgp12imnyp3e1cjrkft3wx3s/image_1c1pd0n3e1tk0pm2tpc17sq5r31g.png)

fillRect.png

**(3)strokeRect()**

- strokeRect() 方法绘制矩形（不填色）。笔触的默认颜色是黑色。
- strokeRect()方法在画布上绘制的矩形会使用指定的颜色描边。描边颜色通过strokeStyle 属性指定。
- javascript 语法

```js
context.strokeRect(x,y,width,height);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var context=c.getContext("2d");

//绘制红色描边矩形
context.strokeStyle = "#ff0000";
context.strokeRect(10, 10, 50, 50);
//绘制半透明的蓝色描边矩形
context.strokeStyle = "rgba(0,0,255,0.5)";
context.strokeRect(30, 30, 50, 50);
```

![strokeRect.png](http://static.zybuluo.com/meggie/ozldd2kqjyem7t1m57njjqtp/image_1c1pd5qpd6ha1os9123tm5t1t621t.png)

strokeRect.png

**(4)clearRect()**

- clearRect()方法用于清除画布上的矩形区域。
- 本质上，这个方法可以把绘制上下文中的某一矩形区域变透明。通过绘制形状然后再清除指定区域，就可以生成有意思的效果。
- javascript 语法

```JS
context.clearRect(x,y,width,height);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var context=c.getContext("2d");

//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);

//绘制半透明的蓝色矩形
context.fillStyle = "rgba(0,0,255,0.5)";
context.fillRect(30, 30, 50, 50);

//在两个矩形重叠的地方清除一个小矩形
context.clearRect(40, 40, 10, 10);
```

![clearRect.png](http://static.zybuluo.com/meggie/0e3xbdcxmuuhnp6cx3fu7f8l/image_1c1pdh3201a4i1jhvjev1rntekg2a.png)

clearRect.png

> **2.3 绘制路径**

- 2D 绘制上下文支持很多在画布上绘制路径的方法。通过路径可以创造出复杂的形状和线条。

| 方法               | 描述                                                    |
| ------------------ | ------------------------------------------------------- |
| fill()             | 填充当前绘图（路径）                                    |
| stroke()           | 绘制已定义的路径                                        |
| beginPath()        | 起始一条路径，或重置当前路径                            |
| moveTo()           | 把路径移动到画布中的指定点，不创建线条                  |
| closePath()        | 创建从当前点回到起始点的路径                            |
| lineTo()           | 添加一个新点，然后在画布中创建从该点到最后指定点的线条  |
| clip()             | 从原始画布剪切任意形状和尺寸的区域                      |
| quadraticCurveTo() | 创建二次贝塞尔曲线                                      |
| bezierCurveTo()    | 创建三次方贝塞尔曲线                                    |
| arc()              | 创建弧/曲线（用于创建圆形或部分圆）                     |
| arcTo()            | 创建两切线之间的弧/曲线                                 |
| isPointInPath()    | 如果指定的点位于当前路径中，则返回 true，否则返回 false |

**(1)fill()**

- fill() 方法填充当前的图像（路径）。默认颜色是黑色。
- 使用 fillStyle 属性来填充另一种颜色/渐变。
- javascript 语法

```js
context.fill();
```

- 示例

```js
var c=document.getElementById("myCanvas");
var context = c.getContext('2d');
context.rect(20,20,150,100)
context.fillStyle = "green";
context.fill();
```

![fill()](http://static.zybuluo.com/meggie/dewzf7nhkng635p07yohnu97/image_1c1peent4101gr8q83g1bh41d332n.png)

fill()

**(2)stroke()**

- stroke() 方法会实际地绘制出通过moveTo()和lineTo()方法定义的路径。默认颜色是黑色。
- 使用 strokeStyle 属性来绘制另一种颜色/渐变。
- javascript 语法

```
context.stroke();
```

- 示例

```js
var c=document.getElementById("myCanvas");
var context = c.getContext('2d');
context.beginPath();
context.moveTo(20,20);
context.lineTo(20,100);
context.lineTo(70,100);
context.strokeStyle = "green";
context.stroke();
```

![stroke().png](http://static.zybuluo.com/meggie/qn1bq6mtapaq6qpwpe780ggp/image_1c1pf1b691dgo1n00466gr16dv3h.png)

stroke().png

**(3)beginPath()、moveTo()、lineTo()**

- beginPath() 方法开始一条路径，或重置当前的路径。
- moveTo(x, y)：将绘图游标移动到(x,y)，不画线。
- lineTo(x, y)：从上一点开始绘制一条直线，到(x,y)为止。
- javascript 语法

```js
context.beginPath();
context.moveTo(x,y);
context.lineTo(x,y);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.beginPath();              
ctx.strokeStyle="red";  // 绿色路径
ctx.moveTo(0,75);
ctx.lineTo(300,75);
ctx.stroke();  // 进行绘制

ctx.beginPath();
ctx.strokeStyle="blue";  // 紫色路径
ctx.moveTo(150,0);
ctx.lineTo(150,150);            
ctx.stroke();  // 进行绘制
```

![beginPath()&moveTo()&lineTo().png](http://static.zybuluo.com/meggie/64et7fqpxbr501lpy37ysl4h/image_1c1pfde6i1kc115ru31l1pjj1g9i4e.png)

beginPath()&moveTo()&lineTo().png

**(4)closePath()**

- closePath() 方法创建从当前点到开始点的路径。
- 使用 stroke() 方法在画布上绘制确切的路径。
- 使用 fill() 方法来填充图像（默认是黑色）。请使用fillStyle属性来填充另一个颜色/渐变。
- javascript 语法

```js
context.closePath();
```

- 示例

```
var c = document.getElementById("myCanvas");
var context = c.getContext('2d');
context.beginPath();
context.moveTo(20,20);
context.lineTo(20,100);
context.lineTo(100,100);
context.closePath();
context.stroke();
context.fillStyle = "green";
context.fill();
```

![closePath().png](http://static.zybuluo.com/meggie/zkzsar47tmhlry1vkewlemj1/image_1c1pg20hdqkp1etl12c6dd615p94r.png)

closePath().png

**(5)clip()**

- clip() 方法从原始画布中剪切任意形状和尺寸。
- javascript语法

```
context.clip();
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
// Draw a rectangle
ctx.rect(50,20,200,120);
ctx.stroke();
// Draw green rectangle
ctx.fillStyle="green";
ctx.fillRect(0,0,150,100);

var c=document.getElementById("myCanvas2");
var ctx=c.getContext("2d");
// Clip a rectangular area
ctx.rect(50,20,200,120);
ctx.stroke();
ctx.clip();
// Draw red rectangle after clip()
ctx.fillStyle="red";
ctx.fillRect(0,0,150,100);
```

![clip().png](http://static.zybuluo.com/meggie/qmx8q634q9m0pk9k7tpyd067/image_1c1pgikmviuv1lkf19lu6op1a4t5l.png)

clip().png

**(6)quadraticCurveTo()**

- quadraticCurveTo() 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。
- javascript 语法

```
context.quadraticCurveTo(cpx,cpy,x,y);
```

- 从上一点开始绘制一条二次曲线，到(x,y)为止，并且以(cpx,cpy)作为控制点。
- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20,20);
ctx.quadraticCurveTo(20,100,200,20);
ctx.stroke();	
```

![quadraticCurveTo().png](http://static.zybuluo.com/meggie/2jsjhzivwl4a4mvx1jpqz26e/image_1c1ph7ivq16g8129m1osjpqmrvt62.png)

quadraticCurveTo().png

- 二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。

- 曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。

  ![quadraticCurveTo分析.png](http://static.zybuluo.com/meggie/6oxs417yqfo0qfcpelynzci2/image_1c1ph90ga1qfjna9itr1hg3gkd6v.png)

  quadraticCurveTo分析.png

**(7)bezierCurveTo()**

- bezierCurveTo() 方法通过使用表示三次贝塞尔曲线的指定控制点，向当前路径添加一个点。
- javascript 语法

```
context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
```

- 从上一点开始绘制一条曲线，到(x,y)为止，并且以(cp1x,cp1y)和(cp2x,cp2y)为控制点。
- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20,20);
ctx.bezierCurveTo(20,100,200,100,200,20);
ctx.stroke();
```

![bezierCurveTo().png](http://static.zybuluo.com/meggie/ewppr8klp7b9tiff3tikls5v/image_1c1phspspuu6noo13it1d0u1js7c.png)

bezierCurveTo().png

- 三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。

- 曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。

  ![bezierCurveTo分析](http://static.zybuluo.com/meggie/s1kbvex76taw5k3cj8uv7uc2/image_1c1phtirv17v0k71sla1lqbqhj7p.png)

  bezierCurveTo分析

**(8)arc()**

- arc() 方法创建弧/曲线（用于创建圆或部分圆）。
- javascript 语法

```
context.arc(x,y,r,sAngle,eAngle,counterclockwise);
```

- 参数值

| 参数             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| x                | 圆的中心的 x 坐标。                                          |
| y                | 圆的中心的 y 坐标。                                          |
| r                | 圆的半径。                                                   |
| sAngle           | 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。          |
| eAngle           | 结束角，以弧度计。                                           |
| counterclockwise | 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。 |

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(100,75,50,0,2*Math.PI);
ctx.stroke();
```

![arc().png](http://static.zybuluo.com/meggie/k2ul5v6dgnv005t8xu8rcovc/image_1c1pj0tlplmoq5qeht5rk1mut8j.png)

arc().png

- 如需通过 arc() 来创建圆，请把起始角设置为 0，结束角设置为 2*Math.PI。

- 使用 stroke() 或 fill() 方法在画布上绘制实际的弧。

  ![arc()角度.png](http://static.zybuluo.com/meggie/hyllztu1wim2kni329lvpdkp/image_1c1pirub0c17n471ea1ub19oj86.png)

  arc()角度.png

**(9)arcTo()**

- arcTo() 方法在画布上创建介于两个切线之间的弧/曲线。
- 从上一点开始绘制一条弧线，到(x2,y2)为止，并且以给定的半径radius 穿过(x1,y1)。
- javascript 语法

```
    context.arcTo(x1, y1, x2, y2, radius)
```

- 示例

```js
//获取Canvas对象(画布)
var canvas = document.getElementById("myCanvas");
if(canvas.getContext){  
    var ctx = canvas.getContext("2d");  
    ctx.moveTo(50, 50); 
    //端点1
    var p1 = {
        x : 200,
        y : 50
    };
    //端点2
    var p2 = {
        x : 200,
        y : 100         
    };
    //绘制与当前端点、端点1、端点2三个点所形成的夹角的两边相切并且半径为50px的圆的一段弧线
    ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 50);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}
```

![atcTo().png](http://static.zybuluo.com/meggie/lwdmkwfgt6ole65jgz3vpk7i/image_1c1rcqp9u5q2ies1qne6klql89.png)

arcTo().png

**(10)isPointInPath()**

- isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。
- javascrit 语法

```
context.isPointInPath(x,y);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var context = c.getContext("2d");
context.rect(10,10,100,100);
if(context.isPointInPath(20,50)){
  context.stroke();
}
```

![isPointInPath().png](http://static.zybuluo.com/meggie/tgmh4u2ww7nn2fy568z4lsz1/image_1c1rdcvrg1sdp1miq1tsp1f1t6m29.png)

isPointInPath().png

**2.4 绘制文本**

- 2D 绘图上下文提供了2个绘制文本方法和一个相关方法
- fillText()和strokeText()都可以接收4个参数：要绘制的文本字符串、x坐标、y坐标和可选的最大像素宽度。而measureText()接受一个参数，表示要测量的文本。

| 方法          | 描述                       |
| ------------- | -------------------------- |
| fillText()    | 在画布上绘制“被填充的”文本 |
| strokeText()  | 在画布上绘制文本（无填充） |
| measureText() | 返回包含指定文本宽度的对象 |

- 这两个方法都以下列3 个属性为基础。

| 属性         | 描述                                                     |
| ------------ | -------------------------------------------------------- |
| font         | 设置或返回文本内容的当前字体属性                         |
| textAlign    | 设置或返回文本内容的当前对齐方式，建议使用"start"和"end" |
| textBaseline | 表示文本的基线，可以调整文本的垂直对齐方式               |

**(1)fillText()**

- fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
- javascript 语法

```js
context.fillText(text,x,y,maxWidth);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font="30px Times new Roman";
ctx.fillStyle = "red"
ctx.fillText("Hello World!",10,50);
```

![fillText().png](http://static.zybuluo.com/meggie/t1texntweza42qdd456ip2to/image_1c1retvc9paij631c0njrepdm9.png)

fillText().png

**(2)strokeText()**

- strokeText() 方法在画布上绘制文本（没有填色）。文本的默认颜色是黑色。
- javascript 语法

```
context.strokeText(text,x,y,maxWidth);
```

- 示例

```
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font="40px Times new Roman";
ctx.strokeStyle = "red";
ctx.strokeText("Hello World!",10,50);
```

![strkeText().png](http://static.zybuluo.com/meggie/ymxysotfiekjdyilaoi7at99/image_1c1rf6j2r5egj1irrs1p1t9af9.png)

strkeText().png

**(3)measureText()**

- measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
- javascript 语法

```
context.measureText(text).width;
```

- 示例

```js
//在画布上输出文本之前，检查字体的宽度
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font="20px Arial";
var txt="Hello World"
ctx.fillText("width:" + ctx.measureText(txt).width,10,50);
ctx.fillText(txt,10,100);
```

![measureText.png-](http://static.zybuluo.com/meggie/v54y90ndyqeku3ired7i299j/image_1c1rfq846oqec1a13uc17n71npu9.png)

measureText.png-

**(4)textAlign**

- textAlign 属性根据锚点，设置或返回文本内容的当前对齐方式。
- javascript 语法

```
context.textAlign="center|end|left|right|start";
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

// Create a red line in position 150
ctx.strokeStyle="blue";
ctx.moveTo(150,20);
ctx.lineTo(150,170);
ctx.stroke();
ctx.font="15px Arial";   

// Show the different textAlign values
ctx.textAlign="start";      
ctx.fillText("textAlign=start",150,60);        
ctx.textAlign="end";      
ctx.fillText("textAlign=end",150,80);                  
ctx.textAlign="left";      
ctx.fillText("textAlign=left",150,100);
ctx.textAlign="center";     
ctx.fillText("textAlign=center",150,120);              
ctx.textAlign="right";      
ctx.fillText("textAlign=right",150,140);
```

![textAlign.png](http://static.zybuluo.com/meggie/rb9i7gywnnz4gi9qosyudr5c/image_1c1rg33hm1fd180k125613ec1mpv1m.png)

textAlign.png

**(5)textBaseline**

- textBaseline 属性设置或返回在绘制文本时的当前文本基线。
- javascript 语法

```
context.textBaseline="alphabetic|top|hanging|middle|ideographic|bottom";
```

- 示例

![textBaseline.png](http://static.zybuluo.com/meggie/6lw3oubhvjx8mxrt6s8k4m1z/image_1c1rgb6gr1ph9vpskoq1t1ck1i33.png)

textBaseline.png

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

//Draw a red line at y=100
ctx.strokeStyle="blue";
ctx.moveTo(5,100);
ctx.lineTo(395,100);
ctx.stroke();

ctx.font="20px Arial"

//Place each word at y=100 with different textBaseline values
ctx.textBaseline="top"; 
ctx.fillText("Top",5,100); 
ctx.textBaseline="bottom"; 
ctx.fillText("Bottom",50,100); 
ctx.textBaseline="middle"; 
ctx.fillText("Middle",120,100); 
ctx.textBaseline="alphabetic"; 
ctx.fillText("Alphabetic",190,100); 
ctx.textBaseline="hanging"; 
ctx.fillText("Hanging",290,100); 
```

![textBaseline.png](http://static.zybuluo.com/meggie/q5p2k0hoy2dwx0fpnj9mjm2l/image_1c1rge5qset64p71t9a7tu1mom3g.png)

textBaseline.png

**2.5 变换**

- 2D 绘制上下文支持各种基本的绘制变换。创建绘制上下文时，会以默认值初始化变换矩阵，在默认的变换矩阵下，所有处理都按描述直接绘制。
- 为绘制上下文应用变换，会导致使用不同的变换矩阵应用处理，从而产生不同的结果。
- 可以通过如下方法来修改变换矩阵。

| 方法           | 描述                                           |
| -------------- | ---------------------------------------------- |
| scale()        | 缩放当前绘图至更大或更小                       |
| rotate()       | 旋转当前绘图                                   |
| translate()    | 重新映射画布上的 (0,0) 位置                    |
| transform()    | 替换绘图的当前转换矩阵                         |
| setTransform() | 将当前转换重置为单位矩阵。然后运行 transform() |

**(1)scale()**

- scale() 方法缩放当前绘图，更大或更小。
- 如果您对绘图进行缩放，所有之后的绘图也会被缩放。**定位也会被缩放。**
- javascript语法

```js
context.scale(scalewidth,scaleheight);
```

- 缩放图像，在x 方向乘以scaleX，在y 方向乘以scaleY。scaleX和scaleY 的默认值都是1.0。
- 参数值

| 参数        | 描述                                                   |
| ----------- | ------------------------------------------------------ |
| scalewidth  | 缩放当前绘图的宽度 (1=100%, 0.5=50%, 2=200%, 依次类推) |
| scaleheight | 缩放当前绘图的高度 (1=100%, 0.5=50%, 2=200%, etc.)     |

```js
/**依次放大**/
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.strokeRect(5,5,25,15);
ctx.scale(2,2);
ctx.strokeRect(5,5,25,15);
ctx.scale(2,2);
ctx.strokeRect(5,5,25,15);
ctx.scale(2,2);
ctx.strokeRect(5,5,25,15);
```

![scale().png](http://static.zybuluo.com/meggie/iw17770a1pnhyxu4txahvdid/image_1c1rpk97tdanc9h15tqof116q3t.png)

scale().png

**(2)rotate()**

- rotate(angle)，围绕原点旋转图像angle 弧度。
- javascript 语法

```js
context.rotate(angle);
```

- 参数值
  参数| 描述
  -|-
  angle |旋转角度，以弧度计。如需将角度转换为弧度，请使用degrees*Math.PI/180 公式进行计算。举例：如需旋转 5 度，可规定下面的公式：5*Math.PI/180。

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.rotate(20*Math.PI/180);
ctx.fillRect(50,20,100,50);
```

![rotate().png](http://static.zybuluo.com/meggie/zk5fr5uft3ayutw3lwg07hut/image_1c1rqbg491oco1nv310sp1pe3tjb4a.png)

rotate().png

**(3)translate()**

- translate(x, y)：将坐标原点移动到(x,y)。执行这个变换之后，坐标(0,0)会变成之前由(x,y)表示的点。
- javascript语法

```
context.translate(x,y);
```

- 示例

```js
/**绘制一个简易的时钟**/
var c=document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(150,75,70,0,2*Math.PI);
ctx.stroke();

ctx.moveTo(215,75);
ctx.arc(150,75,65,0,2*Math.PI);
//变换原点
ctx.translate(150,75);

ctx.textBaseline = "middle";
ctx.fillText('3',50,0);
ctx.textAlign="center";  
ctx.fillText('6',0,55);
ctx.fillText('9',-50,0);
ctx.fillText('12',0,-55);

ctx.moveTo(0,0);
ctx.lineTo(35,0);
ctx.moveTo(0,0);
ctx.lineTo(0,-50);

ctx.stroke();
```

![translate().png](http://static.zybuluo.com/meggie/bmyihgv6zmsjcnm3qdu775wn/image_1c1rrvame40f1glnrh1qhp16pd4n.png)

translate().png

**(4)transform()**

- 画布上的每个对象都拥有一个当前的变换矩阵。
- transform() 方法替换当前的变换矩阵。它以下面描述的矩阵来操作当前的变换矩阵

```js
a  c  e
b  d  f
0  0  1
```

- transform() 允许您缩放、旋转、移动并倾斜当前的环境。
- javascript语法

```js
context.transform(a,b,c,d,e,f);
```

- 参数值
  参数| 描述
  -|-
  a| 水平缩放绘图
  b| 水平倾斜绘图
  c| 垂直倾斜绘图
  d| 垂直缩放绘图
  e| 水平移动绘图
  f| 垂直移动绘图

- 示例

  ![矩阵公式](http://static.zybuluo.com/meggie/0139eu4fz9nlndn8zxd05sy7/image_1c1rtfop9pnb167quha9121t1o54.png)

  矩阵公式

- 由此可见，transform(x, 0, 0, y, 0, 0)，等同于scale(x,y)； transform(1, 0, 0, 1, x, y)，等同于translate(x,y)；

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.strokeStyle="green";
ctx.strokeRect(0,0,100,30)

//等同于translate(x,y)
ctx.transform(1,0,0,1,30,30);
ctx.strokeStyle="red";
ctx.strokeRect(0,0,100,30);

//等同于scale(2,2)
ctx.transform(2,0,0,2,0,0);
ctx.strokeStyle="blue";
ctx.strokeRect(0,0,100,30);

//水平和竖直方向倾斜
ctx.transform(1,0.5,0.5,1,0,0);
ctx.strokeStyle="black";
ctx.strokeRect(0,0,100,30);
```

![transform().png](http://static.zybuluo.com/meggie/yfgftsp4x73zmclmqq8qt9kv/image_1c1s00aur1u0osbjtdbs5f1avu5h.png)

transform().png

**(5)setTransform()**

- setTransform() 方法把当前的变换矩阵重置为单位矩阵，然后以相同的参数运行 transform()。
- javascript语法

```
context.setTransform(a,b,c,d,e,f);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.strokeStyle="green";
ctx.strokeRect(0,0,100,30)

//等同于translate(x,y)
ctx.setTransform(1,0,0,1,30,30);
ctx.strokeStyle="red";
ctx.strokeRect(0,0,100,30);

//等同于scale(2,2)
ctx.setTransform(2,0,0,2,0,0);
ctx.strokeStyle="blue";
ctx.strokeRect(0,0,100,30);

//水平和竖直方向倾斜
ctx.setTransform(1,0.5,0.5,1,0,0);
ctx.strokeStyle="black";
ctx.strokeRect(0,0,100,30);
```

![setTransform().png](http://static.zybuluo.com/meggie/7l5kftdh6g8j8478zvef69sc/image_1c1s09l2p7g9tq41nrq1id86gp5u.png)

setTransform().png

> **2.6 绘制图像**

- drawImage() 方法在画布上绘制图像、画布或视频。
- drawImage() 方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。
- JavaScript 语法

```js
/***语法一，在画布上定位图像*/
context.drawImage(img,x,y);

/**语法二，在画布上定位图像，并规定图像的宽度和高度**/
context.drawImage(img,x,y,width,height);

/**语法三，剪切图像，并在画布上定位被剪切的部分**/
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
```

- 参数值

| 参数    | 描述                                         |
| ------- | -------------------------------------------- |
| img     | 规定要使用的图像、画布或视频。               |
| sx      | 可选。开始剪切的 x 坐标位置。                |
| sy      | 可选。开始剪切的 y 坐标位置。                |
| swidth  | 可选。被剪切图像的宽度。                     |
| sheight | 可选。被剪切图像的高度。                     |
| x       | 在画布上放置图像的 x 坐标位置。              |
| y       | 在画布上放置图像的 y 坐标位置。              |
| width   | 可选。要使用的图像的宽度。（伸展或缩小图像） |

height 可选。要使用的图像的高度。（伸展或缩小图像）

- 示例

```js
<img src="http://www.w3school.com.cn/i/eg_tulip.jpg" alt="tulip" id="tulip" style="margin-left:0px;" />
document.getElementById("tulip").onload=function(){
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  var img=document.getElementById("tulip");
  ctx.drawImage(img,90,130,90,80,20,20,90,80);
};
```

![drawImage.png](http://static.zybuluo.com/meggie/b10nlo9emgoutlm7m0ucq32m/image_1c1s4j9ja1vsa1s9nf2t182i19i46v.png)

drawImage.png

> **2.7 阴影**

- 2D 上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。

| 属性          | 描述                                       |
| ------------- | ------------------------------------------ |
| shadowColor   | 用CSS 颜色格式表示的阴影颜色，默认为黑色。 |
| shadowBlur    | 模糊的像素数，默认0，即不模糊。            |
| shadowOffsetX | 形状或路径x 轴方向的阴影偏移量，默认为0。  |
| shadowOffsetY | 形状或路径y 轴方向的阴影偏移量，默认为0。  |

- 示例

```js
var c=document.getElementById("myCanvas");
var context=c.getContext("2d");
//设置阴影
context.shadowOffsetX = 15;
context.shadowOffsetY = 15;
context.shadowBlur = 5;
context.shadowColor = "rgba(0, 0, 0, 0.5)";
//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
```

![阴影](http://static.zybuluo.com/meggie/v41y1tnkrg1di7jefbq5bnuz/image_1c1s6s8hk1mjlmbmdpsf35184o7c.png)

阴影

> **2.8 渐变**

- 渐变由CanvasGradient 实例表示，很容易通过2D 上下文来创建和修改。
  方法| 描述
  -|-
  createLinearGradient()| 创建线性渐变（用在画布内容上）
  createRadialGradient()| 创建放射状/环形的渐变（用在画布内容上）
  addColorStop() |规定渐变对象中的颜色和停止位置

**(1)createLinearGradient()**

- createLinearGradient() 方法创建线性的渐变对象。
- 渐变可用于填充矩形、圆形、线条、文本等等
- JavaScript 语法

```
context.createLinearGradient(x0,y0,x1,y1);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

var grd=ctx.createLinearGradient(0,0,170,0);
grd.addColorStop(0,"white");
grd.addColorStop(1,"red");

ctx.fillStyle=grd;
ctx.fillRect(20,20,150,100);
```

![线性渐变](http://static.zybuluo.com/meggie/w67cizmevlqloucrhvet9tul/image_1c1s7d4i161bl9tl6s1dfq1qph7p.png)

线性渐变

**(2)createRadialGradient()**

- createLinearGradient() 方法创建放射状/圆形渐变对象。
- 渐变可用于填充矩形、圆形、线条、文本等等。
- JavaScript 语法

```
context.createRadialGradient(x0,y0,r0,x1,y1,r1);
```

- 示例

```js
var c=document.getElementById("myCanvas");
var context=c.getContext("2d");
var gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "red");

//绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 150, 100);
```

![圆形渐变](http://static.zybuluo.com/meggie/19kad3atmjczybodl46kfniw/image_1c1s87gl01febklu1deq76t1nu86.png)

圆形渐变

> **2.9 模式**

- createPattern() 方法在指定的方向内重复指定的元素。
- 元素可以是图片、视频，或者其他 <canvas> 元素。
- 被重复的元素可用于绘制/填充矩形、圆形或线条等等。
- JavaScript 语法

```
context.createPattern(image,"repeat|repeat-x|repeat-y|no-repeat");
```

- 示例

```js
<img src="http://www.w3school.com.cn/i/lamp.gif" id="lamp" />
var c=document.getElementById("myCanvas");
var context=c.getContext("2d");
var image = document.getElementById("lamp"),
pattern = context.createPattern(image, "repeat");
//绘制矩形
context.fillStyle = pattern;
context.fillRect(0, 0, 160, 130);
```

![createPattern()](http://static.zybuluo.com/meggie/9b4qa14m31zhguct38m0kd67/image_1c1s8pv4bdguvfmskn1ac8rj48j.png)

createPattern()

**2.10 像素操作与使用图像数据**

- 2D 上下文 支持像素操作和使用图像数据

| 方法              | 描述                                                      |
| ----------------- | --------------------------------------------------------- |
| createImageData() | 创建新的、空白的 ImageData 对象                           |
| getImageData()    | 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据 |
| putImageData()    | 把图像数据（从指定的 ImageData 对象）放回画布上           |

- 每个ImageData 对象都有三个属性：width、height 和data

| 属性   | 描述                                                |
| ------ | --------------------------------------------------- |
| width  | 返回 ImageData 对象的宽度                           |
| height | 返回 ImageData 对象的高度                           |
| data   | 返回一个对象，其包含指定的 ImageData 对象的图像数据 |

- data 属性是一个数组，保存着图像中每一个像素的数据。对于ImageData对象中的每个像素，都存在着四方面的信息，即 RGBA 值：

| 元素 | 值                                               |
| ---- | ------------------------------------------------ |
| R    | 红色 (0-255)                                     |
| G    | 绿色 (0-255)                                     |
| B    | 蓝色 (0-255)                                     |
| A    | alpha 通道 (0-255; 0 是透明的，255 是完全可见的) |

**(1)createImageData()**

- createImageData() 方法创建新的空白 ImageData 对象。新对象的默认像素值 transparent black。
- javascript 语法

```
/**语法一，以指定的尺寸（以像素计）创建新的 ImageData 对象**/
var imgData=context.createImageData(width,height);

/**语法二，创建与指定的另一个 ImageData 对象尺寸相同的新 ImageData 对象（不会复制图像数据）**/
var imgData=context.createImageData(imageData);
```

- 示例

```js
/**创建 100*100 像素的 ImageData 对象，其中每个像素都是绿色的，然后把它放到画布上**/
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var imgData=ctx.createImageData(100,100);
for (var i=0;i<imgData.data.length;i+=4)
  {
  imgData.data[i+0]=0;
  imgData.data[i+1]=255;
  imgData.data[i+2]=0;
  imgData.data[i+3]=255;
  }
ctx.putImageData(imgData,10,10);
```

![createImageData().png](http://static.zybuluo.com/meggie/amhj17ciko6rxv8af5u2u7zk/image_1c1tslnkf6fhq6t1ik636r17uh9.png)

createImageData().png

**(2)getImageData()、putImageData()**

- getImageData() 方法返回ImageData对象，该对象拷贝了画布指定矩形的像素数据。
- putImageData() 方法将图像数据（从指定的 ImageData 对象）放回画布上。
- javascript 语法

```
var imgData=context.getImageData(x,y,width,height);
context.putImageData(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
```

- 示例

```js
<img src="http://www.w3school.com.cn/i/eg_tulip.jpg" alt="tulip" id="tulip" style="margin-left:0px;" />
/**使用 getImageData() 来反转画布上的图像的每个像素的颜色**/
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("tulip");
ctx.drawImage(img,0,0);
var imgData = ctx.getImageData(0,0,c.width,c.height);
for(var i= 0; i<imgData.data.length; i+=4){
    imgData.data[i] = 255-imgData.data[i];
    imgData.data[i+1] = 255- imgData.data[i+1];
    imgData.data[i+2] = 255-imgData.data[i+2];
    imgData.data[i+3] = 255;
}
ctx.putImageData(imgData,0,0);
```

![反色](http://static.zybuluo.com/meggie/3vbazonh2bx0qn9laip8c964/image_1c1tudmeo1onb88tpn315ojvn69.png)

反色

> **2.11合成**

- 有两个会应用到2D 上下文中所有绘制操作的属性：globalAlpha和globalComposition-Operation

| 属性                     | 描述                                   |
| ------------------------ | -------------------------------------- |
| globalAlpha              | 设置或返回绘图的当前 alpha 或透明值    |
| globalCompositeOperation | 设置或返回新图像如何绘制到已有的图像上 |

**(1)globalAlpha()**

- globalAlpha 属性设置或返回绘图的当前透明值（alpha 或 transparency）。
- globalAlpha 是一个介于0 和1 之间的值（包括0 和1），用于指定所有绘制的透
  明度。默认值为0。
- javascript 语法

```
context.globalAlpha=number;
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="red";
ctx.fillRect(20,20,75,50);
// 调节透明度
ctx.globalAlpha=0.2;
ctx.fillStyle="blue";
ctx.fillRect(50,50,75,50);
ctx.fillStyle="green";
ctx.fillRect(80,80,75,50);
```

![globalAlpha().png](http://static.zybuluo.com/meggie/hqr2gjkqz2m06315az7v066u/image_1c1u1ajc3175qhq51rph11on15tgm.png)

globalAlpha().png

**(2)globalCompositeOperation()**

- globalCompositeOperation属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
- 源图像 = 您打算放置到画布上的绘图。
- 目标图像 = 您已经放置在画布上的绘图。
- javascript 语法

```
context.globalCompositeOperation="source-in";
```

- 属性值

| 值               | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| source-over      | 默认。在目标图像上显示源图像。                               |
| source-atop      | 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。 |
| source-in        | 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 |
| source-out       | 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 |
| destination-over | 在源图像上方显示目标图像。                                   |
| destination-atop | 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。 |
| destination-in   | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 |
| destination-out  | 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 |
| lighter          | 显示源图像 + 目标图像。                                      |
| copy             | 显示源图像。忽略目标图像。                                   |
| xor              | 使用异或操作对源图像与目标图像进行组合。                     |

- 示例

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            canvas{
                border:1px solid #d3d3d3;
                margin-right:10px;
                margin-bottom:20px; 
            }
        </style>
    </head>
    <body>
    <script>
        var gco=new Array();
        gco.push("source-atop");
        gco.push("source-in");
        gco.push("source-out");
        gco.push("source-over");
        gco.push("destination-atop");
        gco.push("destination-in");
        gco.push("destination-out");
        gco.push("destination-over");
        gco.push("lighter");
        gco.push("copy");
        gco.push("xor");
        for (n=0;n<gco.length;n++)
            {
                document.write("<div id='p_" + n + "' style='float:left;'>" + gco[n] + ":<br>");
                var c=document.createElement("canvas");
                c.width=120;
                c.height=100;
                document.getElementById("p_" + n).appendChild(c);
                var ctx=c.getContext("2d");    
                ctx.fillStyle="blue";
                ctx.fillRect(10,10,50,50);
                ctx.globalCompositeOperation=gco[n];
                ctx.beginPath();
                ctx.fillStyle="red";
                ctx.arc(50,50,30,0,2*Math.PI);
                ctx.fill();
                document.write("</div>");   
            }
    </script>
</body>
</html>
```

![globalCompositeOperation.png](http://static.zybuluo.com/meggie/ejbqfzpzfa44yr74fr2bcnlo/image_1c1u28k0c1j93705184m31916uc13.png)

globalCompositeOperation.png

> **2.12 线条样式**

- 2D 上下文中绘制操作中还具有相应的线条样式属性。
  属性| 描述
  -|-
  lineCap| 设置或返回线条的结束端点样式
  lineJoin| 设置或返回两条线相交时，所创建的拐角类型
  lineWidth| 设置或返回当前的线条宽度
  miterLimit| 设置或返回最大斜接长度

**(1)lineWidth**

- lineWidth 属性设置或返回当前线条的宽度，以像素计。
- javascript语法

```
context.lineWidth=number;
```

- 示例

```
//用宽度为 10 像素的线条来绘制矩形
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.lineWidth=10;
ctx.strokeRect(20,20,80,100);
```

![lineWidth](http://static.zybuluo.com/meggie/eqmws2cm4k7q3f2psd4jg6gy/image_1c1u4302q1h9j1n3abhq1tcf1s4m2q.png)

lineWidth

**(2)lineCap**

- lineCap 属性设置或返回线条末端线帽的样式。
- javascript 语法

```
    context.lineCap="butt|round|square";
```

- 属性值

| 值     | 描述                                   |
| ------ | -------------------------------------- |
| butt   | 默认。向线条的每个末端添加平直的边缘。 |
| round  | 向线条的每个末端添加圆形线帽。         |
| square | 向线条的每个末端添加正方形线帽。       |

- 示例

```js
//三种不同的线帽
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.beginPath();
ctx.lineWidth=10;
ctx.lineCap="butt";
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.stroke();

ctx.beginPath();
ctx.lineCap="round";
ctx.moveTo(20,40);
ctx.lineTo(200,40);
ctx.stroke();

ctx.beginPath();
ctx.lineCap="square";
ctx.moveTo(20,60);
ctx.lineTo(200,60);
ctx.stroke();
```

![linCap](http://static.zybuluo.com/meggie/dbpplj45w3an25rmx2v8pnua/image_1c1u2uo9qi6t7s3s2l1kcu1apo20.png)

linCap

**(2)lineJoin**

- lineJoin 属性设置或返回所创建边角的类型，当两条线交汇时。
- javascript语法

```
context.lineJoin="bevel|round|miter";
```

- 属性值

| 值    | 描述           |
| ----- | -------------- |
| bevel | 创建斜角。     |
| round | 创建圆角。     |
| miter | 默认。创建尖角 |

- 示例

```js
/**当两条线条交汇时，分别创建斜角、圆形、尖角边角**/
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.lineWidth=20;
ctx.lineJoin="bevel";
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth=20;
ctx.lineJoin="round";
ctx.moveTo(100,20);
ctx.lineTo(180,50);
ctx.lineTo(100,100);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth=20;
ctx.lineJoin="miter";
ctx.moveTo(180,20);
ctx.lineTo(260,50);
ctx.lineTo(180,100);
ctx.stroke();
```

![lineJoin](http://static.zybuluo.com/meggie/r77rzgntpaxun1kszxq29jiv/image_1c1u3shh11orq16gasaet2i1j6m2d.png)

lineJoin

**(4)miterLimit**

- miterLimit 属性设置或返回最大斜接长度。

- 斜接长度指的是在两条线交汇处内角和外角之间的距离。

  ![斜度](http://static.zybuluo.com/meggie/5pzn2rbgl2y22owo7mpz6xpc/image_1c1ugf8645r51nph16fb18j0tg637.png)

  斜度

- 只有当 lineJoin 属性为 "miter" 时，miterLimit 才有效。

- 边角的角度越小，斜接长度就会越大。

- 为了避免斜接长度过长，我们可以使用 miterLimit 属性。

- 如果斜接长度超过 miterLimit 的值，边角会以 lineJoin 的 "bevel" 类型来显示

![斜角](http://static.zybuluo.com/meggie/l99d1b2ldkztiw59lrdxzh94/image_1c1ughf6e1530vbd8gm1ivl1s8j3k.png)

斜角

- javascript语法

```
context.miterLimit=number;
```

- 示例

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.lineWidth=10;
ctx.lineJoin="miter";
ctx.beginPath();
ctx.miterLimit=5;
ctx.moveTo(20,20);
ctx.lineTo(50,27);
ctx.lineTo(20,34);
ctx.stroke();
ctx.beginPath();
ctx.miterLimit=3;
ctx.moveTo(80,20);
ctx.lineTo(110,27);
ctx.lineTo(80,34);
ctx.stroke();
```

![miterLimit](http://static.zybuluo.com/meggie/6zfi7g6o2lcmodonakxr42cj/image_1c1uigdev1l06hqpe4j156b106941.png)

miterLimit

> **2.13 其它**

- 有两个方法可以跟踪上下文的状态变化。
- 如果你知道将来还要返回某组属性与变换的组合，可以调用save()方法。调用这个方法后，当时的所有设置都会进入一个栈结构，得以妥善保管。
- 然后可以对上下文进行其他修改。等想要回到之前保存的设置时，可以调用restore()方法，在保存设置的栈结构中向前返回一级，恢复之前的状态。
- 连续调用save()可以把更多设置保存到栈结构中，之后再连续调用restore()则可以一级一级返回。

```js
var c=document.getElementById("myCanvas");
var context=c.getContext("2d");
context.strokeStyle = "red";
context.translate(10, 10);
context.save();

context.strokeStyle = "blue";
context.translate(40, 40);
context.save();

context.strokeStyle = "green";
context.strokeRect(0, 0, 20, 20); //绘制绿色矩形
context.restore();

context.strokeRect(40, 40, 20, 20); //绘制蓝色矩形
context.restore();

context.strokeRect(0, 0, 20, 20); //绘制红色矩形
```

![save()&restore()](http://static.zybuluo.com/meggie/thxap9ee47zs0u2cq5kxayk0/image_1c1uk7ahu3upn4t120r7qto516.png)

save()&restore()