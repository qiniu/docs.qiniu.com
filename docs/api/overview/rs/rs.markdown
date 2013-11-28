---
layout: docs
title: 管理操作
order: 340
---

<a name="rs-manage"></a>
## 管理操作

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

<a name="list"></a>

### 列出文件(list)
列出文件操作可以查看bucket里面的所有资源列表，遍历资源。具体参考 [API 资源管理-列出文件](/api/v6/rs.html#list)

<a name="batch"></a>
### 批量操作 (batch)

除了对单一资源进行操作，还可以对多个资源进行 <b>批量的查看、移动、复制及删除操作</b>。具体参考 [API 资源管理-批量操作](/api/v6/rs.html#batch)
