---
layout: docs
title: 下载凭证
order: 960
---

<a name="download-token"></a>
# 下载凭证

下载凭证是七牛云存储用于验证下载私有资源请求合法性的机制。用户通过下载凭证授权客户端，使其具备访问指定私有资源的能力。  

下载凭证的算法如下：

1. 构造下载URL：  

    ```
    DownloadUrl = "http://my-bucket.qiniu.com/sunflower.jpg"
    ```

2. 为下载URL加上过期时间（e参数，[Unix时间][unixTime]）：  

    ```
    DownloadUrl = "http://my-bucket.qiniu.com/sunflower.jpg?e=1451491200"
    ```

3. 用`SecretKey`对下载URL进行HMAC-SHA1加密，并且做[URL安全的Base64编码][urlsafeBase64]：

    ```
    Sign = hmac_sha1(SecretKey, DownloadUrl)
    EncodedSign = urlsafe_base64_encode(Sign)

    得到

    HbAKtTogKqDLWEkq7zVSX6T35NI=
    ```

4. 将下载凭证添加到含过期时间参数的下载URL之后，作为最后一个参数（token参数）：  

    ```
    RealDownloadUrl = "http://my-bucket.qiniu.com/sunflower.jpg?e=1451491200&token=HbAKtTogKqDLWEkq7zVSX6T35NI="
    ```

`RealDownloadUrl`即为下载对应私有资源的可用URL，并在指定时间后失效。失效后，可按需重新生成下载凭证。  

[urlsafeBase64]: http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64 "URL安全的Base64编码"
[unixTime]: http://en.wikipedia.org/wiki/Unix_time "Unix时间"
