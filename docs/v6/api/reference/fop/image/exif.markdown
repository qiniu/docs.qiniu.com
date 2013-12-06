---
layout: docs
title: 图片EXIF信息（exif）
order: 172
---

<a name="exif"></a>
# 图片EXIF信息（exif）

<a name="description"></a>
## 描述

EXIF（EXchangeable Image File Format），是专门为数码相机的照片设定的可交换图像文件格式，详见[维基百科](http://zh.wikipedia.org/wiki/EXIF)。  
获取方式为在图片下载URL后附加`exif`指示符（区分大小写）。  

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
