---
layout: default
title: QRSBox 同步工具
---


## 简介

QRSBox 是七牛云存储的Windows GUI版 同步上传客户端，支持大文件上传，增量同步，它可将用户本地的某目录的文件同步到七牛云存储中,QRSBox支持监控目录变化(注意：不会同步删除文件操作)，要删除文件，建议到七牛的 [portal 后台](https://portal.qiniu.com/)去删除，这有点麻烦，但是反过来也有另外的好处，就是你同步完一个文件后，本地就可以直接删除它以释放本地的磁盘空间。。


## 下载

QRSBox 下载地址：

  <http://open.qiniudn.com/qrsbox-v0.6.0.zip>

## 使用方法

下载QRSBox保存至任意位置并解压，进入解压后的文件，双击qrsbox.exe，弹出如下图所求的界面：

<div class="imgwrap"><img src="img/qrsbox-demo.png" alt="qrsbox"/></div>

其中，`access_key` 和 `secret_key` 在七牛云存储平台上申请。步骤如下：

1. [开通七牛开发者帐号](https://portal.qiniu.com/signup)
2. [登录七牛开发者自助平台，查看 Access Key 和 Secret Key](https://portal.qiniu.com/setting/key)

`同步源目录` 是本地需要上传的目录，绝对路径完整表示。这个目录中的所有内容会被同步到指定的 `bucket` 上。注意：Windows 平台上路径的表示格式为：`盘符:/目录`，比如 E 盘下的目录 data 表示为：`e:/data` 。

`空间名(bucket)` 是你在七牛云存储上希望保存数据的 Bucket 名（类似于数据库的表），这个自己选择一个合适的就可以，要求是只能由字母、数字、下划线等组成。

