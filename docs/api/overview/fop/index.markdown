---
layout: api_layout
title: 数据处理
order: 200
---
<a name="fop"></a>
## 数据处理（fop）

七牛云存储内建了一个非常高效易用的数据处理框架。数据处理框架可以管理和执行一系列符合规范的数据处理操作（fop）。开发者可以在访问资源时制定执行一个或多个数据处理指令，以直接获取经过处理后的结果。

比较典型的一个场景是图片查看。客户端可以上传一张高精度的图片，然后在查看图片的时候根据屏幕规格生成一张大小适宜的缩略图，比如为iPhone生成一张960x640大小的缩略图。这样既可以明显降低网络流量，而且可以提高图片显示速度，还能降低移动设备的内存占用。而要达到这样的效果非常简单：

原图（[链接](http://qiniu-images.qiniudn.com/gogopher.jpg)）：

```
http://qiniu-images.qiniudn.com/gogopher.jpg
```
针对该原图获取一个适合iPhone5屏幕尺寸的图片（[链接](http://qiniu-images.qiniudn.com/gogopher.jpg?imageView/2/w/640/h/960)）：

```
http://qiniu-images.qiniudn.com/gogopher.jpg?imageView/2/w/640/h/960
```

我们可以再定义图片样式比如叫iphone5，以缩短URL并提高可读性（[链接](http://qiniu-images.qiniudn.com/gogopher.jpg-iphone5)）：
```
http://qiniu-images.qiniudn.com/gogopher.jpg-iphone5
```

一个常规的数据处理操作包含一个操作指令和若干操作参数，如下所示：

```
<fop>/<param1_value>/<param2_name>/<param2_value>/...
```

数据处理框架对于资源类型并没有限制，但是特定某个数据处理操作则会有各自适合的处理对象，比如对非图片类型的资源类型上应用缩略图操作可能会返回错误的结果。

数据处理操作的触发有以下几个机会和方式：

1. 访问资源时。如上面的例子所示范的，只需要在资源URL后加上具体数据操作指令和参数即可。
1. 资源上传时。上传时可在上传策略中设置异步数据处理，在资源上传完成时七牛云存储会以异步的方式执行数据处理操作，并持久化存储数据处理结果。支持查询数据处理操作的进度。具体请参见[上传后续动作 - 数据处理]()。
1. 对已有资源手动触发处理流程。与上传时的数据处理支持相同，这个过程也为异步且可查询操作进度。具体请参见[处理结果持久化](#fop-saveas)。

<a name="fop-pipeline"></a>
### 管道

多个资源处理操作可以管道进行连接，连接符为竖线（**`|`**）。我们称之为管道操作。熟悉Linux命令行的开发者对这个概念会非常熟悉。

管道操作的规格如下：

```
http://<domain>/<key>?<fop1>|<fop2>|<fop3>|<fopN>
```

我们可以通过几个例子来演示管道操作的价值和用法。

**例1、**将一个原图缩略，然后在缩略图上打上另外一个图片作为水印（[链接](http://qiniu-images.qiniudn.com/gogopher.jpg?imageView/2/h/200|watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==)）：

```
http://qiniu-images.qiniudn.com/gogopher.jpg?
imageView/2/h/200|
watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==
```

我们可以看到这个示例URL有三部分组成：资源URL、缩略图处理`imageView`、水印处理`watermark`。两种处理之间用竖线**`|`**连接。

**例2、**从视频中提取某一帧生成缩略图，然后基于该缩略图打水印（[链接](http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg/offset/7/w/480/h/360|watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==)）：

```
http://open.qiniudn.com/thinking-in-go.mp4?
vframe/jpg/offset/7/w/480/h/360|
watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==
```

与例1类似，只不过这个示例目标换成了一个视频文件。

<a name="fop-predefined"></a>
### 内置数据处理功能

为提高开发者的使用便利性，七牛云存储已经内置了功能丰富的数据处理操作。开发者可以针对性的查看内置的数据处理功能，以免重复发明轮子。

已支持的数据处理操作如下：

1. 图片处理。支持图片缩放、裁剪、文字水印、图片水印、旋转、图片格式转换、图片效果锐化、图片质量调整等。

	图片处理的具体支持内容请参见[图片处理规格]()。

1. 音频处理。支持音频转码的众多参数控制，如转换格式、静态码率、采样频率、编码方案等。

	音频处理的具体支持内容请参见[音频处理规格]()。

1. 视频处理。支持音频转码的众多参数控制，如转换格式、静态码率、帧率、比特率、编码方案、指定位置和长度的视频片段截取等。

	视频处理的具体支持内容请参见[视频处理规格]()。
	
1. 其他未分类的数据处理操作。如Markdown转HTML、为特定URL生成二维码等。有些开发者可能恰好需要使用这些不太常用的功能。

	这些未分类的数据处理相关内容请参见[未分类数据处理规格]()。

<a name="fop-saveas"></a>
### 持久化处理结果

数据处理操作的结果通常是另一个文件。如果需要，我们可以将处理结果存储为空间里的一个新资源。这个操作可通过`saveas`功能完成。

假如我们希望将以下这个缩略图结果另存为空间`qiniu-images`中的`gogopher-iphone5.jpg`：

```
http://qiniu-images.qiniudn.com/gogopher.jpg?imageView/2/w/640/h/960
```

那么对应的访问URL可以调整为：

```
http://qiniu-images.qiniudn.com/gogopher.jpg?imageView/2/w/640/h/960|
saveas/dC10ZXN0OlNoaXAtdGh1bWItMjAwLmpwZw==
```
其中`saveas`操作的参数是字符串`qiniu-images:gogopher-iphone5.jpg`的对应Base64编码。

因为这个操作需要往空间中存储资源，因此无论该空间是否公开，我们都得为该URL添加下载凭证。在计算凭证过程中的SHA-1签名时不要忘记签名对象应包含`saveas`这部分。一个完整的支持持久化处理结果的URL应该类似于如下示例：

```
http://t-test.qiniudn.com/Ship.jpg?
imageView/2/w/200/h/200|
saveas/dC10ZXN0OlNoaXAtdGh1bWItMjAwLmpwZw==
/sign/iguImegxd6h...dlLIgycyU4thjg-xmu9q:38kMkgw3We...
```

这个`saveas`操作实际上是一个特殊的内置数据处理操作。开发者也可以从这个示例了解到数据处理机制的灵活性。
