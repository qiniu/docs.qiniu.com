---
layout: default
title: "下载接口"
---

- [公有资源下载](#public-download)
- [私有资源下载](#private-download)
    - [下载授权凭证 - downloadToken](#download-token)
        - [算法](#download-token-algorithm)
- [断点续下载](#download-by-range)
- [自定义 404 Not Found](#define-404-not-found)
- [自定义资源下载时所保存的名称](#define-download-friendly-name)

<a name="public-download"></a>


## 公有资源下载

**格式**

    [GET] http://<bucket>.qiniudn.com/<key>

**或者**

    [GET] http://<domain>/<key>

**或者**

    [GET] http://<domain>/<key>?<fop>/<params>

Qiniu-Cloud-Storage 的云处理（图片/音频/视频）API 满足 `url?<fop>/<params>` 这种格式，`<fop>` 表示具体的云处理指令，例如：`url?imageView/1/w/480/h/320` 表示一个缩略图预览的URL，其中 `imageView` 是具体的 `<fop>`, `1/w/480/h/320` 是该 fop 的 `<params>`。


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

    [GET] http://<bucket>.qiniudn.com/<key>?e=<deadline>&token=<downloadToken>

**或者**

    [GET] http://<domain>/<key>?e=<deadline>&token=<downloadToken>

**或者**

    [GET] http://<domain>/<key>?<fop>/<params>&e=<deadline>&token=<downloadToken>


**参数**

名称          | 说明
--------------|-------------------------------------------------------------------------------------------------------------
bucket        | 空间名称
key           | 上传时 App-Client 端指定的文件ID，在指定空间内唯一
domain        | bucket 绑定的自定义域名
deadline      | 失效期，标准的Unix timestamp形式，从1970年1月1日（UTC/GMT的午夜）开始到失效期所经过的秒数，过了这个时间点之后，后续请求无效
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

针对私有资源访问/下载，必须提供有效的 downloadToken，downloadToken 可以控制
URL 的有效期。

<a name="download-token-algorithm"></a>

### 算法

downloadToken 算法如下：

    // 步骤1：生成不带 token 的下载 URL
    url = http://<domain>/<key>?e=<deadline>

    // 或者附加 fop 指令的下载 URL
    url = http://<domain>/<key>?<fop>/<params>&e=<deadline>

    // 步骤2：将 URL 混入 SecretKey 进行数字签名
    Signature = hmac_sha1(url, SecretKey)

    // 步骤3：将签名摘要值进行安全编码
    EncodedSign = urlsafe_base64_encode(Signature)

    // 步骤4：连接各字符串，生成下载授权凭证
    downloadToken = AccessKey:EncodedSign

**注意**

- `urlsafe_base64_encode()` 函数按照标准的 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 实现，开发者可以参考 [github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。
- `AccessKey:EncodedSign` 这里的冒号是字符串，仅作为连接分隔符使用，最终连接组合的 downloadToken 也是一个字符串（String）。


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


<a name="define-download-friendly-name"></a>

## 自定义资源下载时所保存的名称

    [GET] url?download/<saveAsFriendlyName>

如上 API 规格，`download` 是一个 `fop` 指令，`<saveAsFriendlyName>` 是该 fop 指令的参数，表示下载资源保存在本地的文件名称，一般建议带上文件后缀。

公有资源下载

    [GET] http://<domain>/<key>?download/<saveAsFriendlyName>

私有资源下载

    [GET] http://<domain>/<key>?download/<saveAsFriendlyName>&e=<deadline>&token=<downloadToken>

**示例**

- <http://qiniuphotos.qiniudn.com/gogopher.jpg?download/test.jpg>

