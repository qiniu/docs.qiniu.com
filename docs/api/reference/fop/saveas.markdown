---
layout: docs
title: 处理结果另存为（saveas）
order: 185
---
<a name="saveas"></a>
# 处理结果另存为（saveas）

七牛云存储的云处理API满足如下规格:

```
[GET] url?<fop1>|<fop2>|<fop3>|<fopN>
```

云处理操作，是七牛服务器通过相应的处理程序计算而得，我们提供了一个云处理操作`saveas`,来把传入的云处理的结果保存到用户指定的空间内，从而达到云处理结果的持久化保存。
当保存成功后，下一次可直接通过指定的key来访问该资源。

`saveas` 接口的规格如下

```
[GET] url?<fop1>|<fop2>|<fopN>|saveas/<encodedEntryURI>/sign/<sign>
```

**参数**

名称            | 类型   | 必须 | 说明
----------------|--------|------|------------------------------------------------------------------------------
encodedEntryURI | string | 是   | 保存资源的bucket和key，`encodedEntryURI = urlsafe_base64_encode("bucket:key")`
sign            | string | 是   | 生成的签名部分，算法见下方。

<a name="saveas-sample"></a>

## 样例

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

## 备注

- `urlsafe_base64_encode()` 函数按照标准的 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 实现，开发者可以参考 [github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。
- 这里的签名内容是不包含scheme字段，与download token签名不一样。
- 当要持久化保存的fop耗时较长时候，saveas请求会返回CDN超时，但是只要保证发送的saveas请求合法，七牛服务器还是会对请求做正确处理。

