---
layout: api_layout.html
title: "资源上传>分块上传"
---

- [断点续传](#resumble-up)
    - [概述](#resumble-gen)
    - [上传流程](#resumble-alg)
    - [分割文件](#file-blob)
    - [上传块](#mkblk)
    - [生成文件](#rs-mkfile)
    - [示例](#resumble-demo)

<a name="upload-basic"></a>


<a name="resumble-up"></a>
# 断点续传

<a name="resumble-gen"></a>
## 概述
---------------------

断点续传为大文件上传提供了有效的手段，通过断点续传，用户可以上传任意大小的文件。

断点续传的原理:分割文件，将每个分割块`block`单独发送至七牛服务端（可并行上传各block），待所有`block`上传完成之后，请求服务端重新合成分割块成为一个完整的文件。对于每个分割块，用户可以继续分割成多个上传块`chunk`进行上传。

除最后一个Block外，其余Block的大小为4MB。chunk的大小由用户指定，默认可设为256KB，建义在网络环境较差的时候，适当减小此值。

断点续传的文档结构组织如下：
首先介绍断点续上传的一般流程，并通过伪代码的方式对其描述。然后分别详细讨论流程中各步骤的详细内容并结合示例代码对其进行描述，包含分割块、上传分割块、生成文件、返回结果。

<a name="resumble-alg"></a>
## 上传流程
-------------------

断点续上传流程为：

1. 分割文件成多个`block`
2. 上传分割块。分割块彼此可并行上传，分割块又被化分为多个上传块(chunk)，上传块必须串行上传。
3. 所有分割块上传完成后，请求服务端将其合成为一个完整的文件。
4. 跟据上传策略，返回给客户端对应信息。

用伪代码描述如下：

``` go
//断点续传流程
//@file, 待上传的文件
//@scope,七牛云存储scope
function resume_put(file, scope){
  // 第一步: 分割文件成多个block
  // 以4MB大小为单位，将文件切割成块（blocks）
  // 最后一个块的大小为 file.size - (n-1)*1 << 22
  blocks[] = file.mkblk(1<<22)
  host = "http://up.qiniu.com"
  //blkRet为上传块时七牛返回的数据结构,格式如下:
  //{
  //  "ctx":  "MWZvQbq10x...",
  //  "crc32":1957222263,
  //  "offset":2097152,
  //  "host":"http://upbeta.qiniu.com"
  //}
  //blkRet的个数与切割块的数目相同
  blkRet[blocks.len]
  //当前上传块在数组blocks中的索引号
  blkIdx = 0
  foreach(blk in blocks){
    //第二步: 上传分割块，此逻辑可并发执行
    //@block, 需要上传的块
    function(block){
      //以256KB为单位，将block切割为chunk数组
      chunks[] = block.chunk(256)
      //通知Qiniu，开始上传block，同时将block的第一个chunk上传至七牛
      //@blockSize, 上传块的大小.(除最后一个块，其余为4MB)
      //@firstChunk, block切割成的chunk数组的第一个元素
      function qiniu_mkblk(blockSize,firstChunk){
        url = host + blockSize
        blkRet[blkIdx] = httpClient.send(url,firstChunk)
        host = blkRet[blkIdx]["host"]
      }(chunks[0]);
      //继续上传余下的chunk,注意i=1,表明跳过了首个chunk,因为此chunk已经在mkblk时上传了  
      for(i=1;i<chunks.len;i++){
        //上传chunks
        //@host, 接收上传的地址，可以从上一次返回结果中获取
        //@ctx, 用于上传控制，从上一次上传返回结果中获取
        //@offset, chunk在block中的偏移量，以byte为单位，可以从上一次返回结果中获取
        //@chunk, 需要上传的chunk
        function qiniu_bput(host,ctx,offset,chunk){
          //请求地址
          url = host + "/bput/" + ctx + "/" +offset 
          //blkRet的内容被替换
          blkRet[blkIdx] = httpClient.send(url,chunk);
        }(blkRet[blkIdx].host,blkRet[blkIdx].ctx,blkRet[blkIdx].offset,chunks[i])
      }
    }(blk)
    blkIdx++
  }
  //第三步: 所有block上传完成，调用mkfile请求在服务端生成完整文件
  //@file 上传的文件
  //@key 需要在七牛服务端保存的文件key
  //@return ,上传返回结果，默认为{hash:<hash>,key:<key>}
  return function mkfile(file,key){
    //生成mkfile请求地址
    url = blkRet[lastIdx].host +
        "/" + file.size +            // 必须
        "/" + base64Safe(key) +                // 必须
        "/mimeTpye/" + base64Safe(file.type) // 可选
        "/" + parameters                    //可选，parameters格式见下文 
    foreach(ret in blkRet){
      body += ret.ctx + ","
    }
    body.TrimEnd(",")
    return httpClient.send(url, body)
  }(file,key)
}
```

<a name="file-blob"></a>
## 分割文件

分割文件的方式受具体语言的影响而有所不同，获取一个分割块一般需要两个参数:
  `offset` 分割块在文件中的偏移量，单位为byte
  `size`  分割块的大小，单位为byte

下文以python、c# 、javascript 为示例，介绍具体的切割方法，其它语言请参考对应的文档

python

``` python
# 打开文件
fo = open("<file path>", "r+")
# 移动当前位置
fo.seek(offset, 0);
# 读取block
blockbuf = fo.read(size);
```

C# 

``` c#
//文件路径
string localFile = "<file path>"
//打开文件
FileStream fs = File.OpenRead(localFile)
//开辟空间
byte[] blockBuf = new byte[4*1024*1024];
//移动当前位置
fs.seek(offset,SeekOrigin.Begin);
//读取block
fs.Read(blockBuf,0,size)
```

javascript

``` javascript
//需要HTML5文件系统支持
//<input type="files" id="fileselect" />

//获取文件
var file = document.getElementById("fileselect").files[0];
(function(f, start, size) {
  //文件分割
  f.slice(start,start + size);
})(file, offset, size);
```


<a name="mkblk"></a>
## 上传块（mkblk）
-----------------------

一个文件由多个block组成，除最后一个block，其余block大小为4MB:

|block 1 (4MB)|block 2 (4MB)| ... | block n (filesize - (n-1)*4MB)|
|-------|-------|-----|--------|

一个block由多个chunk组成,chunk的大小由用户自已设定，必须小于块的大小，默认可取256KB。

|chunk 1|chunk 2| ... | chunk n|
|-------|-------|-----|--------|

断点续上传文件是通过单独上传各block后再组成完整文件。因此，上传block是断点续上传的基础。
上传block由两个不同的步骤组成:

1. 请求上传block

2. 上传余下的chunk

### 1.请求上传block

请求格式如下：

Request Header:

``` html
POST /mkblk/<blockSize> HTTP/1.1
Content-Length: <first-chunk-size>
Host: up.qiniu.com
Connection: keep-alive
Authorization: UpToken <uptoken>
```

其中:

  - method为post

  - `mkblk` 说明这是一个上传块的请求

  - `<blockSize>` 为该块的大小,除最后一个块，其余大小为4MB。

  - 同时将该block的首个chunk包含在请求body中，`content-Length:<first-chunk-size>`，指定首个`chunk`的大小。

  - `up.qiniu.com`为首次上传地址，后续上传采用服务器分配的地址

  - 此请求需要进行认证，因此需要在请求头中设定`uptoken`。

Post的内容为该block的首个chunk的二进制内容

``` post
[first-chunk-bin]
```

七牛服务器对请求生成块作出的回应如下：

Response Header:

``` html
HTTP/1.1 200 OK

Content-Type: application/json
Pragma: no-cache
X-Content-Type-Options: nosniff
X-Log: UP:18
```

Response Body:

``` json
{
  "ctx":"<ctx>",
  "checksum":"<checksum>",
  "crc32":<crc32>,
  "offset":<offset>,
  "host":"<selectUpHost>"
}
```
注：为排版方面，对Response Body作出了一定的格式调整,各字段的具体值也与实际上传情况有关

请求回应body是json格式的字符串,各字段的意义如下：
  
  - ctx, 服务端上传控制字段,后继上传及生成文件(mkfile)时用到

  - checksum, 上传块checksum

  - crc32, 上传块crc32,客户可通过此字段对上传块的完整性进行较验

  - offset, 下一个上传块在切割块中的偏移

  - selectUpHost, 后续上传接收地址

注：如果请求上传block失败，可单独重试上传此block。

mkblk各语言的实现可参考：

1. [python mkblk](https://github.com/qiniu/python-sdk/blob/master/qiniu/resumable_io.py#L145)
2. [c/c++ mkblk](https://github.com/qiniu/c-sdk/blob/master/qiniu/resumable_io.c#L272)
3. [go mkblk](https://github.com/qiniu/api/blob/master/resumable/io/up_api.go#L58)
4. [c# mkblk](https://github.com/qiniu/csharp-sdk/blob/master/Qiniu/IO/Resumable/ResumablePut.cs#L175)

<a name="bput"></a>
### 2.上传余下的chunk

请求mkblk时仅上传首个chunk，余下的chunk需要采用不同的格式进行请求。

上传chunk的请求格式如下：

``` html
POST /bput/<ctx>/<chunksize> HTTP/1.1
Host: <selectUpHost>
Connection: keep-alive
Content-Length: <chunksize>
Authorization: UpToken <uptoken>
Content-Type:
```

其中:

- method为post

- `bput` 说明这是一个上传chunk的请求

- `<ctx>`为上传前一个chunk返回的结果中ctx的值

- `<chunksize>` 为该chunk的大小

- `<selectHost>` 上传地址,从上一次返回结果中获取 

- 此请求需要进行认证，因此需要在请求头中设定`uptoken`

Post的内容为chunk的二进制内容

``` post
[chunk-bin]
```

七牛服务器对上传chunk作出的回应内容如下：

``` json
{
  "ctx":"<ctx>",
  "checksum":"<checksum>",
  "crc32":<crc32>,
  "offset":<offset>,
  "host":"<selectUpHost>"
}
```

注：为排版方面，对Response Body作出了一定的格式调整,各字段的具体值也与实际上传情况有关

同一block中的chunk必须串行上传，待所有的chunk上传完成，表明此块已完成，记录最后一个回应数据，此数据在合成文件时将作为请求body的一部分。

注：如果chunk上传失败，需要重传此chunk，直至此chunk上传成功，方可继续上传下一个chunk。

各语言上传chunk的实现可参考：

1. [python bput](https://github.com/qiniu/python-sdk/blob/master/qiniu/resumable_io.py#L150)
2. [c/c++ bput](https://github.com/qiniu/c-sdk/blob/master/qiniu/resumable_io.c#L253)
3. [go bput](https://github.com/qiniu/api/blob/master/resumable/io/up_api.go#L64)
3. [c# bput](https://github.com/qiniu/csharp-sdk/blob/master/Qiniu/IO/Resumable/ResumablePut.cs#L185)

<a name="rs-mkfile"></a>
## 生成文件(mkfile)
--------------------------
所有block上传完成后，请求服务端将其合成为一个完整的文件。

请求头格式如下:

``` html
POST /mkfile/<fsize>/key/<EncodedKey>/mimeType/<EncodedMimeType>/x:userVar/EncodedUserVar/ HTTP/1.1
Host: <selectUpHost>
Connection: keep-alive
Authorization: UpToken <uptoken>
```

其中:

- method为post，`mkfile` 说明这是一个生成文件的请求

- `<EncodedKey>` 是经过[base64urlsafe](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)编码的key

- `<fsize>`指定了文件的大小，单位byte。

- `<EncodedMimeType>`为可选项，其值需要经过[base64urlsafe](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)编码。

- `x:userVar`，用户自定义变量，以`x:`开始，后面的`userVar`可自定义，其值需要经过[base64urlsafe](http://docs.qiniu.com/api/v6/terminology.html#URLSafeBase64)编码，多个自定义变量可继续追加。例如：/x:username/base64urlsafe("qiniu")/x:email/base64urlsafe("example@example.com")

- 此请求需要进行认证，因此需要在请求头中设定`uptoken`。

请求body的生成如下：

以`,`连接上传各block时最后一个chunk返回的数据结构中的ctx字段


mkfile各语言的实现可参考：

1. [python mkfile](https://github.com/qiniu/python-sdk/blob/master/qiniu/resumable_io.py#L155)
2. [c/c++ mkfile](https://github.com/qiniu/c-sdk/blob/master/qiniu/resumable_io.c#L253)
3. [go mkfile](https://github.com/qiniu/api/blob/master/resumable/io/up_api.go#L147)
3. [c# mkfile](https://github.com/qiniu/csharp-sdk/blob/master/Qiniu/IO/Resumable/ResumablePut.cs#L195)

七牛服务器对生成文件请求作出的回应内容如下：

``` json
{"hash":"<hash>","key","<key>"}
```

请求回应body是json格式的字符串,各字段的意义如下：

- `hash`，文件hash值

- `key`，文件在服务端对应的key


注：Response Body值与实际上传情况有关，并且，受上传策略影响，其格式也有所不同。

<a name="resumble-demo"></a>
## 示例
-------------------
[断点续上传在线示例](http://7niu.sinaapp.com)，需要浏览器支持HTML5，开发人员可通过firebug等工具查看断点续上传的请求、回应格式。
