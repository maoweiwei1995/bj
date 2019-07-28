# [defer和async的区别](https://segmentfault.com/q/1010000000640869)

- [javascript](https://segmentfault.com/t/javascript)

 82.7k次浏览

问题对人有帮助，内容完整，我也想知道答案66问题没有实际价值，缺少关键内容，没有改进余地

在javascript高级程序设计里，介绍了有关defer和async的区别，可是比较浅显，那位大牛能说明白些。

- 关注 | 64
- 收藏 | 243
- [ 评论](javascript:void(0);)
- [邀请回答](javascript:;)
- [编辑](javascript:;)
- 

[![img](https://avatar-static.segmentfault.com/163/795/1637953227-54601b67a363c_big64)](https://segmentfault.com/u/liangyi)

[**两仪**](https://segmentfault.com/u/liangyi) ![img](https://static.segmentfault.com/v-5cc2cd8e/global/img/rp.svg) 9.4k

2014-08-19 提问

[默认排序](https://segmentfault.com/q/1010000000640869#answers-title)[时间排序](https://segmentfault.com/q/1010000000640869?sort=created#answers-title)

5 个回答



![img](https://sponsor.segmentfault.com/lg.php?bannerid=51&campaignid=1&zoneid=3&loc=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000000640869&referer=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D2ehaLM1RCmacHjX1PR7B-EOYSRsYqT4IAQX8wx_dvudalD1gfEEL4MvHsoENAqT2xBcjrJNm_JlvFU8nVntkd_%26wd%3D%26eqid%3D8630bace00044830000000065d249372&cb=40369fff6b)

答案对人有帮助，有参考价值147答案没帮助，是错误的答案，答非所问


已采纳

先来试个一句话解释仨，当浏览器碰到 `script` 脚本的时候：

1. <script src="script.js"></script>
2. <script async src="script.js"></script>
3. <script defer src="myscript.js"></script>

然后从实用角度来说呢，首先把所有脚本都丢到 `</body>` 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。

接着，我们来看一张图咯：

![请输入图片描述](http://segmentfault.com/img/bVcQV0)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。

此图告诉我们以下几个要点：

1. *defer* 和 *async* 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 它俩的差别在于脚本下载完之后何时执行，显然 *defer* 是最接近我们对于应用脚本加载和执行的要求的
3. 关于 *defer*，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
4. *async* 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
5. 仔细想想，*async* 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics