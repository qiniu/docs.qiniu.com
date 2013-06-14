---
layout: default
title: "图像处理"
---

- [获取图片基本信息](#imageInfo)
- [获取图片EXIF信息](#imageExif)
- [生成指定规格的缩略图](#imageView)
- [高级图像处理接口（缩略、裁剪、旋转、转化）](#imageMogr)
- [图像水印接口](#watermark)


<a name="imageInfo"></a>

## 获取图片基本信息

**请求**

    GET <ImageDownloadURL>?imageInfo

**响应**

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

    {
        format: <ImageType> // "png", "jpeg", "gif", "bmp", etc.
        width: <ImageWidth>
        height: <ImageHeight>
        colorModel: <ImageColorModel> // "palette16", "ycbcr", etc.
    }

<a name="imageExif"></a>

## 获取图片EXIF信息

**请求**

    GET <ImageDownloadURL>?exif

**响应**

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

    {
        // ...EXIF Data...
    }


<a name="imageView"></a>

## 生成指定规格的缩略图

**请求**

    [GET] <ImageDownloadURL>?imageView/<mode>
                             /w/<Width>
                             /h/<Height>
                             /q/<Quality>
                             /format/<Format>


**响应**

    200 OK
    <ImageBinaryData>

**请求参数详解**

参数名称    | 说明
------------|-------------------------------------------------------------------
`<mode>`    | 图像缩略处理的模式
`<Width>`   | 指定目标缩略图的宽度，单位：像素（px）
`<Height>`  | 指定目标缩略图的高度，单位：像素（px）
`<Quality>` | 指定目标缩略图的图像质量，取值范围 1-100
`<Format>`  | 指定目标缩略图的输出格式，取值范围：jpg, gif, png, webp 等图片格式


其中 `<mode>` 分为如下几种情况：

模式         | 说明
-------------|------------------------------------------------------------------------------------------------
`<mode>=1` | 表示限定目标缩略图的宽度和高度，放大并从缩略图中央处裁剪为指定 `<Width>x<Height>` 大小的图片。
`<mode>=2` | 指定 `<Width>` 和 `<Height>`，表示限定目标缩略图的长和宽，将缩略图的大小限定在指定的宽高矩形内。
`<mode>=2` | 指定 `<Width>` 但不指定 `<Height>`，表示限定目标缩略图的宽度，高度等比缩略自适应。
`<mode>=2` | 指定 `<Height>` 但不指定 `<Width>`，表示限定目标缩略图的高度，宽度等比缩略自适应。

**示例**

示例1：针对原图进行缩略，并从缩略图的中央部位裁剪为 200x200 的缩略图：

    http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/200/h/200

![200x200](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/200/h/200)

示例2：针对原图进行缩略，并限定目标缩略图的长边为 200 px，短边自适应，缩略图宽和高都不会超出 200px：

    http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200/h/200

![限定长边为 200px，短边自适应，宽和高都不会超出 200px](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200/h/200)

示例3：针对原图进行缩略，并限定目标缩略图的宽度为 200px，高度等比缩略自适应：

    http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200

![限定宽度为 200px, 高度等比缩略自适应](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200)

示例4：针对原图进行缩略，并限定目标缩略图的高度为 200px，宽度等比缩略自适应：

    http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/h/200

![限定高度为 200px, 宽度等比缩略自适应](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/h/200)


<a name="imageMogr"></a>

## 高级图像处理接口（缩略、裁剪、旋转、转化）

除了对图像进行缩略有单独的处理接口，七牛云存储还提供了比较高级的图像处理接口，包含缩略、裁剪、旋转等一系列的功能，该接口规格如下：

**请求**

    [GET] <ImageDownloadURL>?imageMogr/v2
          /auto-orient
          /thumbnail/<ImageSizeGeometry>
          /gravity/<GravityType>
          /crop/<ImageSizeAndOffsetGeometry>
          /quality/<ImageQuality>
          /rotate/<RotateDegree>
          /format/<DestinationImageFormat>

注意：

- `/auto-orient` 参数是和图像处理顺序相关的，一般建议放在首位（根据原图EXIF信息自动旋正）。


**响应**

    200 OK
    <ImageBinaryData>

**参数**

名称                 | 必填 | 说明
---------------------|------|-----------------------------------------------------
`<ImageSizeGeometry>`  | 否   | 缩略图大小，详解见下。
`<GravityType>`      | 否   | 位置偏移，只会时使gravity设置之后的{offset}受到影响。默认值为 `NorthWest`（左上角）。可选值：`NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`, `South`, `SouthEast` 。
`<ImageSizeAndOffsetGeometry>`  | 否   | 裁剪大小和偏移坐标，详解见下。
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
  area@ | 缩略图按原始图片高宽比例等比缩放，但缩放后的宽乘高的总分辨率不超过给定的总像素。 | [20000@](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/thumbnail/20000@) | (1, 100000000)

指定图片缩略或裁剪前相对于原图的起始坐标：

{size}{offset}   | 指定偏移量 (缺省是 +0+0)，{size} 代表上述表格中的任意规格
-----------------|-------------------------------------------------------------
{size}{+-}x{+-}y | 指定子图片相对于源图片的坐标，x代表横轴，y代表纵轴，单位像素。偏移量会且仅会受**之前的** gravity 参数的影响，但不受 {size} 操作符比如 % 的影响。

x 为正数时为从源图区域左上角的横坐标，为负数时，左上角坐标为0，然后从截出的子图片右边减去x象素宽度。
y 为正数时为从源图区域左上角的纵坐标，为负数时，左上角坐标为0，然后从截出的子图片上边减去y象素高度。

例如，

`/crop/!300x400a10a10` 表示从源图坐标为 x:10 y:10 截取 300x400 的子图片。
`/crop/!300x400-10a10` 表示从源图坐标为 x:0  y:10 截取 290x400 的子图片。

这个源图可以是 `/thumbnail/<ImageSizeGeometry>` 参数处理过后的图片，意味着 `thumbnail` 和 `crop` 之间的操作可以链式处理。

**示例**

    [GET] http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2
                /auto-orient
                /thumbnail/!256x256r
                /gravity/center
                /crop/!256x256
                /quality/80
                /rotate/45

![高级图像处理](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/auto-orient/thumbnail/!256x256r/gravity/center/crop/!256x256/quality/80/rotate/45)

您可能留意到部分参数以 ! 开头，这是参数被转义的标识。为了方便阅读，我们采用了特殊的转义方法。以下是转义符号列表：

    p => % (percent)
    r => ^ (reverse)
    a => + (add)

也就是 !50x50r 其实代表 50x50^ 这样一个字符串。!50x50 代表 50x50 这样一个字符串（实际上这个字符串不需要转义）。`<ImageSizeAndOffsetGeometry>` 中的 OffsetGeometry 部分可以省略，缺省为 +0+0。也就是 /crop/50x50 等价于 /crop/!50x50a0a0，执行 -crop 50x50+0+0 语义。

<a name="watermark"></a>

## 图像水印接口

**请求**

    [GET] <ImageDownloadURL>?watermark/<Mode>/xxx

其中，`<ImageDownloadURL>` 必须返回一张图片。

`<Mode>` = 1 时，表示图片水印：

    [GET] <ImageDownloadURL>?watermark/1
                             /image/<EncodedImageURL>
                             /dissolve/<Dissolve>
                             /gravity/<Gravity>
                             /dx/<DistanceX>
                             /dy/<DistanceY>

`<Mode>` = 2 时，表示纯文本水印：

    [GET] <ImageDownloadURL>?watermark/2
                             /text/<EncodedText>
                             /font/<EncodedFontName>
                             /fontsize/<FontSize>
                             /fill/<EncodedTextColor>
                             /dissolve/<Dissolve>
                             /gravity/<Gravity>
                             /dx/<DistanceX>
                             /dy/<DistanceY>


**参数**

名称                 | 必填 | 说明
---------------------|------|-----------------------------------------------------
`<EncodedImageURL>`  | 是   | 水印图片，使用图片水印时需指定用于水印的远程图片URL。`EncodedImageURL = urlsafe_base64_encode(ImageURL)`
`<EncodedText>`      | 是   | 水印文本，文字水印时必须。`EncodedText = urlsafe_base64_encode(Text)`
`<EncodedFontName>`  | 否   | 字体名，若水印文本为非英文字符（比如中文）构成，则必须。`EncodedFontName = urlsafe_base64_encode(FontName)`
`<FontSize>`         | 否   | 字体大小，0 表示默认，单位: 缇，等于 1/20 磅。
`<EncodedTextColor>` | 否   | 字体颜色。`EncodedTextColor = urlsafe_base64_encode(TextColor)`。RGB格式，可以是颜色名称（比如 `red`）或十六进制（比如 `#FF0000`），参考 [RGB颜色编码表](http://www.rapidtables.com/web/color/RGB_Color.htm)
`<Dissolve>`         | 否   | 透明度，取值范围 1-100，默认值 `100`，即表示 100%（不透明）。
`<Gravity>`          | 否   | 位置，默认值为 `SouthEast`（右下角）。可选值：`NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`, `South`, `SouthEast` 。
`<DistanceX>`        | 否   | 横向边距，单位：像素（px），默认值为 10。
`<DistanceY>`        | 否   | 纵向边距，单位：像素（px），默认值为 10。

`urlsafe_base64_encode(string)` 函数的实现符合 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 标准，开发者可以参考 <https://github.com/qiniu> 上各SDK的样例代码。

**示例**

图片水印样例

 - 水印图片: <http://www.b1.qiniudn.com/images/logo-2.png>
     - `ImageURL = "http://www.b1.qiniudn.com/images/logo-2.png"`
     - `EncodedImageURL = urlsafe_base64_encode(ImageURL)`
 - 水印透明度: 50% (`dissolve=50`)
 - 水印位置: 右下角 (`gravity=SouthEast`)
 - 横向边距: 20px
 - 纵向边距: 20px

![图片水印](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==/dissolve/50/gravity/SouthEast/dx/20/dy/20)

右键获取以上图片获得链接可以查看水印生成的具体规格参数。


文字水印样例

- 水印文本：`七牛云存储`
- 水印文本字体：`宋体`
- 水印文本字体大小：`1000`
- 水印文本颜色：`white`
- 水印文本透明度：15% (`dissolve=85`)
- 水印文本位置：右下脚 (`gravity=SouthEast`)

![文字水印](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/2/text/5LiD54mb5LqR5a2Y5YKo/font/5a6L5L2T/fontsize/1000/fill/d2hpdGU=/dissolve/85/gravity/SouthEast/dx/20/dy/20)

右键获取以上图片获得链接可以查看水印生成的具体规格参数。

**优化建议**

- 1.图片上传完毕后，可异步进行水印预转，这样不必在初次访问时进行水印处理，访问速度更快。
    - 参考 [uploadToken 之 asyncOps](put.html#uploadToken-asyncOps) 。

- 2.给图片链接中的水印规格添加别名，使得URL更加友好。
    - 设置别名，可使用 [qboxrsctl style 命令](/tools/qboxrsctl.html#style)
    - 查看别名规格，可使用 [qboxrsctl bucketinfo 命令](/tools/qboxrsctl.html#bucketinfo)

  示例

    qboxrsctl login <email> <password>

    qboxrsctl style <bucket> watermarked.jpg watermark/2/text/<EncodedText>

    qboxrsctl separator <bucket> -

  此时，如下两个 URL 等价:

    http://<Domain>/<Key>?watermark/2/text/<EncodedText>

    http://<Domain>/<Key>-watermarked.jpg


- 3.设置原图保护，仅限使用缩略图样式别名的友好URL形式来访问目标图片。
    - 设置原图保护，可使用 [qboxrsctl protected 命令](/tools/qboxrsctl.html#protected)
    - 也可在 <http://www.qiniu.com/>  上进行可视觉化操作。

  设置原图保护后，原图不能访问：

    http://<Domain>/<Key>

  同时也禁止根据图像处理API对原图进行参数枚举：

    http://<Domain>/<Key>?watermark/2/text/<EncodedText>

  此时只能访问指定规格的图片资源：

    http://<Domain>/<Key>-watermarked.jpg

