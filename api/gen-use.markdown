---
layout: api_layout
title: "七牛云存储访问概述"
order: 100
---

- [准备工作](#prepare)
- [验证和Token](#auth-token)
    - [用户请求的验证](#auth-request)
    - [Upload Token](#upload-token)
    - [Download Token](#download-token)
    - [Access Token](#access-token)
- [上传模型](#upload-models)
    - [本地上传](#local-upload)
    - [普通客户端直传](#normal-upload)
    - [重定向上传](#redirect-upload)
    - [回调上传](#callback-upload)
- [下载模型](#download-models)
    - [公有资源下载](#public-download)
    - [私有资源下载](#private-download)
- [资源管理](#rs-manage)
- [云处理](#fop)


<a name="prepare"></a>

## 准备工作

在开始使用七牛云存储之前，需要一些准备工作。

首先，需要获得AccessKey和SecretKey。这两个密钥用于用户请求的身份验证，可以从七牛云存储的[开发者平台](http://portal.qiniu.com)获得。用户如果还没有七牛云存储的帐号，需要先[注册](https://portal.qiniu.com/signup)。获得帐号后，登录进入“开发者平台”，而后进入[密钥管理](https://portal.qiniu.com/setting/key)，获取密钥。

一个用户最多可以拥有两对密钥，并且可以同时使用。通常情况下，用户只需使用一对密钥。但当用户需要切换密钥的时候，可以同时使用两对密钥，作为过渡。完成切换后，再删除原来的那个密钥。

[AccessKey](http://docs.qiniu.com/api/v6/terminology.html#Access-Key)用来标识用户身份，会随同用户发起的请求传递到七牛云存储。七牛云存储通过AccessKey识别用户的身份。

[SecretKey](http://docs.qiniu.com/api/v6/terminology.html#Secret-Key)同AccessKey一一对应，用户使用ScreteKey对请求签名，而七牛云存储则使用SecretKey对请求作验证，以确认请求的合法性。

**注意：SecretKey用于签名请求，因此用户必须严格保密，不能泄露给第三方。亦不可将SecretKe置于客户端，分发给最终用户。一旦发生SecretKey泄露，请立刻更换密钥。**

<a name="auth-token"></a>

## 验证和Token

为了保护用户的资源，七牛云存储要求对每个上传请求、文件管理请求，以及私有资源的下载和云处理请求，都需要进行验证，确保访问都是合法授权的。

<a name="auth-request"></a>

### 用户请求的验证

验证方式并不复杂，大致有这样几个步骤：

1. 按照既定规则，将请求中的关键部分整合成待签名数据；
1. 以SecretKey为密钥，对带签名数据进行hmac_sha1计算；
1. 对上一步所得的结果进行URL安全的Base64编码；
1. 将编码结果同AccessKey等数据合并起来，构成最终的token。

用户在自己的业务服务器中执行上述验证算法，获得token。然后将token交付给应用客户端，客户端据此向七牛云存储发起请求，执行所需的操作。

如果用户仅仅是从自己的服务器，或者桌面计算机发起请求，那么执行验证算法后，可随即发请求。

但是，上述验证过程 **绝对不可在最终客户端执行** ，该过程涉及SecretKey，如在客户端执行，会不可避免地分发SecretKey，造成泄露，危及用户资源的安全。

七牛云存储的服务中用到三种token：

1. 用于上传的UploadToken；
1. 用于下载的DownloadToken；
1. 用于资源管理的AccessToken。

这三种token验证的过程基本一致，差别在于签名数据的合成，以及最后token的附加成分不同。

下面逐一介绍：

<a name="upload-token"></a>

#### Upload Token

Upload Token用于资源上传请求的验证。由上传请求（使用[mulit-part格式的POST方法](http://docs.qiniu.com/api/v6/put.html#upload-proto)）的token字段携带，发送至七牛云存储。

一个Upload Token由三个部分组成：`<AccessKey>:<SignedData>:<UnsignedData>`。

其中：

1. `<AccessKey>`：用户的AccessKey，用于向七牛云存储表明请求者的身份；
1. `<SignedData>`：签名后的结果，即`urlsafe_base64_encode(hmac_sha1(<SecretKey>, <UnsignedData>))`；
1. `<UnsignedData>`：待签名数据块。将一组JSON格式的上传参数进行URL安全的Base64编码，获得的字符串即为`<UnsignedData>`。

详见[Upload Token参考](http://docs.qiniu.com/api/v6/put.html#upload-token)小节。

下面是一个Upload Token的示例：

`j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo:PDpKklPEog5x3bpcY5Jkgh0YsPY=:eyJzY29wZSI6IndvbGZnYW5nIiwiZGVhZGxpbmUiOjEzNzMxMDExOTN9`

<a name="download-token"></a>

#### Download Token

Download Token用于[私有资源](http://docs.qiniu.com/api/v6/get.html#private-download)的下载，以及对私有资源作云处理时的请求验证。由下载URL的 `token` 参数携带，发送至七牛云存储。

一个Download Token由两个部分组成：`<AccessKey>:<SignedData>`

其中：

1. `<AccessKey>`：用户的AccessKey，用于向七牛云存储表明请求者的身份；
1. `<SignedData>`：签名后的结果，即`urlsafe_base64_encode(hmac_sh1(<SecretKey>, <UnsignedData>))`；

这里的`<UnsignedData>`是下载资源的URL（包含请求的过期时间）：`http://my-bucket.qiniu.com/the-key?e=1373013163`。详见[Download Token参考](http://docs.qiniu.com/api/v6/get.html#download-token)

下面是一个Download Token的示例：

`iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV:vT1lXEttzzPLP4i5T8YVz0AEjCg=`

<a name="access-token"></a>

#### Access Token

Access Token用于[资源管理](http://docs.qiniu.com/api/v6/rs.html)的请求验证。由资源管理请求的HTTP头中的`Authorization`字段携带，发送至七牛云存储。

一个Access Token由三个部分组成：`QBox <AccessKey>:<SignedData>`

其中：

1. `QBox `：固定的前缀，后面紧跟一个空格；
1. `<AccessKey>`：用户的AccessKey，用于向七牛云存储表明请求者的身份；
1. `<SignedData>`：签名后的结果，即`urlsafe_base64_encode(hmac_sh1(<SecretKey>, <UnsignedData>))`；

`<UnsignedData>`是对整个请求的核心要素的整合，遵循以下规则：

- 如果请求不包含Body（HTTP请求没有携带Body），则`<UnsignedData>`为`<path>?<query>\n`。`<path>`是URL请求的路径部分，`<query>` 是URL的查询部分。注意：最后的换行符`\n`是必须的。
- 如果请求的Content-Type不是`application/x-www-form-urlencoded`，那么即使请求包含Body，也将被忽略。
- 除上述情况外，请求的Body都将被包含在被签名数据中，即`<UnsignedData>`为`<path>?<query>\n<body>`。

下面是一个Access Token的示例：

`QBox j6XaEDm5DwWvn0H9TTJs9MugjunHK8Cwo3luCglo:qJLVPzrkTycA7pKb0_lSw7DYAjg=`

<a name="upload-models"></a>

## 上传模型

<a name="local-upload"></a>

### 本地上传

所谓本地上传，是将用户的本地资源同步到七牛云存储的过程。存放在用户服务器中的数据文件，或者用户桌面计算机中的存档文件等等，都可以通过这种方式，方便地同步到七牛云存储。

七牛云存储提供了下面两种同步工具，可以帮助您轻松地将文件同步到七牛云存储：

| 名称 | 使用   | 适用平台   | 说明 |
|-----|--------|----------------|----|
| [qrsync](/tools/qrsync.html) | 命令行 | Linux,Windows,MacOSX,FreeBSD | 手动同步文件/文件夹到七牛云存储 |
| [qiniu-autosync](/tools/qiniu-autosync.html) | 命令行 | Linux | 自动同步指定文件夹内的新增或改动文件 |

当然，本地上传工具只是七牛云存储提供给您所有工具的一部分，更多工具，您可以到[这里](/tools/index.html)查看。

<a name="normal-upload"></a>

### 普通客户端直传

更多的用户从事网络应用、网站、移动应用等产品的开发，需要从[应用客户端](http://docs.qiniu.com/api/v6/terminology.html#App-Client)上传文件。传统的方式是从应用客户端将文件上传至[应用服务器](http://docs.qiniu.com/api/v6/terminology.html#App-Server)，再由应用服务器将文件传送到云存储服务。这种模式会增加用户应用服务器的处理和带宽压力。同时，还使得用户不得不承担文件的入和出两份流量，增加用户的成本。

为消除这些问题，七牛云存储提供了从应用客户端直接上传文件的模式。出于用户资源安全的考略，访问的签名需要在用户所控制的应用服务器中进行。因此，需要由应用服务器向应用客户端颁发相应的访问授权。应用客户端获得访问请求和授权后，向七牛云存储上传文件。

典型的上传流程如下图所示：

![普通上传](img/normal_upload.png)

流程简述：

1. 应用客户端向应用服务器 请求上传文件
2. 应用服务器使用相应的[算法](#upload-token)或者使用七牛提供的[SDK](http://docs.qiniu.com/sdk/index.html)生成上传凭证（UploadToken），并颁发给应用客户端
3. 应用客户端 取得上传许可（UploadToken）后，使用七牛提供的 SDK 或者直接使用[上传 API](/api/put.html) 直传文件到最近的存储节点
4. 文件上传成功后，七牛云存储向应用客户端返回上传结果（可包含相应的资源信息）
5. 应用客户端将文件上传结果及相关信息汇报给应用服务器，应用服务器可据此执行后续业务逻辑。

普通上传模型用途广泛。几乎所有的网络应用、网站、在线服务等等，都可以使用普通上传提升服务品质，优化资源配置。


<a name="redirect-upload"></a>

### 重定向上传

重定向上传是普通客户端直传的一个扩展。允许用户在上传请求中设定一个url（[returnUrl](http://docs.qiniu.com/api/v6/put.html#put-policy)），七牛云存储完成上传之后，将反馈HTTP 301，引导客户端执行自动跳转。这种上传模型主要适用于建立网站的用户。

一个重定向模型典型的上传流程如下图所示：

![高级上传(带重定向)](img/redirect_upload.png)

流程简述：

1. 应用客户端向应用服务器请求上传文件；
2. 应用服务器使用相应的[算法](#upload-token)或者使用七牛提供的[SDK](http://docs.qiniu.com/sdk/index.html)生成上传凭证（UploadToken），并颁发给应用客户端；
3. 应用客户端取得上传许可（UploadToken）后，使用七牛提供的SDK或者直接使用[上传 API](/api/put.html) 直传文件到最近的存储节点；
4. 文件上传成功后，七牛云存储将状态码为301的重定向HTTP Response返回给上传者应用客户端（可包含相应的资源信息）；
5. 应用客户端 访问跳转到重定向页面。


<a name="callback-upload"></a>

### 回调上传

回调上传是普通客户端直传的另一种扩展。用户在上传请求中指定回调URL（[callbackUrl](http://docs.qiniu.com/api/v6/put.html#put-policy)），七牛云存储在上传完成后以特定的方式调用用户所提供的URL，将上传的结果传送至用户的应用服务器。用户可以在收到回调结果后执行相关的业务逻辑。此后，用户可以将一些数据安置在响应回调的HTTP Response中，反回给七牛云存储。七牛云存储收到响应后，将其中的数据放在HTTP Response中，传递给应用客户端。

这种上传模型对于那些需要在应用客户端和应用服务器之间进行复杂交互的用户非常有用。比如，移动应用的客户终端往往没有很好的网络环境，频繁地进行客户端-服务器之间的交互严重影响使用体验。而使用回调上传模型，客户终端在上传过程中只需一次HTTP访问，即可完成包括服务端通知在内的多个操作。

一个回调上传模型典型的上传流程为：

![高级上传(带回调)](img/callback_upload.png)

流程简述：

1. 应用客户端向应用服务器请求上传文件
2. 应用服务器使用相应的[算法](#upload-token)或者使用七牛提供的SDK生成上传凭证（UploadToken），并颁发给 应用客户端
3. 应用客户端取得上传许可（UploadToken）后，使用七牛提供的SDK或者直接使用[上传 API](/api/put.html) 直传文件到最近的存储节点
4. 文件上传成功后，七牛云存储以HTTP POST方式告知应用服务器上传结果（可包含相应的文件信息）
5. 应用服务器处理完回调的请求后返回相应的结果信息，经七牛云存储中转返回给应用客户端
6. 七牛云存储作为代理，原封不动地将回调应用服务器的返回结果回传给应用客户端


回调模型相对于普通上传更为高级，体现在以下几方面:

1. 应用客户端无需向应用服务器发送通知，全部统一由七牛云存储发送回调，当存在多种终端（比如Web/iOS/Android）都需要上传文件时，每个终端不需要各自处理回调业务逻辑。
2. 加速回调环节，七牛云存储的就近节点能以比应用客户端更优异的网络环境回调应用服务器。
3. 只要文件上传成功，应用服务器将会直接获得通知。即使应用服务器回调失败，应用客户端还是会得到完整的回调数据，可自定义策略进行异步处理。

在这种上传模型中，七牛云存储的服务器不只是作为文件传输的接受和存储者，同时也参与到了其余的业务逻辑中，为应用服务器和应用客户端简化了业务逻辑的实现。同时，利用七牛云存储服务器端的网络优势，可以缩短整个流程的完成时间，并大大提高一次上传流程的成功率。


<a name="download-models"></a>

## 下载模型

七牛云存储的用户可以将一个空间设置为[公开或私有](http://docs.qiniu.com/api/v6/terminology.html#Bucket)两种保护级别。当空间被设置为公有，任何人都可以无需授权访问此空间的内容。而私有空间的内容则无法在没有用户授权的情况下访问。于是便形成两种不同的下载模式：公开资源下载和私有资源下载。

**注意：** 对于设置[原图保护](http://docs.qiniu.com/api/v6/terminology.html#Origin-Protect)的空间，尽管同时设置成公开，空间内的原图也必须使用私有资源下载的方式访问。

<a name="public-download"></a>

### 公开资源下载

公开资源资源下载，非常简单，就如同下载互联网上任何公开文件和数据那样，客户仅需要构造出资源的URL，然后发出HTTP请求即可。

七牛云存储资源的URL的格式为：

```
	http://<domain>/<key>
```

其中 `<domain>` 是资源下载的域名，有两种形式：

1. 七牛二级域名： 以用户的空间名为二级域名，构成资源下载的域名。比如：my-bucket.qiniudn.com。具体的域名可以在[开发者平台](https://portal.qiniu.com/)的空间设置的“域名设置”小节中获得；
1. 自定义域名： 用户自有的域名。通过资源空间基本设置中的[域名绑定](https://portal.qiniu.com/bucket/setting/basic?bucket=longshanks001)将自己的域名绑定到用户空间。比如：files.my-domain.com。

`<key>` 是需要下载的[资源名(Key)](http://docs.qiniu.com/api/v6/terminology.html#Key)。

构造出资源下载的URL，便可以通过任何HTTP客户端，向七牛云存储发出请求，进行下载。

下图展示了公有资源下载的基本流程：

![pub_download.png](http://shars.qiniudn.com/pub_download.png)

流程简述：

1. 应用客户端访问文件URL请求下载资源
2. 七牛云存储 响应 应用客户端, 指令距离 应用客户端 物理距离最近的 IO 节点输出文件内容。


<a name="private-download"></a>

### 私有资源下载

私有资源的下载需要资源的拥有者（七牛云存储用户）向资源的需求者授权，因此需要对下载请求进行验证签名。

私有资源下载所用的URL是在公开资源下载使用的URL基础上增加[请求凭证(Token)](#download-token)部分：

```
  http://<domain>/<key>?e=<deadline>&token=<token>
```

其中：

- `<deadline>` 是URL的过期时间。通过设置这个参数，确保URL在一定时间以后失效，以防资源无限访问。
- `<token>` 是[下载凭证](#download-token)。对整个URL进行HMAC-SHA1签名，获得的摘要。七牛云存储将采用相同的签名算法验证该URL是否具备合法的资源访问权限。

下图是司有资源下载的基本流程：

![src_download.png](http://shars.qiniudn.com/src_download.png)

流程简述：

1. 应用客户端 向 应用服务器 请求下载授权
2. 应用服务器 根据 [下载凭证签名算法](#download-token) 生成 `downloadToken`, 并颁发给 应用客户端
3. 应用客户端 拿到 `downloadToken` 后，向 七牛云存储 请求下载文件
4. 七牛云存储 在校验 `downloadToken` 成功后，输出文件内容。如果校验失败，返错误信息（401 bad token）


<a name="rs-manage"></a>

## 资源管理

用户可以对存储在七牛云存储的资源进行管理和操作。与文件管理类似，七牛云存储资源管理的主要操作有：查看、移动、复制、删除及其对应的批量操作。

<a name="stat"></a>

### 查看 (stat)

查看操作用于查看资源的基本信息，包含：文件哈希值、文件大小、媒体类型及上传时间。具体参考 [API 资源管理操作-查看](/api/v6/rs.html#stat)

<a name="move"></a>

### 移动 (move)

移动操作允许将一个资源在同一个Bucket或者不同的Bucket之间移动。例如，在bucket1下面有一个名为key1的资源，可以将这个资源key1移动到bucket1下面的key2，也可以将其移动到bucket2下的key2。通过移动操作可以实现文件重命名。具体参考 [API 资源管理操作-移动](/api/rs.html#move)

<a name="copy"></a>

### 复制 (copy)

复制操作允许在同一个bucket进行，也可以在两个不同的bucket之间进行。与资源的移动操作相比，复制操作保留原文件，因此会增加用户的存储空间。具体参考 [API 资源管理操作-复制](/api/v6/rs.html#copy)

<a name="delete"></a>

### 删除 (delete)

删除资源与删除文件类似，但是七牛云存储不提供回收站的功能，因此在删除前请确认待删除的资源确实已经不需要了。具体参考 [API 资源管理-删除](/api/v6/rs.html#delete)

<a name="batch"></a>

### 批量操作 (batch)

除了对单一资源进行操作，还可以对多个资源进行 <b>批量的查看、移动、复制及删除操作</b>。具体参考 [API 资源管理-批量操作](/api/v6/rs.html#batch)

<a name="list"></a>

### 列出文件(list)

列出文件操作可以查看bucket里面的所有资源列表，遍历资源。具体参考 [API 资源管理-列出文件](/api/v6/rs.html#list)


<a name="fop"></a>

## 云处理

七牛云存储不仅仅提供优质的数据存储服务，还提供了多种让用户直接对存储的数据进行云端处理的能力，包括：

1. [图片处理](#image-process)
2. [音视频处理](#video-process)
3. [文档转换](#doc-process)
4. [管道](#pipeline)
5. [杂项](#misc)
6. [友好别名访问](#style)

<a name="image-process"></a>

### 图片处理

常规的图片处理通常放在企业的客户端或服务器端来操作，对接上七牛云存储的图像处理接口后，即可使用丰富的在线云端图片处理服务，大大减少企业带宽消耗，提高开发效率。

七牛云存储提供强大的图片处理能力，包含丰富的图片处理功能：

1. [获取图片基本信息](/api/v6/image-process.html#imageInfo)
2. [获取图片EXIF信息](/api/v6/image-process.html#imageExif)
3. [生成指定规格的缩略图](/api/v6/image-process.html#imageView)
4. [高级图像处理接口（缩略、裁剪、旋转、转化）](/api/v6/image-process.html#imageMogr)
5. [图像水印接口](/api/v6/image-process.html#watermark)

例如，这里以 <http://qiniuphotos.qiniudn.com/gogopher.jpg> 作为原图，利用图片处理服务，可以轻松地做到：

1. <http://qiniuphotos.qiniudn.com/gogopher.jpg?imageInfo> （点击可查看图片基本信息）
2. <http://qiniuphotos.qiniudn.com/gogopher.jpg?exif> （点击可查看图片EXIF信息。如果是浏览器查看，请设置浏览器编码为utf-8，否则可能出现乱码）
3. <http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/1/w/200/h/200/q/80/format/png> （点击可查看长宽均为200、质量为原图80%、并被转为png格式的缩略图）

当然还有更复杂高级的功能，比如首先在原图基础上生成一张质量为原图80%的缩略图，随后对这张缩略图进行裁剪，再对裁剪后的小图进行顺时针旋转45度：

<http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/thumbnail/!80p/crop/!200x200a150a50/rotate/45>（点击查看处理后图片）

除此之外，给一张图片打上水印也是很容易，比如：

**文字水印** (右键获得图片链接可查看水印生成的具体规格参数)

![文字水印实例](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/2/text/5LiD54mb5LqR5a2Y5YKo/font/5a6L5L2T/fontsize/1000/fill/d2hpdGU=/dissolve/85/gravity/SouthEast/dx/20/dy/20)


**图片水印** (右键获得图片链接可查看水印生成的具体规格参数)

![图片水印实例](http://qiniuphotos.qiniudn.com/gogopher.jpg?watermark/1/image/aHR0cDovL3d3dy5iMS5xaW5pdWRuLmNvbS9pbWFnZXMvbG9nby0yLnBuZw==/dissolve/50/gravity/SouthEast/dx/20/dy/20)


这里只是少量的示范，关于图片处理接口详细的说明和使用方法请参考这里：[图片处理API文档](/api/v6/image-process.html)


<a name="video-process"></a>

### 音视频/流媒体转码及持久化

七牛云存储国内首创了自由度极高的音视频/流媒体转码处理服务，并提供优质的音视频分发网络。  


七牛音视频/流媒体处理支持及处理结果持久化：

1. [音频转换](/api/v6/audio-video-hls-process.html#audio-convert)
2. [视频转换](/api/v6/audio-video-hls-process.html#video-convert)
3. [视频帧缩略图](/api/v6/audio-video-hls-process.html#video-thumbnail)
4. [HTTP Live Streaming](/api/v6/audio-video-hls-process.html#hls)
5. [数据处理(持久化)](persistent-ops.html)   



<a name="doc-process"></a>

### 文档转换

除了富媒体之外，七牛云存储还提供对特定文档的处理能力，目前提供的是Markdown到HTML文本的转换。

具体使用方法和参数请参考：[Markdown转HTML](http://lalalala.qiniudn.com/api/v6/office-process.html)

<a name="pipeline"></a>

### 管道处理

什么是管道处理？即一种能够将各种处理功能串联起来形成一种管道操作的能力。这种管道处理的方式使得对一个文件的处理方式不再受限于每个单一文件处理功能。

比如：

1. 从视频中提取某一帧生成缩略图
2. 从该缩略图中截取出部分面积的小图
3. 然后基于截取后的图片打水印

如果没有管道处理能力，那么上面三个步骤就只能分开多次操作才能得到最后打好水印的图片。但是管道处理可以让用户仅仅访问那一次就能处理完所有的操作。

具体使用方式详见：[数据处理(管道篇)](/api/v6/pipeline.html)

<a name="misc"></a>

### 杂项

七牛云存储的云端处理具有良好的扩展能力，能够方便地添加各种文件处理功能，因此除了以上比较系统的文件处理功能之外，七牛云存储还提供一些比较实用的功能，比如[在线生成QR code](/api/v6/misc-file-process.html)。

<a name="style"></a>

### 友好别名访问

如果您觉得您使用的文件处理命令过冗长和复杂，我们提供了别名映射的功能，可以为一个特定的处理命令起一个友好的`别名`，之后的文件处理命令都可以用这个`别名`进行替换，从而使图片的 URL 变得更加简洁和友好。

比如，您可以为命令`thumbnail/!80p/crop/!200x200a150a50/rotate/45`起一个别名叫做`mystyle`，之后就可以使用别名`mystyle`替换原来那个冗长的命令了。

详细的使用方法请参考相关说明：[友好别名访问](/api/v6/misc-file-process.html)
