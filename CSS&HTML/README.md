# CSS

#### 初始化样式

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

#### 避免padding和width一起使用

css中```box-sizing```默认的是```content-box```。即```width = content宽度```，不包括padding，margin，和border。所以在使用padding时，宽度固定的情况下，可以使用

```
.box{
	width:200px;
	padding:20px;
	box-sizing: border-box;
}
```
```border-box```属性表示的是```width = content宽度+ padding + border``` 即表示，box的宽度包括padding, border,但不包括margin


#### 移动端开发中，ios的input type经过美化的，所以要去掉原有的样式

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
* 

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
	display:block;
	height:0;
	visibility: hidden;	
}

```
3、水平居中的方法

+ 行内元素```text-align:center```
+ 行内块级元素 ```margin:0 auto;(margin-left:auto;margin-right:auto;)```
+ 多块级元素 
	+ 父元素```text-align:center``` 
	+ 子元素```display:inline-block```

4、垂直居中的方法

行内元素

+ 单行 上下padding相同或者```height:24px;lineheight:24px;```
+ 多行 上下padding相同或者```display:table-cell;vertical-align: middle```

块级元素&水平垂直居中

+ 固定宽高	 ```position:absolute;left:50%;top:50%;margin-left:-50%;margin-top:-50%;```
+ 不固定宽高 ```position:absolute;left:50%;top:50%;transform:translate3d(-50%,-50%,0);```
+ flex布局 ```display:flex;justy-content:center```

### 浮动

[参考](http://snailsky.me/2014/08/20/%E6%B5%AE%E5%8A%A8%E5%92%8C%E5%AE%83%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%EF%BC%9F%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%8A%80%E5%B7%A7%EF%BC%9F/)

为什么会出现“高度塌陷”这样的现象？

我们先看看什么是浮动：
浮动：浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于文档中的普通流，当一个元素浮动之后，不会影响到块级框的布局而只会影响内联框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样，当浮动框高度超出包含框的时候，也就会出现包含框不会自动伸高来闭合浮动元素（“高度塌陷”现象）。顾名思义，就是漂浮于普通流之上，像浮云一样，但是只能左右浮动。

正是因为浮动的这种特性，导致本属于普通流中的元素浮动之后，包含框内部由于不存在其他普通流元素了，也就表现出高度为0（高度塌陷）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度。

总结：

+ 当元素没有设置宽度值，而设置了浮动属性，元素的宽度随内容的宽度的变化而变化。
+ 当元素设置浮动属性后，会对相邻的元素产生影响，相邻元素特指紧邻后面的元素。
+ 当一个包含框中的元素全设置了浮动时，改包含框会出现“高度塌陷”现象。

推荐的清楚浮动的方法::after运用伪元素来实现

```
.clearfix{
	*zoom:1;
}
.clearfix::after{
	 content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```

+ display:block 使生成的元素以块级元素显示,占满剩余空间;
+ height:0 避免生成内容破坏原有布局的高度。
+ visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;
+ 通过 content:”.”生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，例如oocss里面就有经典的 content:”XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX”,有些版本可能content 里面内容为空,不推荐这样做的,firefox直到7.0 content:”” 仍然会产生额外的空隙；
+ zoom：1 触发IE hasLayout。
通过分析发现，除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，这也就是其他版本的闭合浮动为什么会有font-size：0，line-height：0。
