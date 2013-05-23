---
layout: default
title: "文件管理接口"
---

- [术语](#words)
- [单文件操作](#file)
    - [查看](#stat)
    - [移动](#move)
    - [复制](#copy)
    - [删除](#delete)
- [批量操作](#batch)
    - [查看](#batch-stat)
    - [移动](#batch-move)
    - [复制](#batch-copy)
    - [删除](#batch-delete)
- [列出文件](#list)
- [授权认证 - AccessToken](#digest-auth)
- [错误码](#error-code)


<a name="words"></a>

## 术语

在阅读下述API规格前，需要事先了解如下个别术语。

名称                | 说明
--------------------|------------------------------------------------------------------------
AccessToken         | 令牌，API请求的访问凭证，参考 [授权认证 - AccessToken](#digest-auth)
EncodedEntryURI     | 代指要操作的资源，`EncodedEntryURI = urlsafe_base64_encode(bucket:key)`
EncodedEntryURISrc  | 源 EncodedEntryURI
EncodedEntryURIDest | 目标 EncodedEntryURI

`urlsafe_base64_encode(string)` 函数的实现符合 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 标准，开发者可以参考 [github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。


<a name="file"></a>

## 单文件操作

<a name="stat"></a>

### 查看

    HTTP/1.1
    POST http://rs.qbox.me/stat/<EncodedEntryURI>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store
    Response Body: {
        hash: <FileETag string>,
        fsize: <FileSize int>,
        putTime: <PutTime int64>, // 文件上传时候的七牛云存储服务器时间
        mimeType: <MimeType string>
    }

<a name="move"></a>

### 移动

    HTTP/1.1
    POST http://rs.qbox.me/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

<a name="copy"></a>

### 复制

    HTTP/1.1
    POST http://rs.qbox.me/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

<a name="delete"></a>

### 删除

    HTTP/1.1
    POST http://rs.qbox.me/delete/<EncodedEntryURI>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

<a name="batch"></a>

## 批量操作

**请求**

    POST http://rs.qbox.me/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=<Operation>&op=<Operation>&...

其中 `op=<Operation>` 是一个操作指令。例如 `/get/`, `/stat/`, `/delete/`, …

<a name="batch-stat"></a>

### 批量查看

    POST http://rs.qbox.me/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/stat/<EncodedEntryURI>&
                 op=/stat/<EncodedEntryURI>&
                 ...

<a name="batch-move"></a>

### 批量移动

    POST http://rs.qbox.me/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 ...

<a name="batch-copy"></a>

### 批量复制

    POST http://rs.qbox.me/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 ...

<a name="batch-delete"></a>

### 批量删除

    POST http://rs.qbox.me/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/delete/<EncodedEntryURI>&
                 op=/delete/<EncodedEntryURI>&
                 ...

**响应**

    200 OK [
        <Result1>, <Result2>, ...
    ]
    298 Partial OK [
        <Result1>, <Result2>, ...
    ]

    <Result> 是 {
        code: <HttpCode int>,
        data: <Data> 或 error: <ErrorMessage string>
    }


<a name="list"></a>

## 列出文件

请求某个存储空间（bucket）下的文件列表，如果有前缀，可以按前缀（`prefix`）进行过滤；如果前一次返回`marker`就表示还有资源，下一步请求需要将`marker`参数填上。

    HTTP/1.1
    POST http://rsf.qbox.me/list?bucket=<BucketName>&
                                 marker=<Marker>&
                                 limit=<Limit>&
                                 prefix=<Prefix>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store
    Response Body: {
        marker: <Marker> //如果没有剩余条目，服务器返回这项为空
        items: [
            {
                key：<Key>,
                time: <FilePutTime>,
                hash: <FileETag>,
                fsize: <FileSize>,
                mimeType: <MimeType>,
                customer: <EndUserId>
            },
            ...
        ]
    }

**请求参数**

名称   | 必填项 | 说明
-------|--------|-------------------------------------------
bucket | 是     | 存储空间名称
marker | 否     | 为服务器上次导出时返回的标记，没有可以不填
limit  | 否     | 单次查询返回的最大条目数，最大不超过1000
prefix | 否     | 指定要过滤出来的前缀


<a name="digest-auth"></a>

## 授权认证 - AccessToken

生成 AccessToken 示例代码如下

**PHP**

    <?php

    /**
     * urlsafe_base64_encode
     *
     * @desc URL安全方式的base64编码
     * @param string $str
     * @return string
     */
    function urlsafe_base64_encode($str){
        $find = array("+","/");
        $replace = array("-", "_");
        return str_replace($find, $replace, base64_encode($str));
    }

    /**
     * generate_access_token
     *
     * @desc 生成 AccessToken
     * @param string $access_key
     * @param string $secret_key
     * @param string $url
     * @param array  $params
     * @return string
     */
    function generate_access_token($access_key, $secret_key, $url, $params){
        $parsed_url = parse_url($url);
        $path = $parsed_url['path'];
        $access = $path;
        if (isset($parsed_url['query'])) {
            $access .= "?" . $parsed_url['query'];
        }
        $access .= "\n";
        if($params){
            if (is_array($params)){
                $params = http_build_query($params);
            }
            $access .= $params;
        }
        $digest = hash_hmac('sha1', $access, $secret_key, true);
        return $access_key.':'.urlsafe_base64_encode($digest);
    }

    /**
     * 测试
     */
    $access_key = 'YOUR_ACCESS_KEY';
    $secret_key = 'YOUR_SECRET_KEY';
    $url = 'http://rsf.qbox.me/list';
    $params = array(
        "bucket" => "myTestBucket",
        "marker" => 200,
        "limit"  => 100,
        "prefix" => "",
    );
    $access_token = generate_access_token($access_key, $secret_key, $url, $params);
    var_dump($access_token);

**Ruby**

    require 'rubygems'
    require 'hmac-sha1'
    require 'base64'
    require 'uri'
    require 'cgi'

    def urlsafe_base64_encode content
        Base64.encode64(content).strip.gsub('+', '-').gsub('/','_').gsub(/\r?\n/, '')
    end

    def generate_access_token(access_key, secret_key, url, params)
        uri = URI.parse(url)
        access = uri.path
        query_string = uri.query
        access += '?' + query_string if !query_string.nil? && !query_string.empty?
        access += "\n";
        if params.is_a?(Hash)
            total_param = params.map do |key, value|
                %Q(#{CGI.escape(key.to_s)}=#{CGI.escape(value.to_s).gsub('+', '%20')})
            end
            access += total_param.join("&")
        end
        hmac = HMAC::SHA1.new(secret_key)
        hmac.update(access)
        encoded_digest = urlsafe_base64_encode(hmac.digest)
        %Q(#{access_key}:#{encoded_digest})
    end

    access_key = 'YOUR_ACCESS_KEY_HERE'
    secret_key = 'YOUR_SECRET_KEY_HERE'
    url = 'http://rsf.qbox.me/list'
    params = {
        "bucket" => "myTestBucket",
        "marker" => 200,
        "limit"  => 100,
        "prefix" => "",
    }
    access_token = generate_access_token(access_key, secret_key, url, params)
    puts access_token

**请求认证**

将以上示例代码中签算的最终结果（`access_token`）附加到所在请求的 HTTP Headers 中即可。如下示例，在 HTTP Headers 中新增一个名为 Authorization 的字段，并将 `QBox access_token` 作为该字段的值：

    Authorization: QBox 3fPHl_SLkPXdioqI_A8_NGngPWVJhlDk2ktRjogH:6q3ojKAnANibjfQzUOxlYFXvGRk=


完整的授权认证示范代码可参考SDK实现，例如:

- Go - <https://github.com/qiniu/api/blob/develop/auth/digest/digest_auth.go>
- Python - <https://github.com/qiniu/python-sdk/blob/develop/qiniu/auth_digest.py>


<a name="error-code"></a>

## 错误码

HTTP 状态码 | 错误说明
------------|-----------------------------------------------------------------
400         | 请求参数错误
401         | 认证授权失败，可能是 AccessKey/SecretKey 错误或 AccessToken 无效
405         | 请求方式错误，非预期的请求方式
599         | 服务端操作失败
608         | 文件内容被修改
612         | 指定的文件不存在或已经被删除
614         | 文件已存在
631         | 指定的存储空间（Bucket）不存在

