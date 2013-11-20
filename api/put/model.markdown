---
layout: api_layout.html
title: "上传模型"
---

<a name="upload-basic"></a>

# 资源上传基础

七牛云存储用于资源上传的域名是： `up.qiniu.com` 。七牛云存储特有的上传加速系统会将此域名解析到与上传客户端之间链路最好的数据中心，保证用户可以获得最佳的上传效果。

七牛云存储的资源上传基于HTTP协议，通过HTTP POST指令实现。上传指令参数采用 `multipart/form-data` 数据格式组织。采用该格式使得用户可以使用HTML Form向七牛云存储直接上传文件。

在资源上传的基础上，七牛云存储还提供一组与上传有关的附加功能，包括：

1. [用户定义返回值](#return-body)；
1. [客户端重定向](#redirect-upload)；
1. [回调](#callback-upload)；
1. [音视频转码结果持久化](#uploadToken-persistentOps)；

这些功能极大地方便了用户对上传资源的处理，使得用户可以在一次资源操作中完成较为复杂的业务处理。
