---
layout: docs
title: 获取资源信息
---

<a name="stat"></a>
#获取资源信息（stat）

<a name="description"></a>
## 描述
获取资源的Metadata信息，但不会返回资源内容。

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
GET /stat/<EncodedEntryURI> HTTP/1.1
Host: rs.qiniu.com
Authorization: <AccessToken>
```

EncodedEntryURI的细节请查看[EncodedEntryURI格式]()。

<a name="request-auth"></a>
### 访问权限

[AccessToken](http://docs.qiniu.com/api/v6/rs.html#digest-auth)方式。

<a name="request-params"></a>
### 请求参数

该请求不支持任何参数。

<a name="request-headers"></a>
### 头部信息

该请求须指定以下头部信息。

参数名称      | 说明                              | 必填
:---------- | :------------------------------- | :-------:
Authorization | 该参数应严格按照[AccessToken]()格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`QBox QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

在使用本API时无需设置额外的头部信息。其他可用的请求头部信息请参见[常用请求头部信息]()。

<a name="request-body"></a>
### 请求内容

该请求无需指定请求内容。

<a name="response"></a>
## 响应

<a name="response-headers"></a>
### 头部信息
参数名称      | 说明                              
:----------- | :------------------------------- 
Content-Type | 正常情况下，该值将被设为`application/json`，表示返回JSON格式的文本信息。

关于其他可能出现的头部信息，请参见：[常用请求响应头部信息]()。

<a name="response-body"></a>
### 响应内容

如果请求成功，返回的响应内容将是一个JSON结构体。格式如下：

```
{
	fsize: <FileSize int>, 
    hash: <FileETag string>,
    mimeType: <MimeType string>,
    putTime: <PutTime int64> 
}
```

参数含义如下：

参数名称       | 类型 | 说明
:------------ | :----: | :------------------------------
fsize | int | 文件尺寸，单位为字节。
hash | string | 文件的[ETag]()信息。
mimeType | string | 以MIME信息表达的文件类型。<p>关于各种MIME值的含义，请参见[MIME Media Types](http://www.iana.org/assignments/media-types)（内容由IANA维护）。
putTime | int64 | 文件上传时的服务器端Epoch时间戳，单位为100纳秒。<p>例如值为`13603956734587420`的时间对应实际时间为`2013年02月09日15:41:13`。

如果请求失败，请参见[常见错误码]()。

<a name="examples"></a>
## 示例

<a name="example1-command"></a>
### 命令行示例

```
curl -H "Authorization: QBox QNJi_bYJlmO5LeY..." -i \
"http://rs.qiniu.com/stat/ZGVtbzoyMDEzLTAyLTA5LTA3LTM5LTIwLmpwZw=="
```

<a name="example1-request"></a>
### 请求示例

```
GET /stat/ZGVtbzoyMDEzLTAyLTA5LTA3LTM5LTIwLmpwZw== HTTP/1.1
User-Agent: curl/7.30.0
Host: rs.qiniu.com
Accept: */*
Authorization: QBox QNJi_bYJlmO5LeY08FfoNj9w_r72Vsn...(过长已省略)
```

<a name="example1-response"></a>
### 响应示例

以下响应中JSON字符串经过格式化，以方便查看。

```
HTTP/1.1 200 OK
Server: nginx/1.0.8
Date: Sun, 03 Nov 2013 14:01:28 GMT
Content-Type: application/json
Connection: keep-alive
Cache-Control: no-store
Content-Length: 121
X-Log: qtbl.get;RS
X-Reqid: swEAAMipp-5bIjMT

{
	"fsize":5122935,
	"hash":"ljfockr0lOil_bZfyaI2ZY78HWoH",
	"mimeType":"application/octet-stream",
	"putTime":13603956734587420
}
```

<a name="remarks"></a>
## 附注

无。

<a name="related-resources"></a>
## 相关资源

- [AccessToken格式](http://docs.qiniu.com/#)
- [EncodedResourceURI格式]()
- [自定义返回内容]()