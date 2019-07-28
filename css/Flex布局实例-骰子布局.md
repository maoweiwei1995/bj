# Flex布局实例-骰子布局

### 1、 单项目

首先，只有左上角有1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够啦。



![img](https://upload-images.jianshu.io/upload_images/7691194-114105e775a7f473.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/202/format/webp)

左上角.png

```
.box {
    display: flex
}
```

设置项目的对齐方式，就能实现居中对齐和右对齐。



![img](https://upload-images.jianshu.io/upload_images/7691194-9042e27da5c3302f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/205/format/webp)

水平居中.png

```
.box {
  display: flex;
  justify-content: center;
}
```

设置交叉轴对齐方式，可以垂直移动主轴。



![img](https://upload-images.jianshu.io/upload_images/7691194-7332be08c0d22b06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/205/format/webp)

垂直居中.png

```
.box {
  display: flex;
  align-items: center;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-1ee3acd71cca8b6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/206/format/webp)

水平垂直居中.png

```
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-eefc013fd63c569a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/207/format/webp)

水平居中底部.png

```css
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-86269920a7796eaa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/204/format/webp)

右下角.png

```css
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
```

### 2、双项目



![img](https://upload-images.jianshu.io/upload_images/7691194-397766ad3cac629b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/209/format/webp)

```css
.box {
    display: flex;
    justify-content: space-between;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-5f191d8824756bfb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/208/format/webp)

```
.box {
    display: flex;
    flex-firection: column;
    justify-content: space-between;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-de6224c6464664e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/205/format/webp)

```
.box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-7c3ff1fe6dd37d66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/208/format/webp)

```
.box {
    display: flex;
    flex-direction: colunmn;
    justify-content: space-between;
    align-items: flex-end;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-2354d82b45e59428.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/206/format/webp)

```css
.box {
    display: flex;
}
.box .item:nth-child(2) {
    align-self: center;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-d100be13cb80e0f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/209/format/webp)

```
.box {
    display: flex;
    justify-content: space-between;
}
.box .item:nth-child(2) {
    align-self: flex-end;
}
```

### 3、三项目



![img](https://upload-images.jianshu.io/upload_images/7691194-8914bb50a36b7b6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/207/format/webp)

```
.box {
    display: flex;
    justify-content: space-between;
}
.box .item:nth-child(2) {
    align-self: center;
}
.box .item:nth-child(3) {
    align-self: flex-end;
}
```

### 4、四项目



![img](https://upload-images.jianshu.io/upload_images/7691194-276456ea16579324.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/208/format/webp)

```
.box {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
     align-content: space-between;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-fd8049f03789872d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/209/format/webp)

```
html结构为：
<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>

css代码如下:
.box {
    display: flex;
    flex-warp: warp;
    algin-content: space-between;
}
.box .column {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
}
```

### 5、六项目



![img](https://upload-images.jianshu.io/upload_images/7691194-442e3b6a3be5eb3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/208/format/webp)

```css
.box {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.box .column {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
}
```



![img](https://upload-images.jianshu.io/upload_images/7691194-c33df8dfb994aba5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/208/format/webp)

```css
.box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
   align-content: space-between;
}
.box .column {
    flex-basis: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
}
```

### 6、九项目



![img](https://upload-images.jianshu.io/upload_images/7691194-1d75a9a870f73db8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/209/format/webp)

```html
html结构为:
<div class="box">
    <div class="column">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
    <div class="column">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
    <div class="column">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
</div>

css代码为：
.box {
    display: flex;
    flex-warp: warp;
    justify-content: space-between;
}
.box .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
```