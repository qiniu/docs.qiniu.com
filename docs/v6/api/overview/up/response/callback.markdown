---
layout: docs
title: 回调
order: 514
---
<a name="callback"></a>
# 回调（callback）

开发者可以要求七牛云存储在某文件上传完成后向特定的URL发起一个回调请求。七牛云存储会将该回调的响应内容作为文件上传响应的一部分一并返回给客户端。回调的流程如下图所示：

![带回调的上传流程](img/upload-with-callback.png)

要启用回调功能，业务服务器在签发上传凭证时需要设置[上传策略]()中的`callbackUrl`字段。如果希望控制回调的内容，还可以同时设置`callbackBody`字段。

<a name="callback-url"></a>
## 回调地址

通过设定上传策略中的`callbackUrl`字段为一个有效的地址，即可让七牛云存储在文件上传完成后向该地址发起回调请求。

该地址可以是一个HTTP或者HTTPS的URL，需要在公网可以访问。可以通过设置该服务器的防盗链白名单为`*。qiniu.com`来防止其他非期望的访问来源。

如果需要传递自定义的请求内容，开发者可以考虑配合使用上传策略中的`callbackBody`字段。如果只有`callbackUrl`而没有`callbackBody`，回调服务器收到的请求内容将为空。

<a name="callback-body"></a>
## 回调内容

同普通客户端直传和重定向上传一样，用户也可以控制回调中传递到客户回调服务器的反馈信息。`callbackBody`的格式如下：

```
<item>=(<magicvar>|<xvar>)[&<item>=(<magicvar>|<xvar>)...]
```

一个典型的`callbackBody`设置如下：

```
put_policy = '{
    ...
    "callbackBody" : "name=$(fname)&hash=$(etag)& \
    location=$(x:location)&price=$(x:price)"
    ...
}'
```

这个 `callbackBody` 中，混合使用了魔法变量和自定义变量。假设应用客户端发出了如下的上传请求：

```
<form method="post" action="http://up.qiniu.com/" 
 enctype="multipart/form-data">
    <input name="key" type="hidden" value="sunflower.jpg">
    <input name="x:location" type="hidden" value="Shanghai">
    <input name="x:price" type="hidden" value="1500.00">
    <input name="token" type="hidden" value="...">
    <input name="file" type="file" />
</form>
```

其中，发送了自定义变量的值`x:location = Shanghai`和`x:price = 1500.00`，且七牛云存储将根据上传资源的实际情况填写魔法变量`$(fname)`和`$(etag)`的值。

完成上传后，七牛云存储便会构造出如下的回调信息：

```
name=sunflower.jpg&hash=Fn6qeQi4VDLQ347NiRm- \
RlQx_4O2&location=Shanghai&price=1500.00
```

之后，再对其进行[URL安全的Base64编码](/api/overview/appendix.html#urlsafe-base64)，结果如下：

```
bmFtZT1zdW5mbG93Z...zZT0xNTAwLjAw
```

这组信息将放置在请求体中，随回调请求发往用户指定的回调服务器。回调服务器将接收到类似以下的请求内容：

> TODO: 确认和修改以下给出的回调请求内容。

```
POST /callback  HTTP/1.1
User-Agent: QiniuCS/1.1
Host: api.examples.com

bmFtZT1zdW5mbG93Z...zZT0xNTAwLjAw
```

如果回调成功，七牛云存储会将接收到类似如下的回调响应内容（这个响应内容由回调服务器实现）：

> TODO: 确认和修改以下给出的回调响应内容。

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
...
```

七牛云存储返回给客户端的上传请求响应中将包含回调响应内容。如下所示：

> TODO: 确认和修改七牛云存储如何反馈回调结果给客户端。

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
...

{
   回调结果在这里？
}
```

如果回调失败，七牛云存储会将返回给应用客户端[HTTP状态码579](/api/reference/codes.html)以及详细的失败信息。

<a name="callback-security"></a>
## 安全性

因为[上传凭证](/api/reference/security/upload-token.html)可有效防止七牛云存储从客户端收到伪造的回调请求，因此回调接受方（通常是业务服务器）可以认为来自七牛云存储的调用是可信的。

但由于回调请求中可能用变量等方式请求一些敏感的用户信息，这个调用过程应识别非可信方的请求，并在必要的时候用HTTPS的方式防止传输中途被截取内容。回调URL直接支持HTTPS协议。

> TODO: 确认回调的完整安全策略。

