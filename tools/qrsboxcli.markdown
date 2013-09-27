---
layout: default
title: QRSBoxCli 七牛云存储同步上传客户端
---


## 简介

QRSBoxCli 是 QRSBox 的命令行版。相比 qrsync 命令行工具而言，QRSBoxCli 额外具备目录监控能力，自然也就更好用 :-)

## 下载

QRSBoxCli 命令行辅助同步工具下载地址：

- Mac OS: <http://open.qiniudn.com/devtools/v2.5.20130921/darwin_amd64/qrsboxcli>
- Linux 32bits: <http://open.qiniudn.com/devtools/v2.5.20130921/linux_386/qrsboxcli>
- Windows 32bits: <http://open.qiniudn.com/devtools/v2.5.20130921/windows_386/qrsboxcli.exe>

## 使用方法

### 1.配置

``` shell
qrsboxcli init <AccessKey> <SecretKey> <SyncDir> <Bucket> [<KeyPrefix>]
```

这是将本地的 <SyncDir> 目录同步到七牛云存储 <Bucket> 空间。<KeyPrefix> 是可选的，如果指定，那么所有上传到 <Bucket> 空间中的文件会被加上 <KeyPrefix> 前缀。

### 2.启动

配置完成后，键入如下命令开始同步：

``` shell
qrsboxcli sync &
```

### 3.查看Log

任何时刻，你都可以用如下命令查看同步的状态：

``` shell
qrsboxcli log
```
