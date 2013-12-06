---
layout: default
title: 音视频片段（segtime）
order: 148
---

<a name="segtime"></a>
# 音视频片段（segtime）

HLS API 规格支持两种形式：预设集和自定义两种。

## 预设集

    avthumb/m3u8/segtime/<SegSeconds>/preset/<Preset>

参数

`<SegSeconds>`：可选项，用于自定义每一小段音/视频流的播放时间长度（单位:秒），取值范围为: 10 - 60 （秒），缺省值为 10（秒）。该参数若不指定，整个 `segtime/<SegSeconds>` 部分都不必在所调用的 API 规格中出现。

`<Preset>`：为了方便使用，我们提供了一些常用的预设集（Preset）。如下：

### 音频预设集

预设集    | 说明
----------|----------------
audio_32k | 码率为32k的音频
audio_48k | 码率为48k的音频
audio_64k | 码率为64k的音频


### 视频预设集

预设集          | 说明
----------------|-------------------------------------------------
video_16x9_150k | 码率为150K，长宽比为16x9，推荐在 3G 环境下使用
video_16x9_240k | 码率为240K，长宽比为16x9，推荐在 3G 环境下使用
video_16x9_440k | 码率为440K，长宽比为16x9，推荐在 WIFI 环境下使用
video_16x9_640k | 码率为640K，长宽比为16x9，推荐在 WIFI 环境下使用
video_4x3_150k  | 码率为150K，长宽比为4x3，推荐在 3G 环境下使用
video_4x3_240k  | 码率为240K，长宽比为4x3，推荐在 3G 环境下使用
video_4x3_440k  | 码率为440K，长宽比为4x3，推荐在 WIFI 环境下使用
video_4x3_640k  | 码率为640K，长宽比为4x3，推荐在 WIFI 环境下使用

## 自定义

自定义 HLS 的 API 规格如下:

    avthumb/m3u8/segtime/<SegSeconds>
                /r/<FrameRate>
                /vb/<VideoBitRate>
                /vcodec/<VideoCodec>
                /acodec/<AudioCodec>
                /ab/<BitRate>
                /aq/<AudioQuality>
                /ar/<SamplingRate>

参数释义参考: [音视频API参数详解](#args)


<a name="args"></a>

## 音视频API参数详解

参数 | 说明
------------ | -------------
`<Format>` | 要转换输出的目标音频（比如 mp3、aac、m4a）或视频格式（比如 avi、flv、mp4）。参考: [支持转换的音/视频格式](http://ffmpeg.org/general.html#Supported-File-Formats_002c-Codecs-or-Features)。
`/ab/<BitRate>` | 静态码率（CBR），单位：比特每秒（bit/s），常用码率：320k, 256k, 192k, 128k, 64k 等。
`/aq/<AudioQuality>` | 动态码率（VBR），取值范围为 0 ~ 9，值越小，码率越高，不得和上面的静态码率 `<BitRate>`(CBR) 参数合用。
`/ar/<SamplingRate>` | 音频采样频率，单位：赫兹（Hz），常用采样频率：44100，22050，12050，8000等。
`/r/<FrameRate>` | 视频帧率，每秒显示的帧数，单位：赫兹（Hz），常用帧率：24，25，30 等，一般用默认值。
`/vb/<VideoBitRate>` | 视频比特率，单位：比特每秒（bit/s），常用视频比特率：128k 1.25m 5m 等。
`/vcodec/<VideoCodec>` | 视频编码方案，支持方案：libx264，libvpx，libtheora，libxvid。
`/acodec/<AudioCodec>` | 音频编码方案，支持方案：libmp3lame，libfaac，libvorbis。
`/segtime/<SegSeconds>` | 用于 HLS 自定义每一小段音/视频流的播放时间长度，取值范围为: 10 - 60 （秒），默认值为 10（单位:秒）。

注意：以上参数若不指定参数值，参数及其值都不必在所调用的 API 规格中出现。

