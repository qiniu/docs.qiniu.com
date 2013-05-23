---
layout: default
title: "下载接口"
---

- [公有资源下载](#public-download)
- [私有资源下载](#private-download)
    - [下载授权凭证 - downloadToken](#download-token)
        - [算法](#download-token-algorithm)
        - [参数](#download-token-args)
        - [样例代码](#download-token-sample)
- [断点续下载](#download-by-range)
- [自定义 404 Not Found](#define-404-not-found)

<a name="public-download"></a>

## 公有资源下载

**格式**

    [GET] http://<bucket>.qiniudn.com/<key>

**或者**

    [GET] http://<domain>/<key>

**参数**

名称   | 说明
-------|---------------------------------------------------
bucket | 空间名称
key    | 上传时 App-Client 端指定的文件ID，在指定空间内唯一
domain | bucket 绑定的自定义域名

**流程**

              *************
          ****             ****
        **                     **
      **                         **
      *    Qiniu-Cloud-Storage    *
      **                         **
        **                     **
          ****             ****
              *************
                  ^  |
                  |  |
                  |  |
      (1) Request |  |
                  |  |
                  |  |
                  |  |
                  |  |
                  |  |
                  |  |
                  |  |
                  |  |
                  |  | (2) Response
                  |  |
                  |  |
                  |  v
       +-------------------------+
       |                         |
       |                         |
       |                         |
       |        App-Client       |
       |(Web/iOS/Android/etc,...)|
       |                         |
       |                         |
       |                         |
       +-------------------------+

1. App-Client 访问文件 URL 请求下载资源
2. Qiniu-Cloud-Storage 响应 App-Client, 命令距离 App-Client 物理距离最近的 IO 节点输出文件内容
3. Response 过程中支持 [断点续下载](#download-by-range)


<a name="private-download"></a>

## 私有资源下载


**格式**

    [GET] http://<bucket>.qiniudn.com/<key>?token=<downloadToken>

**或者**

    [GET] http://<domain>/<key>?token=<downloadToken>

**参数**

名称          | 说明
--------------|-------------------------------------------------------------------------------------------------------------
bucket        | 空间名称
key           | 上传时 App-Client 端指定的文件ID，在指定空间内唯一
domain        | bucket 绑定的自定义域名
downloadToken | 下载授权凭证，由 App-Server 根据 [downloadToken 签名算法](#download-token-algorithm) 生成并颁发给 App-Client

**流程**


                                       *************
                                   ****             ****
                                 **                     **
                               **                         **
                               *    Qiniu-Cloud-Storage    *
                               **                         **
                                 **                     **
                               ^   ****             ****
                              /   /    *************
                             /   /
                            /   /
      (3) Request Download /   /
                          /   /
                         /   /
                        /   /
                       /   /  (4) Return Result
                      /   /
                     /   /
                    /   /
                   /   /
                  /   /
                 /   /
                /   /
               /   /
              /   v
      +------------------+                                        +------------------+
      |                  |                                        |                  |
      |                  |    (1) Request (can be once)           |                  |
      |                  |--------------------------------------->|                  |
      |    App-Client    |                                        |    App-Server    |
      |                  |<---------------------------------------|                  |
      |                  |    (2) Return DownloadToken            |                  |
      |                  |                                        |                  |
      +------------------+                                        +------------------+

1. App-Client 向 App-Server 请求下载授权
2. App-Server 根据 [downloadToken 签名算法](#download-token-algorithm) 生成 downloadToken, 并颁发给 App-Client
3. App-Client 拿到 downloadToken 后，向 Qiniu-Cloud-Storage 请求下载文件
4. Qiniu-Cloud-Storage 在校验 downloadToken 成功后，输出文件内容。如果校验失败，返错误信息（401 bad token）
5. Qiniu-Cloud-Storage 输出文件内容过程中支持 [断点续下载](#download-by-range)


<a name="download-token"></a>

## 下载授权凭证 - downloadToken

针对私有资源访问/下载，必须提供有效的 downloadToken，downloadToken 根据签名规则，可以做到一次性有效；或者一次生成，多次有效。

<a name="download-token-algorithm"></a>

### 算法

downloadToken 算法如下：

    // 步骤1：组织元数据（JSONString）
    Flags = {
        E: <deadline int64>,
        S: <pattern string>  
    }

    // 步骤2：将 Flags 进行安全编码
    EncodedFlags = urlsafe_base64_encode(JSONString(Flags))

    // 步骤3：将编码后的元数据混入私钥进行签名
    Signature = hmac_sha1(EncodedFlags, SecretKey)

    // 步骤4：将签名摘要值进行安全编码
    EncodedSign = urlsafe_base64_encode(Signature)

    // 步骤5：连接各字符串，生成下载授权凭证
    downloadToken = AccessKey:EncodedSign:EncodedFlags

**注意**

- `Flags` 数据必须为标准的 [JSON](http://json.org/) 字符串
- `Flags` 各字段里边的尖括号“`<Variable Type>`”内容表示要被替换掉的“变量”，“变量”的数据类型已在括号内指定
- `urlsafe_base64_encode()` 函数按照标准的 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 实现，开发者可以参考 [github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。
- `AccessKey:EncodedSign:EncodedFlags` 这里的冒号是字符串，仅作为连接分隔符使用，最终连接组合的 downloadToken 也是一个字符串（String）。


<a name="download-token-args"></a>

### 参数

名称 | 类型   | 说明
-----|--------|-----------------------------------------------------------------------------------------------------------------
E    | int64  | 表示 deadline，deadline 为一个时间点，数值是1970年1月1日0点到此时间点的秒数，过了这个时间点之后，后续的请求无效。
S    | string | 表示 pattern，pattern 为 URL 匹配模式（非 `http://`` 开头），下载URL匹配该模式不成功，请求无效。

pattern 详解

模式      | 说明                                                 | 示例
----------|------------------------------------------------------|--------------------------------
*         | 匹配所有不含”/”字符的子串，不支持多级路径            | dl.example.com/*-small.jpg
?         | 匹配所有非”/”的字符                                  | dl.example.com/a?.jpg
abc       | 匹配字符串 “abc”, (‘*’, ‘?’, ‘\’, ‘[’ 除外)          | dl.example.com/abc.jpg
abc\\?d   | 匹配字符串 “abc?d”, 双斜杠表示转义，可以包含特殊字符 | dl.example.com/abc\\?d=xxx
[abc]     | 匹配字符 a, b 或者 c                                 | dl.example.com/[abc].jpg
[^abc]    | 匹配除 a, b 或者 c 以外的字符                        | dl.example.com/[^abc].jpg
[a-z]     | 匹配 a-z 范围以内的任意字符                          | dl.example.com/[a-zA-Z0-9].jpg
[^a-z]    | 匹配 a-z 范围以外的任意字符                          | dl.example.com/[^a-z].jpg
[abc\\?d] | 匹配字符 a, b, c, ? 或者 d                           | dl.example.com/[abc\\?d]

注意，`*` 不支持多级目录匹配，切勿使用 `dl.example.com/*` 这种模式。


<a name="download-token-sample"></a>

### 样例代码

生成 downloadToken 的样例代码可以参考: 

- C - <https://github.com/qiniu/c-sdk/blob/develop/qiniu/rs.c>
- Go - <https://github.com/qiniu/api/blob/develop/rs/token.go>

<a name="download-by-range"></a>

## 断点续下载

断点续下载协议标准参考：<http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35>

七牛云存储按以上标准支持断点续下载，只需在 HTTP 请求下载链接的头部附带 `Range` 字段即可。

    Range: bytes=<first-byte-pos>-<last-byte-pos>

**参数**

名称               | 说明
-------------------|-------------------------------------
`<first-byte-pos>` | 起始位置，从数字0开始计算
`<last-byte-pos>`  | 断点续下载中，最后一个字节所在的位置


<a name="define-404-not-found"></a>

## 自定义 404 Not Found

七牛云存储支持自定义 404 Not Found 处理，当一个资源不存在，可以让该请求命中一个缺省的资源。该资源可以是一张图片，也可以是一段HTML等。

要实现自定义 404 Not Found，只需向指定的 bucket (存储空间) 上传一个 key (FileID) 为 `errno-404` 的文件即可。
