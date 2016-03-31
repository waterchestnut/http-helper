http-helper
===
##简易的网络接口调用工具
http请求的工具操作集，包含请求超时时间设置<br/>
提供request、get、post等方法调用远程接口
##安装与初始化，node
``` javascript
npm install http-helper
var httpHelper = require('http-helper');
```
##方法调用说明
也可以执行grunt命令，查看doc文件夹下生成的帮助文档
###request：发起远程请求的基础方法
![](https://github.com/waterchestnut/http-helper/raw/master/img/request.png)
###RequestCallback：数据回调方法
![](https://github.com/waterchestnut/http-helper/raw/master/img/requestcallback.png)
###get：以GET的方式发起远程请求，内部调用request
![](https://github.com/waterchestnut/http-helper/raw/master/img/get.png)
###post：以POST的方式发起远程请求，内部调用request
![](https://github.com/waterchestnut/http-helper/raw/master/img/post.png)