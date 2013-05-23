---
layout: default
title: "音频/视频/流媒体处理"
---

- [音频转换](#audio-convert)
- [视频转换](#video-convert)
- [视频帧缩略图](#video-thumbnail)
- [HTTP Live Streaming](#hls)
    - [使用七牛提供的 HLS 服务](#hls-usage)
    - [HTTP Live Streaming API](#hls-api)
- [音视频API参数详解](#args)


<a name="audio-convert"></a>

## 音频转换

**请求**

    [GET] <AudioDownloadURL>?avthumb/<Format>
                             /ab/<BitRate>
                             /aq/<AudioQuality>
                             /ar/<SamplingRate>

参数释义参考: [音视频API参数详解](#args)

**响应**

    HTTP/1.1 200 OK
    Body: <AudioBinaryData>

<a name="audio-convert-args"></a>

**示例**

示例1：将 wav 音频格式转换为 mp3 格式：

    [GET] http://apitest.qiniudn.com/sample.wav?avthumb/mp3

示例2：将 wav 音频格式转换为 mp3 格式，并指定比特率为 192k：

    [GET] http://apitest.qiniudn.com/sample.wav?avthumb/mp3/ab/192k

示例3：将 wav 音频格式转换为 mp3 格式，并指定 VBR 参数为3，采样频率为44100：

    [GET] http://apitest.qiniudn.com/sample.wav?avthumb/mp3/ar/44100/aq/3

**支持的格式**

支持转换的音频格式详见：<http://ffmpeg.org/general.html#Audio-Codecs>

支持的音频 Codec 有：libmp3lame，libfaac，libvorbis 。

**优化建议**

为了保证良好的用户体验，请配合上传预转机制使用。参考: [上传预转](#upload-fop)

<a name="video-convert"></a>

## 视频转换

**请求**

    [GET] <VideoDownloadURL>?avthumb/<Format>
                             /r/<FrameRate>
                             /vb/<VideoBitRate>
                             /vcodec/<VideoCodec>
                             /acodec/<AudioCodec>
                             /ab/<BitRate>
                             /aq/<AudioQuality>
                             /ar/<SamplingRate>

参数释义参考: [音视频API参数详解](#args)

**响应**

    HTTP/1.1 200 OK
    Body: <VideoBinaryData>

**示例**

示例1：将 mp4 视频格式转换为 flv 格式，帧率为 24，使用 x264 进行视频编码：

    [GET] http://open.qiniudn.com/thinking-in-go.mp4?avthumb/flv/r/24/vcodec/libx264

示例2：将 mp4 视频格式转换为 avi 格式，使用 mp3 进行音频编码，且音频比特率为64k：

    [GET] http://open.qiniudn.com/thinking-in-go.mp4?avthumb/avi/ab/64k/acodec/libmp3lame

示例3：将 mp4 视频格式转换为 flv 格式，帧率 30，视频比特率 256k，使用 x264 进行视频编码，音频采样频率 22050，音频比特率 64k，使用 mp3 进行音频编码：

    [GET] http://open.qiniudn.com/thinking-in-go.mp4?avthumb/flv
                                                     /r/30
                                                     /vb/256k
                                                     /vcodec/libx264
                                                     /ar/22050
                                                     /ab/64k
                                                     /acodec/libmp3lame

示例4：将 mp4 视频格式转换为 ogv 格式，帧率 30，视频比特率 1800k，使用 libtheora 进行视频编码，音频采样频率 44100，音频比特率 128k，使用 libvorbis 进行音频编码：

    [GET] http://open.qiniudn.com/thinking-in-go.mp4?avthumb/ogv
                                                     /r/30
                                                     /vb/1800k
                                                     /vcodec/libtheora
                                                     /ar/44100
                                                     /ab/128k
                                                     /acodec/libvorbis

**支持的格式**

支持转换的视频格式详见：<http://ffmpeg.org/general.html#File-Formats>

支持的视频 Codec 有：libx264，libvpx，libtheora，libxvid 。

支持的音频 Codec 有：libmp3lame，libfaac，libvorbis 。

**优化建议**

为了保证良好的用户体验，请配合上传预转机制使用。参考: [上传预转](#upload-fop)


<a name="video-thumbnail"></a>

## 视频帧缩略图

**请求**

    GET <VideoDownloadURL>?vframe/<Format>
                           /offset/<Second>
                           /w/<Width>
                           /h/<Height>

**响应**

    HTTP/1.1 200 OK
    Body: <ImageBinaryData>

**请求参数详解**

参数   | 说明
-------|--------------------------------------
Format | 要输出的目标缩略图格式，支持 jpg，png
Second | 取视频的第几秒
Width  | 缩略图宽度，范围为 1 ~ 1920
Height | 缩略图高度，范围为 1 ~ 1080

**示例**

示例：取视频第 7 秒的截图，图片格式为 jpg，宽度为 480px，高度为 360px：

    [GET] http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg
                                                     /offset/7
                                                     /w/480
                                                     /h/360

上述示例效果如下：

![Go——基于连接与组合的语言](http://open.qiniudn.com/thinking-in-go.mp4?vframe/jpg/offset/7/w/480/h/360)


<a name="hls"></a>

## HTTP Live Streaming

HTTP Live Streaming 是由 Apple 提出的基于 HTTP 的流媒体传输协议。
它将一整个音视频流切割成可由 HTTP 下载的一个个小的音视频流，并生成一个播放列表（M3U8），客户端只需要获取资源的 M3U8 播放列表即可播放音视频。

以下用 HLS 代指 HTTP Live Streaming 。

<a name="hls-usage"></a>

### 使用七牛提供的 HLS 服务

HLS 必须使用友好风格的 URL，可以使用命令行工具 `qboxrsctl` 配置 HLS 友好风格。

下载 [qboxrsctl](/tools/qboxrsctl.html)

下载 qboxrsctl 之后，我们需要先了解该命令行工具的3个指令。

注意:

 - qboxrsctl 工具需在命令行模式下使用
 - 尖括号注明的参数是需要自行替换的内容

指令1，登录授权:

    qboxrsctl login <注册邮箱> <登录密码>

指令2，设置友好风格的 URL 分隔符:

    qboxrsctl separator <空间名称> <分隔符字符>

指令3，设置 API 规格别名:

    qboxrsctl style <空间名称> <API规格别名> <API规格定义字符串>

示例

    // 设置分隔符为点号（“.”) 
    qboxrsctl separator <空间名称> .

    // 设置风格名为 m3u8_audio，代表音频的 HLS, 码率为32k
    qboxrsctl style <空间名称> m3u8_audio avthumb/m3u8/preset/audio_32k

    // 设置风格名为 m3u8_video，代表视频的 HLS, 长宽比为16x9，码率为150k
    qboxrsctl style <空间名称> m3u8_video avthumb/m3u8/preset/video_16x9_150k


已知文件上传到七牛后，下载方式如下:

公有资源

    [GET] http://<Domain>/<Key>

私有资源

    [GET] http://<Domain>/<Key>?token=<DownloadToken>


上述示例设置完之后就可以用以下 URL 来访问 HLS 资源：

    // 公有资源
    [GET] http://<Domain>/<Key>.m3u8_audio
    [GET] http://<Domain>/<Key>.m3u8_video

    // 私有资源（m3u8私有资源访问暂不支持）
    [GET] http://<Domain>/<Key>.m3u8_audio?token=<DownloadToken>
    [GET] http://<Domain>/<Key>.m3u8_video?token=<DownloadToken>

    HTTP/1.1 200 OK
    Content-Type: application/x-mpegurl
    Body: <M3U8File>


<a name="upload-fop"></a>

**上传预转**

由于在线音视频频转换或将音视频切割成多个小文件并生成 M3U8 播放列表是一个相对耗时的操作，为了保证良好的用户体验，需要配合上传预转机制使用。实际上，七牛官方推荐音视频在线编解码都通过上传预转的方式进行。

上传预转参考文档：[音视频上传预转 - asyncOps](put.html#uploadToken-asyncOps)

接上述示例，已知 `m3u8_audio` 的 API 规格定义，将其作为上传授权凭证（`uploadToken`）预转参数（`asyncOps`）的值即可。

    asyncOps = "http://example.qiniudn.com/$(key)?avthumb/m3u8/preset/audio_32k"

可以设置多个预转指令，用分号“;”隔开即可:

    asyncOps = "http://example.qiniudn.com/$(key)?avthumb/m3u8/preset/audio_32k;
                http://example.qiniudn.com/$(key)?avthumb/m3u8/preset/audio_48k"

实际情况下，`example.qiniudn.com` 换成存储空间（bucket）绑定的域名即可。

同样，视频预转的操作方式也一样。

设置预转后，当文件上传完毕即可异步执行预转指令操作。第一次访问该资源时，就无需再转换了，访问到的即已经转换好的资源。


<a name="hls-api"></a>

### HTTP Live Streaming API

HLS API 规格支持两种形式：预设集和自定义两种。

#### 预设集

    avthumb/m3u8/segtime/<SegSeconds>/preset/<Preset>

参数

`<SegSeconds>`：可选项，用于自定义每一小段音/视频流的播放时间长度（单位:秒），取值范围为: 10 - 60 （秒），缺省值为 10（秒）。该参数若不指定，整个 `segtime/<SegSeconds>` 部分都不必在所调用的 API 规格中出现。

`<Preset>`：为了方便使用，我们提供了一些常用的预设集（Preset）。如下：

##### 音频预设集

预设集    | 说明
----------|----------------
audio_32k | 码率为32k的音频
audio_48k | 码率为48k的音频
audio_64k | 码率为64k的音频


##### 视频预设集

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


#### 自定义

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

