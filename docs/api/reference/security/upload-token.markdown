---
layout: docs
title: 上传凭证
---

<a name="upload-token"></a>
## 上传凭证（UploadToken）

上传凭证是七牛云存储用于验证上传请求合法性的机制。用户通过上传凭证授权客户端，使其具备访问指定资源的能力。

上传凭证的算法如下：

1. 构造[上传策略]()。用户根据业务需求，确定上传策略的要素，构造出具体的上传策略。比如，有用户需要向空间 `my-bucket` 上传一个名为 `sunflower.jpg` 的图片，有效期是到 `2015-12-31 00:00:00`，并且希望得到图片的名称、大小、宽、高和校验值。那么相应的上传策略的字段分别为：

    ```
    scope = "my-bucket:sunflower.jpg"
    deadline = 1451491200
    returnBody = '{
      "name": $(fname),
      "size": $(fsize),
      "w": $(imageInfo.width),
      "h": $(imageInfo.height),
      "hash": $(etag),
    }'
    ```

1. 将上传策略序列化成为json格式。用户可以使用各种语言的json库，也可以手工地拼接字符串。序列化后，可以得到：

    ```
    put_policy = '{"scope":"my-bucket:sunflower.jpg","deadline":1451491200,"returnUrl":"{\"name\": $(fname),\"size\": $(fsize),\"w\": $(imageInfo.width),\"h\": $(imageInfo.height),\"hash\": $(etag),}"}'
    ```

1. 对json序列化后的上传策略进行[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)：

    ```
    encoded = urlsafe_base64_encode(put_policy)
    ```

    得到

    ```
    "eyJzY29wZSI6Im15LWJ1Y2tldDpzdW5mbG93ZXIuanBnIiwiZGVhZGxpbmUiOjE0NTE0OTEyMDAsInJldHVyblVybCI6IntcIm5hbWVcIjogJChmbmFtZSksXCJzaXplXCI6ICQoZnNpemUpLFwid1wiOiAkKGltYWdlSW5mby53aWR0aCksXCJoXCI6ICQoaW1hZ2VJbmZvLmhlaWdodCksXCJoYXNoXCI6ICQoZXRhZyksfSJ9"
    ```

1. 用SecretKey对编码后的上传策略进行HMAC-SHA1加密，并且做URL安全的Base64编码：

    ```
    signature = hmac_sha1(SecretKey, encoded)
    encode_signed = urlsafe_base64_encode(signature)
    ```

    假设用户的 `SecretKey="Yx0hNBifQ5V5SqLUkzPkjyy0pbYJpav9CH1QzkG0"` 加密后的结果是：

    ```
    "5Cr3Nrw0qkyYKfQicd_ejAdIrfs="
    ```

1. 最后，将 `AccessKey`、`encode_signed` 和 `encoded` 用 “:” 连接起来：

    ```
    upload_token = AccessKey + ":" + encode_signed + ":" + encoded
    ```
    
    假设用户的 `AccessKey="j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo"` 。最后得到的上传凭证为：

    ```
    j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo:5Cr3Nrw0qkyYKfQicd_ejAdIrfs=:eyJzY29wZSI6Im15LWJ1Y2tldDpzdW5mbG93ZXIuanBnIiwiZGVhZGxpbmUiOjE0NTE0OTEyMDAsInJldHVyblVybCI6IntcIm5hbWVcIjogJChmbmFtZSksXCJzaXplXCI6ICQoZnNpemUpLFwid1wiOiAkKGltYWdlSW5mby53aWR0aCksXCJoXCI6ICQoaW1hZ2VJbmZvLmhlaWdodCksXCJoYXNoXCI6ICQoZXRhZyksfSJ9
    ```

### 代码示例

```
// TODO: 代码示例goes here.
```