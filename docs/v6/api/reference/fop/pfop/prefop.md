---
layout: docs
title: 查询异步处理状态（prefop）
order: 200
---

<a id="prefop"></a>
# 查询异步处理状态（prefop）

<a id="prefop-description"></a>
## 描述

用户可以使用`<persistentId>`来主动查询异步云处理及持久化的执行状态。  

<a id="prefop-specification"></a>
## 接口规格（prefopSpec）

```
http://api.qiniu.com/status/get/prefop?id=<persistentId>
```

<a id="prefop-specification-params"></a>
## 接口参数

参数名称      | 说明                                             | 必填
:------------ | :----------------------------------------------- | :-------
`id`          | 上传预处理或异步云处理接口返回的`<persistentId>` | 是

<a id="prefop-request"></a>
## 请求

<a id="prefop-request-syntax"></a>
### 请求语法

```
GET /status/get/prefop?<prefopSpec> HTTP/1.1
Host: api.qiniu.com  
```

<a id="prefop-request-headers"></a>
### 头部信息

该请求必须指定以下头部信息。

头部名称      | 说明                                    | 必填
:------------ | :-------------------------------------- | :-------
Host          | 固定为api.qiniu.com                     | 是

使用本API无需设置额外头部信息。  
其它可用请求头部信息请参考[常用请求头部信息]()。

<a id="prefop-response"></a>
## 响应

<a id="prefop-request-syntax"></a>
### 响应语法

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <prefopResponseContentLength>

<prefopResponseContent>
```

<a id="prefop-response-headers"></a>
### 头部信息

头部名称      | 说明                              
:------------ | :--------------------------------------------------------------------
Content-Type  | 正常情况下该值将被设为`application/json`，表示返回JSON格式的文本信息。

<a id="prefop-response-body"></a>
### 响应内容（prefopResponseContent）

■ 如果请求成功，返回包含如下内容的JSON字符串（已格式化，便于阅读）：  

用户获得的异步云处理结果状态是一个JSON字符串，内容范例如下：

```
{
    "id": "16864pauo1vc9nhp12",
    "code": 0,
    "desc": "The fop was completed successfully",
    "items": [
        {
            "cmd": "avthumb/mp4/r/30/vb/256k/vcodec/libx264/ar/22061/ab/64k/acodec/libmp3lame",
            "code": 0,
            "desc": "The fop was completed successfully",
            "error": "",
            "hash": "FrPNF2qz66Bt14JMdgU8Ya7axZx-",
            "key": "v-PtT-DzpyCcqv6xNU25neTMkcc=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
        },
        {
            "cmd": "avthumb/iphone_low",
            "code": 0,
            "desc": "The fop was completed successfully",
            "error": "",
            "hash": "FmZ5PbHMYD5uuP1-kHaLjKbrv-75",
            "key": "tZ-w8jHlQ0__PYJdiisskrK5h3k=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
        },
        {
            "cmd": "avthumb/m3u8/r/30/vb/256k/vcodec/libx264/ar/22071/ab/64k/acodec/libmp3lame",
            "code": 0,
            "desc": "The fop was completed successfully",
            "error": "",
            "hash": "Fi4gMX0SvKVvptxfvoiuDfFkCuEG",
            "key": "8ehryqviSaMIjkVQDGeDcKRZ6qc=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
        },
        {
            "cmd": "avthumb/m3u8/preset/video_16x9_440k",
            "code": 0,
            "desc": "The fop was completed successfully",
            "error": "",
            "hash": "FtuxnwAY9NVBxAZLcxNUuToR9y97",
            "key": "s2_PQlcIOz1uP6VVBXk5O9dXYLY=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
        }
    ]
}
```

字段名称      | 说明                                           | 必填
:------------ | :--------------------------------------------- | :-------
`id`          | 异步云处理的进程ID，即前文中的`<persistentId>` | 是
`code`        | 状态码，`0`（成功），`1`（等待处理），`2`（正在处理），`3`（处理失败），`4`（通知提交失败） | 是
`desc`        | 与状态码相对应的详细描述                       | 是
`items`       | 云处理操作列表，包含每个云处理操作的状态信息   | 是
    `cmd`     | 所执行的云处理操作命令（fopN）                 | 是
    `error`   | 如果处理失败，该字段会给出失败的详细原因       | TODO
    `hash`    | 云处理结果保存在服务端的唯一`hash`标识         | 是
    `key`     | 云处理结果的外链资源名（Key）                  | 是

■ 如果请求失败，返回包含如下内容的JSON字符串（已格式化，便于阅读）：  

```
{
	"code":     <HttpCode  int>, 
    "error":   "<ErrMsg    string>",
}
```

<a id="pfop-error-messages"></a>
### 错误消息

HTTP状态码 | 含义
:--------- | :--------------------------
200        | 查询成功
400	       | 请求参数错误
404        | 查询对象不存在
599	       | 服务端操作失败。<p>如遇此错误，请将完整错误信息（包括所有HTTP响应头部）[通过邮件发送][sendBugReportHref]给我们。

[sendBugReportHref]:    mailto:support@qiniu.com?subject=599错误日志     "发送错误报告"
