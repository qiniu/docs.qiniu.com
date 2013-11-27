---
layout: docs
title: "快速入门(初级开发者篇)"
snapshot: "为了方便测试，我们已经人工上传了一个测试音频，同时将文件所在的存储空间暂设为公开属性。公开属性表示我们上传的文件能够以 HTTP 的方式公开提供下载。"
---



<style type="text/css">
  .dd{
      display: block;
      padding: 12.5px;
      font-size: 12px;
      line-height: 15px;
      float: left;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre;
      white-space: pre-wrap;
      background-color: #fafafa;
      border: 1px solid #e9e9e9;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    form{
      display: block;
      padding: 12.5px;
      font-size: 12px;
      line-height: 15px;
      background-color: #fafafa;
      border: 1px solid #e9e9e9;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;

    }
</style>

<div class="dd">注册</div>
<div class="dd">创建Bucket</div>
<div class="dd">上传文件</div>
<div class="dd">查看一个文件</div>
<div class="dd">重命名</div>
<div class="dd">删除</div>
<div style="clear:both"></div>


开发者使用Qiniu云存储时，最关心的是如何将静态文件上传至七牛提供的存储空间中并且能够正确的访问。

假设您准备开发一个在线相册网站，七牛能为您提供哪些服务呢？

可以提供：
  
  - 存储所有的照片

  - 对照片进行处理、如缩略图，水印，缩放

  - 安全认证

需要您自己做准备：
  
  - 网站系统托管。

  - 关系型数据库。七牛只提供静态资源的存储，对于资源的元信息，需要客户跟据自己的业务进行处理，通常都需要一个数据库用来存储这些信息。

作为开发者的初级入门教程，本文仅实现以下的功能：

你的用户在注册完成后需要上传一张照片作为他的头像，你打算将这个照片存放到七牛云空间。



<a name="signup"></a>

## STEP 1. 注册

使用Qiniu云存储，您需要拥有一个Qiniu帐号，注册七牛帐号不会收取您任何费用。


注册地址：[https://portal.qiniu.com/signup](https://portal.qiniu.com/signup)

<a name="mkbucket"></a>

## STEP 2. 创建Bucket

使用您的Qiniu帐号登录[https://portal.qiniu.com/signin](https://portal.qiniu.com/signin),在跳转后的页面中点击创建bucket,如下图所示

![创建bucket](img/signup1.png)

![创建bucket](img/mkbucket2.png)

## STEP 3. 上传文件

上传页面：


<form method="post" action="http://up.qiniu.com">
  <input id="token" name="token" value="iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV:T4u6NJLv9-VpNZmfdEqAWUA_6SE=:eyJzY29wZSI6InF0ZXN0YnVja2V0OmhlbGxvcWluaXUiLCJkZWFkbGluZSI6MTcwMDQ3MjQwM30=" hidden="true">
  <input name="file" class="ipt" type="file" />
  <button type="submit" class="btn btn-default">上传</button>
</form>

``` html
<form method="post" action="http://up.qiniu.com">
  <input type="file">
  <button type="submit" class="btn btn-default">上传</button>
</form>
```

点击上传按扭，浏览器将表单提交至http://up.qiniu.com，

`action`为 `http://up.qiniu.com`
`method`为 `post`


