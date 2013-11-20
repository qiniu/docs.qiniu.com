---
layout: api_layout.html
title: "表单上传"
---

<a name="html-form-post"></a>

### 在HTML页面中上传资源

当用户的上传客户端是HTML页面时，可以直接使用 `form` 元素构造和发起资源上传请求。一个典型的上传HTML片段如下：

```
<form method="post" action="http://up.qiniu.com/" enctype="multipart/form-data">
  <input name="key" type="hidden" value="<resource key>">
  <input name="x:<custom_field_name>" type="hidden" value="<custom value>">
  <input name="token" type="hidden" value="<token>">
  <input name="file" type="file" />
  ...
</form>
```

资源上传所需的参数在 `input` 元素中设置。这些参数详见[资源上传参数](#parameters)小节中详细介绍。需要说明的是，名称为 `x:<custom_field_name>` （即[自定义变量](#xVariables)）的参数可以不止一个，用户可以根据需要填写任意多个，满足业务逻辑的需要。

当form的[submission](http://www.w3.org/TR/html4/interact/forms.html#h-17.13)被触发时，浏览器会将所有 `input` 的内容打包成 `multipart/form-data` 数据格式，发送至七牛云存储，完成一次上传操作。

