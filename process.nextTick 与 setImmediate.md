# process.nextTick 与 setImmediate

首先纠正朴老师《深入浅出nodejs》一书中的一处错误，内容如下：



![img](https://upload-images.jianshu.io/upload_images/1979696-bc42e3bc988a16b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

image.png

在[repl.it](https://repl.it/repls/ActivePleasantDrupal)中实际测试代码和结果如下：



![img](https://upload-images.jianshu.io/upload_images/1979696-e9571a25db7db6dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

image.png

首先我们先来说一下`tick`是什么：
简单来说，在node.js启动时，创建了一个类似while(true)的循环体，每次执行一次循环体称为一次`tick`，每个`tick`的过程就是查看是否有事件等待处理，如果有，则取出事件极其相关的回调函数并执行，然后执行下一次`tick`。
所以同一个tick里的

下面解释一下上面两个方法：

- `setImmediate`：该方法用来把一些需要长时间运行的操作放在一个回调函数里,在浏览器完成后面的其他语句后,就立刻执行这个回调函数
- `process.nextTick`： 定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行

定义上看两者好像并无区别，但是`process.nextTick`的执行却优先于`setImmediate`，原因在于他们采用的观察者不同，`process.nextTick()`采用的是`idle`观察者，而`setImmediate`采用的是`check`观察者，`setTimeout`采用的是类似`IO`观察者。

三种观察者的优先级顺序是：**idle观察者 > io观察者 > check观察者**

同一个`tick`里的`process.nextTick`被优先执行，其次才是`setImmediate`，`setImmediate`回调中的`process.nextTick`属于下一次`tick`，因此“强势插入”最后才输出。



![img](https://upload-images.jianshu.io/upload_images/1979696-fd36100baa7304a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

image.png

**最后补充一点，无论node，还是浏览器，js都运行在单线程环境中，只有node的异步IO运行在线程池中，当某个事件执行密集计算阻塞住事件循环时，如while(true) {}，浏览器会停止响应，node也会被卡死。**