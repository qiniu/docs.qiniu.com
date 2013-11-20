---
layout: api_layout.html
title: "资源空间统计信息查询"
order: 10
---

- [简介](#introduction)
- [月度使用情况](#info)
- [空间使用情况](#space)
- [流量使用情况](#transfer)
- [请求数使用情况](#api-call)


<a name="introduction"></a>

## 简介

七牛云存储提供一组资源空间的信息查询接口。通过这组接口，用户可以随时获得资源空间上的各类信息和数据。这些信息包括：

1. 月度使用情况信息
1. 空间使用情况信息
1. 流量使用情况信息
1. 请求数使用情况信息

资源空间信息查询接口使用HTTP协议，接口域名是 `http://api.qiniu.com` 。


<a name="info"></a>

## 月度信息查询

月度信息查询用于获取指定月份的总体使用情况。可以获得如下信息：

1. 空间使用总量（单位Byte）。指定月份的月末空间使用量。如果查询的是当前月，则是查询当天的空间使用量。
1. 空间平均使用量（单位Byte）。指定月份的整月使用量的平均值（每日使用量的汇总除以天数）。如果查询的是当前月，那么是月初至查询当天的平均值。
1. get请求数（单位次）。
1. put请求数（单位次）。
1. 流量总量（单位Byte）。

具体请求格式如下：

```
    GET /stat/info?bucket=<string>&month=<string> HTTP/1.1
    Authorization: <Authorization>
```

其中：

1. bucket：被查询的空间名。可选。如不指定，则返回该用户所有资源空间的总量。
1. month：查询的月份。格式为：201309。
1. Authorization：用户验证的AccessToken。AccessToken的生成方法详见[授权认证](http://docs.qiniu.com/api/v6/rs.html#digest-auth)

查询反馈的结果是json格式，具体结构如下：

```
{
    "space": <number>,           // 空间总量，单位Byte
    "space_avg": <number>,       // 空间平均量，单位Byte
    "apicall_get": <number>,     // get请求数，单位次
    "apicall_put": <number>,     // put请求数，单位次
    "transfer": <number>         // 流量总量，单位Byte
}
```


<a name="space"></a>

## 空间使用情况查询

空间使用情况查询用于获得一个资源空间具体的使用明细。

其请求格式如下

```
    GET /stat/select/space?bucket=<string>&from=<string>&to=<string>&p=<string> HTTP/1.1
    Authorization: <Authorization>
```

其中：

1. bucket：被查询的空间名。可选。如不指定，则返回该用户所有资源空间的总量。
1. from：查询起始日期。格式为20130912
1. to：查询结束时间。格式为20130912
1. p：查询粒度。可选值为：
    1. 5min。粒度为5分钟；
    1. day。粒度为天；
    1. month。粒度为月。
1. Authorization：用户验证的AccessToken。AccessToken的生成方法详见[授权认证](http://docs.qiniu.com/api/v6/rs.html#digest-auth)

查询反馈结果是json格式，具体结构如下：

```
{
    time:
        [
             <number>,  // 时间戳（Unix Time，单位为秒）。靠前对齐。 比如指定颗粒度为day，那该时间显示为当天0点0分0秒的时间戳
             <number>,
             ...
        ],
    data:
        [
            <number>,   // 每个时间颗粒度上的使用量（单位Byte），与上述时间戳按次序一一对应。
            ...
        ]
}
```


<a name="transfer"></a>

## 流量使用情况查询

流量使用情况查询用于获得一个资源空间具体的流量明细。

其请求格式如下

```
    GET /stat/select/transfer?bucket=<string>&from=<string>&to=<string>&p=<string> HTTP/1.1
    Authorization: <Authorization>
```

其中：

1. bucket：被查询的空间名。可选。如不指定，则返回该用户所有资源空间的总量。
1. from：查询起始日期。格式为20130912
1. to：查询结束时间。格式为20130912
1. p：查询粒度。可选值为：
    1. 5min。粒度为5分钟；
    1. day。粒度为天；
    1. month。粒度为月。
1. Authorization：用户验证的AccessToken。AccessToken的生成方法详见[授权认证](http://docs.qiniu.com/api/v6/rs.html#digest-auth)

查询反馈结果是json格式，具体结构如下：

```
{
    time:
        [
             <number>,  // 时间戳（Unix Time，单位为秒）。靠前对齐。 比如指定颗粒度为day，那该时间显示为当天0点0分0秒的时间戳
             <number>,
             ...
        ],
    data:
        [
            <number>,   // 每个时间颗粒度上的流量值（单位Byte），与上述时间戳按次序一一对应。
            ...
        ]
}
```


<a name="api-call"></a>

## 请求数使用情况

请求数使用情况查询用于获得一个空间上的请求数明细

其请求格式如下

```
    GET /stat/select/apicall?bucket=<string>&type=<string>&from=<string>&to=<string>&p=<string> HTTP/1.1
    Authorization: <Authorization>
```

其中：

1. bucket：被查询的空间名。可选。如不指定，则返回该用户所有资源空间的总量。
1. type：用户请求的类型。取值为：get和put。
1. from：查询起始日期。格式为20130912
1. to：查询结束时间。格式为20130912
1. p：查询粒度。可选值为：
    1. 5min。粒度为5分钟；
    1. day。粒度为天；
    1. month。粒度为月。
1. Authorization：用户验证的AccessToken。AccessToken的生成方法详见[授权认证](http://docs.qiniu.com/api/v6/rs.html#digest-auth)

查询反馈结果是json格式，具体结构如下：

```
{
    time:
        [
             <number>,  // 时间戳（Unix Time，单位为秒）。靠前对齐。 比如指定颗粒度为day，那该时间显示为当天0点0分0秒的时间戳
             <number>,
             ...
        ],
    data:
        [
            <number>,   // 每个时间颗粒度上的访问次数（单位次），与上述时间戳按次序一一对应。
            ...
        ]
}
```




