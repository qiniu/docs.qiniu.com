---
layout: api_layout
title: 内置数据处理功能
order: 250
---

<a name="builtin-fop"></a>
## 内置数据处理功能

为了有效提升开发者的工作效率，七牛云存储已经提供了大量非常有价值的内置数据处理功能。

### 图片处理

图片处理包括各种规格的缩略和裁剪，具体请参见[图片处理规格](/api/reference/fop/image.html)。

### 水印

开发者可以在任何一张图片上按指定位置叠加一个水印。具体请参见[水印规格](/api/reference/fop/watermark.html)。

### 音频

七牛云存储服务内置了音频的转码等相关的数据处理功能。具体请参见[音频处理规格](/api/reference/fop/audio.html)。

### 视频

七牛云存储服务内置了视频的转码、截图等相关的数据处理功能。具体请参见[视频处理规格](/api/reference/fop/video.html)。

因为视频处理是非常耗时的操作，因此应使用异步数据处理机制。请参见[异步数据处理](/api/overview/fop/persistent-fop.html)。

### 视频水印

七牛云存储服务内置了对视频打水印的功能。具体请参见[视频水印规格](/api/reference/fop/video-watermark.html)。

### 其他

还内置了一部分其他可能有用的数据处理功能，比如对一个URL生成二维码。具体请参见[其他数据处理](/api/reference/fop/misc.html)。
