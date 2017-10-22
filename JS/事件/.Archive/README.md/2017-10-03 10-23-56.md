# 事件

图解

![图解](http://files.jb51.net/file_images/article/201310/20131028160201571.jpg?_=4370949)

- 事件捕获阶段：事件从最上一级标签开始往下查找，直到捕获到事件目标(target)。

- 事件冒泡阶段：事件从事件目标(target)开始，往上冒泡直到页面的最上一级标签。

### 定义

> 事件捕获

简单来说：最外层父dom到指定的dom（前提绑定了事件）

即父元素事件先出发，传播到指定的子元素事件结束

> 事件冒泡

简单来说：从指定的dom到最外层父dom （前提绑定了事件）

即子元素事件先出发，再向外传播到父元素事件

#### 归类定义

事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发

IE 5.5: div -> body -> document

IE 6.0: div -> body -> html -> document

Mozilla 1.0: div -> body -> html -> document -> window

> DOM事件流

同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。两种事件流会触及DOM中的所有对象，从document对象开始，也在document对象结束。


### 常用的

> ```addEventListener(event, fn, useCapture)``` 现代浏览器

其中```useCapture``` 为```true```时表示捕获事件，```false```表示冒泡事件

> ```attachEvent()``` 

IE只支持事件冒泡，不支持事件捕获，它也不支持addEventListener函数，不会用第三个参数来表示是冒泡还是捕获，它提供了另一个函数attachEvent


> ```ele.onClick = fn```

传统的这类定义方法默认为冒泡事件


### 怎么阻止他们呢

> ```event.stopPropagation();```

W3c中阻止捕获和冒泡阶段中当前事件的进一步传播。

> ```event.cancelBubble = true```

IE下设置

> ```event.preventDefault()```

表示阻止元素的默认行为 如```<a>```标签的默认行为为跳转到指定链接

### 我的理解

在事件中，（IE的```attachEvent``` 默认冒泡事件，w3c标准下 ```addEventListener ```为false时 默认冒泡事件，true为捕获事件。

在事件流中，w3c标准的浏览器下，从捕获事件开始，浏览器会从最顶层的dom元素开始找起，一直到指定的dom元素，查看是否存在捕获事件（```useCapture ```为true），如果存在，捕获事件函数，执行。如果不存在查找到指定dom元素停止。随后开始冒泡事件，从指定dom元素开始，向外查询父元素是否存在冒泡事件（```useCapture ```为false）的回调函数。存在的话，执行冒泡事件回调函数。

当然，事件流是可以阻止的。

W3c标准中 ， ```event.stopPropagation()``` 可以阻止事件的进一步传播。(实验了下，即从使用了```event.stopPropagation()```开始，停止向外传播)

Html

``` html
<div id="parent">
	父元素
	<div id="child">
		子元素
	</div>
</div>
```
JavaScript

``` JavaScript
var parent = document.getElementById("parent");
var child = document.getElementById("child");

document.body.addEventListener("click",function(e){
	console.log("click-body");
},false);

parent.addEventListener("click",function(e){
	console.log("click-parent---事件传播");
},false);

//新增事件捕获事件代码
parent.addEventListener("click",function(e){
   e.stopPropagation();  //B
	console.log("click-parent--事件捕获");
},true);

child.addEventListener("click",function(e){
	e.stopPropagation();  //A
	console.log("click-child");
},false);
```

- 当在```A```地方使用时

	输出的结果为
	
	```
	
	"click-parent--事件捕获"
	"click-child"
	
	```
	表示捕获事件执行到指定子元素的冒泡事件时，停止继续传播下去

- 当在```B```地方使用时

	输出的结果为
	
	```
	
	"click-parent--事件捕获"
	
	```
	表示捕获事件执行到此时，停止继续传播下去
	
	
	
### extend

> ```event.preventDefault()```在touch事件中的影响

相对于pc，mobile端的开发，离不开touch事件

在```touchstart```中添加 ```event.preventDefault()``` ，就会阻止click事件

在```touchmove```中添加 ```event.preventDefault()``` ，就会阻止默认的滚动事件

