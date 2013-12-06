---
layout: docs
title: 视频水印（vwatermark）
order: 139
---
<a name="vwatermark"></a>
# 视频水印（vwatermark）

<a name="vwatermark-spec"></a>
## 视频水印规格

视频水印的请求规格如下：

```
[GET] <VideoDownloadURL>?vwatermark/<Mode>  
                         /image/<EncodedRemoteImageUrl>  
                         /gravity/<Gravity>  
                         /format/<OutputFormat>  
```

以上列出的请求参数详解请参见下表。

参数名称    | 必填| 说明
------------|-------|------------------------------------------------------------
Mode| 是|模式, 1:, 表示`图片水印`  
EncodedRemoteImageUrl   |是| 水印的源路径，目前仅支持远程路径，需要经过 `urlsafe_base64_encode`.  
Gravity |否，默认`NorthEast`| 打水印的位置，目前支持 `NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`,   `South`, `SouthEast`
OutputFormat  | 否，默认`mp4`|指定目标缩略图的输出格式，取值范围：mp4, flv 等视频格式

`urlsafe_base64_encode(string) ` 函数的实现符合 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 标准，开发者可以参考 [https://github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。

视频水印的响应规格如下：

```
200 OK  
Content-Type: <VideoMimeType>
<VideoBinaryData>
```

<a name="vwatermark-examples"></a>
## 视频水印示例

```
[GET] http://api-demo.qiniudn.com/test.mov?vwatermark/1
				/image/aHR0cDovL3Rlc3R1bml0LnFpbml1ZG4uY29tL3Fpbml1bG9nby5wbmc=
				/gravity/NorthEast
				/format/mp4
```

该请求为视频文件`http://api-demo.qiniudn.com/test.mov`打上水印`http://testunit.qiniudn.com/qiniulogo.png`, 水印的位置是右上角，输出格式为`mp4`。
