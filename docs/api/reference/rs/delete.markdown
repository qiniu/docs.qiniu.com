---
layout: docs
title: 删除资源（delete）
order: 600
---

<a name="delete"></a>
# 删除资源（delete）

<a name="description"></a>
## 描述
删除指定资源。

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
POST /delete/<EncodedEntryURISrc> HTTP/1.1
Host: rs.qiniu.com
Content-Type: application/x-www-form-urlencoded
Authorization: QBox <AccessToken>
```

EncodedEntryURI的细节请查看[EncodedEntryURI格式][encodedEntryURIHref]。

<a name="request-auth"></a>
### 访问权限

[AccessToken][accessTokenHref]方式。

<a name="request-params"></a>
### 请求参数

该请求无需设置任何参数。

<a name="request-headers"></a>
### 头部信息

根据具体需要，请求可以包含以下头部信息。

头部名称      | 说明                              | 必填
:---------- | :------------------------------- | :-------:
Authorization | 该参数应严格按照[AccessToken][accessTokenHref]格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`QBox QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

使用本API时无需设置额外头部信息。  

<a name="request-body"></a>
### 请求内容

该请求无需指定请求内容。

<a name="response"></a>
## 响应

<a name="request-syntax"></a>
### 响应语法

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
```

<a name="response"></a>
## 响应

<a name="response-headers"></a>
### 头部信息
头部名称      | 说明                              
:----------- | :------------------------------- 
Content-Type | 正常情况下，该值将被设为`application/json`，表示返回JSON格式的文本信息。

<a name="response-body"></a>
### 响应内容

操作成功时：该响应不返回任何内容。  
操作失败时：返回一个JSON格式字符串，包含错误号与错误消息。

<a name="error-messages"></a>
### 错误消息
HTTP Code | 含义
:-------- | :--------------------------
200       | 删除成功
401       | AccessToken无效
404       | 待删除资源不存在

<a name="example1-command"></a>
### 命令行示例

```
curl -i \
     -o - \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -H 'Authorization: QBox u8WqmQu1jH21kxpIQmo2LqntzugM1VoHE9_pozCU:2LJIG...' \
     -X POST \
     'http://rs.qiniu.com/delete/bmV3ZG9jczpmaW5kX21hbi50eHQ='
```

<a name="example1-request"></a>
### 请求示例

```
POST /delete/bmV3ZG9jczpmaW5kX21hbi50eHQ= HTTP/1.1
User-Agent: curl/7.30.0
Host: rs.qiniu.com
Accept: */*
Authorization: QBox u8WqmQu1jH21kxpIQmo2LqntzugM1VoHE9_pozCU:2LJIG...(过长已省略)
```

<a name="example1-response"></a>
### 响应示例

```
HTTP/1.1 200 OK
Server: nginx/1.0.8
Date: Thu, 05 Dec 2013 06:55:29 GMT
Content-Type: application/json
Connection: keep-alive
Content-Length: 0
X-Log: RS.in;RS.mo;qtbl.mv:3;MQ;MC/404;RS.mcd:1;RS:5
X-Reqid: wxIAAD3btw-v3TwT
```

<a name="remarks"></a>
## 附注

无。

<a name="related-resources"></a>
## 相关资源

- [AccessToken格式][accessTokenHref]
- [EncodedEntryURI格式][encodedEntryURIHref]

[accessTokenHref]: http://docs.qiniu.com/api/v6/rs.html#digest-auth "AccessToken格式"
[encodedEntryURIHref]: http://docs.qiniu.com/api/v6/rs.html#words "EncodedEntryURI格式"
