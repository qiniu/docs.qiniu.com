---
layout: docs
title: 图片处理（imageView）
order: 175
---

<a name="imageView"></a>
# 图片处理（imageView）

<a name="tag"></a>
## 标签

[缩略图](thumbnailHref)。

<a name="description"></a>
## 描述

imageView是七牛云存储提供的一种简易却强大的图片处理接口，只需要填写少数几个参数即可对图片进行缩放操作，生成各种缩略图。  

<a name="specification"></a>
## 接口规格（imageViewSpec）  

```
imageView/<Mode>/w/<Width>/h/<Height>/q/<Quality>/format/<Format>
```

参数名称    | 说明
:---------- | :-----------------------------------------------------------------
`<mode>`    | 图像缩放处理模式
`<Width>`   | 目标图片的宽度，单位：像素（px）
`<Height>`  | 目标图片的高度，单位：像素（px）
`<Quality>` | 目标图片的图像质量，取值范围：1-100，缺省为85
`<Format>`  | 目标图片的输出格式，取值范围：jpg，gif，png，webp等，缺省为原图格式

其中 `<mode>` 分为如下几种情况：

模式         | 说明
:----------- | :----------------------------------------------------------------------------------------------
`<mode>=1`   | 同时指定宽度和高度，等比裁剪原图正中部分并缩放为<Width>x<Height>大小的新图片
`<mode>=2`   | 同时指定宽度和高度，原图缩小为不超出<Width>x<Height>大小的缩略图，避免裁剪长边
`<mode>=2`   | 仅指定宽度，高度等比缩小
`<mode>=2`   | 仅指定高度，宽度等比缩小

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
GET <ImageDownloadURI>?<imageViewSpec> HTTP/1.1
Host: <ImageDownloadHost>
```

<a name="response"></a>
## 响应

<a name="response-syntax"></a>
### 响应语法

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
200        | 缩放成功
400	       | 请求语法错误
404        | 资源不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

<a name="sample"></a>
## 示例

### 裁剪正中部分，等比缩小生成200x200缩略图

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/200/h/200
```

![查看效果图](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/200/h/200)

### 裁剪正中部分，等比放大生成500x500放大图

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/500/h/500
```

![查看效果图](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/500/h/500)

### 宽度固定为200px，高度等比缩小，生成200x133缩略图

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200
```

![查看效果图](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200)

### 高度固定为200px，宽度等比缩小，生成300x200缩略图

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/h/200
```

![查看效果图](http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/h/200)

[thumbnailHref]:                ../../list/thumbnail.html                       "缩略图文档列表"
[sendBugReportHref]:            mailto:support@qiniu.com?subject=599错误日志    "发送错误报告"
