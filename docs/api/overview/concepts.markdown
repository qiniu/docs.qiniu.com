<a name="concepts"></a>
## 概念

<a name="resource"></a>
### 资源（resource）

资源（resource）是七牛云存储服务中的逻辑存储单元。对于每一个账号，该账号里存放的每一个资源都有唯一的标识。

资源的标识是一个字符串，在大部分情况下都非常接近于Linux文件路径的风格，比如：`/level1/level2/example1.jpg`。但在七牛云存储中并没有路径的概念，因此这个标识并不表示是目录`/level1/level2/`下的一个`example1.jpg`文件，而是这个资源的标识就是这样一个完整的字符串。因此，与Linux文件路径不同，资源的标识符可以包含任何字符，比如像冒号（:）这样不能在文件系统路径中出现的字符。

使用者可以在上传资源时为其指定一个方便管理的标识，比如通过设计好的前缀来达到类似于文件目录的分类和层次效果。比如对于一个网站的资源，我们可以命名如下的资源列表：

```
/index.html
/features/index.html
/features/feature1.html
/features/feature2.html
/imgs/features/feature1.png
/imgs/features/feature2.png
/about.html
```

假设这些资源都位于某个绑定了域名`example.com`的公开空间中，则用户可以通过组合这样的URL访问这些资源：

```
http://www.example.com/features/index.html
``` 

或省略掉`index.html`，如下：

```
http://www.example.com/features
```

<a name="bucket"></a>
### 空间（bucket）

空间是资源的管理单位。资源必然位于某一个空间中。每个空间可以对应一系列的设置，以对资源提供合理的管理动作。

常见的设置有如下：

- 将空间设置为公有或私有，以控制访问权限；
- 绑定若干个域名，以便于使用自定义的域名来访问存储的资源；
- 设置资源的处理样式（style），以便于用简短的方式

<a name="domain-binding"></a>
### 域名绑定

每个空间都可以绑定一个到多个自定义域名，以便于更方便的访问资源。

比如`www.qiniu.com`的所有静态资源均存放于一个叫`qiniu-resources`的公开空间中。并将该空间绑定到一个二级域名`i1.qiniu.com`，那么如果要在一个HTML页面中引用该空间的`logo.png`资源，大概的写法如下：

```
<img source="http://i1.qiniu.com/logo.png"></img>
```

这样既可以在一定程度上隐藏正在使用七牛云存储的事实，但更大的好处是如果需要从一个云存储迁移到另一个云存储，只需要修改域名DNS的CNAME设置，而无需更新网页源代码。

<a name="fop"></a>
### 数据处理（fop）

数据处理（fop）是七牛云存储提供的一种强大的数据处理机制。开发者可以在上传或访问资源时触发数据处理流程，从而得到资源进行按需变换后的结果。

数据处理的执行非常简单，就是在资源请求中加上数据处理动作和参数，比如以下的URL对图片进行缩放，就是调用了一个名为`imageView`的数据处理操作：

```
http://qiniuphotos.qiniudn.com/gogopher.jpg?imageView/2/w/200/h/200
```

多个数据处理操作可以通过管道（pipe）进行连接，比如我们可以在一次请求中完成先对图片进行缩放，然后再在图片右下角添加一个透明图片水印。缩放和添加水印分别是一个数据处理操作。

<a name="style"></a>
### 资源样式（style）

样式是对一个或一组数据处理操作的命名，假如我们定义了一个名为`small`的图片样式，用来将目标图片转换为特定尺寸，我们可以这样使用来获取符合期望的转换后图片：

```
http://i1.qiniu.com/sample1.png-small
```

