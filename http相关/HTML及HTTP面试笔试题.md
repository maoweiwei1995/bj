# HTML及HTTP面试笔试题

### HTML前端面试（包含网络）

#### 1. 对web标准的理解是什么？

首先是html标签上，标签闭合，标签小写，不乱嵌套；使用语义化标签，例如header，article，少用<b></b>这样没有语义的标签，以提高搜索几率；使用外部的css文件及js文件，使结构表现行为分离；减少文件数目，达到减少网络请求次数，文件下载与页面速度更流畅；内容能被更多的用户及设备访问，保证在版本较低的浏览器下能够呈现完整内容，在版本高的浏览器上能够展现更完美的视觉效果；代码低耦合高内聚，易维护。

#### 2. HTTP状态码及其含义？

- 100-119：接收成功，**要求客户端继续提交下一次请求**
- 200-299：接收成功且完整处理了整个过程。
- 300-399：客户需要进一步细化：
  - 302：重定向
  - 304/307：拿缓存
- 400-499：请求出错不能执行
  - 404：请求资源没在web服务器中
  - 403：没有权限，拒绝访问
- 500-599：服务器端错误
- 503：由于临时的服务器维护或者过载，服务器当前无法处理请求。
- 500：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。

#### 3. 一级域名？二级域名是指什么？

- .com ：顶级域名
- baidu.com： 一级域名
- [www.baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Fwww.baidu.com)／[tieba.baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Ftieba.baidu.com)： 二级域名

#### 4. 浏览器解析url过程？

- 浏览器输入地址

  - 输入baidu，浏览器自动添加.com
  - [baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Fbaidu.com)的时候，这是一级域名，给你重定向到[www.baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Fwww.baidu.com)这样的二级域名。

- 浏览器查看是否有缓存

  - 浏览器缓存
  - 系统缓存
  - DNS缓存（路由器缓存）

- **请求终于来到了DNS服务器，DNS服务器将域名解析为ip地址**

  - 向isp分配的dns发起请求查询[www.baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Fwww.baidu.com)这个域名
  - 检查是否有缓存，有都话就返回。
  - 没有的话会从配置文件里读取13个根域名服务器
  - 然后向其中一台发出请求
  - 知道了是.com这个域下的，就返回com域中的NS记录，一般来说是13台主机和IP。
  - 然后再向一台发出请求，com域的服务器发现是baidu.com这个域的，返回给你。
  - 然后再像[baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Fbaidu.com)这个域的服务器发出请求，查到了www的这台主机，就把ip返回
  - ispdns拿到之后，将其返回给客户端，并保存在高速缓存中

- 浏览器有了ip就可以找到服务器，两者之间就可以建立tcp链接，服务器需要和浏览器建立tcp三次握手。

  

  ![img](https://upload-images.jianshu.io/upload_images/4111182-04a1e580647881c2?imageMogr2/auto-orient/strip%7CimageView2/2/w/745/format/webp)

  image

  - 客户端发送SYN=1（表示请求连接），并发送一个seq（随机码）
  - 服务器由于收到SYN=1，知道是请求连接，返回一个ACK=1（表示确认），并同返回一个请求连接SYN=1，然后返回一个ack=seq+1（客户端随机码应答），且自己也返回一个seq（随机码）
  - 客户端收到服务器的ack后验证，向服务器确认包发送ack=seq+1（服务器随机码应答）
  - 服务器确认ack后建立连接，完成三次握手。

**为什么非要三次握手** ？若只有两次握手，假如客户端发送了一个报文因为时延，久久没有送到服务器端，故客户端也没有收到来自服务器端的确认，就把这次报文认定为“已失效的报文”，并且会再次发送一次报文。但是如果认定失效之后，失效报文正好通过阻塞送到了服务器，因为只有两次握手，那么连接就建立了起来，但是这个连接是错误的，因为正确的报文已经重新发出了。如果三次握手的话，那么在服务器接受到失效报文再返回给客户端确认时，由于客户端校验ack不正确，可以不用理会那个由于失效报文建立起的连接。

#### 讲了三次握手，这里也说下四次握手，与解析url无关



![img](https://upload-images.jianshu.io/upload_images/4111182-42ad942d209ae01e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/639/format/webp)

image

> - 客户端发送FIN=1（表示结束），并发送随机码seq=u
> - 服务器端返回一个ACK=1（表示确认），并返回ack=u + 1，且也发生一个随机码seq=v
> - 服务器再发出一个一个FIN=1，和seq=w，且重复发送上次内容
> - 客户端返回一个ACK=1，然后返回随机码等于上次随机码加一seq=u+1，再返回ack=w+1
> - 服务器端收到后结束连接，客户端也结束连接。

**为什么非要四次握手**？
因为当客户端没有东西发送给服务器了，就会发送FIN报文，但是服务器端收到FIN报文后未必就会马上关闭socket，**因为有可能服务器端还有一些信息要发送给客户端，但是还没有发完。服务器发送FIN报文和客户端分开的，于是就有了四次握手。**

**为什么TIME_WAIT状态还需要等2MSL后才能返回到CLOSED状态？**
并不能保证客户端最后返回的ACK能正确送达，若未正确送达，在2MSL内，服务器还会重发FIN报文。

- 握手成功后，首先浏览器得向服务器发送http请求（如果是http协议）和请求数据包
  - 请求方式
  - 请求协议的版本
  - 想到得到什么数据，数据是什么格式的
- 服务器收到了请求后进行处理，将需要的数据返回浏览器
- 浏览器收到http响应头，此时就会读取数据，进行浏览器渲染。
  - 解析DOM树
  - 遇到图片样式表js文件启动下载
- 显示html页面

#### 5 .你所知道的HTTP请求方法？

- GET：请求指定页面的信息，并返回实体主体。
- HEAD：类似于GET请求，只不过返回的响应没有具体内容，**用于获取报头**
- POST：向指定资源提交数据请求处理（例如表单或上传文件）。数据被包含在请求体中。POST请求可能导致新资源的建立/或已有资源的修改。
- PUT：从客户端向服务器传送**的数据取代指定的文档的内容**。
- DELETE：请求服务器**删除指定的页面**。
- CONNECT：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
- OPTIONS：允许客户端查看服务器的性能
- TRACE；回显服务器收到的请求，主要用于测试或诊断

#### 6.iframe的使用场景有哪些？

- 左侧是功能树，右侧是具体功能。为了每一个功能单独分离。
- 加载别的网站的内容。
- ajax上传文件
- 在上传图片时，不使用flash实现无刷新。
- **跨域的时候作为中间人**

#### 7. 什么是置换元素？置换元素有哪些？

- CSS渲染模型并不考虑对此内容的渲染，且元素本身一般拥有固有尺寸。
- 浏览器根据元素的标签和属性，来决定元素的具体显示内容。
- 他们可以设置width/height，如同设置了display:inline-block一般
- 有img,input,textarea,select,object

#### 8. HTTP请求格式

下面是一个HTTP请求的数据：

```
POST /index.php HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:10.0.2) Gecko/20100101 Firefox/10.0.2
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-cn,zh;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Referer: <a target=_blank href="http://localhost/" style="color: rgb(51, 102, 153); text-decoration: none;">http://localhost/</a>
Content-Length：25
Content-Type：application/x-www-form-urlencoded
 
username=aa&password=1234
```

- 请求行

请求的第一行是： **方法 URL 协议/版本**（POST /index.php HTTP/1.1）

- 请求头：每个头域由一个域名，冒号（:），域值三部分组成，域值前可以添加任意个空白字符，头域可以被扩展为多行，每行前至少有一个空格或制表符。

1. Transport 头域
   - **Connection**：表示是否需要持久连接（长连接）。如果服务器看到这里的值是"Keep-Alive"，或者看到请求用的是**HTTP1.1（默认持久连接）**，他就可以利用持久连接的优点。
   - **Host**：用于指定被请求资源的Internet主机号和端口号，通常从HTTP URL中提取出来。（`例如: Host: localhost` 这里缺省端口号80，若指定了端口号8080，则为 Host: localhost:8080）
2. Client 头域
   - **Accept**：**浏览器可以接受的媒体类型**。`例如：Accept: text/html` ，代表能够接受html，如果服务器无法返回指定类型则返回**406**。通配符 * 代表任意类型。Accept: * / * 代表浏览器可以处理所有类型，(一般浏览器发给服务器都是发这个)
   - **Accept-Encoding**：浏览器申明自己接收的编码方式，通常指定是否支持压缩，支持什么压缩方法。`例如： Accept-Encoding: gzip, deflate`。Server能够向支持gzip/deflate的浏览器返回经gzip或者deflate编码的HTML页面。 许多情形下这可以减少5到10倍的下载时间，也节省带宽。
   - **Accept-Language**：申明自己接收的语言。`例如： Accept-Language:zh-cn`。没有设置表示可以接收任何语言。
   - **User-Agent**：告诉服务器，客户端使用的**操作系统和浏览器的名称和版本**。`例如：User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:10.0.2) Gecko/20100101 Firefox/10.0.2`
   - **Accept-Charset**：申明浏览器接收的字符集，如gb2312，utf-8。
3. Cookie/Login 头域
   - **Cookie**：最重要的header，将cookie的值发送给HTTP服务器。
4. Entity头域
   - **Content-Length**：发送给服务器数据的长度。
   - **Content-Type**：发送给服务器数据的类型。`例如：Content-Type：application/x-www-form-urlencoded`
5. Miscellaneous 头域
   - **Referer**：告诉服务器我是从哪个页面链接过来的。比如从我主页上链接到一个朋友那里，他的服务器就能够从HTTP Referer中统计出每天有多少用户点击我主页上的链接访问他的网站。`例如：Referer: <a target=_blank href="http://localhost/" style="color: rgb(51, 102, 153); text-decoration: none;">http://localhost/</a>`
6. Cache 头域
   - **If-Modified-Since**：把浏览器缓存的页面的最后修改时间给服务器发送过去，服务器对比实际文件的最后修改时间。如果时间一致，那么返回304`例如：If-Modified-Since: Thu, 09 Feb 2012 09:07:57 GMT`。
   - **If-None-Match**：和Etag一起工作，工作原理是在HTTP response中添加Etag信息。当用户再次请求该资源时，将HTTP response中加入If-None-Match信息。如果服务器验证资源的ETag没有改变（该资源没有更新），将返回一个304状态告诉客户端使用本地缓存文件。否则将返回200状态和新的资源和Etag. 使用这样的机制将提高网站的性能。`例如: If-None-Match: "03f2b33c0bfcc1:0"`
   - **Pragma**：作用： 防止页面被缓存， 在HTTP/1.1版本中，它和Cache-Control:no-cache作用一模一样
     Pargma只有一个用法， `例如： Pragma: no-cache`
     注意: 在HTTP/1.0版本中，只实现了Pragema:no-cache, 没有实现Cache-Control。
   - **Cache-Control**：**非常重要！！**，用来指定Response-Request遵循的缓存机制。

```
//
        Cache-Control：Public 可以被任何缓存所缓存。
        Cache-Control: Private     内容只缓存到私有缓存中。
        Cache-Control: no-cache  所有内容都不会被缓存。
```

#### 9. HTTP响应格式

在接收和解释请求后，服务器会返回一个HTTP响应消息。与HTTP请求类似，HTTP响应也分为三个部分，状态行，信息报头和响应正文，如：

```
HTTP/1.1 200 OK
Date: Sun, 17 Mar 2013 08:12:54 GMT
Server: Apache/2.2.8 (Win32) PHP/5.2.5
X-Powered-By: PHP/5.2.5
Set-Cookie: PHPSESSID=c0huq7pdkmm5gg6osoe3mgjmm3; path=/
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Content-Length: 4393
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html; charset=utf-8</p><p>
<html>
<head>
<title>HTTP响应示例<title>
</head>
<body>
Hello HTTP!
</body>
</html></p><p> </p>
```

- 状态行

状态行由协议版本，数字形式的状态代码，及状态描述组成，各元素以空格分开，结尾时换行符，格式如下：

HTTP-Version 表示服务器 HTTP 协议的版本，Status-Code 表示服务器发回的响应代码，Reason-Phrase 表示状态代码的文本描述，CRLF 表示回车换行。`例如 HTTP/1.1 200 OK（CRLF）`

```
常见状态代码、状态描述、说明：

200 OK      //客户端请求成功
400 Bad Request  //客户端请求有语法错误，不能被服务器所理解
401 Unauthorized //请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用 
403 Forbidden  //服务器收到请求，但是拒绝提供服务
404 Not Found  //请求资源不存在，eg：输入了错误的URL
500 Internal Server Error //服务器发生不可预期的错误
503 Server Unavailable  //服务器当前不能处理客户端的请求，一段时间后可能恢复正常
```

- 响应正文：服务器返回的资源主题，响应头和正文之间必须用空行分割。如：

```html
<html>  
<head>  
<title>HTTP响应示例<title>  
</head>  
<body>  
Hello HTTP!  
</body>  
</html>  
```

- 常见响应头

1. Cache域
   - **Date**：生成消息的具体时间和日期
     `例如： Date: Sun, 17 Mar 2013 08:12:54 GMT`
   - **Expries**：声明了一个网页或url地址不再被浏览器缓存的时间，一旦超过了这个时间，浏览器都应该联系原始服务器。（要注意的是，HTTP/1.0有一个功能比较弱的缓存控制机制：Pragma，使用HTTP/1.0的缓存将忽略Expires和Cache-Control头。）
     `例如: Expires: Thu, 19 Nov 1981 08:52:00 GMT`
   - **Vary**：用于列出一个响应字段列表，告诉缓存服务器遇到同一个 URL 对应着不同版本文档的情况时，如何缓存和筛选合适的版本。`例如：Accept-Encoding`
2. Cookie/Login头域
   - **P3P**：用于跨域设置Cookie，这样可以解决iframe跨域访问cookie的问题。`例如：P3P: CP=CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR`
   - **Set-Cookie**：非常重要，用于把Cookie发送到客户端，每写入一个cookie都会生成一个Set-Cookie。`例如: Set-Cookie: PHPSESSID=c0huq7pdkmm5gg6osoe3mgjmm3; path=/`
3. Entity头域
   - **ETag**：和If-None-Match 配合使用。`例如：ETag: "03f2b33c0bfcc1:0"`
   - **Last-Modified**：用于指示资源的最后修改日期和时间。`例如：Last-Modified: Wed, 21 Dec 2011 09:09:10 GMT`
   - **Content-Type**：服务器告诉浏览器自己响应的对象的类型和字体符。`Content-Type:text/html;charset=GB2312`
   - **Content-Length**：指明实体正文的长度，以字节存储方式十进制数表示。`例如：Content-Length: 19847`
   - **Content-Encoding**：文档的编码方式，一般指压缩方式。利用gizp压缩文档能够显著地减少HTML的下载时间。`例如：Content-Encoding：gzip`
   - **Content-Language**：服务器告诉浏览器自己响应的对象的语言。`例如：Content-Language:da`
4. Miscellaneous 头域
   - **Server**：指明HTTP服务器软件信息。`例如:Apache/2.2.8 (Win32) PHP/5.2.5`
   - **X-Powered-By**：表示服务器是用什么技术开发的。`例如：X-Powered-By: PHP/5.2.5`
5. Transport 头域
   - **Connection**：和请求报头一样，是否开启长连接。
6. Location 头域
   - **Location**：用于重定向一个新的位置，包含新的URL地址。

#### 10. HTTP长连接和短连接有什么区别？

- 在HTTP1.0中，默认使用的是短连接。也就是说，浏览器和服务器每进行一次HTTP操作，就会建立一次连接，但是任务结束就会中断连接。例如，浏览器解析一个HTML的时候，如果包含其他资源，如js，css，每遇到一个这样的web资源就会建立一个http对话。
- 在HTTP1.1中，默认使用长连接，使用HTTP长连接会在响应头中加入这行代码：

```
Connection:keep-alive
```

在使用长连接的情况下，当一个网页打开后，客户端和服务器之间**用于传输HTTP数据的TCP不会关闭**，如果客户端再次访问这个服务器上的页面，会继续使用这条已经建立的连接。

- HTTP协议上的长连接和短连接，实际上是TCP协议上的长短连接。
- Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同服务器上设置。

#### 11. 如何理解HTTP是无状态的？

无状态是HTTP协议的一个特点，就是指协议对事务没有记忆功能，也就是说**，我和服务器连续会话两次，这两次会话没有任何联系，完全不会记录任何信息。**

#### 12. HTTP和HTTPS有什么区别？

- http和https是两种完全不同的连接方式，端口不一样前者是80，后者是443；
- HTTP和简单是无状态，无连接的。HTTPS是基于HTTP开发的，它使用安全套接字层（SSL）进行信息交换，简单来说它是HTTP的安全版；
- 在网络模型中，HTTP工作于应用层，HTTPS工作于传输层；
- HTTP无需加密，HTTPS会对传输的数据进行加密。

#### 13. HTTP1.0和HTTP1.1的区别？

- HTTP1.1支持长连接
- HTTP1.1增加host字段，如果信息中没有Host域，服务器讲会返回一个400.而HTTP1.0默认每台服务器都绑定一个唯一的IP地址。
- HTTP1.1加入了一个新的状态码100（continue）。允许客户端在发request消息body之前先用request header试探一下server，看server要不要接收request body，再决定要不要发request body。目的是节约带宽。
- HTTP1.1可以将发送的信息分割成若干个任意大小的数据块，每个数据块在发送时都会附上一个长度，以零数据块作为结尾。这样的方法允许对方只缓存一个片段，避免缓冲整个信息带来的过载。
- HTTP1.1在cache上添加了一些新的特性，当缓存对象的Age超过expire时，不需要舍弃对象，而是与源服务器进行重激活。

#### 14. 进程与线程的区别？

- 如何理解线程与进程？
  - 计算机的CPU，就好比一个工厂。
  - 工厂的电力有限，一次只能一个车间开工，开工时，其他车间就必须停工。**意指CPU一次只能运行一个任务**。
  - 进程就好比工厂的每一个车间，**CPU总是运行一个进程，其他进程就属于非运行状态**。
  - 一个车间里有很多人，大家协同完成一个任务，**车间里的每一个人就好比一个线程**。
  - 车间里的空间是工人们共享的，许多房间是每个工人都可以进出的。**象征一个进程的内存空间是共享的，每个线程都可以使用这些空间**。
  - 可是有些房间大小不同，有些房间只能容纳一个人，比如厕所，里面有人的时候，其他人就不能进去。**这代表某些线程在使用某些共享空间时，其他线程必须等他使用结束，才能使用这块空间**。
  - 防止他人进入的方法就是在门口加一把锁，锁开了其他人才能进去。**这就叫互斥锁，防止多个线程同时读写某一块内存**。
  - 有些房间很大可以容纳n人，比如厨房，如果人数大于n，多出来的人就只能在外面等着。**好比某些内存，只能给固定数目的线程使用**。
  - 解决这样的问题，就是在门外挂n把钥匙，没进去一个人，就拿走一把钥匙，出来时再把钥匙挂回原处，有人看见没有钥匙了，就必须在门口等待。**这种做法叫做信号量，保证多个线程不会冲突**。
  - 

> 阮一峰：[进程与线程的一个简单解释](https://link.jianshu.com/?t=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2013%2F04%2Fprocesses_and_threads.html)

- 区别：
  - 调度：进程是系统分配调度的一个基本单位，至少拥有一个线程；线程是一个使用资源的基本单位。
  - 资源：进程各自拥有独立的地址空间，资源，共享复杂，同步简单；线程共享进程资源，共享简单。
  - 占用内存：进程占用内存多，切换复杂cpu利用率低；线程占用内存少，切换简单，CPU利用率高。
  - 进程不会相互影响；线程一个挂掉可能导致整个进程挂掉。

#### 15. TCP与UDP的区别？

- TCP是面向连接的（先拨号再建立连接）；UDP是无连接的。
- TCP提供可靠的传输服务，无差错不丢失；UDP尽最大努力交付，不保证可靠交互。
- 每一条TCP是点到点的；UDP支持一对一，一对多，多对一和多对多的交互信息。
- TCP首部开销小；UDP首部开销大。

#### 16. 如何提高网站的加载速度？

- 使用图片地图，如果一个导航栏是很多图片组成，那每个选项就是一张图片，无疑是增加了http请求书。我们为何不把多张图片合成一张，图片地图允许在一个图片上关联多个url，根据你点的位置决定进入哪个url。
- CSS精灵，比如一个动态效果有多个状态，每次切换一个效果就要更换一张图片，那么可以选择将多张图片合成一张图片减少字节数，通过指定css的backgroud-image和backgroud-position来显示图片。
- 合并脚本，利用打包多个js合并为一个，多个css合并成一个，减少请求次数。
- 当要在body上多次添加div的时候，使用DocumentFragment来代替直接appendChild。

```
var fragment = createDocumentFragment();

for(var i = 0; i < 10; i++ ){
    var spanNode = document.createElement("span");
    spanNode.innerHTML = "number:" + i;
    fragment.appendChild(spanNode);
}

//add this DOM to body
document.body.appendChild(fragment);
```

- 改变类的样式的时候不要一句一句改变，实现一次性改变。

```
// bad
var left = 10;
var top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";

// good 
el.className += " theclassname";

// good
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
```

- 使用动画帧(requestAnimationFrame)来优化setTimeout：

```
        const square = document.getElementsByClassName('move')[0];
        let progress = 0
        let left = square.style.left;
        let index = left.indexOf('p');
        left = Math.floor(left.slice(0, index));

        function move() {
            square.style.left = ++left + 'px';
            progress++
            if (progress < 500) {
                window.requestAnimationFrame(move);
            }
        }
        move();
```

#### 17.网页的生成过程

- HTML代码转化为DOM。
- CSS代码转为CSSOM（CSS Object Model）。
- 结合DOM和CSSOM，生成一颗渲染树（包括每个节点的视觉信息）。
- 生成布局，将所有渲染树节点进行平面合成。
- 将布局绘制在屏幕上。

#### 18.什么是*重排*和*重绘*？

以下三种情况，会导致网页重新渲染

- 修改DOM
- 修改样式表
- 用户事件（页面滚动，输入框键入文字，改变窗口大小等等）

重新渲染，就需要重新生成布局和重新绘制。
前者就叫**重排**，后者就叫做**重绘**。

- 重绘不一定触发重排，比如改变页面某个元素的颜色，并没有导致布局改变。
- 重排一定触发重绘，比如改变了一个网页元素的位置，就会触发重排和重绘。

#### 19. 页面的性能指标详解：

- 白屏时间（first Paint Time）：用户从打开页面开始到页面开始有东西呈现为止。
- 首屏时间：浏览器呈现出所有内容所花费的时间。
- 用户可操作时间（dom interactive）：用户可以进行正常的点击，输入等操作，默认可以统计domready时间，因为通常会在这时候绑定事件操作。
- 总下载时间：页面所有资源都加载完成并呈现出来所花的时间，即页面 onload 的时间

#### 20. web表单登录中用到的图形验证码的实现

- 服务器端生成验证码后，一方面通过图片将验证码返回给客户端，同时在服务器端保存文本的验证码，由服务器端验证输入的内容。

#### 21. 在使用table表现数据时，有时候表现出来的会比自己实际设置的宽度要宽，为此需要设置下面哪些属性值？



![img](https://upload-images.jianshu.io/upload_images/4111182-a511c044d1c199a3?imageMogr2/auto-orient/strip%7CimageView2/2/w/156/format/webp)

image



![img](https://upload-images.jianshu.io/upload_images/4111182-d3d00d9dbe913a67?imageMogr2/auto-orient/strip%7CimageView2/2/w/154/format/webp)

image

- 注意: 在HTML 4中 cellpadding 属性已废弃，HTML5 已不支持该属性，可以使用 CSS 代替。

#### 22. 各种浏览器的内核是什么？

- **Trident**(-**ms**-)：IE、傲游、世界之窗、腾讯TT、360、搜狗
- **Gecko**(-**moz**-)：FireFox
- **Webkit**(-**webkit**-)：Chrome、Safari
- **Kestrel**(-**o**-)：9.5版本以上Opera
- **Presto**(-**o**-)：9.5以前Opera

#### 23.下列代码是否合法？

```
<figure>
    ![](myimage.jpg)
    <figcaption>
        <p>This is my self portrait.</p>
    </figcaption>
</figure>
```

合法，figure标签规定独立的流内容（图片，图表，照片，代码等等）。figure元素应该与主内容有关，但如果被删除，不对文档流产生影响，<figcaption> 元素为 figure 添加标题（caption）。

#### 24. scope属性有什么用？

```
<article>
    <h1>Hello World</h1>
    <style scoped>
        p {
            color: #FF0;
        }
    </style>
    <p>This is my text</p>
</article>

<article>
    <h1>This is awesome</h1>
    <p>I am some other text</p>
</article>
```

scoped属性是一个布尔值，如果使用该属性，则样式仅仅用在父元素及其子元素。

#### 25. 用于预格式化的标签是？

- <pre></pre> 预格式化指的是保留文字在源码种到格式。

#### 26. HTML5 新的表单元素：

- datalist 表示选项清单：

```
<datalist id="url_list">
<option label="W3School" value="http://www.W3School.com.cn" />
<option label="Google" value="http://www.google.com" />
<option label="Microsoft" value="http://www.microsoft.com" />
</datalist>
```

option表示选项。如果需要把datalist绑定到输入域，则用datalist的id。**option永远都要设置value属性。**

```
Webpage: <input type="url" list="url_list" name="link" />
```

- keygen元素的作用是提供一种验证用户的可靠方法。

```
<form action="demo_form.asp" method="get">
Username: <input type="text" name="usr_name" />
Encryption: <keygen name="security" />
<input type="submit" />
</form>
```

- output用于不同类型的输出

```
<output id="result" onforminput="resCalc()"></output>
```

#### 27. HTML5有哪些新的输入类型？

- email
- url
- number
  - min 最小值
  - max 最大值
  - step 间隔
- range
  - min 最小值
  - max 最大值
  - step 间隔
- search
- data-pickers

```
Date: <input type="date" name="user_date" />
type = month, week, time, datetime, datetime-local
```

- color

#### 28. localStorage和sessionStorage的API

- 保存数据：localStorage.setItem(key, value);
- 读取数据：localStorage.getItem(key);
- 删除数据：localStorage.removeItem(key);
- 删除所有数据：localStorage.clear();
- 得到某个索引的key：localStorage.key(index);

#### 29. 表格？

- 格式

```
<table>
<tr><th></th></tr>
<tr><td></td></tr>
<tr><td></td></tr>
</table>
```

- 跨行(th,td)
  - colspan ：跨列
  - rowspan ：跨行
- table
  - align对齐方式（不建议使用）
  - bgcolor背景颜色（不建议使用）
  - border表格边框宽度
  - cellpadding单元沿边和内容的宽度
  - cellspacing单元格之间的空白
  - summary摘要
  - width宽度(px,%)
  - frame外边框哪些部分可见
  - rules那边边框哪个部分可见
- td
  - valign垂直排列方式
  - align水平对其方式
  - scope定义将表头数据与单元数据相关联的方法。
  - char根据哪个字符来对其
- 默认没有任何属性时，没有内外边框

#### 30. 如何规定页面加载使某个元素自动获取焦点：

```
<input autofocus>
```

#### 31. HTML5获得地理位置：

- navigator.geolocation用于获取基于浏览器的当前用户地理位置，提供了三个方法：

```
// 获取用户当前位置
void getCurrentPosition(onSuccess,onError,options);
// 持续获取用户当前位置
int watchCurrentPosition(onSuccess,onError,options);
// 取消监控
void clearWatch(id) // id 为watchCurrentPosition返回的ID
```

- options

```
options = {
     enableHighAccuracy,　　　//boolean 是否要求高精度的地理信息
     timeout,　　　　　　　　　//表示等待响应的最大时间，默认是0毫秒，表示无穷时间
     maximumAge　　　　　　　　//应用程序的缓存时间
}
```

#### 32. 表单的enctype属性：

- `application/x-www-form-urlencoded`在发送前编码所有字符（默认）（空格被编码为’+’，特殊字符被编码为ASCII十六进制字符）
- `multipart/form-data` 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
- `text/plain` 空格转换为 “+” 加号，但不对特殊字符编码。

#### 33.不同的字符编码：

- utf-8：针对Unicode点可变长字符编码，又称万国码。UTF-8用1到6个字节编码UNICODE字符。用在网页上可以同一页面显示中文简体繁体及其它语言（如英文，日文，韩文）。
- GBK：汉字编码，表示简体繁体。
- ISO8859-2：收集了东欧字符。

#### 34. 位图和矢量图的区别？

- 位图：由屏幕上的像素点组成，每个点用二进制数据来描述其颜色与亮度等信息，这些点是离散的类似于点阵，多个像素的色彩就形成了位图。**无限放大会失真**（.bmp、.gif、.jpg、.png）
- 矢量图：矢量图像，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。**无限放大不会失真**

#### 35. HTML常常应用的几种图片格式及其区别？

- jpg：适用于摄影图片，以及色彩丰富的图片。缺点：压缩易失真。优点：相对于png来说同样色彩丰富的图片，jpg的大小更小。
- gif：支持有损压缩。不支持全透明，支持半透明，支持动画。
- png：无损压缩方式；支持透明、半透明、不透明；不支持动画；Png图片如果色彩较多或复杂，则图片生成后的格式是很大的，相比较jpg的放有5~6倍之多，所以没特别要求不能以png替代jpg的使用。png8支持半透明。
- 总结：小图片或网页基本元素(如按钮),考虑PNG-8或GIF.照片则考虑JPG

#### 36. HTML全局属性：

- `accesskey`：设置元素获得焦点快捷键（注释：请使用Alt + accessKey (或者 Shift + Alt + accessKey) 来访问带有指定快捷键的元素。）
- `class`：类名
- `contenteditable`：元素内容是否可编辑
- `contextmenu`：对元素点击右键弹出菜单框

```
<p contextmenu="supermenu">本段落拥有一个名为 "supermenu" 的上下文菜单。这个菜单会在用户右键单击该段落时出现。</p>  

<menu id="supermenu">
  <command label="Step 1: Write Tutorial" onclick="doSomething()">
  <command label="Step 2: Edit Tutorial" onclick="doSomethingElse()">
</menu>
```

- `data-*`：自定义属性，通过el.dataset访问数据

```
<div id="user" data-id="1234567890" data-name="愚人码头" data-date-of-birth>码头</div>
var el = document.querySelector('#user');
console.log(el.id); // 'user'
console.log(el.dataset);//一个DOMStringMap
console.log(el.dataset.id); // '1234567890'
console.log(el.dataset.name); // '愚人码头'
```

- `dir`：元素中内容的文本方向
- `draggable`：元素是否可以拖拽
- `dropzone`：规定在元素上拖动数据时，是否拷贝、移动或链接被拖动数据。
- `hidden`：元素是否被隐藏
- `lang`：规定元素内容的语言
- `spellcheck`：是否进行拼写检查
- `style`：样式
- `tabindex`：tab键次序。设置后元素可以获得焦点，但是又喜欢不影响tab次序表，则可以设置值为-1。

```
<div tabindex=-1></div>
```

- `title`：描述
- `translate`：yes|no，是否应该翻译本段。

#### 35. 如何定义可以在网页上通过链接直接打开邮件客户端发送邮件？（mailto:）

```
<a href="mailto:xiao@163.com"></a>
```

#### 36. src和href的区别？

- src：通常应用在img，script，iframe上。加载并替换当前元素。当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直到加载编译执行完成。
- href：指向网络资源所在位置，当为link时，会下载并且不会停止对当前文档的处理

#### 37. link和@import的区别？

- link除了加载css还可以做其他事情；而@import只能加载css。
- link加载css时可以随页面同时加载；@import需要页面完全载入完之后加载。
- link无兼容问题，@import是css2.1的东西有兼容问题。
- link可以支持dom操作。

#### 38. 短语元素有哪些？

- `<em>`：表示强调
- `<strong>`：表示语气更强
- `<dfn>`：定义一个定义项目
- `<code>`：定义计算机代码文本
- `<samp>`：定义样本文本
- `<kbd>`：键盘文本，表示文本是从键盘上键入的
- `<var>`：定义变量与code和pre配合使用
- `<cite>`：定义应用，参考文献之类

#### 39. http和webSocket的区别？

- 相同点：
  - 都是基于tcp协议基础之上。
  - 都需要经过request和response阶段，webSocket发起请求的时候相当于借鉴了http的头部格式，区别在于webSocket请求头部新加了很多字段（upgrade:websocket最关键）
  - 请求失败成功返回的状态码都一样
- 不同点：
  - webSocket是一个持久化协议（实现真正的长链接），相对于HTTP是一个非持久化协议。
  - HTTP中永远是这样，也就是说一个request只能有一个response。而且这个response也是被动的，不能主动发起。
  - websocket解决的问题：实质的推送方式是服务器主动推送，只要有数据就推送到请求方。（变被动为主动）

#### 40.meta的作用及用法

- 作用：

  - 搜索引擎优化
  - 定义页面使用的语言
  - 自动刷新并指向新的页面
  - 页面转换时的动态效果
  - 控制页面缓存
  - 页面描述
  - 网页显示的窗口信息

- 用法：

  - 语法：`<meta name="参数"content="具体的参数值">。`，主要参数：

  - keywords（关键字）：用来告诉搜索引擎你的网页关键字是什么。`<meta name="keywords"content="meta总结,html meta,meta属性,meta跳转">`

  - description（网站内容描述）：用来告诉搜索引擎引擎你的网站的主要内容。`<meta name="description"content="haorooms博客,html的meta总结，meta是html语言head区的一个辅助性标签。">`

  - robots（机器人向导）：用来告诉哪些页面需要索引。

    ```
    <meta name="robots"content="none">
    ```

    - 参数为all：文件将被检索，且页面上的链接可以被查询；
    - 参数为none：文件不会被检索，页面上的链接不可以被查询；
    - 参数为index：文件将被检索；
    - 参数为follow：页面上的链接可以被查询。
    - 参数为noindex：文件将不被检索，但页面上的链接可以被查询；
    - 参数为nofollow：文件将被检索，但页面上的链接不可以被查询；

  - author（作者）：标注网页的作者`<meta name="author"content="root,root@xxxx.com">`

  - generator：表示网站采用的什么软件制作

  - COPYRIGHT：说明网站版权信息

  - revisit-after：代表网站重访`<META name="revisit-after"CONTENT="7days">`代表7天。

- http-equiv属性：相当于http文件头的作用，可以向浏览器传回一些有用的信息

  - Expires：设置网页到期时间，一旦网页到期，必须到服务器上重新传输。`<meta http-equiv="expires"content="Fri,12Jan200118:18:18GMT">` 注意时间使用的是GMT格式。

  - Pragma：禁止浏览器从本地计算机的缓存中访问页面内容。`<meta http-equiv="Pragma"content="no-cache">`。

  - Refresh：自动刷新并指向新页面。`<meta http-equiv="Refresh"content="2;URL=http://www.haorooms.com"> //(注意后面的引号，分别在秒数的前面和网址的后面)`。

  - Set-Cookie：如果页面过期，那么存盘的cookie将被删除。`<meta http-equiv="Set-Cookie"content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">`

  - Window-target(显示窗口的设定)：用来防止别人在框架里调用自己页面。`<meta http-equiv="Window-target"content="_top">`强制页面在当前窗口以独立页面显示。

  - content-Type(显示字符集的设定)：设定页面使用的字符集。

    ```
    <meta http-equiv="content-Type"content="text/html;charset=gb2312">
    ```

    - GB2312：简体中文
    - BIG5：繁体中文
    - iso-2022-jp：日文
    - ks_c_5601：韩文
    - ISO-8859-1：英文
    - UTF-8：世界码

  - content-Language（显示语言的设定）`<meta http-equiv="Content-Language"content="zh-cn"/>`

  - Cache-Control指定请求和响应遵循的缓存机制。

  - imagetoolbar：指定是否显示图片工具栏，当为false代表不显示，当为true代表显示。`<meta http-equiv="imagetoolbar"content="false"/>`

  - Content-Script-Type：制定脚本类型`<Meta http-equiv="Content-Script-Type"Content="text/javascript">`

- 关于移动端的meta属性：

  - viewport属性：

    ```
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    ```

    - width：viewport的宽度
    - height：viewport的高度
    - initial-scale：初始的缩放比例
    - minimum-scale：允许用户缩放到的最小比例
    - maximum-scale：允许用户缩放到的最大比例
    - user-scalable：用户是否可以手动缩放

  - `<meta name="apple-mobile-app-capable" content="yes">`：是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单。

  - `<meta name="apple-mobile-app-status-bar-style" content="black">`：改变顶部状态条的颜色。

  - `<meta name="format-detection" content="telphone=no, email=no"/>`：忽略页面中的数字识别为电话，忽略email识别。

#### 41. 状态码302和301的区别？

- 301代表永久重定向：它告诉查找引擎，这个地址弃用了，永远转向一个新地址，可以转移新域名的权重。
- 302代表临时重定向：临时重定向到一个地址。
- 为什么要使用301不使用302？因为302存在网址URL劫持。

> 假如a的地址很短，更加用户友好，但是他做了一个302重定向到b，b的网址是一个乱七八糟的很长的url网址，然后由于浏览器并不能总是抓取目标地址，很自然的，a 网址更加用户友好，而b 网址既难看，又不用户友好。这时Google 很有可能会仍然显示网址，但是内容却仍然是b上的内容，这种情况就叫做网址劫持。而301永久重定向就不会出现这样的情况。

#### 42.

- CDN是什么？即内容分发网络，其基本思路是尽可能避开互联网有可能影响数据传输和稳定性的瓶颈和环境，是内容传输更稳定更快。
- 正向代理，反向代理是什么？
  - 正向代理：a想找c借钱，但是a并不能直接找c借钱，那么a找b借钱，b找c借钱，那么a就得到了c的钱，但是c并不知道把钱借给了谁。比如科学上网，a访问google访问不了，但搭建在国外的b可以访问google，那么让他去请求google再把内容返回给a就好了。
  - 反向代理：a访问baidu，但是baidu背后有成千上万台服务器，a并不知道具体是哪台给的服务，但你只需要知道代理服务器是[www.baidu.com](https://link.jianshu.com/?t=http%3A%2F%2Fwww.baidu.com)就好了，反向代理服务器会帮我们把请求发给真实的服务器。主要用来做负载均衡。

> [反向代理为何叫反向代理](https://link.jianshu.com/?t=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F24723688)

> [CND是什么？使用CDN有什么优势？](https://link.jianshu.com/?t=http%3A%2F%2Fnote.youdao.com%2Fhttps%3A%2F%2Fwww.zhihu.com%2Fquestion%2F36514327%2Fanswer%2F68143522)