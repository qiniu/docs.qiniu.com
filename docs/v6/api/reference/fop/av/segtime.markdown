---
layout: default
title: 音视频片段（segtime）
order: 148
---

<a name="segtime"></a>
# 音视频片段（segtime）

<a name="audio-preset-description"></a>
### 描述

音视频切片是七牛云存储提供的云处理功能，用于支持HLS回放。  
HLS API规格支持两种形式：预设集和自定义两种。  

<a name="segtime-preset"></a>
### 切片预设集接口规格（presetSpec）  

```
avthumb/m3u8/segtime/<SegSeconds>/preset/<Preset>
```

参数名称                | 说明                                         | 必填
:---------------------- | :------------------------------------------- | :-----
`/segtime/<SegSeconds>` | 用于自定义每一小段音/视频流的播放时长，单位：秒，取值范围10-60秒，缺省值为10秒。若不指定该参数，整个`segtime/<SegSeconds>`部分都不必在API接口中设置 |
`/preset/<Preset>`      | 预设集（Preset）名称                         | 是

音频预设集：  

预设集    | 说明
:-------- | :--------------
audio_32k | 码率为32k的音频
audio_48k | 码率为48k的音频
audio_64k | 码率为64k的音频

视频预设集：  

预设集          | 说明
:-------------- | :-----------------------------------------------
video_16x9_150k | 码率为150K，长宽比为16x9，推荐在 3G 环境下使用
video_16x9_240k | 码率为240K，长宽比为16x9，推荐在 3G 环境下使用
video_16x9_440k | 码率为440K，长宽比为16x9，推荐在 WIFI 环境下使用
video_16x9_640k | 码率为640K，长宽比为16x9，推荐在 WIFI 环境下使用
video_4x3_150k  | 码率为150K，长宽比为4x3，推荐在 3G 环境下使用
video_4x3_240k  | 码率为240K，长宽比为4x3，推荐在 3G 环境下使用
video_4x3_440k  | 码率为440K，长宽比为4x3，推荐在 WIFI 环境下使用
video_4x3_640k  | 码率为640K，长宽比为4x3，推荐在 WIFI 环境下使用

<a name="segtiem-preset-request"></a>
### 请求

<a name="segtiem-preset-request-syntax"></a>
#### 请求语法

```
GET <DownloadURI>?<presetSpec> HTTP/1.1
Host: <DownloadHost>
```

<a name="segtiem-preset-response"></a>
### 响应

<a name="segtiem-preset-response-syntax"></a>
#### 响应语法

```
HTTP/1.1 200 OK
Content-Type: <MimeType>

<BinaryData>
```

<a name="segtime-selfdef"></a>
### 自定义切片接口规格（selfDefSpec）  

```
avthumb/m3u8/segtime/<SegSeconds>
            /r/<FrameRate>
            /vb/<VideoBitRate>
            /vcodec/<VideoCodec>
            /acodec/<AudioCodec>
            /ab/<BitRate>
            /aq/<AudioQuality>
            /ar/<SamplingRate>
```

参数名称                | 说明                                                                | 必填
:---------------------- | :------------------------------------------------------------------ | :-----
`/segtime/<SegSeconds>` | 用于自定义每一小段音/视频流的播放时长，单位：秒，取值范围10-60秒，缺省值为10秒。若不指定该参数，整个`segtime/<SegSeconds>`部分都不必在API接口中设置 |
`/ab/<BitRate>`         | 静态码率（CBR），单位：比特每秒（bit/s），常用码率：64k，128k，192k，256k，320k等 |
`/aq/<AudioQuality>`    | 动态码率（VBR），取值范围为0-9，值越小码率越高。不能与上述静态码率参数共用 |
`/ar/<SamplingRate>`    | 音频采样频率，单位：赫兹（Hz），常用采样频率：8000，12050，22050，44100等 |
`/r/<FrameRate>`        | 视频帧率，每秒显示的帧数，单位：赫兹（Hz），常用帧率：24，25，30等，一般用默认值 |
`/vb/<VideoBitRate>`    | 视频比特率，单位：比特每秒（bit/s），常用视频比特率：128k，1.25m，5m等 |
`/vcodec/<VideoCodec>`  | 视频编码方案，支持方案：libx264，libvpx，libtheora，libxvid等 |
`/acodec/<AudioCodec>`  | 音频编码方案，支持方案：libmp3lame，libfaac，libvorbis等 |
`/segtime/<SegSeconds>` | 用于HLS自定义每一小段音/视频流的播放时长，取值范围为: 10-60秒，缺省为10秒 |

注意：以上参数若不指定参数值，参数及其值都不必在API接口中设置。  

<a name="segtiem-selfdef-request"></a>
### 请求

<a name="segtiem-selfdef-request-syntax"></a>
#### 请求语法

```
GET <DownloadURI>?<selfDefSpec> HTTP/1.1
Host: <DownloadHost>
```

<a name="segtiem-selfdef-response"></a>
### 响应

<a name="segtiem-selfdef-response-syntax"></a>
#### 响应语法

```
HTTP/1.1 200 OK
Content-Type: <MimeType>

<BinaryData>
```
