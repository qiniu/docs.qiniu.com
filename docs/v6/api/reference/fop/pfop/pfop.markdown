---
layout: docs
title: 处理已存在资源（pfop）
order: 300
---

<a name="pfop-existing-resource"></a>
# 处理已存在资源（pfop）

<a name="description"></a>
## 描述

如果需要对已存在于空间中的资源进行处理并持久化处理结果，可使用异步处理接口：  

<a name="request"></a>
## 请求

<a name="request-syntax"></a>
### 请求语法

```
POST /pfop HTTP/1.1
Host: api.qiniu.com  
Content-Type: application/x-www-form-urlencoded  
Authorization: QBox <AccessToken>  

bucket=<bucket>&key=<key>&fops=<fop1>;<fop2>...<fopN>&notifyURL=<persistentNotifyUrl>
```
参数名称      | 说明                              | 必填
:------------ | :-------------------------------- | :-------
`bucket`      | 资源空间                          | 是
`key`         | 资源名                            | 是
`fops`        | 云处理操作列表，用“;”分隔         | 是
`notifyURL`   | 处理结果通知接收URL               | 是

<a name="request-auth"></a>
### 访问权限

[访问凭证（AccessToken）][accessTokenHref]方式。

<a name="request-params"></a>
### 请求参数

该请求无需设置任何参数。

<a name="request-headers"></a>
### 头部信息

该请求必须指定以下头部信息。

头部名称      | 说明                              | 必填
:------------ | :-------------------------------- | :-------
Host          | 固定为api.qiniu.com               | 是
Content-Type  | 固定为application/x-www-form-urlencoded | 是
Authorization | 该参数应严格按照[访问凭证][accessTokenHref]格式进行填充，否则会返回401错误码。<p>一个合法的Authorization值应类似于：`QBox QNJi_bYJlmO5LeY08FfoNj9w_r7...`。 | 是

使用本API无需设置额外头部信息。  
其它可用请求头部信息请参考[常用请求头部信息]()。

  
<a name="response"></a>
## 响应

<a name="request-syntax"></a>
### 响应语法

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <length>

{"persistentId": <persistentId int64>}
```

<a name="response-headers"></a>
### 头部信息

头部名称      | 说明                              
:------------ | :--------------------------------------------------------------------
Content-Type  | 正常情况下该值将被设为`application/json`，表示返回JSON格式的文本信息。

<a name="response-body"></a>
### 响应内容

如果请求成功，该响应不返回如下JSON字符串（已格式化以方便阅读）：  

```
{
    "persistentId": <persistentId int64>
}
```

字段名称      | 说明                              
:------------ | :--------------------------------------------------------------------
persistentId  | 异步处理会话标识，可用于查询处理进度，请参考[异步持久化处理查询接口](p.html)

如果请求失败，返回的响应内容将是一个JSON结构体。格式如下：

```
{
	"code":     <HttpCode  int>, 
    "error":   "<ErrMsg    string>",
}
```

<a name="error-messages"></a>
### 错误消息

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 持久化处理成功
400	       | 请求参数错误
401        | 访问凭证无效
404        | 资源不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。
614        | 目标资源已存在

[sendBugReportHref]:    mailto:support@qiniu.com?subject=599错误日志     "发送错误报告"
[accessTokenHref]:      http://docs.qiniu.com/api/v6/rs.html#digest-auth "访问凭证"
