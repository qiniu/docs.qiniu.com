---
layout: docs
title: 处理已存在资源（pfop）
order: 300
---

<a name="pfop-existing-resource"></a>
### 处理已存在资源（pfop）

如果需要对已存在于空间中的资源进行处理并持久化处理结果，可按以下方式使用我们的异步处理接口：  

```
POST /pfop HTTP/1.1
Host: api.qiniu.com  
Content-Type: application/x-www-form-urlencoded  
Authorization: <AccessToken>  

bucket=<bucket>&key=<key>&fops=<fop1>;<fop2>...<fopN>&notifyURL=<persistentNotifyUrl>
```

其中的`AccessToken`的生成算法可参见[管理凭证规格]()。
  
正常情况下获得的返回：

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <length>

{"persistentId": <persistentId>}
```

处理完成后会向用户指定的`notifyURL`发送处理结果，用户也可以根据`persistentId`来主动查询。详情可以参考：[处理状态通知和查询](#pfop-status)。
