# 杂章&收集集合

## css

### 小工具
1、样式重置代码

```
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
a,
abbr,
acronym,
address,
big,
cite,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
input,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    border: 0;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    font-style: normal;
    list-style: none;
}
```

2、避免padding和width一起使用

css中```box-sizing```默认的是```content-box```。即```width = content宽度```，不包括padding，margin，和border。所以在使用padding时，宽度固定的情况下，可以使用

```
.box{
	width:200px;
	padding:20px;
	box-sizing: border-box;
}
```
```border-box```属性表示的是```width = content宽度+ padding + border``` 即表示，box的宽度包括padding, border,但不包括margin


3、移动端开发中，ios的input type经过美化的，所以要去掉原有的样式

```
{
-webkit-appearance:none;
	outline:none
}
```


### CSS实现单行、多行文本溢出显示省略号（…）

1、单行文本溢出，此时需要设定box宽度来兼容部分浏览

```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

2、多行文本溢出显示省略号（webkit内核浏览器和移动端）

```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

* -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
* display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
* -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

3、多行文本溢出显示省略号（该方法适用范围广，但文字未超出行的情况下也会出现省略号,可结合js优化该方法。）

```
p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;}
p::after{
	content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
	background: -webkit-linear-gradient(left, transparent, #fff 55%);
	background: -o-linear-gradient(right, transparent, #fff 55%);
	background: -moz-linear-gradient(right, transparent, #fff 55%);
	background: linear-gradient(to right, transparent, #fff 55%);
}
```

* 将height设置为line-height的整数倍，防止超出的文字露出。
* 给p::after添加渐变背景可避免文字只显示一半。
* 由于ie6-7不显示content内容，所以要添加标签兼容ie6-7（如：<span>…<span/>）；兼容ie8需要将::after替换成:after。

### css布局
1、左边固定宽度，右边自适应

Html

```
<!--method1 使用left=>float:left;right=>margin-left:200px;-->
<div class="left">1</div>
<div class="right">2</div>
<!---->

<!--method2 使用left=> position:absolute;right=>margin-left:200px;-->
<div class="wrap">
	<div class="left2">1</div>
	<div class="right2">2</div>
</div>
<!---->

<!--method3 使用wrap2=>display:flex; left=>固定宽度;right=>flex:1;-->
<div class="wrap2">
	<div class="left3">1</div>
	<div class="right3">2</div>
</div>
<!---->

```
Css

```css
*{
	margin:0;
	padding:0;
}


.left{
	width:200px;
	background:#f00;
	float:left;
}
.right{
	background:blue;
}

.left2{
	width:200px;
	background:#f00;
	position:absolute;
	left:0;
	top:0;
}
.right2{
	background:blue;
	margin-left:200px;
}
.wrap{
	position:relative;
}

.wrap2{
	display:flex;	
}

.left3{
	width:200px;
	background:#f00;
}

.right3{
	flex:1;
	background:blue;
}

```
2、右边固定宽度，左边自适应

```
<div class="main">
	<div class="rightbox"></div>
	<div class="left box"></div>
</div>
```
```css
.main{
	position:relative;
	.leftbox{
		margin-right:200px;
		background:#eee;
	}
	.rightbox{
		float:right;
		width:200px;
		background:#f00;
	}
}
.main::after{
	content:"";
	clear:both;
	overflow:hidden;
}

```

## JavaScript

### Promise

1、Promise.all()

```
Promise.all([<Promise Array>]).then(res=>{
	//code	
}).catch(err=>{
	throw err;
});

```

其中参数为 promise数组对象，当所有的promise对象都有正确返回时执行resolve，只要有一个promise返回reject时，当前执行reject。

当何时使用Promise.all()时，参考下面stackoverflow

[When to use promise.all()?](http://stackoverflow.com/questions/38180080/when-to-use-promise-all)

例子：多请求的简单实现

```JavaScript
 /**
 * 
 *  多api请求处理
 *  参数类型 string
 */
MultiRequest() {
    let args = [...arguments];
    let req = [];

    //this.CheckEachArgsOfArguments(args);
    args.forEach((ele, index) => {
        req.push(this.RequestUrl(ele));
    });

    return new Promise((resolve, reject) => {
        Promise.all(req).then((res) => {
            if (res) {
                resolve(res);
            }
        }).catch((err) => {
            reject(err);
        });
    });
},

/**
 * 
 * 请求api,返回promise对象
 * @param {any} reqUrl 
 * @returns 
 */
RequestUrl(reqUrl) {
    return new Promise((resolve, reject) => {
        axios.get(reqUrl).then((res) => {
            if (res) {
                resolve(res);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}
```
使用

``` JavaScript
MultiRequest(url1,url2,...).then(res=>{
	//code here
}).catch(err=>{
	throw err;
});
```

2、Promise.race()

```
Promise.race(<Promise Array>).then(res=>{
	//code here
}).catch(err=>{
	throw err;
});
```
race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。

推荐文章

[Promise me you won’t use Promise.race](https://www.jcore.com/2016/12/18/promise-me-you-wont-use-promise-race/)
