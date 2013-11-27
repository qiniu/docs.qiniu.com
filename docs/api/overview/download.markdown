<a name="download"></a>
## 资源下载

<a name="download-models"></a>
### 下载机制

资源的下载采用`HTTP GET`方式（详见[RFC2616 标准](<http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35>)）。下载过程所需的参数作为URL参数：

```
http://<domain>/<key>?<param1>=<value1>&<param2>=<value2>...
```

下载过程也通过标准的HTTP头`Range`字段支持分片下载。用户可以在下载时通过设定该字段指定只下载该资源的一部分内容：

```
Range: bytes=<first-byte-pos>-<last-byte-pos>
```

支持`Range`字段相当于提供了断点续传功能，对于大资源的下载可以提供比较好的用户体验，比如暂停下载、网络中断并恢复后继续下载。

> 在移动应用我们经常看到一个设置叫__只在WIFI连接时下载__。这个功能就可以通过资源下载对`Range`字段的支持而比较容易的实现。客户端通过在网络连接切换时判断当前连接类型而自动判断是否应该暂停下载，这样可以避免因为大资源的下载而耗尽3G流量（比如安装包的下载）。
 
<a name="download-response"></a>
### 下载响应

资源下载的响应符合HTTP GET的规范，比如200表示下载成功。除了标准的HTTP字段比如`Content-Type`、`Content-Length`外还会携带一些扩展字段，如`ETag`、`X-Log`、`X-Reqid`等。这些扩展字段非常有助于排查问题。

关于HTTP扩展字段的更多信息，请参见[HTTP扩展字段]()。

如果下载过程中遇到任何错误，我们建议开发者将这些详细信息都写入日志，在请求技术支持时提供这些错误信息以便快速排查。

<a name="download-public-resource"></a>
### 公有资源下载

公有资源下载非常简单，以HTTP GET方式访问资源URL即可。资源URL的构成如下：

```
http://<domain>/<key>
```

以上的`<domain>`有两种形态：七牛子域名，自定义域名。

七牛子域名是一个创建空间时缺省分配的域名，开发者可以在[开发者平台 - 空间设置 - 域名设置](https://portal.qiniu.com)查看该子域名。子域名通常类似于`example-images.u.qiniudn.com`，用户可以通过以下URL下载名为sunflower.jpg的资源：

```
http://example-images.u.qiniudn.com/sunflower.jpg
```

开发者可以申请为某特定空间绑定一个自定义域名，以通过这个域名访问资源，比如绑定了一个自定义域名`i.example.com`，就可以这样的方式访问同样的资源：

```
http://i.example.com/sunflower.jpg
```

<a name="download-private-resource"></a>
### 私有资源下载

当用户将空间设置成私有后，所有对空间内资源的访问都必须获得授权。

私有资源下载也是通过以HTTP GET方式访问一个特定URL完成。私有资源URL与公有资源URL相比只是增加了两个参数`e`和`token`，分别表示过期时间和下载凭证。一个完整的私有资源URL如下所示：

```
http://<domain>/<key>?e=<deadline>&token=<downloadToken>
```

参数`e`表示URL的过期时间，采用[UNIX Epoch时间戳格式](http://en.wikipedia.org/wiki/Unix_time)，单位为秒。超时的访问将返回401错误。

> 如果请求方的时钟未校准，可能会造成有效期验证不正常，比如直接认为已过期。因此需要进行时钟校准。
> 
> 由于开发者无法保证客户端的时间都校准，所以应该在业务服务器上创建时间戳，并周期性校准业务服务器时钟。

参数`token`携带下载凭证。下载凭证是对资源访问的授权，不带下载凭证或下载凭证不合法都会导致401错误，表示验证失败。关于下载凭证的生成，请参见[下载凭证规格]()。

<a name="404-not-found"></a>
### 自定义404响应

开发者可以要求七牛云存储在目标资源不存在时返回一个特定的内容，比如在网站上为这些找不到的资源显示一张特定的提示图片。

通过自定义自定义404响应可以达成这个效果。开发者只需向指定的空间上传一个资源名为`errno-404`的文件即可。

<a name="download-friendly-name"></a>
### 自定义资源下载名

默认情况下，如果在浏览器中访问一个资源URL，浏览器都会试图直接在浏览器中打开这个资源，比如一张图片。如果希望浏览器的动作是下载而不是打开，可以给该URL添加参数`download/<file_name>`，如下所示：

```
http://<domain>/<key>?download/<file_name>
```

当收到此指令时，七牛云存储会在响应中增加一个标准HTTP字段`Content-Disposition`，格式如下：

```
Content-Disposition: attachment;filename="<file_name>"
```

该字段告诉浏览器将资源下载成为指定的文件名`<file_name>`。下面是一个可体验的完整示例：

  [http://qiniuphotos.qiniudn.com/gogopher.jpg?download/test.jpg](http://qiniuphotos.qiniudn.com/gogopher.jpg?download/test.jpg)

<a name="download-special-key"></a>
### 下载特殊名资源

特殊名字资源指资源名中包含了URL保留字符，如`?`、首字符为`/`、以及多个连续的`/`等。如果直接访问导致服务器错误理解URL格式。

要正常访问此类资源，请参见[特殊key资源的访问](http://kb.qiniu.com/52slk76w)。开发者应该在命名资源时尽小心使用这些URL保留字符。
