---
layout: api_layout
title: "数据处理(管道篇)"
---


已知，七牛云存储的云处理API满足如下规格:

    [GET] url?<fop>

即基于文件的 URL 通过问号传参来实现即时云处理，`<fop>` 表示 API 指令及其所需要的参数，是 File Operation 的缩写，表示文件处理。

那么，将一个资源经由多个 `<fop>` 链式处理，各 `<fop>` 之间用竖线（`|`）分割，我们称之为 Pipeline API。也称之为管道操作，熟悉 Linux 命令行的开发者可能会有更透彻的理解。

Pipeline API 规格如下

	[GET] url?<fop1>|<fop2>|<fop3>|<fopN>

`url` 获取可以参考 [下载接口](get.html)


## 样例

### 例1: 将一个原图缩略，然后在缩略图上打上另外一个图片作为水印

- 原图
	- <http://qiniuphotos.qiniudn.com/gogopher.jpg>
- 基于原图生成缩略图
	- <http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/h/200>
- 在生成的缩略图之上打水印
	- <http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/h/200|watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==>

### 例2: 从视频中提取某一帧生成缩略图，然后基于该缩略图打水印

- 视频
	- <http://open.qiniudn.com/thinking-in-go.mp4>
- 提取视频帧并生成缩略图
	- <http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg/offset/7/w/480/h/360>
- 在生成的缩略图之上打水印
	- <http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg/offset/7/w/480/h/360|watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==>


