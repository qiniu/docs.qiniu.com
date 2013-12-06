---
layout: docs
title: 批量操作（batch）
order: 500
---

<a name="move"></a>
# 批量操作（batch）

<a name="description"></a>
## 描述
批量操作意指在单一请求中执行多次获取元信息/移动/复制/删除操作，极大提高资源管理效率。  

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
POST /batch HTTP/1.1
Host: rs.qiniu.com
Content-Type: application/x-www-form-urlencoded
Authorization: QBox <AccessToken>

op=<Operation>&op=<Operation>&...
```

其中`op=<Operation>`是单一资源操作指令。例如`/stat/<EncodeEntryURI>`，`/delete/<EncodeEntryURI>`等。  
EncodeEntryURI、EncodedEntryURISrc与EncodedEntryURIDest的细节请查看[EncodedEntryURI格式][encodedEntryURIHref]。  

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
Content-Type | application/x-www-form-urlencoded | 是
Authorization | 该参数应严格按照[AccessToken][accessTokenHref]格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`QBox QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

使用本API时无需设置额外头部信息。  

<a name="request-body"></a>
### 请求内容

#### 批量获取元信息

```
op=/stat/<EncodedEntryURI>&op=/stat/<EncodedEntryURI>&...
```

#### 批量复制资源

```
op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>&op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>&...
```

#### 批量移动资源

```
op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&...
```

#### 批量删除资源

```
op=/delete/<EncodedEntryURI>&op=/delete/<EncodedEntryURI>&...
```

<a name="response"></a>
## 响应

<a name="request-syntax"></a>
### 响应语法

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
```

<a name="response-headers"></a>
### 头部信息
头部名称      | 说明                              
:----------- | :------------------------------- 
Content-Type | 正常情况下，该值将被设为`application/json`，表示返回JSON格式的文本信息。

<a name="response-body"></a>
### 响应内容

#### 批量获取元信息

```
[
    { "code": <HTTP Code>, "data": <Data> },
    { "code": <HTTP Code>, "data": <Data> },
    { "code": <HTTP Code>, "data": { "error": <ErrorMessage string> } },
    ...
]
```

#### 批量复制资源

```
[
    { "code": <HTTP Code> },
    { "code": <HTTP Code> },
    { "code": <HTTP Code>, "data": { "error": <ErrorMessage string> } },
    ...
]
```

#### 批量移动资源

```
[
    { "code": <HTTP Code> },
    { "code": <HTTP Code> },
    { "code": <HTTP Code>, "data": { "error": <ErrorMessage string> } },
    ...
]
```

#### 批量删除资源

```
[
    { "code": <HTTP Code> },
    { "code": <HTTP Code> },
    { "code": <HTTP Code>, "data": { "error": <ErrorMessage string> } },
    ...
]
```

<a name="error-messages"></a>
### 错误消息
HTTP Code | 含义
:-------- | :--------------------------
200       | 所有请求操作都已成功完成
298       | 部分或所有请求操作失败（出错信息参看上述响应内容）
401       | AccessToken无效

<a name="remarks"></a>
## 附注

无。

<a name="related-resources"></a>
## 相关资源

- [AccessToken格式][accessTokenHref]
- [EncodedEntryURI格式][encodedEntryURIHref]

[accessTokenHref]: http://docs.qiniu.com/api/v6/rs.html#digest-auth "AccessToken格式"
[encodedEntryURIHref]: http://docs.qiniu.com/api/v6/rs.html#words "EncodedEntryURI格式"
