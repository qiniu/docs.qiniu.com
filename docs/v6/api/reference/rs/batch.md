---
title: 批量操作（batch）
order: 500
---

<a id="move"></a>
# 批量操作（batch）

<a id="batch-description"></a>
## 描述
批量操作意指在单一请求中执行多次获取元信息/移动/复制/删除操作，极大提高资源管理效率。  

<a id="batch-request"></a>
## 请求

<a id="batch-request-syntax"></a>
### 请求语法

```
POST /batch HTTP/1.1
Host:           rs.qiniu.com
Content-Type:   application/x-www-form-urlencoded
Authorization:  QBox <AccessToken>

op=<Operation>&op=<Operation>&...
```

其中`op=<Operation>`是单一资源操作指令。例如`/stat/<EncodeEntryURI>`，`/delete/<EncodeEntryURI>`等。  
EncodeEntryURI、EncodedEntryURISrc与EncodedEntryURIDest的细节请查看[EncodedEntryURI格式][encodedEntryURIHref]。  

<a id="batch-request-auth"></a>
### 访问权限

[管理凭证（AccessToken）][accessTokenHref]方式。

<a id="batch-request-params"></a>
### 请求参数

该请求无需设置任何参数。  

<a id="batch-request-headers"></a>
### 头部信息

该请求必须指定以下头部信息。

头部名称      | 说明                              | 必填
:------------ | :-------------------------------- | :--------
Content-Type  | application/x-www-form-urlencoded | 是
Authorization | 该参数应严格按照[管理凭证][accessTokenHref]格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`QBox QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

使用本API无需设置额外头部信息。  
其它可用请求头部信息请参考[常用请求头部信息]()。

<a id="batch-request-body"></a>
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

#### 混合多种操作

```
op=/stat/<EncodedEntryURI>
&op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>
&op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&...
&op=/delete/<EncodedEntryURI>&...
```

<a id="batch-response"></a>
## 响应

<a id="batch-request-syntax"></a>
### 响应语法

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
```

<a id="batch-response-headers"></a>
### 头部信息


头部名称      | 说明                              
:------------ | :--------------------------------------------------------------------
Content-Type  | 正常情况下该值将被设为`application/json`，表示返回JSON格式的文本信息。

其它可能返回的头部信息，请参考[常见响应头部信息][commonHttpResponseHeaderHref]。

<a id="batch-response-body"></a>
### 响应内容

#### 批量获取元信息

```
[
    { "code": <HttpCode int>, "data": <Data> },
    { "code": <HttpCode int>, "data": <Data> },
    { "code": <HttpCode int>, "data": { "error": "<ErrorMessage string>" } },
    ...
]
```

#### 批量复制资源

```
[
    { "code": <HttpCode int> },
    { "code": <HttpCode int> },
    { "code": <HttpCode int>, "data": { "error": "<ErrorMessage string>" } },
    ...
]
```

#### 批量移动资源

```
[
    { "code": <HttpCode int> },
    { "code": <HttpCode int> },
    { "code": <HttpCode int>, "data": { "error": "<ErrorMessage string>" } },
    ...
]
```

#### 批量删除资源

```
[
    { "code": <HttpCode int> },
    { "code": <HttpCode int> },
    { "code": <HttpCode int>, "data": { "error": "<ErrorMessage string>" } },
    ...
]
```

#### 混合多种操作

```
[
    { "code": <HttpCode int>, "data": <Data> },
    { "code": <HttpCode int> },
    { "code": <HttpCode int> },
    { "code": <HttpCode int> },
    { "code": <HttpCode int>, "data": { "error": "<ErrorMessage string>" } },
    ...
]
```

<a id="batch-error-messages"></a>
### 错误消息

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 所有请求操作都已成功完成
298        | 部分或所有请求操作失败（出错信息参看上述响应内容）
400	       | 请求参数错误
401        | 管理凭证无效
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

<a id="batch-remarks"></a>
## 附注

无。

<a id="batch-related-resources"></a>
## 相关资源

- [管理凭证][accessTokenHref]
- [EncodedEntryURI格式][encodedEntryURIHref]

[encodedEntryURIHref]:          ../data-formats.html                             "EncodedEntryURI格式"
[accessTokenHref]:              ../security/access-token.html                    "管理凭证"

[sendBugReportHref]:    mailto:support@qiniu.com?subject=599错误日志     "发送错误报告"
[commonHttpResponseHeaderHref]: ../extended-headers.html                         "常见响应头部信息"
