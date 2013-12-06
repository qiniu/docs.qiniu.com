---
layout: docs
title: 创建文件（mkfile）
order: 10
---

<a name="mkfile"></a>
# 创建文件（mkfile）

<a name="description"></a>
## 描述

将上传好的所有数据块按指定顺序合并成一个资源文件。  

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
POST /mkfile/<file_size>/key/<encodedKey> HTTP/1.1
Content-Type: text/plain
Content-Length: <ctx_list_size>
Host: <selectUpHost>
Authorization: UpToken <UploadToken>

<ctx_list>
```

<a name="request-params"></a>
### 请求参数

参数名称        | 类型   | 说明
:-------------- | :----- | :------------------------------
file_size       | int64  | 资源文件大小
encodedKey      | string | 进行URL安全的Base编码后的资源名

<a name="request-headers"></a>
### 头部信息

该请求须指定以下头部信息。

参数名称       | 说明                                      | 必填
:------------- | :---------------------------------------- | :-------
Host           | 上一次响应内容中夹带的后续上传接收地址    | 是
Content-Type   | 必须为text/plain                          | 是
Content-Length | 所有块的ctx及分隔符的总长度，单位为字节。 | 是
Authorization  | 该参数应严格按照[上传凭证（UploadToken）]()格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`UploadToken QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

在使用本API时无需设置额外的头部信息。其他可用的请求头部信息请参见[常用请求头部信息]()。

<a name="request-body"></a>
### 请求内容

该请求的内容为所有块的ctx列表，以“,”分隔，按其在源文件中的位置排序。  

```
<ctx1>,<ctx2>,<ctx3>,<ctx4>,<ctx5>,...
```

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
	"hash": "<ContentHash  string>", 
    "key":  "<Key          string>"
}
```

字段含义如下：

字段名称       | 类型   | 说明
:------------- | :----- | :------------------------------
hash           | string | 资源内容的SHA1值
key            | string | 资源名

如果请求失败，请参见错误消息。

<a name="error-messages"></a>
### 错误消息
HTTP Code | 含义
:-------- | :--------------------------
200       | 资源创建成功
401       | UploadToken无效
614       | 目标资源已存在

<a name="remarks"></a>
## 附注

无。

<a name="related-resources"></a>
## 相关资源

- [上传凭证（UploadToken）规范](../security/upload-token.html)
- [创建块（mkblk）](mkblk.html)
- [上传片（bput）](bput.html)
