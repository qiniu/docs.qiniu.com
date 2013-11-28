<a name="appendix"></a>
## 附录

<a name="urlsafe-base64"></a>
### URL安全的Base64编码

URL安全的Base64编码适用于以URL方式传递Base64编码结果的场景。该编码方式的基本过程是先将内容以Base64格式编码为字符串，然后检查该结果字符串，将字符串中的加号`+`换成中划线`-`，并且将斜杠`/`换成下划线`_`。

详细编码规范请参见[RFC4648](http://www.ietf.org/rfc/rfc4648.txt)标准中的相关描述。

