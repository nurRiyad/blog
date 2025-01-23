---
title: 浏览器开发者工具DevTools中提升效率的小技巧
date: 2024-04-28 16:12
description: DevTools 非常强大除了常用的查看元素，进行断点调试或许还有些你不知道的小技巧，小功能。如可以快速的重新发送请求，快速选择元素，在控制台中使用npm库等，让你能够更加高效的进行开发。不定时更新~
image: /blogs-img/cover/common2.jpg
ogImage: /blogs-img/cover/common2.jpg
tags: ['devtool', '浏览器']
published: true
---

DevTools 非常强大除了常用的查看元素，进行断点调试或许还有些你不知道的小技巧，小功能。如可以快速的重新发送请求，快速选择元素，在控制台中使用npm库等，让你能够更加高效的进行开发。不定时更新~

## 打开开发者工具的快捷键

使用快捷键能快速打开 DevTools，但不同的快捷键可以打开不同的 tab :
| 系统 | 元素 | 控制台 | 网络 |
| :------------ | :------------ | :------------ | :------------ |
| Windows 或 Linux | Ctrl + Shift + C | Ctrl + Shift + J | Ctrl + Shift + I |
| Mac | Cmd + Option + C | Cmd + Option + J | Cmd + Option + I |

## 重新发送请求

有时在调试的使用仅想对某个接口重新请求，但又不想刷新页面，就可以使用**重放XHR**功能，快速的保留参数重新请求。
![image](/blogs-img/202404/1249408-20240427231548433-458878836.png)

## 修改参数重新发送请求

若是不想使用 postman等工具，且要快速的修改请求参数，可以在将请求复制出来，然后直接修改后发送：
![image](/blogs-img/202404/1249408-20240428144415025-186804583.png)
然后在控制台中修改，如是 get 请求修改url，post 请求修改body，然后回车就能发送请求了，它会返回一个 Promise 对象。
![image](/blogs-img/202404/1249408-20240428144824128-1846720633.png)

## VUE3 响应式数据格式化输出

因为 vue3 中响应式系统借助了 Proxy API，所以直接输出时它是个 Proxy 对象，查看起来还是不太直观的，如：
![image](/blogs-img/202404/1249408-20240428153251547-1362768876.png)
因为 vu3 内部做了自定义格式的实现，所以在设置中打开自定义格式设置工具就可以更直观的查看响应式数据了。
![image](/blogs-img/202404/1249408-20240428154841177-1999825875.png)

![image](/blogs-img/202404/1249408-20240428154747987-521838329.png)

![image](/blogs-img/202404/1249408-20240428154703381-1749341064.png)
vue3 源码中自定义格式化的实现：
![image](/blogs-img/202404/1249408-20240428155242218-1619797690.png)

## 查看请求的资源是否使用了压缩，用的是什么压缩算法

其实就是查看响应的 Content Encoding ，在网络请求中鼠标右键 ==> Response Headers ==> Content Encoding。如下：可以看到资源请求使用了brotli或gzip压缩算法。
![image](/blogs-img/202404/1249408-20240427230348919-198333496.png)

## 快速选择元素

浏览器自身提供了`$`,`$$` 快速的选择页面中的元素，用起来有点像 jquery 中`$`。$() 是document.querySelector()的简写，

$$
() 是document.querySelectorAll()的简写。
```js
`<div id="bar">bar</div>`
`<div class="foo">foo1</div>`
`<div class="foo">foo2</div>`
$ // ƒ $() { [native code] }  说明是浏览器自身提供的
$('#bar') // 返回文档中与指定选择器或选择器组匹配的第一个Element对象。
$$('#bar') // 返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 NodeList 。
```
![image](/blogs-img/202404/1249408-20240430232135950-1091584117.png)
![image](/blogs-img/202404/1249408-20240430232928099-1940921994.png)
## 日志点
在线上环境可以通过使用日志点，在线上上环境进行`console.log`，当然大部时候直接断点调试可能会更快。😂
![image](/blogs-img/202404/1249408-20240428150722817-1790645894.png)
![image](/blogs-img/202404/1249408-20240428151541273-88194151.png)

## 控制台使用npm包
借助 console importer (https://chromewebstore.google.com/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie) 插件可以直接在控制台中使用npm上或cdn上的包。
![image](/blogs-img/202404/1249408-20240428160549192-1022077234.png)
安装插件后可以使用`$i('包名或cdn资源')`导入三方包，如使用`day.js`:
![image](/blogs-img/202404/1249408-20240428160837452-1105713677.png)


## 更多技巧
> 1. https://devtoolstips.org/ （英文）
> 2. https://developer.chrome.com/docs/devtools/tips （英文，有视频讲解）


$$
