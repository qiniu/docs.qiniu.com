---
layout: default
title: "给视频加水印"
---

**请求**

	[GET] <VideoDownloadURL>?vwatermark/<Mode>  
                             /image/<EncodedRemoteImageUrl>  
                             /gravity/<Gravity>  
                             /format/<OutputFormat>  

**请求参数详解**

参数名称    | 必填| 说明
------------|-------|------------------------------------------------------------
Mode| 是|模式, 1:, 表示`图片水印`  
EncodedRemoteImageUrl   |是| 水印的源路径，目前仅支持远程路径，需要经过 `urlsafe_base64_encode`.  
Gravity |否，默认`NorthEast`| 打水印的位置，目前支持 `NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`,   `South`, `SouthEast`
OutputFormat  | 否，默认`mp4`|指定目标缩略图的输出格式，取值范围：jpg, gif, png, webp 等图片格式

`urlsafe_base64_encode(string) ` 函数的实现符合 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 标准，开发者可以参考 [https://github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。

**响应**

	200 OK  
	Content-Type: <VideoMimeType>
	<VideoBinaryData>

**示例**

	[GET] http://api-demo.qiniudn.com/test.mov?vwatermark/1
						/image/aHR0cDovL3Rlc3R1bml0LnFpbml1ZG4uY29tL3Fpbml1bG9nby5wbmc=
						/gravity/SouthEast
						/format/mp4

为视频`http://open.qiniudn.com/thinking-in-go.mp4`打上水印`http://testunit.qiniudn.com/qiniulogo.png`, 水印的位置是右下角(东南)，输出格式为`mp4`


