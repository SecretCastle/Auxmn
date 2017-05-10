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