---
layout: default
title: 七牛云存储API使用指南
---

七牛云存储提供了一套完整的API。这些API是七牛云存储对外服务的核心，包括文件上传下载，文件管理，云处理等大类，涵盖了七牛云存储所有的在线服务。这些服务具体包括：

1. [上传](http://docs.qiniu.com/api/put.html)
1. [下载](http://docs.qiniu.com/api/get.html)
1. [文件管理](http://docs.qiniu.com/api/file-handle.html)
1. [图像处理](http://docs.qiniu.com/api/image-process.html)
1. [音频/视频/流媒体处理](http://docs.qiniu.com/api/audio-video-hls-process.html)
1. [生成二维码 - QR code](http://docs.qiniu.com/api/qrcode.html)
1. [Markdown 转 HTML](http://docs.qiniu.com/api/markdown-convert.html)
1. [Pipeline API](http://docs.qiniu.com/api/pipeline.html)

通常情况下，我们建议用户优先考虑使用[SDK](http://docs.qiniu.com/sdk/index.html)。SDK是API的包装，处理了大部分琐碎的细节，可以更加快捷方便地使用七牛云存储的服务。但是在有些情况下，SDK无法满足需求，用户可以直接使用API访问服务。

我们同样鼓励用户七牛云存储API之上开发自己的SDK，并且分享出来，同其他用户和七牛一起，共同学习和发展。
