---
layout: api_layout
title: 图片EXIF信息（exif）
order: 172
---

<a name="exif"></a>
## 图片EXIF信息（exif）

EXIF (Exchangeable Image File Format)，是专门为数码相机的照片设定的可交换图像文件格式。详情参见[EXIF](http://zh.wikipedia.org/wiki/EXIF)。

**请求**

    GET <ImageDownloadURL>?exif

**响应**

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

    {
        // ...EXIF Data...
    }

**示例**

获取图片EXIF信息样例(在WEB浏览器中输入以下图片地址)

    http://qiniuphotos.qiniudn.com/gogopher.jpg?exif

结果

	{"ApertureValue":{"val":"5.00 EV (f/5.7)","type":5},"ColorSpace":{"val":"sRGB","type":3},"ComponentsConfiguration":{"val":"- - - -","type":7},"CustomRendered":{"val":"正常过程","type":3},"DateTime":{"val":"2011:11:19 17:09:23","type":2},"DateTimeDigitized":{"val":"2011:11:19 17:09:23","type":2},"DateTimeOriginal":{"val":"2011:11:19 17:09:23","type":2},"ExifVersion":{"val":"未知的Exif版本","type":7},"ExposureBiasValue":{"val":"0.33 EV","type":10},"ExposureMode":{"val":"自动曝光","type":3},"ExposureProgram":{"val":"光圈优先","type":3},"ExposureTime":{"val":"1/50 sec.","type":5},"FNumber":{"val":"f/5.6","type":5},"Flash":{"val":"Flash did not fire, compulsory flash mode","type":3},"FlashPixVersion":{"val":"FlashPix版本 1.0","type":7},"FocalLength":{"val":"45.0 mm","type":5},"FocalPlaneResolutionUnit":{"val":"英寸","type":3},"FocalPlaneXResolution":{"val":"5728.18","type":5},"FocalPlaneYResolution":{"val":"5808.40","type":5},"ISOSpeedRatings":{"val":"3200","type":3},"Make":{"val":"Canon","type":2},"MaxApertureValue":{"val":"5.19 EV (f/6.0)","type":5},"MeteringMode":{"val":"样式","type":3},"Model":{"val":"Canon EOS 600D","type":2},"Orientation":{"val":"Top-left","type":3},"PixelXDimension":{"val":"640","type":4},"PixelYDimension":{"val":"427","type":4},"ResolutionUnit":{"val":"英寸","type":3},"SceneCaptureType":{"val":"标准","type":3},"ShutterSpeedValue":{"val":"5.62 EV (1/49 sec.)","type":10},"SubSecTimeDigitized":{"val":"11","type":2},"SubSecTimeOriginal":{"val":"11","type":2},"SubsecTime":{"val":"11","type":2},"WhiteBalance":{"val":"自动白平衡","type":3},"XResolution":{"val":"72","type":5},"YResolution":{"val":"72","type":5}}
