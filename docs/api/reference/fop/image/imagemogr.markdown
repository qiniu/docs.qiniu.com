---
layout: docs
title: 高级图片处理（imageMogr）
order: 174
---

<a name="imageMogr"></a>
## 高级图像处理

除了能够方便的生成图像缩略图之外，七牛云存储提供了其它高级图像处理接口，包含缩略、裁剪、旋转等一系列的功能。imageMogr第二版的接口规格如下：

**请求**

    [GET] <ImageDownloadURL>?imageMogr/v2
          /auto-orient
          /thumbnail/<ImageSizeGeometry>
          /gravity/<GravityType>
          /crop/<ImageSizeAndOffsetGeometry>
          /quality/<ImageQuality>
          /rotate/<RotateDegree>
          /format/<DestinationImageFormat>

**响应**

    200 OK
    <ImageBinaryData>

**参数**

名称                 | 必填 | 说明
---------------------|------|-----------------------------------------------------
`<ImageSizeGeometry>`  | 否   | 缩略图大小，详解见下。
`<GravityType>`      | 否   | 位置偏移，只会使其后的裁剪偏移({offset})受到影响。默认值为 `NorthWest`（左上角）。可选值：`NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`, `South`, `SouthEast` 。
`<ImageSizeAndOffsetGeometry>`  | 否   | 裁剪大小和偏移，详解见下。
`<ImageQuality>`         | 否   | 图片质量，取值范围是[1, 100]。
`<RotateDegree>`         | 否   | 旋转角度。
`<DestinationImageFormat>`          | 否   | 输出格式，可选为jpg, gif, png, bmp, tiff, webp等。

如下是 `/thumbnail/<ImageSizeGeometry>` 和 `/crop/<ImageSizeAndOffsetGeometry>` 参数规格详解。

指定图片缩略或裁剪后的尺寸：

  size | 规格说明 | 样例                                                    | 取值范围
-------| -------- | ------------------------------------------------------| --------
  scale% | 基于原图大小，按照指定的百分比进行缩放。 | [50%](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/!50p) | (0, 1000)
  scale-x%xscale-y% | 以百分比的形式指定缩略图的宽或高，另一边自适应等比缩放，只能使用一个 % 限定。 | [50%x](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/!50p) [x50%](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/!x50p) | (0, 1000)
  width | 限定缩略图宽度，高度等比自适应。 | [200](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/200) | (0, 10000)
  xheight | 限定缩略图高度，宽度等比自适应。 | [x100](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/x100) | (0, 10000)
  widthxheight | 限定长边，短边自适应，将缩略图的大小限定在指定的宽高矩形内。若指定的宽度大于指定的高度，以指定的高度为基准，宽度自适应等比缩放；若指定的宽度小于指定的高度，以指定的宽度为基准，高度自适应等比缩放。 | [100x200](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/100x200) [200x100](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/200x100) | (0, 10000)
  widthxheight^ | 限定短边，长边自适应，目标缩略图大小会超出指定的宽高矩形。若指定的宽度大于指定的高度，以指定的宽度为基准，高度自适应等比缩放；若指定的宽度小于指定的高度，以指定的高度为基准，宽度自适应等比缩放。 | [100x200^](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/100x200^) [200x100^](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/200x100^) | (0, 10000)
  widthxheight! | 限定缩略图宽和高。缩略图按照指定的宽和高强行缩略，忽略原图宽和高的比例，可能会变形。 | [100x200!](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/100x200!) [200x100!](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/200x100!) | (0, 10000)
  widthxheight> | 当原图尺寸超出给定的宽度或高度时，按照给定的 widthxheight 规格进行缩略。 | [100x200>](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/100x200%3E) [1000x2000>](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/1000x2000%3E) | (0, 10000)
  widthxheight< | 当原图尺寸低于给定的宽度和高度时，按照给定的 widthxheight 规格进行拉伸。 | [100x200<](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/200x100<) [1000x2000<](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/2000x1000<) | (0, 10000)
  area@ | 缩略图按原始图片高宽比例等比缩放，但缩放后的宽乘高的总分辨率不超过给定的总像素。 | [20000@](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/20000@) | (1, 1E8)

指定图片缩略或裁剪前相对于原图的起始坐标：

{size}{offset}   | 指定偏移量 (缺省是 +0+0)，{size} 代表上述表格中的任意规格
-----------------|-------------------------------------------------------------
{size}{+-}x{+-}y | 指定子图片相对于源图片的坐标，x代表横轴，y代表纵轴，单位像素。偏移量会且仅会受**之前的** gravity 参数的影响，不受 {size} 操作符比如 % 的影响。

x 为正数时为从源图区域左上角的横坐标，为负数时，左上角坐标为0，然后从截出的子图片右边减去x象素宽度。
y 为正数时为从源图区域左上角的纵坐标，为负数时，左上角坐标为0，然后从截出的子图片上边减去y象素高度。

例如，

`/crop/!300x400a10a10` 表示从源图坐标为 x:10 y:10 截取 300x400 的子图片。
`/crop/!300x400-10a10` 表示从源图坐标为 x:0  y:10 截取 290x400 的子图片。

**注意**

- `auto-orient` 参数是和图像处理顺序相关的，一般建议放在首位（根据原图EXIF信息自动旋正）。
- `thumbnail` 和 `crop` 之间的操作可以链式处理，即可以先对图进行缩略再裁剪，或者先裁剪再缩略。
- `gravity` 只会使其后的裁剪偏移({offset})受到影响，建议放在`crop`选项之前。
- 当处理多帧gif图片时，可能处理所需的时间较长并且输出的图片体积较大。如果您有许多多帧gif图片需要处理，可在图片上传完成后异步进行预转，这样不必在初次访问时进行图片处理，访问速度更快。
    - 参考 [uploadToken 之 asyncOps](put.html#uploadToken-asyncOps) 。
- 第一版的`imageMogr`对gif图片仅反回原图，不做处理，

第一版的`imageMogr`规格是：

    [GET] <ImageDownloadURL>?imageMogr
          /auto-orient
          /thumbnail/<ImageSizeGeometry>
          /gravity/<GravityType>
          /crop/<ImageSizeAndOffsetGeometry>
          /quality/<ImageQuality>
          /rotate/<RotateDegree>
          /format/<DestinationImageFormat>
          
第一版的imageMogr兼容保留。


**转义**

部分参数以 ! 开头，这是参数被转义的标识。为了方便阅读，我们采用了特殊的转义方法。以下是转义符号列表：

    p => % (percent)
    r => ^ (reverse)
    a => + (add)

也就是 !50x50r 其实代表 50x50^ 这样一个字符串。!50x50 代表 50x50 这样一个字符串（实际上这个字符串不需要转义）。`<ImageSizeAndOffsetGeometry>` 中的 OffsetGeometry 部分可以省略，缺省为 +0+0。也就是 /crop/50x50 等价于 /crop/!50x50a0a0，执行 -crop 50x50+0+0 语义。

**示例**

    [GET] http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2
                /auto-orient
                /thumbnail/!256x256r
                /gravity/center
                /crop/!256x256
                /quality/80
                /rotate/45

![高级图像处理](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/auto-orient/thumbnail/!256x256r/gravity/center/crop/!256x256/quality/80/rotate/45)
