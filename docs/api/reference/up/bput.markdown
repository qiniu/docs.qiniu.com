---
layout: docs
title: 上传片（bput）
order: 90
---

<a name="bput"></a>
# 上传片（bput）

<a name="description"></a>
## 描述

上传指定块的一片数据，具体数据量可根据现场环境调整。  
同一块的每片数据必须串行上传。  

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
POST /bput/<ctx>/<next_chunk_size> HTTP/1.1
Content-Length: <next_chunk_size>
Host: <selectUpHost>
Authorization: UpToken <UploadToken>

<next_chunk_binary>
```

<a name="request-params"></a>
### 请求参数

参数名称        | 类型   | 说明
:-------------- | :----- | :------------------------------
ctx             | string | 上次返回的服务端上传控制字段
next_chunk_size | int64  | 当前片大小

<a name="request-headers"></a>
### 头部信息

该请求须指定以下头部信息。

参数名称       | 说明                                   | 必填
:------------- | :------------------------------------- | :-------
Host           | 上一次响应内容中夹带的后续上传接收地址 | 是
Content-Type   | 必须为application/octet-stream         | 是
Content-Length | 当前片的内容长度，单位为字节。         | 是
Authorization  | 该参数应严格按照[上传凭证（UploadToken）]()格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`UploadToken QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

在使用本API时无需设置额外的头部信息。其他可用的请求头部信息请参见[常用请求头部信息]()。

<a name="request-body"></a>
### 请求内容

该请求的内容为当前片的二进制内容。

<a name="request-auth"></a>
### 访问权限

[上传凭证（UploadToken）](http://docs.qiniu.com/api/v6/rs.html#digest-auth)方式。

<a name="response"></a>
## 响应

<a name="response-headers"></a>
### 头部信息
参数名称      | 说明                              
:------------ | :-----------------------------------------------------------------------
Content-Type  | 正常情况下，该值将被设为`application/json`，表示返回JSON格式的文本信息。

关于其他可能出现的头部信息，请参见：[常用请求响应头部信息]()。

<a name="response-body"></a>
### 响应内容

如果请求成功，返回的响应内容将是一个JSON结构体。格式如下：

```
{
	"ctx":            "<Ctx          string>", 
    "checksum":       "<Checksum     string>",
    "crc32":           <Crc32        int64>,
    "offset":          <Offset       int64>,
    "selectUpHost":   "<SelectUpHost string>"
}
```

参数含义如下：

参数名称       | 类型   | 说明
:------------- | :----- | :------------------------------
ctx            | string | 服务端上传控制字段，后继上传及生成文件(mkfile)时用到。
checksum       | string | 上传块校验码。
crc32          | int64  | 上传块Crc32,客户可通过此字段对上传块的完整性进行较验。
offset         | int64  | 下一个上传块在切割块中的偏移。
selectUpHost   | string | 后续上传接收地址。

如果请求失败，请参见错误消息。

<a name="error-messages"></a>
### 错误消息
HTTP Code | 含义
:-------- | :--------------------------
200       | 上传成功
401       | UploadToken无效
701       | 后续上传接收地址无效，或ctx信息已过期

<a name="remarks"></a>
## 附注

无。

<a name="related-resources"></a>
## 相关资源

- [上传凭证（UploadToken）规范](../security/upload-token.html)
- [创建块（mkblk）](mkblk.html)
- [创建资源（mkfile）](mkfile.html)
