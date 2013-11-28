---
layout: api_layout
title: 创建块（mkblk）
order: 100
---

<a name="mkblk"></a>
#创建块（mkblk）

<a name="description"></a>
## 描述
在分片上传的过程中，创建一个新的块，并且上传第一个片的数据。

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
POST /mkblk/<block_size> HTTP/1.1
Content-Length: <first_chunk_size>
Host: up.qiniu.com
Authorization: UpToken <UploadToken>

<first_chunk_binary>
```

<a name="request-auth"></a>
### 访问权限

[上传凭证（UploadToken）](http://docs.qiniu.com/api/v6/rs.html#digest-auth)方式。

<a name="request-params"></a>
### 请求参数

该请求不支持任何参数。

<a name="request-headers"></a>
### 头部信息

该请求须指定以下头部信息。

参数名称      | 说明                              | 必填
:---------- | :------------------------------- | :-------:
Authorization | 该参数应严格按照[上传凭证（UploadToken）]()格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`UploadToken QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是
Content-Length | 第一个片的内容长度，单位为字节。 | 是

在使用本API时无需设置额外的头部信息。其他可用的请求头部信息请参见[常用请求头部信息]()。

<a name="request-body"></a>
### 请求内容

该请求的内容为第一个片的二进制内容。

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
	ctx: <Ctx string>, 
    checksum: <Checksum string>,
    crc32: <Crc32 int64>,
    offset: <Offset int64>,
    selectUpHost: <SelectUpHost string>
}
```

参数含义如下：

参数名称       | 类型 | 说明
:------------ | :----: | :------------------------------
ctx | string | 服务端上传控制字段,后继上传及生成文件(mkfile)时用到。
checksum | string | 上传块校验码。
crc32 | int64 | 上传块Crc32,客户可通过此字段对上传块的完整性进行较验。
offset | int64 | 下一个上传块在切割块中的偏移。
selectUpHost | string | 后续上传接收地址。

如果请求失败，请参见[常见错误码]()。

<a name="examples"></a>
## 示例

我们拿一个小文件作为示例，这个文件的大小适合作为一次

<a name="example1-command"></a>
### 命令行示例

```
curl -H "Authorization: UpToken QNJi_bYJlmO5LeY..." \
-H "Content-Length: 1024"
-i "http://up.qiniu.com/mkblk/1024"
```

<a name="example1-request"></a>
### 请求示例

```
POST /mkblk/1024 HTTP/1.1
User-Agent: curl/7.30.0
Host: up.qiniu.com
Accept: */*
Authorization: UpToken QNJi_bYJlmO5LeY08FfoNj9w_r...(过长已省略)
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
	ctx: "ctx", 
    checksum: "checksum",
    crc32: 1345,
    offset: 0,
    selectUpHost: "up.qiniu.com"
}
```

<a name="remarks"></a>
## 附注

无。

<a name="related-resources"></a>
## 相关资源

- [上传凭证（UploadToken）规范](http://docs.qiniu.com/#)
- [上传片数据（bput）]()
- [创建资源（mkfile）]()
