---
layout: api_layout
title: 水印（watermark）
order: 160
---

<a name="watermark"></a>
## 水印（watermark）

图像水印接口支持两种加水印的方式：图片水印和文字水印。

<a name="watermark-spec"></a>
### 水印规格

添加水印的请求规格如下：

```
[GET] <ImageDownloadURL>?watermark/<Mode>/xxx
```

其中，`<ImageDownloadURL>`为需要加水印的源图片地址，该地址必须是有效的，且能够返回一张图片。

`<Mode>`为1时，表示需要添加的是图片水印，完整的图片水印规格如下：

```
[GET] <ImageDownloadURL>?watermark/1
                         /image/<EncodedImageURL>
                         /dissolve/<Dissolve>
                         /gravity/<Gravity>
                         /dx/<DistanceX>
                         /dy/<DistanceY>
```

`<Mode>`为2时，表示需要添加的是文字水印，完整的文字水印规格如下：

[GET] <ImageDownloadURL>?watermark/2
                         /text/<EncodedText>
                         /font/<EncodedFontName>
                         /fontsize/<FontSize>
                         /fill/<EncodedTextColor>
                         /dissolve/<Dissolve>
                         /gravity/<Gravity>
                         /dx/<DistanceX>
                         /dy/<DistanceY>


以上规格中提到的各参数的说明和具体用法详见下表。

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

<a name="watermark-examples"></a>
### 水印示例

#### 图片水印样例

 - 水印图片: <http://www.b1.qiniudn.com/images/logo-2.png>
     - `ImageURL = "http://www.b1.qiniudn.com/images/logo-2.png"`
     - `EncodedImageURL = urlsafe_base64_encode(ImageURL)`
 - 水印透明度: 50% (`dissolve=50`)
 - 水印位置: 右下角 (`gravity=SouthEast`)
 - 横向边距: 20px
 - 纵向边距: 20px

![图片水印](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==/dissolve/50/gravity/SouthEast/dx/20/dy/20)

右键获取以上图片获得链接可以查看水印生成的具体规格参数。

#### 文字水印样例

- 水印文本：`七牛云存储`
- 水印文本字体：`宋体`
- 水印文本字体大小：`1000`
- 水印文本颜色：`white`
- 水印文本透明度：15% (`dissolve=85`)
- 水印文本位置：右下脚 (`gravity=SouthEast`)

![文字水印](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/2/text/5LiD54mb5LqR5a2Y5YKo/font/5a6L5L2T/fontsize/1000/fill/d2hpdGU=/dissolve/85/gravity/SouthEast/dx/20/dy/20)

右键获取以上图片获得链接可以查看水印生成的具体规格参数。

### 优化建议

- 1.图片上传完毕后，可异步进行水印预转，这样不必在初次访问时进行水印处理，访问速度更快。

- 2.给图片链接中的水印规格添加别名，使得URL更加友好。

	```
    qboxrsctl login <email> <password>

    qboxrsctl style <bucket> watermarked.jpg watermark/2/text/<EncodedText>

    qboxrsctl separator <bucket> -
	```
	
  此时，如下两个 URL 等价:

	```
    http://<Domain>/<Key>?watermark/2/text/<EncodedText>

    http://<Domain>/<Key>-watermarked.jpg
	```

- 3.设置原图保护，仅限使用缩略图样式别名的友好URL形式来访问目标图片。

  设置原图保护后，原图不能访问：

    http://<Domain>/<Key>

  同时也禁止根据图像处理API对原图进行参数枚举：

    http://<Domain>/<Key>?watermark/2/text/<EncodedText>

  此时只能访问指定规格的图片资源：

    http://<Domain>/<Key>-watermarked.jpg
