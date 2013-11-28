---
layout: docs
title: 图片处理（imageView）
order: 175
---

<a name="imageView"></a>
## 图片处理（imageView）

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

