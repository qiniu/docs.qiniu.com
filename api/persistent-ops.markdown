---
layout: api_layout
title: "数据处理(持久化)"
order: 1
---

- [持久化处理说明](#persistentOps-overall)
- [持久化处理机制](#persistentOps-method)
    - [上传预转码处理](#persistentOps-upload)
    - [对已有文件处理](#persistentOps-pfop)
    - [访问和下载](#persistentOps-download)
- [处理状态通知和查询](#persistentOps-status)
    - [通知](#notify)
    - [查询](#status)
    - [状态内容](#status-description)
- [处理实例](#persistentOps-example)


<a name="persistentOps-overall"></a>

## 持久化处理说明  

音视频用户可以使用持久化功能将转码结果保存在空间中，以提升访问时的体验。配合处理状态通知和查询功能，还能了解转码进度、优化交互流程。  



<a name="persistentOps-method"></a>
## 持久化处理机制  

<a name="persistentOps-upload"></a>
### 上传预转码处理  
用户要在上传音视频文件后自动进行预转码处理，需要在上传策略(PutPolicy)中增加`persistentOps`和 `persistentNotifyUrl` 两个字段。  

字段 | 含义
----- | -------------
`persistentOps` | 需要进行的数据处理命令,可以指定多个命令，以`;`分隔。
`persistentNotifyUrl` | 用户接收视频处理结果的接口URL。

用户使用指定了`persistentOps` 和 `persistentNotifyUrl` 的uploadToken上传一个音视频文件之后，服务端会生成此次处理的进程ID `persistentId`，并开始数据处理。  
`persistentId`可以用来获取处理的进度和结果。  
针对用户上传策略的不同，获得`persistentId`的方式不同：  

1.  uploadToken参数中没有设置returnUrl或callbackUrl，上传成功后服务器返回的结果中默认带有`persistentId`字段；  
2.  uploadToken参数中设置了returnUrl，但没有设置returnBody，跳转过程附带的upload_ret参数解码后获得的结果中默认带有`persistentId`字段；  
3.  uploadToken参数中设置了callbackUrl，但没有设置callbackBody，和之前一样，这种情况下上传会失败；  
4.  uploadToken参数中设置了returnUrl或callbackUrl，且根据需求自定义了相应的Body（`returnBody` 或 `callbackBody`），要在Body中使用魔法变量`$(persistentId)` 来得到。  


<a name="persistentOps-pfop"></a>
### 对已有文件处理  
如果需要对空间中的文件进行转码并持久化处理，可以按以下方式使用我们的异步处理接口：  


    Request URL: http://api.qiniu.com/pfop/  
    Request Method: POST  
    Request Headers:  
        Content-Type: application/x-www-form-urlencoded  
        Authorization: QBox <access token>  
    Form Data: 
        bucket: <bucket>  
        key: <file Key>  
        fops: <fop1>;<fop2>...<fopN>
        notifyURL: <persistentNotifyUrl>          


其中，`access token`是资源管理的授权认证，生成的算法可以参考 [资源管理操作-授权认证](http://docs.qiniu.com/api/v6/rs.html#digest-auth)。  
正常情况下获得的返回：


    Status Code: 200 OK  
    Response:  
        {"persistentId": <persistentId>}


处理完成后会向用户指定的`notifyURL`发送处理结果，用户也可以根据`persistentId`来主动查询。详情可以参考：[处理状态通知和查询](#persistentOps-status)

<a name="persistentOps-download"></a>
### 下载  
服务端处理完成之后，用户即可通过  

    [GET] http://<domain>/<key>?p/1/<fop>  
    
这样形式的url访问处理结果。如果访问一个没有进行过的转码处理结果，会直接返回404。  


<a name="persistentOps-status"></a>
## 状态通知和查询

<a name="notify"></a>
### 通知  
服务端完成所有的数据处理后，会以 HTTP POST 的方式将处理状态`<JsonStatusDescription>`以`application/json`的形式发送给用户指定的`persistentNotifyUrl`。  

    Content-Type: application/json
    Body: <JsonStatusDescription>
	
`<JsonStatusDescription>`的内容及含义参考： [状态内容](#persistentOps-status-description) 

<a name="status"></a>
### 查询  
用户也可以使用`persistentId`来主动查询数据处理的状态。查询的接口为：  

    [GET] http://api.qiniu.com/status/get/prefop?id=<persistentId>  

接口返回的内容及含义参考 [状态内容](#persistentOps-status-description)

<a name="status-description"></a>
### 状态内容  
用户获得的数据处理状态是一个JSON字符串，内容范例如下：  

	{
		"id": "16864pauo1vc9nhp12",
		"code": 0,
		"desc": "The fop was completed successfully",
		"items": [
			{
				"cmd": "avthumb/mp4/r/30/vb/256k/vcodec/libx264/ar/22061/ab/64k/acodec/libmp3lame",
				"code": 0,
				"desc": "The fop was completed successfully",
				"error": "",
				"hash": "FrPNF2qz66Bt14JMdgU8Ya7axZx-",
				"key": "v-PtT-DzpyCcqv6xNU25neTMkcc=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
			},
			{
				"cmd": "avthumb/iphone_low",
				"code": 0,
				"desc": "The fop was completed successfully",
				"error": "",
				"hash": "FmZ5PbHMYD5uuP1-kHaLjKbrv-75",
				"key": "tZ-w8jHlQ0__PYJdiisskrK5h3k=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
			},
			{
				"cmd": "avthumb/m3u8/r/30/vb/256k/vcodec/libx264/ar/22071/ab/64k/acodec/libmp3lame",
				"code": 0,
				"desc": "The fop was completed successfully",
				"error": "",
				"hash": "Fi4gMX0SvKVvptxfvoiuDfFkCuEG",
				"key": "8ehryqviSaMIjkVQDGeDcKRZ6qc=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
			},
			{
				"cmd": "avthumb/m3u8/preset/video_16x9_440k",
				"code": 0,
				"desc": "The fop was completed successfully",
				"error": "",
				"hash": "FtuxnwAY9NVBxAZLcxNUuToR9y97",
				"key": "s2_PQlcIOz1uP6VVBXk5O9dXYLY=/FjgJQXuH7OresQL4zgRqYG5bZ64x"
			}
		]
	}


参数及含义  

参数 | 含义
---- | --------
`id` | 数据处理的进程ID，即前文中的`persistentId`。
`code` | 状态码，0 表示成功，1 表示等待处理，2 表示正在处理，3 表示处理失败，4 表示回调失败。
`desc` | 状态码对应的详细描述。
`items` | 列表，包含每个`fop`处理的完成情况。
`cmd` | 所执行的`fop`处理命令。
`error` | 如果处理失败，这个字段会给出详细的失败原因。
`hash` | 数据处理结果保存在服务端的唯一 hash 标识。
`key` | 数据处理结果的外链key。范例中，`avthumb/iphone_low`的处理结果可以通过`http://domian/tZ-w8jHlQ0__PYJdiisskrK5h3k=/FjgJQXuH7OresQL4zgRqYG5bZ64x`来直接访问。



<a name="persistentOps-example"></a>
## 处理实例  

1.  上传一个音频文件 **persistent.mp3** ，并设置处理命令为 `avthumb/mp3/aq/6/ar/16000` 和 `avthumb/mp3/ar/44100/ab/32k`。  
2.  通知接口收到的处理状态通知内容：  

        {  
            'code': 0,  
            'id': '168739cd2fn1g76f13',   
            'desc': 'The fop was completed successfully',  
            'items': [  
                {
                    'code': 0, 
                    'hash': 'FvvxM7gMI6WfiuXlBgKbkzU67Tpa', 
                    'cmd': 'avthumb/mp3/ar/44100/ab/32k', 
                    'key': 'sFhZ4dSjB1zvL3De1UBX2qZ_VR0=/lgxucMCQso_KOW_YDM-_KVIeX6o5', 
                    'error': '', 
                    'desc': 'The fop was completed successfully'
                },   
                {
                    'code': 0, 
                    'hash': 'FpSzDMYJtP_UY_6EMIyaBe4awXp3', 
                    'cmd': 'avthumb/mp3/aq/6/ar/16000', 
                    'key': '1G8-OWwP3jPLvi7O3qOf7yCl4YI=/lgxucMCQso_KOW_YDM-_KVIeX6o5', 
                    'error': '', 
                    'desc': 'The fop was completed successfully'
                }  
            ]  
        }  


3.  访问链接：  
[原文件](http://t-test.qiniudn.com/persistent.mp3)  
[处理1(avthumb/mp3/aq/6/ar/16000)结果](http://t-test.qiniudn.com/persistent.mp3?p/1/avthumb/mp3/aq/6/ar/16000)  
[处理2(avthumb/mp3/ar/44100/ab/32k)结果](http://t-test.qiniudn.com/persistent.mp3?p/1/avthumb/mp3/ar/44100/ab/32k)   

