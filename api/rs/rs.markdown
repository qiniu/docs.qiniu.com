---
layout: default
title: "资源管理操作"
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
EncodedEntryURI     | 代指要操作的资源，将资源空间（Bucket）和资源名（Key）用“:”连接起来，进行[URL安全的Base64编码](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)： `EncodedEntryURI = urlsafe_base64_encode(\<bucket\>:\<key\>)`。其中\<bucket\>是资源空间名，\<key\>是资源名。**注意： 资源名必须是utf8编码，使用非utf8的资源名访问七牛云存储将会失败。**
EncodedEntryURISrc  | 源 EncodedEntryURI
EncodedEntryURIDest | 目标 EncodedEntryURI

`urlsafe_base64_encode(string)` 函数的实现符合 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 标准，开发者可以参考 [github.com/qiniu](https://github.com/qiniu) 上各SDK的样例代码。


<a name="file"></a>

## 单文件操作
单文件操作提供了对存储在七牛云上的单个文件进行查看、移动、复制和删除的处理功能。同时我们也支持对批量文件的处理操作，请参考[批量操作](#batch)。

<a name="stat"></a>

### 查看

查看一个文件的相关信息，只需提交一个符合如下条件的HTTP POST请求：

- 请求URL格式为：http://rs.qiniu.com/stat/`<EncodedEntryURI>`
- HTTP头部中包含一个如下键值对用于认证： `Authorization: QBox <AccessToken>`
- Content-Type为application/x-www-form-urlencoded

该文件的相关信息将会以JSON的形式包含在对应的 Response 的 Body 中，格式如下：

    {
        hash: <FileEtag>, 	// string 类型，文件的Hash值
        fsize: <FileSize>, 	// int 类型，文件的大小(单位: 字节)
        mimeType: <MimeType>,	// string 类型，文件的媒体类型，比如"image/gif"
        putTime: <PutTime>	// int64 类型，文件上传到七牛云的时间(Unix时间戳)
    }

一个完整的HTTP请求和应答格式如下：

    HTTP/1.1
    POST http://rs.qiniu.com/stat/<EncodedEntryURI>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store
    Response Body: {
        fsize: <FileSize int>,
        hash: <FileETag string>,
        mimeType: <MimeType string>,
        putTime: <PutTime int64>  // 文件上传时候的七牛云存储服务器时间
    }

<a name="move"></a>

### 移动

移动一个文件，只需提交一个符合如下条件的HTTP POST请求：

- 请求URL格式为：http://rs.qiniu.com/move/`<EncodedEntryURISrc>`/`<EncodedEntryURIDest>`
- HTTP头部中包含一个用于认证的键值对： `Authorization: QBox <AccessToken>`
- Content-Type为application/x-www-form-urlencoded

服务器将会以HTTP Status Code的方式返回操作结果，如果返回200，则说明操作成功，其余状态码请参考[错误码](#error-code)。

    HTTP/1.1
    POST http://rs.qiniu.com/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

<a name="copy"></a>

### 复制

复制一个文件，和[移动](#move)操作十分类似，需提交一个符合如下条件的HTTP POST请求：

- 请求URL格式为：http://rs.qiniu.com/copy/`<EncodedEntryURISrc>`/`<EncodedEntryURIDest>`
- HTTP头部中包含一个用于认证的键值对： `Authorization: QBox <AccessToken>`
- Content-Type为application/x-www-form-urlencoded

服务器将会以HTTP Status Code的方式返回操作结果，如果返回200，则说明操作成功，其余状态码请参考[错误码](#error-code)。

    HTTP/1.1
    POST http://rs.qiniu.com/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

<a name="delete"></a>

### 删除

删除一个文件也很简单，提交一个符合如下条件的HTTP POST请求即可：

- 请求URL格式为：http://rs.qiniu.com/delete/`<EncodedEntryURI>`
- HTTP头部中包含一个用于认证的键值对： `Authorization: QBox <AccessToken>`
- Content-Type为application/x-www-form-urlencoded

服务器将会以HTTP Status Code的方式返回操作结果，如果返回200，则说明操作成功，其余状态码请参考[错误码](#error-code)。

    HTTP/1.1
    POST http://rs.qiniu.com/delete/<EncodedEntryURI>
    Content-Type: application/x-www-form-urlencoded
    Request Headers: {
        Authorization: QBox <AccessToken>
    }

    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store

<a name="batch"></a>

## 批量操作

在支持对单个文件资源操作的同时，七牛云存储还支持批量地对多个文件进行查看、删除、复制和移动操作。

**请求**

批量操作的请求是由多个单文件操作指令组成的，请求格式统一为：

    POST http://rs.qiniu.com/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=<Operation>&op=<Operation>&...

其中 `op=<Operation>` 是一个单文件操作指令。例如 `/stat/<EncodeEntryURI>`， `/delete/<EncodeEntryURI>` 等。

**响应**

批量操作的服务端响应格式如下：

    200 OK [
        <Result1>, <Result2>, ...
    ]
    298 Partial OK [
        <Result1>, <Result2>, ...
    ]

    其中 <Result> 是 {
        code: <HttpCode int>,
    }
    或者 {
        code: <HttpCode int>,
        data: <Data> 或 data: { error: <ErrorMessage string> }
    }

响应包的HTTP Status Code若为`200 OK`则意味着所有操作全部成功，若为`298 Partial OK`则意味着存在部分或全部操作出错。顺序解析响应包的Body的JSON数据可得到每个操作对应的执行结果信息。


<a name="batch-stat"></a>

### 批量查看

批量查看可用来一次查看多个文件的文件信息，请求格式如下：

    POST http://rs.qiniu.com/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/stat/<EncodedEntryURI>&
                 op=/stat/<EncodedEntryURI>&
                 ...

<a name="batch-move"></a>

### 批量移动

批量移动可用来一次移动多个文件，请求格式如下：

    POST http://rs.qiniu.com/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 op=/move/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 ...

<a name="batch-copy"></a>

### 批量复制

批量复制可用来一次复制多个文件，请求格式如下：

    POST http://rs.qiniu.com/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 op=/copy/<EncodedEntryURISrc>/<EncodedEntryURIDest>&
                 ...

<a name="batch-delete"></a>

### 批量删除

批量删除可用来一次删除多个文件，请求格式如下：

    POST http://rs.qiniu.com/batch
    Content-Type: application/x-www-form-urlencoded
    RequestBody: op=/delete/<EncodedEntryURI>&
                 op=/delete/<EncodedEntryURI>&
                 ...

<a name="list"></a>

## 列出文件

请求某个存储空间（bucket）下的文件列表，如果有前缀，可以按前缀（`prefix`）进行过滤；如果前一次返回`marker`就表示还有资源，下一步请求需要将`marker`参数填上。

    HTTP/1.1
    POST http://rsf.qiniu.com/list?bucket=<BucketName>&
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

AccessToken的计算公式： `<ACCESS_KEY>`:`urlsafe_base64_encode(hmac_sha1(<SECRET_KEY>, data))`

一个典型的请求为：

    HTTP1.1
    POST http://<host>/<path>?<query>
    Request Headers: {
        Content-Type: application/x-www-form-urlencoded
        Authorization: <AccessToken>
    }
    Request Body: {
        <Body>
    }

对应AccessToken的计算公式，AccessToken的生成步骤可以分解为：

- Step1. 明确需要被签名的数据`data`：
    - 如果请求不含Body，或者Content-Type不是application/x-www-form-urlencoded，则data=`<path>?<query>\n`（注意最后的`\n`）
    - 如果请求包含Body，那么data=`<path>?<query>\n<Body>`
- Step2. 使用`SECRET_KEY`对`data`进行SHA1签名，即`hmac_sha1(<SECRET_KEY>, data)`，得到`<SignData>`
- Step3. 对得到的签名进行Base64编码，即`urlsafe_base64_encode(<SignData>)`，得到`<EncodedSignData>`
- Step4. 将`<ACCESS_KEY>`和`<EncodedSignData>`利用`:`连接，得到`<ACCESS_KEY>:<EncodedSignData>`，即AccessToken

注意：
    所有请求的Content-Type必须为application/x-www-form-urlencoded，否则可能会造成批处理指令无法正确执行。

生成 AccessToken 示例代码如下:

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
     * @param string $body
     * @return string
     */
    function generate_access_token($access_key, $secret_key, $url, $body){
        $parsed_url = parse_url($url);
        $path = $parsed_url['path'];
        $access = $path;
        if (isset($parsed_url['query'])) {
            $access .= "?" . $parsed_url['query'];
        }
        $access .= "\n";

        if($body){
            $access .= $body;
        }

        $digest = hash_hmac('sha1', $access, $secret_key, true);
        return $access_key.':'.urlsafe_base64_encode($digest);
    }

    /**
     * 测试
     */
    $access_key = 'YOUR_ACCESS_KEY';
    $secret_key = 'YOUR_SECRET_KEY';
    $url = 'http://rsf.qiniu.com/list';
    $query = 'bucket=myTestBucket&marker=200&limit=100&prefix='
    $url .= "?" . $query
    $body = null
    $access_token = generate_access_token($access_key, $secret_key, $url, $body);
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

    def generate_access_token(access_key, secret_key, url, body)
        uri = URI.parse(url)
        access = uri.path
        query_string = uri.query
        access += '?' + query_string if !query_string.nil? && !query_string.empty?
        access += "\n";

        if body
            access += body
        end
        hmac = HMAC::SHA1.new(secret_key)
        hmac.update(access)
        encoded_digest = urlsafe_base64_encode(hmac.digest)
        %Q(#{access_key}:#{encoded_digest})
    end

    access_key = 'YOUR_ACCESS_KEY_HERE'
    secret_key = 'YOUR_SECRET_KEY_HERE'
    url = 'http://rsf.qiniu.com/list'
    query = 'bucket=myTestBucket&marker=200&limit=100&prefix='
    url += '?' + query
    body = nil
    access_token = generate_access_token(access_key, secret_key, url, body)
    puts access_token

**请求认证**

将以上示例代码中签算的最终结果（`access_token`）附加到所在请求的 HTTP Headers 中即可。如下示例，在 HTTP Headers 中新增一个名为 Authorization 的字段，并将 `QBox access_token` 作为该字段的值：

    Authorization: QBox 3fPHl_SLkPXdioqI_A8_NGngPWVJhlDk2ktRjogH:6q3ojKAnANibjfQzUOxlYFXvGRk=


完整的授权认证示范代码可参考SDK实现，例如:

- Go - <https://github.com/qiniu/api/blob/develop/auth/digest/digest_auth.go>
- Python - <https://github.com/qiniu/python-sdk/blob/develop/qiniu/auth/digest.py>


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

