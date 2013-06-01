---
layout: default
title: "生成二维码 - QR code"
---

**格式**

    url?qrcode

`url` 代表存储在七牛云存储上的资源，获取url可以参考 [下载接口](get.html) 。

例如，通向本篇文档的二维码图片地址是：

    http://docs.qiniudn.com/api/qrcode.html?qrcode

![通向本篇文档的二维码图片地址](http://docs.qiniudn.com/api/qrcode.html?qrcode)

## API 规格

**请求**

    [GET] url?qrcode/<Mode>/level/<Level>

**响应**

    HTTP/1.1 200 OK
    Body: <QRcodeImageBinary>

**请求参数详解**

参数  | 必须 | 说明
------|------|------
Mode  | 否   | 可选值`0`或`1`，缺省为`0`。`0`表示以当前url生成二维码，`1`表示以当前URL中的数据生成二维码。
Level | 否   | 冗余度，可选值 `L`、`M`、`Q`，或 `H`，缺省为 `L`

**Level**

值 | 冗余度
---|-------
L  | 7%
M  | 15%
Q  | 25%
H  | 30%

L 是最低级别的冗余度，H 最高，冗余度越高，生成的图片体积越大。具体参见 [维基百科](http://en.wikipedia.org/wiki/QR_code#Error_correction)


## 样例

示例1: Mode=0 时，基于 URL 生成二维码

- <http://docs.qiniudn.com/api/qrcode.html?qrcode>

示例2: Mode=1 时，基于 URL 的内容生成二维码

- <http://qrcode.qiniudn.com/qiniu.vcard?qrcode/1>

示例3: 分别用不同的冗余度生成不同尺寸的二维码

- <http://docs.qiniudn.com/api/qrcode.html?qrcode/0/level/L>
- <http://docs.qiniudn.com/api/qrcode.html?qrcode/0/level/H>

以上两个二维码图片尺寸不同，但表示的内容相同。


### 高级用法

二维码+Logo，可以使用七牛云存储的 [Pipeline API](pipeline.html) 和 [图像水印接口](image-process.html#watermark) 操作实现。例如，

![QRCode+Logo](http://qrcode.qiniudn.com/qiniu.vcard?qrcode/1/level/M|watermark/1/image/aHR0cDovL3FyY29kZS5xaW5pdWRuLmNvbS93ZWlib2xvZ282LnBuZz9pbWFnZU1vZ3IvdGh1bWJuYWlsLzMyeDMy/gravity/center/dx/0/dy/0)

可以右键查看该二维码图片的URL


### 二维码中的内容

二维码中的内容实际上是文本，却可存储多种类型的内容，具体用例可见:

- <https://code.google.com/p/zxing/wiki/BarcodeContents>
