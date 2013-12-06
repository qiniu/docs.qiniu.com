---
layout: docs
title: 图片基本信息（imageInfo）
order: 173
---

<a name="imageInfo"></a>
# 图片基本信息（imageInfo）

<a name="description"></a>
## 描述

图片基本信息包括图片格式、图片大小、色彩模型。  
在图片下载URL后附加`imageInfo`指示符（区分大小写），即可获取JSON格式的图片基本信息。  

注意：缩略图等经过云处理的新图片不支持该方法。  

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
GET <ImageDownloadURI>?imageInfo HTTP/1.1
Host: <ImageDownloadHost>
```

<a name="response"></a>
## 响应

<a name="response-syntax"></a>
### 响应语法

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{
    "format":       "<ImageType         string>",
    "width":         <ImageWidth        int>,
    "height":        <ImageHeight       int>,
    "colorModel":   "<ImageColorModel   string>"
}
```

字段说明如下：

字段名称       | 类型   | 说明
:------------- | :----- | :------------------------------
format         | string | 图片类型，如png、jpeg、gif、bmp等
width          | int    | 图片宽度，单位：像素（px）
height         | int    | 图片高度，单位：像素（px）
colorModel     | string | 彩色空间，如palette16、ycbcr等

如果请求失败，具体信息请参考响应状态码。

<a name="response-code"></a>
### 响应状态码

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 下载成功
400	       | 请求语法错误
404        | 资源不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

<a name="sample"></a>
## 示例

<a name="sample-exif"></a>
### 获取图片基本信息 

在Web浏览器中输入以下图片地址：  

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?imageInfo
```

返回结果（内容经过格式化以便阅读）：  

```
{
    "format":       "jpeg",
    "width":        640,
    "height":       427,
    "colorModel":   "ycbcr"
}
```

[sendBugReportHref]:            mailto:support@qiniu.com?subject=599错误日志     "发送错误报告"
