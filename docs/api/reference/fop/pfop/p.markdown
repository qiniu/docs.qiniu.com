---
layout: api_layout
title: 获取异步处理结果（p）
order: 200
---

<a name="pfop-download"></a>
### 获取异步处理结果（p）

数据处理完成后，用户即可通过：

```
http://<domain>/<key>?p/1/<fop>
```

这样形式的URL访问处理结果。如果访问的处理结果不存在则返回404。  
