---
layout:	api_layout
title: "概念和术语"
order: 90
---

- [资源（Resource）](#Resource)
- [资源空间（Bucket）](#Bucket)
- [原图保护](#Origin-Protect)
- [资源名（Key）](#Key)
- [应用服务器（App-Server）](#App-Server)
- [应用客户端（App-Client）](#App-Client)
- [用户凭证（Access Key）](#Access-Key)
- [签名密钥（Secret Key）](#Secret-Key)
- [授权（Authentication）](#Authentication)
- [令牌（Token）](#Token)
- [云处理（FOP）](#FOP)
  - [异步云处理（AsyncOp，预处理）](#FOP-Async)
- [魔法变量（Magic Variable）](#Magic-Variable)
- [自定义变量（xVariable）](#Selfdef-Variable)
- [Callback（回调）、Return（返回）和重定向（Redirect）](#Callback-Return)
- [EncodedEntryURI](#Encoded-Entry-URI)
- [EncodedEntryURISrc](#Encoded-Entry-URI-Src)
- [EncodedEntryURIDest](#Encoded-Entry-URI-Dest)
- [URL安全的base64编码](#URLSafeBase64)



<a name="Resource"></a>

### 资源（Resource）

资源是用户存放在七牛云存储的非结构化数据或文件。用户可以通过七牛云存储的[API](http://docs.qiniu.com/api/index.html)或[SDK](http://docs.qiniu.com/sdk/index.html)访问这些资源 。 资源通过[资源名](#Key)标识。 资源存放在[资源空间](#Bucket)中。 资源可以在不同的资源空间之间复制、移动。用户可以对一个资源进行各种[云处理](#FOP)。

<a name="Bucket"></a>

### 资源空间（Bucket）

资源空间是存放资源的容器。一个资源空间可以存放任意数量的资源，但一个资源只能存放在一个资源空间中。每个帐号可以拥有多个资源空间，但每个用户可以创建的资源空间的数量存在上限，默认情况下为20个。

用户可以将资源空间设置为公开或私有。公开的资源空间，任何人都可以直接访问读取。私有的资源空间中，对资源的访问必须获得所有者的授权。但无论是公开的，还是私有的资源空间，数据的上传和管理（移动、删除、复制等等）都必须获得资源空间所有者的授权。

<a name="Origin-Protect"></a>

### 原图保护

用户可以将一个公开的资源空间设置为原图保护。原图保护的资源空间中，用户上传的资源需要通过授权访问，就如同私有空间内的资源那样。但不同于私有资源，任何人可以不受限制地访问受保护资源的某一种指定的[云处理](#FOP)结果。用户可以通过创建[FOP别名](http://docs.qiniu.com/api/v6/gen-use.html#style)来指定哪些云处理操作可以被用于受保护的资源。用户可以利用原图保护将上传的原始资源掩藏掉，只提供某种处理结果。比如用户将一个图片保护起来，其他人只能以公开的方式访问打上水印的图片。

<a name="Key"></a>

### 资源名（Key）

资源名是一个资源的名字，用以在资源空间中标识该数据对象。资源名在资源空间中唯一。当用户使用一个已经存在的资源名向资源空间中写入新资源后，原有的资源会被覆盖。

<a name="App-Server"></a>

### 应用服务器（App-Server）

应用服务器是指使用七牛云存储的应用的业务服务器。这些服务器为七牛用户所有，运行了用户的业务系统。应用服务器可以是Web服务器，业务服务器等等。应用服务器负责向[应用客户端](#App-Client)颁发资源的访问授权。

<a name="App-Client"></a>

### 应用客户端（App-Client）

应用客户端是指使用七牛云存储的应用的客户端（最终用户），可能是Web浏览器、移动应用、桌面软件等。这些客户端的使用者并非七牛云存储的直接用户，没有直接访问七牛云存储的权限。他们对七牛云存储的访问需要[应用服务器](#App-Server)向其颁发访问授权。

<a name="Access-Key"></a>

### 用户凭证（Access Key）

用户凭证是七牛云存储颁发给用户的标识。用户将用户凭证放入访问请求，以便七牛云存储识别访问者的身份。用户凭证和[签名密钥](#Secret-Key)成对颁发，不会重复。一个用户可以拥有两个用户凭证/签名密钥，用于不同的访问。

<a name="Secret-Key"></a>

### 签名密钥（Secret Key）

签名密钥是七牛云存储颁发给用户，用于对访问请求签名的字串。用户使用签名密钥对访问请求的核心要素进行签名，获得请求认证[令牌](#Token)。用户将令牌随同访问请求一起发送至七牛云存储服务，七牛云存储将对令牌进行校验，以确认用户请求的合法性。

***注意 ：签名密钥是七牛云存储对用户访问安全验证的核心要素，用户必须妥善保管，不能泄露给第三方，亦不可置于最终用户使用的客户端中。如发生泄露，请立刻更换用户凭证和签名密钥。***

<a name="Authentication"></a>

### 授权（Authentication）

七牛云存储的用户是应用或在线服务，最终用户并非七牛云存储的直接用户，七牛云存储只允许应用和在线服务访问私有的数据。但最终用户使用的客户端需要访问七牛云存储。因此，七牛云存储的用户需要向最终用户颁发私有数据访问的授权。用户构造HTTP请求，对其签名，获得令牌，并将其发送至最终用户使用的客户端。客户端通过带签名的HTTP请求向七牛云存储发起数据访问。

<a name="Token"></a>

### 令牌（Token）

令牌是用户访问七牛云存储时，进行身份验证的凭证。当用户将一个Bucket设置为私有后，在访问七牛云存储时，必须通过身份验证。用户将访问请求中的一些要素整合起来，用[签名密钥](#Secret-Key)对其加密，得到令牌。然后将令牌随同请求一起发送至七牛云存储。用户可以在令牌中指定请求的时效，防止请求被非法使用。

***注： 七牛云存储服务统一使用UTC时间计算令牌有效期***

七牛云存储使用三种令牌：

##### 上传令牌（UploadToken）

用于上传数据对象。将[资源空间](#Bucket)、[资源名](#Key)、失效时间等请求内容序列化成[json](http://www.json.org/)格式，使用hmac-sha1算法和[签名密钥](#Secret-Key)加密，并转换成[URL安全的base64编码](#URLSafeBase64)。

##### 下载令牌（DownloadToken）

用于下载数据对象。用户首先以query string的格式构造数据下载的url，然后加上请求时效参数，最后对该url执行hmac-sha1算法和[签名密钥](#Secret-Key)加密，进行url-safe的base64编码，生成令牌。

##### 管理令牌（AccessToken）

用于数据对象管理的身份验证令牌。其算法同下载令牌类似：构造完管理操作的url，然后用[签名密钥](#Secret-Key)对其做hmac加密，然后进行[URL安全的base64编码](#URLSafeBase64)，产生令牌。

<a name="FOP"></a>

### 云处理（FOP）

云处理是七牛云存储提供的数据处理功能。用户可以对存放在七牛云存储进行一系列的数据处理。云处理包括图片处理、音视频处理、文档转换等功能。用户的数据无需离开七牛云存储的数据中心，便可以进行各种类型的数据处理。方便用户，也节省了费用。

<a name="FOP-Async"></a>

#### 异步云处理（AsyncOp，预处理）

用户有时需要在一个数据对象上传完成后，对其进行某种数据处理，比如上传完成一张图片后，对其进行缩放。异步云处理便是为了方便这种用况。在七牛云存储的上传参数中，用户可以通过AsyncOp参数驱动七牛云存储，在完成数据对象上传后，启动相应的异步数据处理操作。所以，异步云处理也被称为“预处理”。“异步”的含义在于：数据对象上传完成后随即反馈用户，告知上传结果。同时，发起数据处理操作，但其结果将不再通知用户。

<a name="Magic-Variable"></a>

### 魔法变量（Magic Variable）

魔法变量是七牛云存储提供的服务端的一些信息。魔法变量主要用于数据上传完成后，七牛服务端向用户反馈相关的信息。用户资源上传时在[PutPolicy](http://docs.qiniu.com/api/v6/put.html#uploadToken-args)数据结构中的returnBody，或者callbackBody字段中，指定所需的魔法变量。上传完成后，服务器会填充相应的变量，然后在HTTP Response Body中，以[json](http://www.json.org/)格式返回。

<a name="Selfdef-Variable"></a>

### 自定义变量（xVariable）

自定义变量是用户的[应用客户端](#App-Client)同[应用服务器](#App-Server)之间交换信息途径。主要用于数据上传。应用客户端通过POST中的 `x:<field-name>` 参数携带自定义的变量信息。七牛云存储服务会根据PutPolicy结构中的returnBody，或者callbackBody字段中的设定，将请求中的自定义变量填充入返回结果，反馈给应用客户端， 或者用户指定的回调URL。

<a name="Callback-Return"></a>

### 返回（Return）、重定向（Redirect）和回调（Callback）

七牛云存储有三种方式向用户返回数据上传结果：返回、重定向和回调。

返回是指七牛云存储服务端直接向[应用客户端](#App-Client)返回结果。用户可以通过[returnBody](http://docs.qiniu.com/api/v6/put.html#uploadToken-args)控制反馈的内容。

重定向是用于文件上传成功后，七牛云存储反馈301，引导浏览器跳转至用户指定的URL。用户可以通过[returnBody](http://docs.qiniu.com/api/v6/put.html#uploadToken-args)控制反馈的内容。

回调是指七牛云存储服务端在完成数据上传完成后，向用户指定的URL（[应用服务器](#App-Server)）发送结果，应用服务器可趁此机会进行一些处理，然后可以将一些信息反馈给七牛云存储服务端，七牛会再将这些结果反馈给[应用客户端](#App-Client)。

<a name="Encoded-Entry-URI"></a>

### EncodedEntryURI

指代要操作的资源。在[资源管理操作](http://docs.qiniu.com/api/v6/rs.html)中使用，用于指定被操作的资源。是对EntryURI进行[URL安全的base64编码](#URLSafeBase64)所得的字符串。EntryURI的基本构造是 `<资源空间名>:<资源名>` 。EncodedEntryURI的生成算法如下：

`EncodedEntryURI = urlsafe_base64_encode("<bucket>:<key>")`

<a name="Encoded-Entry-URI-Src"></a>

### EncodedEntryURISrc

源EncodedEntryURI。用于[移动（Move）](http://docs.qiniu.com/api/v6/rs.html#move)，[复制（Copy）](http://docs.qiniu.com/api/v6/rs.html#copy)等操作指定源资源。

<a name="Encoded-Entry-URI-Dest"></a>

### EncodedEntryURIDest

目标EncodedEntryURI。用于[移动（Move）](http://docs.qiniu.com/api/v6/rs.html#move)，[复制（Copy）](http://docs.qiniu.com/api/v6/rs.html#copy)等操作指定目标资源。

<a name="URLSafeBase64"></a>

### URL安全的base64编码（URLSafeBase64Encode）

用于URL传递安全格式的Base64编码字符，该编码方式是将一字符串用base64编码，同时将编码后字符中的加号“+”换成中划线“-”，斜杠“/”换成下划线“_”。

urlsafe_base64_encode(string) 函数按照标准的 [RFC 4648](http://www.ietf.org/rfc/rfc4648.txt) 实现，开发者可以参考七牛提供的各[SDK](http://docs.qiniu.com/sdk/index.html)的样例代码。

