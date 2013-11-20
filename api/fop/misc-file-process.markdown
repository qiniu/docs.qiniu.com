---
layout: api_layout
title: "数据处理(杂项篇)"
---

- [生成二维码](#qr-code)
    - [API 规格](#qrcode-api)
    - [样例](#qrcode-sample)
    - [高级用法](#qrcode-adv)
    - [二维码中的内容](#qrcode-content)
- [云处理结果持久化](#save-as)
    - [样例](#saveas-sample)
    - [备注](#saveas-apx)
- [别名](#alias)


<a name="qr-code"></a>

# 生成二维码 - QR code

生成二维码功能可以为存放在七牛云存储上的资源的url生成一个二维码图片，方便用户在各种客户端之间传播资源。所生成的二维码图片格式为png。

**格式**

    url?qrcode

`url` 代表存储在七牛云存储上的资源，获取url可以参考 [下载接口](get.html) 。

例如，通向本篇文档的二维码图片地址是：

    http://docs.qiniudn.com/api/qrcode.html?qrcode

![通向本篇文档的二维码图片地址](http://docs.qiniudn.com/api/qrcode.html?qrcode)

<a name="qrcode-api"></a>

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

<a name="qrcode-sample"></a>

## 样例

示例1: Mode=0 时，基于 URL 生成二维码

- <http://docs.qiniudn.com/api/qrcode.html?qrcode>

示例2: Mode=1 时，基于 URL 的内容生成二维码

- <http://qrcode.qiniudn.com/qiniu.vcard?qrcode/1>

示例3: 分别用不同的冗余度生成不同尺寸的二维码

- <http://docs.qiniudn.com/api/qrcode.html?qrcode/0/level/L>
- <http://docs.qiniudn.com/api/qrcode.html?qrcode/0/level/H>

以上两个二维码图片尺寸不同，但表示的内容相同。


<a name="qrcode-adv"></a>

### 高级用法

二维码+Logo，可以使用七牛云存储的 [Pipeline API](pipeline.html) 和 [图像水印接口](image-process.html#watermark) 操作实现。例如，

![QRCode+Logo](http://qrcode.qiniudn.com/qiniu.vcard?qrcode/1/level/M|watermark/1/image/aHR0cDovL3FyY29kZS5xaW5pdWRuLmNvbS93ZWlib2xvZ282LnBuZz9pbWFnZU1vZ3IvdGh1bWJuYWlsLzMyeDMy/gravity/center/dx/0/dy/0)

可以右键查看该二维码图片的URL


<a name="qrcode-content"></a>

### 二维码中的内容

二维码中的内容实际上是文本，却可存储多种类型的内容，具体用例可见:

- <https://code.google.com/p/zxing/wiki/BarcodeContents>


<a name="save-as"></a>

## 云处理结果持久化

七牛云存储的云处理API满足如下规格:

    [GET] url?<fop1>|<fop2>|<fop3>|<fopN>

云处理操作，是七牛服务器通过相应的处理程序计算而得，我们提供了一个云处理操作`saveas`,来把传入的云处理的结果保存到用户指定的空间内，从而达到云处理结果的持久化保存。
当保存成功后，下一次可直接通过指定的key来访问该资源。

`saveas` 接口的规格如下

    [GET] url?<fop1>|<fop2>|<fopN>|saveas/<encodedEntryURI>/sign/<sign>


**参数**

名称            | 类型   | 必须 | 说明
----------------|--------|------|------------------------------------------------------------------------------
encodedEntryURI | string | 是   | 保存资源的bucket和key，`encodedEntryURI = urlsafe_base64_encode("bucket:key")`
sign            | string | 是   | 生成的签名部分，算法见下方。

<a name="saveas-sample"></a>

### 样例

1. 原资源是一个图片
 - http://t-test.qiniudn.com/Ship.jpg
2. 将图片做缩略处理 
 - http://t-test.qiniudn.com/Ship.jpg?imageView/2/w/200/h/200
3. 对上述云处理结果进行持久化保存
 - entryURI：`t-test:Ship-thumb.jpg`,那么encodedEntryURI结果为：`dC10ZXN0OlNoaXAtdGh1bWItMjAwLmpwZw==`
 - 需要签名的内容是:`t-test.qiniudn.com/Ship.jpg?imageView/2/w/200/h/200|saveas/dC10ZXN0OlNoaXAtdGh1bWItMjAwLmpwZw==`, 签名方法`urlsafe_base64_encode(hmac_sha1(secretKey,<signContent>))`
4. 完整的请求URL
 - http://t-test.qiniudn.com/Ship.jpg?imageView/2/w/200/h/200|saveas/dC10ZXN0OlNoaXAtdGh1bWItMjAwLmpwZw==/sign/iguImegxd6hbwF8J6ij2dlLIgycyU4thjg-xmu9q:38kMkgw3We96NWSgUHJz9C72noQ=
5. 保存的转码后的资源可通过如下访问
 - http://t-test.qiniudn.com/Ship-thumb-200.jpg


生成saveas请求的完整go代码如下：

```{go}
func makeSaveasUrl(URL, accessKey string, secretKey []byte, saveBucket, saveKey string) string {

	encodedEntryURI := base64.URLEncoding.EncodeToString([]byte(saveBucket+":"+saveKey))

	URL += "|saveas/" + encodedEntryURI

	h := hmac.New(sha1.New, secretKey)
	//签名内容不包括 scheme
	u, _ := url.Parse(URL)
	io.WriteString(h, u.Host + u.RequestURI())
	d := h.Sum(nil)
	sign := accessKey + ":" + base64.URLEncoding.EncodeToString(d)

	return URL + "/sign/" + sign
}
```

<a name="saveas-apx"></a>

### 备注

- `urlsafe_base64_encode()` 函数按照标准的 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 实现，开发者可以参考 [github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。
- 这里的签名内容是不包含scheme字段，与download token签名不一样。
- 当要持久化保存的fop耗时较长时候，saveas请求会返回CDN超时，但是只要保证发送的saveas请求合法，七牛服务器还是会对请求做正确处理。


<a name="alias"></a>

## 别名

如果觉得 `url?<fop1>|<fop2>|<fop3>|<fopN>` 这样的形式够冗长，还可以为这些串行的 `<fop>` 集合定义一个友好别名。如此一来，就可以用友好URL风格进行访问。

我们先来熟悉 [qboxrsctl](/tools/qboxrsctl.html) 的两个命令行，

    // 定义 url 和 fop 之间的分隔符为 separator 
    qboxrsctl separator <bucket> <separator>

    // 定义 fop 的别名为 aliasName
    qboxrsctl style <bucket> <aliasName> <fop>

例如:

    qboxrsctl separator <bucket> "."
    qboxrsctl style <bucket> "jpg" "vframe/jpg/offset/7/w/480/h/360|watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw=="

那么，以下两个 URL 则等价:

原始URL:

- <http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg/offset/7/w/480/h/360|watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==>

友好风格URL:

- <http://open.qiniudn.com/thinking-in-go.mp4.jpg>

