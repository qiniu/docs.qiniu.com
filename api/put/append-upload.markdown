---
layout: api_layout.html
title: "资源上传"
---


- [资源上传基础](#upload-basic)
    - [上传协议](#upload-proto)
    - [在HTML页面中上传资源](#html-form-post)
    - [非HTML客户端上传](#multipart)
    - [上传参数](#parameters)
    - [上传策略（PutPolicy）](#put-policy)
    - [上传凭证（Upload Token）](#upload-token)
    - [上传请求的反馈](#response)
        - [基本反馈](#basic-resp)
        - [Return Body](#return-body)
        - [Callback Body](#callback-body)
        - [重定向的反馈](#redirect-response)
    - [魔法变量（MagicVariables）](#MagicVariables)
    - [自定义变量（xVariables）](#xVariables)
- [上传资源](#do-upload)
    - [本地上传](#local-upload)
    - [普通客户端直传](#direct-upload)
    - [重定向上传](#redirect-upload)
    - [回调上传](#callback-upload)
    - [转码结果持久化（Persistent-Ops）](#uploadToken-persistentOps)
- [断点续传](#resumble-up)
    - [概述](#resumble-gen)
    - [上传流程](#resumble-alg)
    - [分割文件](#file-blob)
    - [上传块](#mkblk)
    - [生成文件](#rs-mkfile)
    - [示例](#resumble-demo)

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

<a name="upload-proto"></a>

## 上传协议

七牛云存储的资源上传使用[HTML Form POST](http://www.w3.org/TR/html4/interact/forms.html)，采用[multipart/form-data](http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.2)数据格式。

实际操作中，有两种方式。一种是在HTML页面中上传文件，另一种是在非HTML页面客户端上传。

<a name="html-form-post"></a>

### 在HTML页面中上传资源

当用户的上传客户端是HTML页面时，可以直接使用 `form` 元素构造和发起资源上传请求。一个典型的上传HTML片段如下：

```
<form method="post" action="http://up.qiniu.com/" enctype="multipart/form-data">
  <input name="key" type="hidden" value="<resource key>">
  <input name="x:<custom_field_name>" type="hidden" value="<custom value>">
  <input name="token" type="hidden" value="<token>">
  <input name="file" type="file" />
  ...
</form>
```

资源上传所需的参数在 `input` 元素中设置。这些参数详见[资源上传参数](#parameters)小节中详细介绍。需要说明的是，名称为 `x:<custom_field_name>` （即[自定义变量](#xVariables)）的参数可以不止一个，用户可以根据需要填写任意多个，满足业务逻辑的需要。

当form的[submission](http://www.w3.org/TR/html4/interact/forms.html#h-17.13)被触发时，浏览器会将所有 `input` 的内容打包成 `multipart/form-data` 数据格式，发送至七牛云存储，完成一次上传操作。

<a name="multipart"></a>

### 非HTML客户端上传

如果上传客户端不是HTML页面，那么用户就需要模仿浏览器，将参数组织成 `multipart/form-data` 格式。该格式的大体形态如下：

```
POST http://up.qiniu.com/
Content-Type: multipart/form-data; boundary=<Boundary>
--<Boundary>

Content-Disposition: form-data; name="key"
<FileID>
--<Boundary>

Content-Disposition: form-data; name="x:custom_field_name"
<SomeVal>
--<Boundary>

Content-Disposition: form-data; name="token"
<UploadToken>
--<Boundary>

...

Content-Disposition: form-data; name="file"; filename="<FileName>"
Content-Type: <MimeType>

<FileContent>
--<Boundary>--
```

用户可以手工地构造出 `multipart/form-data` 数据。但更好的方式是使用七牛云存储提供的多种[SDK](http://docs.qiniu.com/sdk/index.html)，简单快速地完成上传操作。此外，也有很多HTTP客户端组件、库和工具可以帮助用户快速构造 `multipart/form-data` 数据，在用户需要直接访问七牛云存储API的时候使用。

<a name="parameters"></a>

## 上传参数

上传参数包括两类，一类是服务参数，有三个，分别是：key、token和file。三者具体的含义参考以下表格。另一类是用户[自定义变量](#xVariables)，即xVariable。用户可以通过 `x:<custom_field_name>` 参数将其传递到七牛云存储。七牛云存储根据[returnBody 或 callbackBody](#put-policy)的设置，构造出回调结果。

名称        | 类型   | 必须 | 说明
------------|--------|------|-------------------------------------
token       | string | 是   | 上传授权凭证 - [UploadToken](#upload-token)
file        | file   | 是   | 文件本身
key         | string | 否   | 资源名，所在的资源空间内唯一。key可包含`/`。若不指定 key，七牛云存储将使用文件的 etag（即上传成功后返回的hash值）作为key，并在返回结果中传递给客户端。资源名必须采用 **utf8编码** ，非utf8编码的资源名在访问七牛云存储将会反馈错误。
x:\<custom_field_name\> | string | 否 | [自定义变量](#xVariables)，必须以 `x:` 开头命名，不限个数。里面的内容将在 `callbackBody` 参数中的 `$(x:custom_field_name)` 求值时使用。


<a name="put-policy"></a>

## 上传策略（PutPolicy）

上传策略是资源上传时的一组配置设定。通过这组配置信息，七牛云存储可以了解用户上传的需求：它将上传什么资源，上传到哪个空间，是否需要回调，还是使用重定向，是否需要设置反馈信息的内容，以及请求的失效时间等等。

上传策略同时还参与请求验证。实际上，[上传凭证（Upload Token）](#upload-token)就是上传策略的加密结果。通过对PutPolicy的加密，可以确保用户对某个资源的上传请求是完全受到验证的。

上传策略的具体构成如下：

```
{
    scope: <Bucket string>,
    deadline: <UnixTimestamp int64>,
    endUser: <EndUserId string>,
    returnUrl: <RedirectURL string>,
    returnBody: <ResponseBodyForAppClient string>,
    callbackBody: <RequestBodyForAppServer string>
    callbackUrl: <RequestUrlForAppServer string>,
    persistentOps: <persistentOpsCmds string>,
    persistentNotifyUrl: <persistentNotifyUrl string>
}
```

**参数详解** ：

 字段名       | 必须 | 说明
--------------|------|-----------------------------------------------------------------------
 scope        | 是   | 用于指定文件所上传的目标资源空间（Bucket）和资源名（Key）。格式为：\<bucket name\>\[:\<key\>\]。若只指定Bucket名，表示文件上传至该Bucket。若同时指定了Bucket和Key（\<bucket name\>:\<key\>），表示上传文件限制在指定的Key上。两种形式的差别在于，前者是“新增”操作：如果所上传文件的Key在Bucket中已存在，上传操作将失败。而后者则是“新增或覆盖”操作：如果Key在Bucket中已经存在，将会被覆盖；如不存在，则将文件新增至Bucket中。**注意：资源名必须采用utf8编码，非utf8编码的资源名在访问七牛云存储将会反馈错误。**
 deadline     | 是   | 定义上传请求的失效时间，[Unix时间戳](http://en.wikipedia.org/wiki/Unix_time)，单位为秒。
 endUser      | 否   | 给上传的文件添加唯一属主标识，特殊场景下非常有用，比如根据App-Client标识给图片或视频打水印
 returnUrl    | 否   | 设置用于浏览器端文件上传成功后，浏览器执行301跳转的URL，一般为`HTML Form`上传时使用。文件上传成功后会跳转到`returnUrl?query_string`, `query_string`会包含 `returnBody` 内容。
 returnBody   | 否   | 文件上传成功后，自定义从七牛云存储最终返回給终端 App-Client 的数据。支持 [魔法变量](#MagicVariables)和[自定义变量](#xVariables)。
 callbackBody | 否   | 文件上传成功后，七牛云存储向 App-Server 发送POST请求的数据。支持 [魔法变量](#MagicVariables) 和 [自定义变量](#xVariables)。
 callbackUrl  | 否   | 文件上传成功后，七牛云存储向 App-Server 发送POST请求的URL，必须是公网上可以正常进行POST请求并能响应 HTTP Status 200 OK 的有效 URL 
 persistentOps | 否 | 音/视频文件上传成功后异步地执行的预转码持久化指令。每个预转指令是一个API规格字符串，多个预转指令可以使用分号`;`隔开。具体指令请参考[fop](http://docs.qiniu.com/api/v6/gen-use.html#fop) 
 persistentNotifyUrl | 否 | 七牛云存储向 App-Server 发送转码持久化结果的URL，必须是公网上可以正常进行POST请求并能响应 HTTP Status 200 OK 的有效 URL。

**注意**

- `callbackUrl` 与 `returnUrl` 不可同时指定，两者只可选其一。
- `callbackBody` 与 `returnBody` 不可同时指定，两者只可选其一。

<a name="upload-token"></a>

## 上传凭证（Upload Token）

上传凭证是七牛云存储用于验证上传请求合法性的机制。用户通过上传凭证授权客户端，使其具备访问指定资源的能力。

上传凭证算法如下：

1. 构造[上传策略](#put-policy)。用户根据业务需求，确定上传策略的要素，构造出具体的上传策略。比如，有用户需要向空间 `my-bucket` 上传一个名为 `sunflower.jpg` 的图片，有效期是到 `2015-12-31 00:00:00`，并且希望得到图片的名称、大小、宽、高和校验值。那么相应的上传策略的字段分别为：

    ```
    scope = "my-bucket:sunflower.jpg"
    deadline = 1451491200
    returnBody = '{
      "name": $(fname),
      "size": $(fsize),
      "w": $(imageInfo.width),
      "h": $(imageInfo.height),
      "hash": $(etag),
    }'
    ```

1. 将上传策略序列化成为json格式。用户可以使用各种语言的json库，也可以手工地拼接字符串。序列化后，可以得到：

    ```
    put_policy = '{"scope":"my-bucket:sunflower.jpg","deadline":1451491200,"returnUrl":"{\"name\": $(fname),\"size\": $(fsize),\"w\": $(imageInfo.width),\"h\": $(imageInfo.height),\"hash\": $(etag),}"}'
    ```

1. 对json序列化后的上传策略进行[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)：

    ```
    encoded = urlsafe_base64_encode(put_policy)
    ```

    得到

    ```
    "eyJzY29wZSI6Im15LWJ1Y2tldDpzdW5mbG93ZXIuanBnIiwiZGVhZGxpbmUiOjE0NTE0OTEyMDAsInJldHVyblVybCI6IntcIm5hbWVcIjogJChmbmFtZSksXCJzaXplXCI6ICQoZnNpemUpLFwid1wiOiAkKGltYWdlSW5mby53aWR0aCksXCJoXCI6ICQoaW1hZ2VJbmZvLmhlaWdodCksXCJoYXNoXCI6ICQoZXRhZyksfSJ9"
    ```

1. 用SecretKey对编码后的上传策略进行HMAC-SHA1加密，并且做URL安全的Base64编码：

    ```
    signature = hmac_sha1(SecretKey, encoded)
    encode_signed = urlsafe_base64_encode(signature)
    ```

    假设用户的 `SecretKey="Yx0hNBifQ5V5SqLUkzPkjyy0pbYJpav9CH1QzkG0"` 加密后的结果是：

    ```
    "5Cr3Nrw0qkyYKfQicd_ejAdIrfs="
    ```

1. 最后，将 `AccessKey`、`encode_signed` 和 `encoded` 用 “:” 连接起来：

    ```
    upload_token = AccessKey + ":" + encode_signed + ":" + encoded
    ```
    
    假设用户的 `AccessKey="j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo"` 。最后得到的上传凭证为：

    ```
    j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo:5Cr3Nrw0qkyYKfQicd_ejAdIrfs=:eyJzY29wZSI6Im15LWJ1Y2tldDpzdW5mbG93ZXIuanBnIiwiZGVhZGxpbmUiOjE0NTE0OTEyMDAsInJldHVyblVybCI6IntcIm5hbWVcIjogJChmbmFtZSksXCJzaXplXCI6ICQoZnNpemUpLFwid1wiOiAkKGltYWdlSW5mby53aWR0aCksXCJoXCI6ICQoaW1hZ2VJbmZvLmhlaWdodCksXCJoYXNoXCI6ICQoZXRhZyksfSJ9
    ```


<a name="response"></a>

## 上传请求的反馈

上传请求的反馈是标准的 [HTTP Response](http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html)，遵循 HTTP/1.1 标准[Status Code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1.1)。 Response Body 则包含七牛云存储的反馈信息。反馈信息以[json](http://www.json.org/)格式组织。

<a name="basic-resp"></a>

### 基本反馈

当用户的资源上传请求得到正确执行，七牛云存储会反馈成功，Status Code 200。Response Body中携带两个值：

- `name`：已成功上传的资源名，即Key；
- `hash`：已上传资源的校验码，供用户核对使用。

以下是一个典型的上传成功反馈：

```
  HTTP/1.1 200 OK
  Content-Type: application/json
  Cache-Control: no-store
    ...
  Response Body: {
    "name": "gogopher.jpg",
    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
  }
```

当用户的资源上传请求出现错误，七牛云存储会反馈相应的错误码。比如，401代表验证失败。此时，Response Body中携带具体的错误信息。错误信息同样以 json 格式组织，基本形式为：{"error":"\<reason\>"}

以下是一个典型的上传失败反馈：

```
  HTTP/1.1 400 Bad Request
  Date: Mon, 05 Aug 2013 13:56:34 GMT
  Server: nginx/1.0.14
  Content-Type: application/json
  Access-Control-Allow-Origin: *
  Content-Length: 28
  X-Log: MC;SBD:10;RBD:11;BDT:12;FOPD/400;FOPG:63/400;IO:109/400
  X-Reqid: -RIAAIAI8UjcgRcT
  X-Via: 1.1 jssq179:8080 (Cdn Cache Server V2.0), 1.1 jsyc96:9080 (Cdn Cache Server V2.0)
  Connection: close
  Response Body: {
    "error":"invalid argument"
  }
```

通过这些错误信息，可以使用户了解问题的所在，以便做进一步处理。关于错误信息，详见[错误信息参考](http://docs.qiniu.com/api/v6/errno.html)。

对于反馈信息，建议用户使用日志加以保存，以便分析和查找问题之用，也方便用户得到我们进一步的技术支持。

除错误信息外，七牛云存储的 Response Header 中也携带了一些有用的信息，有助于问题定位。其中主要有：

1. X-Reqid：上传请求的唯一id。通过这个id，七牛云存储可以快速查找到用户请求的相关记录。当用户在使用七牛云存储遇到问题时，可以通过该id，获得更多的信息；
1. X-Log：用户请求的日志缩略信息。通过这些信息，七牛云存储可以大致地获得用户请求的执行情况，帮助用户定位问题。

<a name="return-body"></a>

### Return Body

基本的上传反馈只会包含资源最基本的信息。很多情况下，用户希望得到更多有关资源的信息。用户可以通过七牛云存储提供管理操作（Status）操作，和云处理操作，获得这些扩展信息。但需要用户另外发起请求，查询这些资源。为了方便用户的使用，七牛云存储可以在上传请求中直接向用户反馈这些额外的信息。

用户可以通过 `returnBody` 参数指定需要返回的信息，比如资源的大小、类型，图片的尺寸等等。`returenBody` 实际上是一个用户定义的反馈信息模板。下面是一个returnBody的案例：

```
  {
    "foo": "bar",
    "name": $(fname),
    "size": $(fsize),
    "type": $(mimeType),
    "hash": $(etag),
    "w": $(imageInfo.width),
    "h": $(imageInfo.height),
    "color": $(exif.ColorSpace.val)
  }
```

`returnBody` 同真正的返回信息一样，也是json格式。在 `returnBody` 中，用户通过设定所谓[魔法变量（MagicVariable）](#MagicVariables)，通知七牛云存储反馈哪些信息。“魔法变量”采用 `$(<variable-name>)` 的形式，在反馈信息中占位。七牛云存储会根据变量名，将相应的数据替换“魔法变量”，反馈给用户：

```
  {
    "foo": "bar",
    "name": "gogopher.jpg",
    "size": 214513,
    "type": "image/jpg",
    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
    "w": 640,
    "h": 480,
    "color": "sRGB"
  }
```

`returnBody` 在普通客户端直传和重定向上传中都可以使用，但不能在回调上传时使用。回调上传时应该使用callbackBody。实际上，一旦设置了callbackUrl，启用回调上传，`returnBody` 也就不再起作用了。

<a name="callback-body"></a>

### Callback Body

同普通客户端直传和重定向上传一样，用户也可以控制回调中传递到客户回调服务器的反馈信息。`callbackBody` 的格式如下：

```
  <item>=(<magic variable>|<x variable>)[&<item>=(<magic variable>|<x variable>)...]
```

一个典型的 `callbackBody` 设置如下：

```
  put_policy = '{
    ...
    "callbackBody" : "name=$(fname)&hash=$(etag)&location=$(x:location)&=$(x:prise)"
    ...
  }'
```

这个 `callbackBody` 中，混合使用了魔法变量和自定义变量。假设应用客户端发出了如下的上传请求：

```
  <form method="post" action="http://up.qiniu.com/" enctype="multipart/form-data">
    <input name="key" type="hidden" value="sunflower.jpg">
    <input name="x:location" type="hidden" value="Shanghai">
    <input name="x:prise" type="hidden" value="1500.00">
    <input name="token" type="hidden" value="...">
    <input name="file" type="file" />
  </form>
```

其中，发送了自定义变量的值 `x:location = Shanghai` 和 `x:prise = Shanghai` ，而魔法变量 `$(fname)` 和 `$(etag)` 七牛云存储将根据上传资源的实际情况求值填写。

七牛云存储完成上传后，便可以构造出回调的反馈信息：

```
  name=sunflower.jpg&hash=Fn6qeQi4VDLQ347NiRm-RlQx_4O2&location=Shanghai&prise=1500.00
```

之后，再对其进行[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)：

```
  bmFtZT1zdW5mbG93ZXIuanBnJmhhc2g9Rm42cWVRaTRWRExRMzQ3TmlSbS1SbFF4XzRPMiZsb2NhdGlvbj1TaGFuZ2hhaSZwcmlzZT0xNTAwLjAw
```

这组信息将放置在请求体中，随回调请求发往用户指定的回调服务器。

在用户使用回调上传时，如果文件上传成功，但七牛云存储回调客户服务器失败，七牛云存储会将回调失败的信息返回给应用客户端, 用户可根据自己的策略进行相应的处理。

<a name="redirect-response"></a>

### 重定向的反馈

当用户构造上传请求时，设置了 `returnUrl` 参数后，便激活了重定向功能。在成功完成上传后，七牛云存储会向客户端反馈 `HTTP 301` 。如果同时也设置了 `returnBody` ，那么七牛云存储会将构造好的反馈信息附加在重定向URL中，反馈给客户端：

```
    HTTP/1.1 301 Moved Permanently
    Location: <returnUrl>?upload_ret=<Encoded-Return-Body>
```

客户端收到这样的反馈，会以 `Location` 所制定的URL执行重定向操作。重定向URL所在的服务器需要解析参数 `upload_return` 所携带的返回信息，进行进一步处理。 `upload_return` 参数值采用[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)。


<a name="MagicVariables"></a>

## 魔法变量（MagicVariables）

魔法变量是七牛云存储同用户交换数据的机制，在 `returnBody` 和 `callbackBody` 中使用。实际上魔法变量是一种占位符，在 `returnBody` 和 `callbackBody` 中占据某一位置，引导七牛云存储构造出用户所需的反馈信息。

魔法变量是一组规定的 API Call，可以使用 `$(APIName)` 或者是 `$(APIName.FieldName)` 的形式进行求值。

目前可用的魔法变量如下:

API 名称  | 子项 | 说明
----------|------|-------------------------------------------
bucket    | 无   | 获得上传目标bucket名字
etag      | 无   | 文件上传成功后的 etag，上传前不指定 key 时，etag 等同于缺省的 key
fname     | 无   | 原始文件名
fsize     | 无   | 文件大小，单位: Byte
mimeType  | 无   | 文件的资源类型，比如 .jpg 图片的资源类型为 `image/jpg`
imageInfo | 有   | 获取所上传图片的基本信息，支持访问子字段
exif      | 有   | 获取所上传图片EXIF信息，支持访问子字段
endUser   | 无   | 获取 uploadToken 中指定的 endUser 选项的值，即终端用户ID
persistentId | 无  | 获取音视频转码持久化的进度查询id

魔法变量支持同 [JSON](http://json.org/) 对象一样的 `<Object>.<Property>` 访问形式，比如：

- \<API名称\>
- \<API名称\>.\<子项\>
- \<API名称\>.\<子项\>.\<下一级子项\>

MagicVariables 求值示例：

- `$(bucket)` - 获得上传目标bucket名字
- `$(etag)` - 获取当前上传文件的 etag
- `$(fname)` - 获取原始文件名
- `$(fsize)` - 获取当前上传文件的大小
- `$(mimeType)` - 获取当前上传文件的资源类型
- `$(imageInfo)` -  获取当前上传图片的基本属性信息
- `$(imageInfo.width)` - 获取当前上传图片的原始高度
- `$(imageInfo.height)` - 获取当前上传图片的原始高度
- `$(imageInfo.format)` -  获取当前上传图片的格式
- `$(endUser)` - 获取 uploadToken 中指定的 endUser 选项的值，即终端用户ID
- `$(exif)` - 获取当前上传图片的 EXIF 信息
- `$(exif.ApertureValue)` - 获取当前上传图片所拍照时的光圈信息
- `$(exif.ApertureValue.val)` - 获取当前上传图片拍照时的具体光圈值

<a name="xVariables"></a>

## 自定义变量（xVariables）

自定义变量是七牛云存储提供的另一种信息交换机制，主要用于应用客户端和应用服务器之间的信息交换。可在 `returnBody` 和 `callbackBodk` 中使用。

在重定向上传和回调上传中，七牛云存储帮助应用客户端将一些信息传递到服务端，减少两者之间的交互。服务端在构造 `returnBody` 和 `callbackBodk` 时，可以加入自定义变量。应用客户端则在上传请求中设定自定义变量的值。七牛云存储收到这些变量信息后，置换掉 `returnBody` 和 `callbackBodk` 中的自定义变量设置，形成最终的反馈结果。

自定义变量的形式同魔法变量一样，只是变量名必须以 `x:` 开始。下面是一个自定义变量的案例：

用户设置了如下的 `callbackBody` ：

```
  put_policy = '{
    ...
    "callbackBody" : "name=$(fname)&hash=$(etag)&location=$(x:location)&=$(x:prise)"
    ...
  }'
```

其中，$(x:location) 和 $(x:prise) 就是自定义变量。

之后，用户的客户端构造了如下请求：

```
    <form method="post" action="http://up.qiniu.com/" enctype="multipart/form-data">
      <input name="key" type="hidden" value="sunflower.jpg">
      <input name="x:location" type="hidden" value="Shanghai">
      <input name="x:prise" type="hidden" value="1500.00">
      <input name="token" type="hidden" value="...">
      <input name="file" type="file" />
    </form>
```

文件上传完成后，七牛云存储会将请求中 `x:location` 和 `x:prise` 的值，替换 `callbackBody` 中的自定义变量：

```
  name=sunflower.jpg&hash=Fn6qeQi4VDLQ347NiRm-RlQx_4O2&location=Shanghai&prise=1500.00
```

然后，七牛云存储将此结果进行[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)，作为回调请求的Body调用 `callbackUrl` 指定的回调服务器。



<a name="do-upload"></a>

# 资源上传

<a name="local-upload"></a>

## 本地上传

若您需要上传已存在您电脑或者是服务器上的文件到七牛云存储，可以直接使用七牛提供的上传工具：

| 名称                                         | 使用   | 适用平台                     | 说明                                 |
|----------------------------------------------|--------|------------------------------|--------------------------------------|
| [qrsync](/tools/qrsync.html)                 | 命令行 | Linux,Windows,MacOSX,FreeBSD | 手动同步文件/文件夹到七牛云存储      |
| [qiniu-autosync](/tools/qiniu-autosync.html) | 命令行 | Linux                        | 自动同步指定文件夹内的新增或改动文件 |

除了这类离线的备份以外，用户还可以在自己的程序中向七牛云存储上传文件。但是，进行本地上传的程序必须是运行在用户自己的服务器，或者桌面计算机上的程序。 **注意：本地上传模式不能在应用客户端中使用。**

![本地上传](img/local-upload.png)

上图展示了本地上传的基本流程。本地上传只是用户程序和七牛云存储之间的交互，具体步骤说明如下：

1. 用户程序构造 `上传策略` 。对于本地上传而言，通常只需要设置 `scope` 和 `deadline` 。如果需要，可以设置 `returnBody` 设定返回信息的内容。如果用户需要对上传文件做进一步的云处理，也可以设置ansycOps参数；
1. 签名，生成Token。构造完成 `上传策略` 后，用户需要对 `上传策略` 加密，生成 `upload token` ；
1. 构造上传请求。用户将 `key` 、 `token` 等参数构造出 `HTTP Form Post` 请求；
1. 用户程序向七牛云存储发出资源上传请求。
1. 七牛云存储向用户程序反馈上传结果。如果上传成功，七牛云存储将反馈 `HTTP 200` ，以及用户设定的反馈信息。如果上传发生错误，七牛云存储将反馈相应的错误代码和信息。


<a name="direct-upload"></a>

## 普通客户端直传

当用户需要开发一个网络应用，那么基本上都会有客户端和服务端。客户端由七牛云存储的用户的用户，即最终用户使用。这些客户端可能是桌面程序、网站、手机应用、Pad应用等等。多数情况下，需要上传文件的是这些客户端。但是，对于七牛云存储而言，无法识别这些客户端的使用者，他们并非七牛云存储的用户。对于七牛云存储而言，那些应用开发者才是用户，是存储资源的所有者。于是，那些客户端不能直接向七牛云存储上传文件，必须要获得应用开发者（也就是七牛用户）的授权。

![普通客户端直传](img/normal-upload.png)

上图展示了普通客户端直传的基本流程。具体步骤说明如下：

1. 应用客户端向应用服务器请求上传文件。通常，应用客户端需要向应用服务器发送 `资源名` ， `空间名` 和 `deadline` 等参数由应用服务器的业务逻辑确定；
1. 应用服务器构造 `上传策略` ；
1. 应用服务器将 `上传策略` 序列化成json格式，对其实施签名算法，得到 `上传凭证` ；
1. 应用服务器将 `上传凭证` 返回给应用客户端；
1. 应用客户端构造完整的上传请求；
1. 应用客户端发送上传请求，启动上传；
1. 七牛云存储执行上传操作，保存资源。完成后反馈用户相应的信息。如果上传失败，七牛云存储将反馈用户具体的失败信息。


<a name="redirect-upload"></a>

## 重定向上传

重定向上传的基本流程同普通客户端直传类似，差异在于当应用服务器构造 `上传策略` 时，设定 `returnUrl` 。之后，七牛云存储一旦完成上传，便会向应用客户端反馈 `HTTP 301` 。应用客户端一旦收到301反馈，便可跳转至 `returnUrl` 所指的位置。

![重定向上传](img/redirect-upload.png)

上图展示了普通客户端直传的基本流程。具体步骤说明如下：

1. 应用客户端向应用服务器请求上传文件。通常，应用客户端需要向应用服务器发送 `资源名` ， `空间名` 和 `deadline` 等参数由应用服务器的业务逻辑确定；
1. 应用服务器构造 `上传策略` 。应用服务器的业务逻辑需要设置 `returnUrl` 字段；
1. 应用服务器将 `上传策略` 序列化成json格式，对其实施签名算法，得到 `上传凭证` ；
1. 应用服务器将 `上传凭证` 返回给应用客户端；
1. 应用客户端构造完整的上传请求；
1. 应用客户端发送上传请求，启动上传；
1. 七牛云存储执行上传操作，保存资源。如果上传失败，七牛云存储将反馈用户具体的失败信息。如果上传成功，七牛云存储将向应用客户端反馈 `HTTP 301` 。应用客户端会据此执行跳转。

<a name="callback-upload"></a>

## 回调上传

回调上传也是在普通客户端直传上衍生出来的模型。相比普通客户端直传，回调上传增加了七牛云存储回调用户的回调服务器的步骤。

![回调向上传](img/callback-upload.png)

上图展示了普通客户端直传的基本流程。具体步骤说明如下：

1. 应用客户端向应用服务器请求上传文件。通常，应用客户端需要向应用服务器发送 `资源名` ， `空间名` 和 `deadline` 等参数由应用服务器的业务逻辑确定；
1. 应用服务器构造 `上传策略` 。应用服务器的业务逻辑必须设置 `callbackUrl` 字段，如果需要，还可设置 `callbackBody` 字段，控制回调的反馈信息；
1. 应用服务器将 `上传策略` 序列化成json格式，对其实施签名算法，得到 `上传凭证` ；
1. 应用服务器将 `上传凭证` 返回给应用客户端；
1. 应用客户端构造完整的上传请求；
1. 应用客户端发送上传请求，启动上传；
1. 七牛云存储执行上传操作，保存资源。如果上传失败，七牛云存储将反馈用户具体的失败信息。如果上传成功，七牛云存储将向应用服务器发起回调；
1. 回调服务器反馈回调执行结果。回调服务器接收到回调数据后，可以执行后续的业务逻辑。而且，用户可以利用此机会，将一些处理结果反馈给七牛云存储，委托七牛云存储传递给应用客户端。如果回调执行失败，七牛云存储会将错误信息反馈应用客户端；
1. 七牛云存储完成回调后，将获得的回调返回信息，原封不动地反馈给应用客户端。

<a name="uploadToken-persistentOps"></a>

## 转码结果持久化（Persistent-Ops）

转码结果持久化是为了提升音视频体验而提出的解决方案，持久化的结果保存在空间中。  

要使用转码持久化功能，用户需在构造 `上传策略` 时，设置 `persistentOps` 和 `persistentNotifyUrl` 参数，格式如下：


    persistentOps = <fop>[;<fop2>;<fop3>;…;<fopN>]
    persistentNotifyUrl = <Url For PersistentNotify>
    

`<fop>`格式及参数详见[数据处理(音频/视频/流媒体篇)](/api/v6/audio-video-hls-process.html)  
具体的持久化使用文档详见[数据处理(持久化)](persistent-ops.html)

<a name="resumble-up"></a>
# 断点续传

<a name="resumble-gen"></a>
## 概述
---------------------

断点续传为大文件上传提供了有效的手段，通过断点续传，用户可以上传任意大小的文件。

断点续传的原理:分割文件，将每个分割块`block`单独发送至七牛服务端（可并行上传各block），待所有`block`上传完成之后，请求服务端重新合成分割块成为一个完整的文件。对于每个分割块，用户可以继续分割成多个上传块`chunk`进行上传。

除最后一个Block外，其余Block的大小为4MB。chunk的大小由用户指定，默认可设为256KB，建义在网络环境较差的时候，适当减小此值。

断点续传的文档结构组织如下：
首先介绍断点续上传的一般流程，并通过伪代码的方式对其描述。然后分别详细讨论流程中各步骤的详细内容并结合示例代码对其进行描述，包含分割块、上传分割块、生成文件、返回结果。

<a name="resumble-alg"></a>
## 上传流程
-------------------

断点续上传流程为：

1. 分割文件成多个`block`
2. 上传分割块。分割块彼此可并行上传，分割块又被化分为多个上传块(chunk)，上传块必须串行上传。
3. 所有分割块上传完成后，请求服务端将其合成为一个完整的文件。
4. 跟据上传策略，返回给客户端对应信息。

用伪代码描述如下：

``` go
//断点续传流程
//@file, 待上传的文件
//@scope,七牛云存储scope
function resume_put(file, scope){
  // 第一步: 分割文件成多个block
  // 以4MB大小为单位，将文件切割成块（blocks）
  // 最后一个块的大小为 file.size - (n-1)*1 << 22
  blocks[] = file.mkblk(1<<22)
  host = "http://up.qiniu.com"
  //blkRet为上传块时七牛返回的数据结构,格式如下:
  //{
  //  "ctx":  "MWZvQbq10x...",
  //  "crc32":1957222263,
  //  "offset":2097152,
  //  "host":"http://upbeta.qiniu.com"
  //}
  //blkRet的个数与切割块的数目相同
  blkRet[blocks.len]
  //当前上传块在数组blocks中的索引号
  blkIdx = 0
  foreach(blk in blocks){
    //第二步: 上传分割块，此逻辑可并发执行
    //@block, 需要上传的块
    function(block){
      //以256KB为单位，将block切割为chunk数组
      chunks[] = block.chunk(256)
      //通知Qiniu，开始上传block，同时将block的第一个chunk上传至七牛
      //@blockSize, 上传块的大小.(除最后一个块，其余为4MB)
      //@firstChunk, block切割成的chunk数组的第一个元素
      function qiniu_mkblk(blockSize,firstChunk){
        url = host + blockSize
        blkRet[blkIdx] = httpClient.send(url,firstChunk)
        host = blkRet[blkIdx]["host"]
      }(chunks[0]);
      //继续上传余下的chunk,注意i=1,表明跳过了首个chunk,因为此chunk已经在mkblk时上传了  
      for(i=1;i<chunks.len;i++){
        //上传chunks
        //@host, 接收上传的地址，可以从上一次返回结果中获取
        //@ctx, 用于上传控制，从上一次上传返回结果中获取
        //@offset, chunk在block中的偏移量，以byte为单位，可以从上一次返回结果中获取
        //@chunk, 需要上传的chunk
        function qiniu_bput(host,ctx,offset,chunk){
          //请求地址
          url = host + "/bput/" + ctx + "/" +offset 
          //blkRet的内容被替换
          blkRet[blkIdx] = httpClient.send(url,chunk);
        }(blkRet[blkIdx].host,blkRet[blkIdx].ctx,blkRet[blkIdx].offset,chunks[i])
      }
    }(blk)
    blkIdx++
  }
  //第三步: 所有block上传完成，调用mkfile请求在服务端生成完整文件
  //@file 上传的文件
  //@key 需要在七牛服务端保存的文件key
  //@return ,上传返回结果，默认为{hash:<hash>,key:<key>}
  return function mkfile(file,key){
    //生成mkfile请求地址
    url = blkRet[lastIdx].host +
        "/" + file.size +            // 必须
        "/" + base64Safe(key) +                // 必须
        "/mimeTpye/" + base64Safe(file.type) // 可选
        "/" + parameters                    //可选，parameters格式见下文 
    foreach(ret in blkRet){
      body += ret.ctx + ","
    }
    body.TrimEnd(",")
    return httpClient.send(url, body)
  }(file,key)
}
```

<a name="file-blob"></a>
## 分割文件

分割文件的方式受具体语言的影响而有所不同，获取一个分割块一般需要两个参数:
  `offset` 分割块在文件中的偏移量，单位为byte
  `size`  分割块的大小，单位为byte

下文以python、c# 、javascript 为示例，介绍具体的切割方法，其它语言请参考对应的文档

python

``` python
# 打开文件
fo = open("<file path>", "r+")
# 移动当前位置
fo.seek(offset, 0);
# 读取block
blockbuf = fo.read(size);
```

C# 

``` c#
//文件路径
string localFile = "<file path>"
//打开文件
FileStream fs = File.OpenRead(localFile)
//开辟空间
byte[] blockBuf = new byte[4*1024*1024];
//移动当前位置
fs.seek(offset,SeekOrigin.Begin);
//读取block
fs.Read(blockBuf,0,size)
```

javascript

``` javascript
//需要HTML5文件系统支持
//<input type="files" id="fileselect" />

//获取文件
var file = document.getElementById("fileselect").files[0];
(function(f, start, size) {
  //文件分割
  f.slice(start,start + size);
})(file, offset, size);
```


<a name="mkblk"></a>
## 上传块（mkblk）
-----------------------

一个文件由多个block组成，除最后一个block，其余block大小为4MB:

|block 1 (4MB)|block 2 (4MB)| ... | block n (filesize - (n-1)*4MB)|
|-------|-------|-----|--------|

一个block由多个chunk组成,chunk的大小由用户自已设定，必须小于块的大小，默认可取256KB。

|chunk 1|chunk 2| ... | chunk n|
|-------|-------|-----|--------|

断点续上传文件是通过单独上传各block后再组成完整文件。因此，上传block是断点续上传的基础。
上传block由两个不同的步骤组成:

1. 请求上传block

2. 上传余下的chunk

### 1.请求上传block

请求格式如下：

Request Header:

``` html
POST /mkblk/<blockSize> HTTP/1.1
Content-Length: <first-chunk-size>
Host: up.qiniu.com
Connection: keep-alive
Authorization: UpToken <uptoken>
```

其中:

  - method为post

  - `mkblk` 说明这是一个上传块的请求

  - `<blockSize>` 为该块的大小,除最后一个块，其余大小为4MB。

  - 同时将该block的首个chunk包含在请求body中，`content-Length:<first-chunk-size>`，指定首个`chunk`的大小。

  - `up.qiniu.com`为首次上传地址，后续上传采用服务器分配的地址

  - 此请求需要进行认证，因此需要在请求头中设定`uptoken`。

Post的内容为该block的首个chunk的二进制内容

``` post
[first-chunk-bin]
```

七牛服务器对请求生成块作出的回应如下：

Response Header:

``` html
HTTP/1.1 200 OK

Content-Type: application/json
Pragma: no-cache
X-Content-Type-Options: nosniff
X-Log: UP:18
```

Response Body:

``` json
{
  "ctx":"<ctx>",
  "checksum":"<checksum>",
  "crc32":<crc32>,
  "offset":<offset>,
  "host":"<selectUpHost>"
}
```
注：为排版方面，对Response Body作出了一定的格式调整,各字段的具体值也与实际上传情况有关

请求回应body是json格式的字符串,各字段的意义如下：
  
  - ctx, 服务端上传控制字段,后继上传及生成文件(mkfile)时用到

  - checksum, 上传块checksum

  - crc32, 上传块crc32,客户可通过此字段对上传块的完整性进行较验

  - offset, 下一个上传块在切割块中的偏移

  - selectUpHost, 后续上传接收地址

注：如果请求上传block失败，可单独重试上传此block。

mkblk各语言的实现可参考：

1. [python mkblk](https://github.com/qiniu/python-sdk/blob/master/qiniu/resumable_io.py#L145)
2. [c/c++ mkblk](https://github.com/qiniu/c-sdk/blob/master/qiniu/resumable_io.c#L272)
3. [go mkblk](https://github.com/qiniu/api/blob/master/resumable/io/up_api.go#L58)
4. [c# mkblk](https://github.com/qiniu/csharp-sdk/blob/master/Qiniu/IO/Resumable/ResumablePut.cs#L175)

<a name="bput"></a>
### 2.上传余下的chunk

请求mkblk时仅上传首个chunk，余下的chunk需要采用不同的格式进行请求。

上传chunk的请求格式如下：

``` html
POST /bput/<ctx>/<chunksize> HTTP/1.1
Host: <selectUpHost>
Connection: keep-alive
Content-Length: <chunksize>
Authorization: UpToken <uptoken>
Content-Type:
```

其中:

- method为post

- `bput` 说明这是一个上传chunk的请求

- `<ctx>`为上传前一个chunk返回的结果中ctx的值

- `<chunksize>` 为该chunk的大小

- `<selectHost>` 上传地址,从上一次返回结果中获取 

- 此请求需要进行认证，因此需要在请求头中设定`uptoken`

Post的内容为chunk的二进制内容

``` post
[chunk-bin]
```

七牛服务器对上传chunk作出的回应内容如下：

``` json
{
  "ctx":"<ctx>",
  "checksum":"<checksum>",
  "crc32":<crc32>,
  "offset":<offset>,
  "host":"<selectUpHost>"
}
```

注：为排版方面，对Response Body作出了一定的格式调整,各字段的具体值也与实际上传情况有关

同一block中的chunk必须串行上传，待所有的chunk上传完成，表明此块已完成，记录最后一个回应数据，此数据在合成文件时将作为请求body的一部分。

注：如果chunk上传失败，需要重传此chunk，直至此chunk上传成功，方可继续上传下一个chunk。

各语言上传chunk的实现可参考：

1. [python bput](https://github.com/qiniu/python-sdk/blob/master/qiniu/resumable_io.py#L150)
2. [c/c++ bput](https://github.com/qiniu/c-sdk/blob/master/qiniu/resumable_io.c#L253)
3. [go bput](https://github.com/qiniu/api/blob/master/resumable/io/up_api.go#L64)
3. [c# bput](https://github.com/qiniu/csharp-sdk/blob/master/Qiniu/IO/Resumable/ResumablePut.cs#L185)

<a name="rs-mkfile"></a>
## 生成文件(mkfile)
--------------------------
所有block上传完成后，请求服务端将其合成为一个完整的文件。

请求头格式如下:

``` html
POST /mkfile/<fsize>/key/<EncodedKey>/mimeType/<EncodedMimeType>/x:userVar/EncodedUserVar/ HTTP/1.1
Host: <selectUpHost>
Connection: keep-alive
Authorization: UpToken <uptoken>
```

其中:

- method为post，`mkfile` 说明这是一个生成文件的请求

- `<EncodedKey>` 是经过[base64urlsafe](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)编码的key

- `<fsize>`指定了文件的大小，单位byte。

- `<EncodedMimeType>`为可选项，其值需要经过[base64urlsafe](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)编码。

- `x:userVar`，用户自定义变量，以`x:`开始，后面的`userVar`可自定义，其值需要经过[base64urlsafe](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)编码，多个自定义变量可继续追加。例如：/x:username/base64urlsafe("qiniu")/x:email/base64urlsafe("example@example.com")

- 此请求需要进行认证，因此需要在请求头中设定`uptoken`。

请求body的生成如下：

以`,`连接上传各block时最后一个chunk返回的数据结构中的ctx字段


mkfile各语言的实现可参考：

1. [python mkfile](https://github.com/qiniu/python-sdk/blob/master/qiniu/resumable_io.py#L155)
2. [c/c++ mkfile](https://github.com/qiniu/c-sdk/blob/master/qiniu/resumable_io.c#L253)
3. [go mkfile](https://github.com/qiniu/api/blob/master/resumable/io/up_api.go#L147)
3. [c# mkfile](https://github.com/qiniu/csharp-sdk/blob/master/Qiniu/IO/Resumable/ResumablePut.cs#L195)

七牛服务器对生成文件请求作出的回应内容如下：

``` json
{"hash":"<hash>","key","<key>"}
```

请求回应body是json格式的字符串,各字段的意义如下：

- `hash`，文件hash值

- `key`，文件在服务端对应的key


注：Response Body值与实际上传情况有关，并且，受上传策略影响，其格式也有所不同。

<a name="resumble-demo"></a>
## 示例
-------------------
[断点续上传在线示例](http://7niu.sinaapp.com)，需要浏览器支持HTML5，开发人员可通过firebug等工具查看断点续上传的请求、回应格式。
