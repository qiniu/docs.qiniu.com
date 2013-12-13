---
layout: docs
title: 获取资源信息（stat）
order: 900
---

<a id="stat"></a>
# 获取资源信息（stat）

<a id="description"></a>
## 描述
仅获取资源的Metadata信息，不返回资源内容。

<a id="request"></a>
## 请求

<a id="request-syntax"></a>
### 请求语法

```
GET /stat/<EncodedEntryURI> HTTP/1.1
Host:          rs.qiniu.com
Authorization: QBox <AccessToken>
```

EncodedEntryURI的细节请查看[EncodedEntryURI格式][encodedEntryURIHref]。

<a id="request-auth"></a>
### 访问权限

[访问凭证（AccessToken）][accessTokenHref]方式。

<a id="request-params"></a>
### 请求参数

该请求不支持任何参数。

<a id="request-headers"></a>
### 头部信息

该请求必须指定以下头部信息。

头部名称      | 说明                              | 必填
:------------ | :-------------------------------- | :-------
Authorization | 该参数应严格按照[访问凭证][accessTokenHref]格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`QBox QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

使用本API无需设置额外头部信息。  
其它可用请求头部信息请参考[常用请求头部信息]()。

<a id="request-body"></a>
### 请求内容

该请求无需指定请求内容。

<a id="response"></a>
## 响应

<a id="response-headers"></a>
### 头部信息

头部名称      | 说明                              
:------------ | :--------------------------------------------------------------------
Content-Type  | 正常情况下该值将被设为`application/json`，表示返回JSON格式的文本信息。

其它可能返回的头部信息，请参考[常见响应头部信息][commonHttpResponseHeaderHref]。

<a id="response-body"></a>
### 响应内容

如果请求成功，返回的响应内容将是一个JSON结构体。格式如下：

```
{
	"fsize":     <FileSize  int>, 
    "hash":     "<FileETag  string>",
    "mimeType:  "<MimeType  string>",
    "putTime:    <PutTime   int64> 
}
```

字段含义如下：

字段名称       | 类型   | 说明
:------------- | :----- | :------------------------------
fsize          | int    | 文件尺寸，单位为字节。
hash           | string | 文件的[ETag]()信息。
mimeType       | string | 以MIME信息表达的文件类型。<p>关于各种MIME值的含义，请参见[MIME Media Types][mimeMediaTypesHref]（内容由IANA维护）。
putTime        | int64  | 文件上传时的服务器端Epoch时间戳，单位为100纳秒。<p>例如值为`13603956734587420`的时间对应实际时间为`2013-02-09 15:41:13`。

如果请求失败，请参考[错误消息](#error-messages)。

<a id="error-messages"></a>
### 错误消息

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 获取Metadata成功
400	       | 请求参数错误
401        | 访问凭证无效
404        | 目标资源不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

<a id="examples"></a>
## 示例

<a id="example1-command"></a>
### 命令行示例

```
curl -i \
     -H "Authorization: QBox QNJi_bYJlmO5LeY..." \
     "http://rs.qiniu.com/stat/ZGVtbzoyMDEzLTAyLTA5LTA3LTM5LTIwLmpwZw=="
```

<a id="example1-request"></a>
### 请求示例

```
GET /stat/ZGVtbzoyMDEzLTAyLTA5LTA3LTM5LTIwLmpwZw== HTTP/1.1
User-Agent: curl/7.30.0
Host: rs.qiniu.com
Accept: */*
Authorization: QBox QNJi_bYJlmO5LeY08FfoNj9w_r72Vsn...(过长已省略)
```

<a id="example1-response"></a>
### 响应示例

以下响应中JSON字符串经过格式化，以便查看。

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
	"fsize":        5122935,
	"hash":         "ljfockr0lOil_bZfyaI2ZY78HWoH",
	"mimeType":     "application/octet-stream",
	"putTime":      13603956734587420
}
```

<a id="remarks"></a>
## 附注

无。

<a id="related-resources"></a>
## 相关资源

- [访问凭证][accessTokenHref]
- [EncodedEntryURI格式](encodedEntryURIHref)
- [自定义返回内容]()

[sendBugReportHref]:            mailto:support@qiniu.com?subject=599错误日志     "发送错误报告"
[mimeMediaTypesHref]:           http://www.iana.org/assignments/media-types      "MIME媒体类型"
[accessTokenHref]:              http://docs.qiniu.com/api/v6/rs.html#digest-auth "访问凭证"
[encodedEntryURIHref]:          http://docs.qiniu.com/api/v6/rs.html#words       "EncodedEntryURI格式"
[commonHttpResponseHeaderHref]: ../extended-headers.html                         "常见响应头部信息"
