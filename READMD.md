# 杂章&收集集合

## css

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