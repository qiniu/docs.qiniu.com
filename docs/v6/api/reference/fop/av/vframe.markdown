---
layout: default
title: 视频截图（vframe）
order: 149
---

<a name="video-thumbnail"></a>
# 视频帧缩略图

**请求**

    GET <VideoDownloadURL>?vframe/<Format>
                           /offset/<Second>
                           /w/<Width>
                           /h/<Height>

**响应**

    HTTP/1.1 200 OK
    Body: <ImageBinaryData>

**请求参数详解**

参数   | 说明
-------|--------------------------------------
Format | 要输出的目标缩略图格式，支持 jpg，png
Second | 取视频的第几秒
Width  | 缩略图宽度，范围为 1 ~ 1920
Height | 缩略图高度，范围为 1 ~ 1080

**示例**

示例：取视频第 7 秒的截图，图片格式为 jpg，宽度为 480px，高度为 360px：

    [GET] http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg
                                                     /offset/7
                                                     /w/480
                                                     /h/360

上述示例效果如下：

![Go——基于连接与组合的语言](http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg/offset/7/w/480/h/360)
