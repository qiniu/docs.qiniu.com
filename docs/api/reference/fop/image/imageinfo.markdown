---
layout: docs
title: 图片基本信息（imageInfo）
order: 173
---

<a name="imageInfo"></a>
## 图片基本信息（imageInfo）

图片基本信息包括图片格式,图片大小，色彩模式。

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

**示例**

获取图片基本信息样例(在WEB浏览器中输入以下图片地址)

    http://qiniuphotos.qiniudn.com/gogopher.jpg?imageInfo

结果

	{"format":"jpeg","width":640,"height":427,"colorModel":"ycbcr"}
