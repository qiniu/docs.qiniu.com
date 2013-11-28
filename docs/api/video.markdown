---
layout: api_layout
title: 视频处理
order: 140
---
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
`/ss/<SeekStart>` | 指定视频截取的开始时间，以秒为单位。用于视频截取，从一段视频中截取一段视频。
`/t/<Duration>` | 指定视频截取的长度，以秒为单位。用于视频截取，从一段视频中截取一段视频。
`/s/<Resolution>` | 指定视频分辨率，格式为 wxh 或者预定义值。

注意：以上参数若不指定参数值，参数及其值都不必在所调用的 API 规格中出现。  
