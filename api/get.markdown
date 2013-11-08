---
layout: default
title: "资源下载"
---

- [下载协议](#download-proto)
- [下载反馈](#download-response)
- [公有资源下载](#public-download)
- [私有资源下载](#private-download)
    - [下载授权凭证](#download-token)
    - [私有资源下载流程](#private-download-proc)
- [自定义 404 Not Found](#define-404-not-found)
- [自定义资源下载时所保存的名称](#define-download-friendly-name)
- [特殊key资源下载](#unusual-key-download)


用户在七牛云存储的[空间](http://docs.qiniu.com/api/v6/terminology.html#Bucket)有两种保护状态：公开（public）和私有（private）。当用户下载资源的时候，需要对这两种状态采用不同的访问方式。公开资源可以使用[资源名](http://docs.qiniu.com/api/v6/terminology.html#Key)和空间名构造出URL，直接下载，无需签名授权。私有资源则需要用户对资源访问URL做认证签名，向资源下载方授权。

另外，七牛云存储的空间还可以设置成为[原图保护](http://docs.qiniu.com/api/v6/terminology.html#Origin-Protect)。在这种特殊的模式下，空间内保存的“原图”（即用户上传的原始资源），需要像私有资源那样受权访问。而这些“原图”通过用户指定的云处理生成的派生资源，可以如同公开资源那样直接访问，无需授权。


<a name="download-proto"></a>

## 下载协议

七牛云存储的资源下载采用 `HTTP GET` 实现。下载所需的参数都放置在URL的 `Query String` 里：

```
  http://<domain>/<key>?<param1>=<value1>&<param2>=<value2>...
```

七牛云存储支持断点续下载，用户可以通过标准的HTTP头 `Range` 指定下载范围：

```
  Range: bytes=<first-byte-pos>-<last-byte-pos>
```

详见[RFC2616 标准](<http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35>)。

<a name="download-response"></a>

## 下载反馈

资源下载启动后，如果一切正常，HTTP Response将反馈 `HTTP 2XX` 系列状态码，并携带数据返回客户端。

如果发生错误，HTTP Response将反馈相应的错误状态码，并在Response Body中携带具体的错误信息。

除资源数据，或错误信息外，资源下载的反馈还会携带一些Header，包括：`Content-Type`、`Content-Length`、`ETag`、`X-Log`、`X-Reqid` 等。其中，`X-Reqid` 是下载请求的唯一标识，通过它可以追踪整个请求的执行过程，帮助用户排查问题。 `X-Log` 是用户请求的缩略日志，可用于快速定位问题。


<a name="public-download"></a>

## 公有资源下载

公有资源下载非常简单，直接通过 "GET" 资源URL便可完成。

用户存放在七牛云存储的资源都可以由一个URL唯一标识。这个URL构成如下：

```
  http://<domain>/<key>
```

`<domain>` 有两种形态：七牛二级域名和用户自定义域名。

七牛二级域名是一个空间默认的域名，用户可以在[开发者平台](https://portal.qiniu.com)中的空间设置的“域名设置”一节中获得空间对应的域名。假设用户的域名为： `my-bucket.qiniudn.com` 。用户可以通过 `http://my-bucket.qiniu.com/sunflower.jpg` 下载名为 `sunflower.jpg` 的资源。

用户可以将一个自己的域名绑定到一个资源空间，一旦绑定成功，便可以通过这个域名访问空间内的资源。比如，用户将 `www.my-blog-base.com` 同 `my-bucket` 空间绑定，之后便可以通过此域名访问： `http://www.my-blog-base.com/sunflower.jpg` 。


**流程**

下图展示了公有资源下载的基本流程

![公开资源下载](img/public-download.png)

流程说明：

1. 应用客户端构造资源的URL
1. 应用客户端向七牛云存储发送下载请求（HTTP GET）
1. 七牛云存储向应用客户端反馈结果。如果发生错误，则反馈相应的 [HTTP 状态码](http://docs.qiniu.com/api/v6/errno.html)


<a name="private-download"></a>

## 私有资源下载

当用户将空间设置成私有后，所有对空间内资源的访问都必须获得授权。

私有资源下载也是通过一个URL完成。与公有资源下载不同的是，URL中增加了 `e` 和 `token` 两个参数，分别用于放置URL的过期时间和[下载凭证（Download Token）](#download-token)：

```
  http://<domain>/<key>?e=<deadline>&token=<downloadToken>
```

实际上，私有资源下载使用的URL就是在公有资源下载URL后加上 `e` 和 `token` 两个参数。

参数 `e` 表示URL的过期时间，采用[Unix时间](http://en.wikipedia.org/wiki/Unix_time)。当此参数指定的时间一过，URL随即失效，七牛云存储将视此URL为无效请求，任何人都无法凭此URL访问所指的资源。需要注意的是，如果发起请求的应用客户端，或应用服务器的时钟偏离标准Unix时间，那么可能会造成URL尚未使用便已过期。所以， **应用客户端或应用服务器的时钟应当同Unix时间校准。**

参数 `token` 携带下载凭证。下载凭证是对资源访问的授权，通过对请求的签名，确保下载请求是获得资源所有者的合法授权的。

<a name="download-token"></a>

**下载凭证**

下载凭证是对下载URL中，除 `token` 参数以外的部分的加密签名。整个过程并不复杂：

1. 构造出资源的URL：

    ```
      http://my-bucket.qiniu.com/sunflower.jpg
    ```

1. 接着，加上URL的过期时间：

    ```
      http://my-bucket.qiniu.com/sunflower.jpg?e=1451491200
    ```

1. 然后，对所得的URL进行HMAC-SHA1的加密，密钥是用户的SecretKey，并做[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)：

    ```
      urlsafe_base64_encode(hmac_sha1(
        secret_key, 
        "http://my-bucket.qiniu.com/sunflower.jpg?e=1451491200"
      ))

      得到

      HbAKtTogKqDLWEkq7zVSX6T35NI=
    ```

1. 最后，将生成的签名串同AccessKey按照 `<AccessKey>:<SignedString>` 的格式连接起来最终得到下载凭证：

    ```
      j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo:HbAKtTogKqDLWEkq7zVSX6T35NI=
    ```

在下载资源时，把下载凭证作为 `token` 参数追加至URL的尾部：

```
    http://my-bucket.qiniu.com/sunflower.jpg?e=1451491200&token=j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo:HbAKtTogKqDLWEkq7zVSX6T35NI=
```

七牛云存储收到此请求后，会从URL中分离出 `token` ，对其余部分执行签名算法，以验证URL的合法性。同时，七牛云存储还将验证URL是否过期。

**注意：** `token` 应当位于整个URL的最后，作为最后一个参数。



<a name="private-download-proc"></a>

**私有资源下载流程**

![私有资源下载](img/private-download.png)

1. 应用客户端向应用服务器请求私有资源的下载授权；
1. 应用服务器根据应用客户端的请求，构造出资源URL，并且设定过期时间；
1. 应用服务器使用下载凭证签名算法，对URL签名；
1. 应用服务器将完整的下载URL反馈给应用客户端；
1. 应用客户端向七牛云存储发送下载请求；
1. 七牛云存储向应用客户端返回资源数据，或者错误信息。



<a name="define-404-not-found"></a>

## 自定义 404 Not Found

七牛云存储支持自定义 404 Not Found 处理，当一个资源不存在，可以让该请求命中一个缺省的资源。该资源可以是一张图片，也可以是一段HTML等。

要实现自定义 404 Not Found，只需向指定的 bucket (存储空间) 上传一个 key 为 `errno-404` 的文件即可。



<a name="define-download-friendly-name"></a>

## 自定义资源下载时所保存的名称

    [GET] \<url\>?download/\<file name\>

如上 API 规格，`download` 是一个指令，通知七牛云存储资源下载时，触发浏览器进行文件下载，而不是作为页面展示。`<file name>` 是该 fop 指令的参数，表示下载资源保存在本地的文件名称。

当收到此指令时，七牛云存储会在反馈中增加一个 `Content-Disposition: attachment;filename="<file name>"` Header。此Header将促使浏览器对资源进行下载。下面的例子演示了 `download` 指令的使用：

  [http://qiniuphotos.qiniudn.com/gogopher.jpg?download/test.jpg](http://qiniuphotos.qiniudn.com/gogopher.jpg?download/test.jpg)

<a name="unusual-key-download"></a>

## 特殊key资源下载

特殊key指key中包含了url保留，如'?'、首字符为'/'、以及多个连续的'/'等。关于此类资源的访问，请参考：[特殊key资源的访问](http://kb.qiniu.com/52slk76w)
