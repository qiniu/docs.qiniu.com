---
layout: api_layout
title: "Token 防盗链"
---
## Token 防盗链

### 使用方法

#### 设置 Bucket 属性
	
	// 以下设置需使用 qboxrsctl 工具
	
	// 打开 Token 防盗链
	qboxrsctl tokenAntiLeech <BucketName> 1
	
	// 新建或更新 Bucket 的 MacKey，Index 为 1，用于防盗链 Token 的生成
	qboxrsctl newMacKey <BucketName> 1
	
	// 新建或更新 Bucket 的 MacKey2，Index 为 2，用于防盗链 Token 的生成
	qboxrsctl newMacKey <BucketName> 2
	
#### Token 生成算法

Token 放在请求包 Header 的 Cookie 头中，形式为：

	Cookie: qiniuToken=<QiniuToken>
	
QiniuToken 生成算法：

	QiniuToken = <Index>:<Sign>:<Ctx>
	Index = 1|2
	Sign = URLSafe_Base64Encode( HmacSha1( MacKey, Ctx ) )
	Ctx = URLSafe_Base64Encode( DownloadPolicy )
	DownloadPolicy = {"E": <Deadline>, "S": <Pattern>}
	
`<Index>`：为 1 或者 2，1 表示用 MacKey 对 Ctx 进行签名，2 对应用 MacKey2 对 Ctx 进行签名。

`<Deadline>`：为一个时间点，数值是1970年1月1日0点到此时间点的秒数，这个时间点之后，资源无法下载。

`<Pattern>`：为 URL 匹配模式（必须是非 http:// 开头），当下载 URL 匹配不成功的话，资源无法下载。

#### Pattern 详解

模式 | 说明 | 示例
-----|-----|------
`*` | 匹配所有不含"/"字符的子串 | `dl.example.com/*-small.jpg`
`?` | 匹配所有非"/"的字符 | `dl.example.com/a?.jpg`
`abc` | 匹配字符串 "abc", ('*', '?', '\\', '[' 除外) | `dl.example.com/abc.jpg`
`abc\\?d` | 匹配字符串 "`abc?d`", 双斜杠表示转义，可以包含特殊字符 | `dl.example.com/abc\\?d=xxx`
`[abc]` | 匹配字符 a, b 或者 c | `dl.example.com/[abc].jpg`
`[^abc]` | 匹配除 a, b 或者 c 以外的字符 | `dl.example.com/[^abc].jpg`
`[a-z]` | 匹配 a-z 范围以内的任意字符 | `dl.example.com/[a-zA-Z0-9].jpg`
`[^a-z]` | 匹配 a-z 范围以外的任意字符 | `dl.example.com/[^a-z].jpg`
`[abc\\?d]` | 匹配字符 a, b, c, `?` 或者 d | `dl.example.com/[abc\\?d]`