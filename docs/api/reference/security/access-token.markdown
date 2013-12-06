---
layout: docs
title: 管理凭证
order: 950
---

<a name="access-token"></a>
# 管理凭证

管理凭证是七牛云存储用于验证管理请求合法性的机制。  
建议仅在业务服务器使用这一类凭证，避免意外授权导致滥用。  

管理凭证的算法如下：  

1. 抽取请求URL中`<path>?<query>`的部分与请求内容，用“\n”连接起来。如无请求内容，该部分为空字符串。  

    ```
    FormatStr = "<path>?<query>\n"
    或
    FormatStr = "<path>?<query>\n<body>"
    ```

2. 用SecretKey对待加密字符串进行HMAC-SHA1加密，并且做URL安全的Base64编码：

    ```
    Sign = hmac_sha1(SecretKey, FormatStr)
    EncodedSign = urlsafe_base64_encode(Sign)
    ```

3. 最后，将`AccessKey`和`EncodedSign`用 “:” 连接起来：  

    ```
    <AccessKey>:<EncodedSign>
    ```

## 代码示例

```
// TODO: 代码示例goes here.
```
