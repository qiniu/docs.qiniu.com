---
layout: docs
title: 水印（watermark）
order: 160
---

<a name="watermark"></a>
# 水印（watermark）

<a name="description"></a>
## 描述

七牛云存储提供两种水印接口：图片水印和文字水印。  

<a name="pic-watermark"></a>
## 图片水印

<a name="pic-watermark-spec"></a>
### 规格接口规格（picWaterMarkSpec）  

```
watermark/1/image/<EncodedImageURL>
           /dissolve/<Dissolve>
           /gravity/<Gravity>
           /dx/<DistanceX>
           /dy/<DistanceY>
```

参数名称             | 说明                                                                | 必填
:------------------- | :------------------------------------------------------------------ | :-----
`<EncodedImageURL>`  | 水印源图片网址（经过URL安全的Base64编码），必须有效且返回一张图片   | 是
`<Dissolve>`         | 透明度，取值范围1-100，缺省值100（完全不透明）                      |
`<Gravity>`          | 水印位置，参考水印位置参数表，缺省值SouthEast（右下角）             |
`<DistanceX>`        | 横轴边距，单位:像素(px)，缺省值10                                   |
`<DistanceY>`        | 纵轴边距，单位:像素(px)，缺省值10                                   | 

<a name="request"></a>
### 请求

<a name="request-syntax"></a>
#### 请求语法

```
GET <ImageDownloadURI>?<picWaterMarkSpec> HTTP/1.1
Host: <ImageDownloadHost>
```

<a name="response"></a>
### 响应

<a name="response-syntax"></a>
#### 响应语法

```
HTTP/1.1 200 OK
Content-Type: <ImageMimeType>

<ImageBinaryData>
```

如果请求失败，具体信息请参考响应状态码。

<a name="response-code"></a>
### 响应状态码

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 添加水印成功
400	       | 请求语法错误
404        | 资源不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

<a name="pic-watermark-sample"></a>
### 图片水印样例

 - 水印图片: <http://www.b1.qiniudn.com/images/logo-2.png>
     - `ImageURL = "http://www.b1.qiniudn.com/images/logo-2.png"`
     - `EncodedImageURL = urlsafe_base64_encode(ImageURL)`
 - 水印透明度: 50% (`dissolve=50`)
 - 水印位置: 右下角 (`gravity=SouthEast`)
 - 横向边距: 20px
 - 纵向边距: 20px

![图片水印](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==/dissolve/50/gravity/SouthEast/dx/20/dy/20)

右键拷贝图片链接查看水印生成的具体规格参数。

<a name="text-watermark"></a>
## 文字水印

<a name="text-watermark-spec"></a>
### 规格接口规格（textWaterMarkSpec）  

```
watermark/2/text/<EncodedText>
           /font/<EncodedFontName>
           /fontsize/<FontSize>
           /fill/<EncodedTextColor>
           /dissolve/<Dissolve>
           /gravity/<Gravity>
           /dx/<DistanceX>
           /dy/<DistanceY>
```

参数名称             | 说明                                                                | 必填
:------------------- | :------------------------------------------------------------------ | :-----
`<EncodedText>`      | 水印文字内容（经过URL安全的Base64编码）                             | 是
`<EncodedFontName>`  | 水印文字字体（经过URL安全的Base64编码），缺省为黑体                 |
`<FontSize>`         | 水印文字大小，单位: [缇](http://en.wikipedia.org/wiki/Twip)，等于1/20磅，缺省值0（默认大小）             |
`<EncodedTextColor>` | 水印文字颜色，RGB格式，可以是颜色名称（比如`red`）或十六进制（比如`#FF0000`），参考[RGB颜色编码表](http://www.rapidtables.com/web/color/RGB_Color.htm)，缺省为白色(TODO) |
`<Dissolve>`         | 透明度，取值范围1-100，缺省值100（完全不透明）                      |
`<Gravity>`          | 水印位置，参考水印位置参数表，缺省值SouthEast（右下角）             |
`<DistanceX>`        | 横轴边距，单位:像素(px)，缺省值10                                   |
`<DistanceY>`        | 纵轴边距，单位:像素(px)，缺省值10                                   | 

<a name="request"></a>
### 请求

<a name="request-syntax"></a>
#### 请求语法

```
GET <ImageDownloadURI>?<textWaterMarkSpec> HTTP/1.1
Host: <ImageDownloadHost>
```

<a name="response"></a>
### 响应

<a name="response-syntax"></a>
#### 响应语法

```
HTTP/1.1 200 OK
Content-Type: <ImageMimeType>

<ImageBinaryData>
```

如果请求失败，具体信息请参考响应状态码。

<a name="response-code"></a>
### 响应状态码

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 添加水印成功
400	       | 请求语法错误
404        | 资源不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

<a name="text-watermark-sample"></a>
### 文字水印样例

- 水印文本：`七牛云存储`
- 水印文本字体：`宋体`
- 水印文本字体大小：`1000`
- 水印文本颜色：`white`
- 水印文本透明度：15% (`dissolve=85`)
- 水印文本位置：右下脚 (`gravity=SouthEast`)

![文字水印](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/2/text/5LiD54mb5LqR5a2Y5YKo/font/5a6L5L2T/fontsize/1000/fill/d2hpdGU=/dissolve/85/gravity/SouthEast/dx/20/dy/20)

右键拷贝图片链接查看水印生成的具体规格参数。

## 优化建议

- 图片上传完毕后，可异步进行水印预转，避免初次访问时进行水印处理，访问速度更快。

- 使用[qboxrsctl][qtoolsHref]工具，给图片下载URL中的水印规格添加别名，使得URL更加友好。

	```
    qboxrsctl login <email> <password>

    qboxrsctl style <bucket> watermarked.jpg watermark/2/text/<EncodedText>

    qboxrsctl separator <bucket> -
	
  此时，如下两个URL等价:

	```
    http://<Domain>/<Key>?watermark/2/text/<EncodedText>

    http://<Domain>/<Key>-watermarked.jpg
	```

- 设置[原图保护][resourceProtectHref]，仅限使用缩略图样式别名的友好URL形式来访问目标图片。

  设置原图保护后，原图不能访问：

    http://<Domain>/<Key>

  同时也禁止根据图像处理API对原图进行参数枚举：

    http://<Domain>/<Key>?watermark/2/text/<EncodedText>

  此时只能访问指定规格的图片资源：

    http://<Domain>/<Key>-watermarked.jpg

[qtoolsHref]:          ../qtools.html                                  "七牛工具"
[resourceProtectHref]: ../resource-protect.html                        "原图保护"
[sendBugReportHref]:   mailto:support@qiniu.com?subject=599错误日志    "发送错误报告"
