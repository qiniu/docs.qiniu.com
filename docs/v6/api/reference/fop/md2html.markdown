---
layout: docs
title: MD转HTML（md2html）
order: 110
---

# MD转HTML（md2html）

Markdown 转 HTML 接口的规格如下

    [GET] url?md2html/<mode>/css/<EncodedCSSURL>

`url` 获取可以参考 [下载接口](get.html)

**参数**

名称          | 类型   | 必须 | 说明
--------------|--------|------|------------------------------------------------------------------------------
mode          | int    | 否   | `0` 表示转为完整的 HTML(head+body) 输出; `1` 表示只转为HTML Body，缺省值：`0`
EncodedCSSURL | string | 否   | CSS 样式的URL，`EncodedCSSURL = urlsafe_base64_encode(CSSURL)`

`urlsafe_base64_encode(string)` 函数的实现符合 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 标准，开发者可以参考 <https://github.com/qiniu> 上各SDK的样例代码。
