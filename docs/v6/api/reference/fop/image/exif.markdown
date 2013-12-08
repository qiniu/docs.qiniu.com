---
layout: docs
title: 图片EXIF信息（exif）
order: 172
---

<a name="exif"></a>
# 图片EXIF信息（exif）

<a name="description"></a>
## 描述

[EXIF（EXchangeable Image File Format）](http://zh.wikipedia.org/wiki/EXIF)是专门为数码相机的照片设定的可交换图像文件格式，通过在图片下载URL后附加`exif`指示符（区分大小写）获取。  

注意：缩略图等经过云处理的新图片不支持该方法。  

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
GET <ImageDownloadURI>?exif HTTP/1.1
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
    // ...EXIF Data...
}
```

各EXIF字段说明，请参考[EXIF白皮书](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf)。

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
### 获取图片EXIF信息 

在Web浏览器中输入以下图片地址：  

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?exif
```

返回结果（内容经过格式化以便阅读）：  

```
{
   "DateTime" : {
      "type" : 2,
      "val" : "2011:11:19 17:09:23"
   },
   "ExposureBiasValue" : {
      "type" : 10,
      "val" : "0.33 EV"
   },
   "ExposureTime" : {
      "type" : 5,
      "val" : "1/50 sec."
   },
   "Model" : {
      "type" : 2,
      "val" : "Canon EOS 600D"
   },
   "ISOSpeedRatings" : {
      "type" : 3,
      "val" : "3200"
   },
   "ResolutionUnit" : {
      "type" : 3,
      "val" : " 英寸"
   },

   ...后续内容已省略...
}
```

[sendBugReportHref]:            mailto:support@qiniu.com?subject=599错误日志     "发送错误报告"
