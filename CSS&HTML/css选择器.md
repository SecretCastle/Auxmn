# css选择器

### 基础选择器
> 元素选择器

```css
span{
	font-size: 14px;
	color: #f00;
}
```

```html
<span>Hello World(红色)</span>
```

> 类选择器 

```css
.d1{
	font-size: 14px;
	color: #f00;
}
```

```html
<div class="d1">Hello World(红色)</div>
```

> ID选择器

```css
#d1{
	font-size: 14px;
	color: #f00;
}
```

```html
<div id="d1">Hello World(红色)</div>
```

> 通配符选择器 (性能最低的选择器)

```css

```

```html
```


> 属性选择器

- `[attr]` 匹配包含属性的元素
	
	```css
	div[title] {
		font-size: 14px;
		color: #f00;
	}
	```
	
	```html
	<div title="haha">Hello World(红色)</div>
	```

- `[attr=value]` 匹配属性为value的元素

	```css
	div[class="haha"]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	
	```html
	<div class="haha">Hello World(红色)</div>
	```

- `[attr~=value]` 匹配属性中至少包含value的元素

	```css
	div[class~="haha"]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	
	```html
	<div class="haha gege">Hello World(红色)</div>
	```

- `[attr|=value]` 匹配属性为value或者为value-为开头的元素

	```css
	div[class|="haha"]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	```html
	<div class="haha-yes gege">Hello World(红色)</div>
	<div class="haha">Hello World(红色)</div>
	```

- `[attr^=value]` 匹配属性为value为开头的元素

	```css
	div[class^="haha"]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	
	```html
	<div class="haha gege">Hello World(红色)</div>
	```

- `[attr$=value]` 匹配属性为value，且以value为结尾的元素

	```css
	div[class$="gege"]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	```html
	<div class="haha gege">Hello World(红色)</div>
	```
	
- `[attr*=value]` 匹配属性为value，并且值包含value的元素

	```css
	div[class*="gege"]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	```html
	<div class="haha gege">Hello World(红色)</div>
	```

- `[attr operator value i]` 在带有属性值的属性选型选择器表达式的右括号（]括号）前添加用空格间隔开的字母i（或I）可以忽略属性值的大小写（ASCII字符范围内的字母）

	```css
	div[class="jj" i]{
	  font-size: 14px;
	  color: #f00;
	}
	```
	
	```html
	<div class="JJ">Hello World(红色)</div>
	```


### 进阶选择器

> 相邻兄弟选择器 

匹配紧跟其前方元素的同胞元素.

```
前方元素 + 目标元素 {样式声明 }
```
```css
li + li {
	font-size: 14px;
	color: yellow;
}
```
```html
<li>1</li>
<li>2</li> 	//yellow
<li>3</li>	//yellow
```
 
> 通用兄弟选择器 

在使用 ~ 连接两个元素时,它会匹配第二个元素,条件是它必须跟(不一定是紧跟)在第一个元素之后,且他们都有一个共同的父元素

```css
p ~ span{
  color : yellow;
}
```
```html
<div>
	<span>no color</span>
	<p>haha</p>
	<span>has color</span> //yellow
</div>
```

> 子选择器 ( > )

当使用 `>` 选择符分隔两个元素时,它只会匹配那些作为第一个元素的直接后代(子元素)的第二元素.

```css
p > span{
  color : yellow;
}
```
```html
<div>
	<span>no color</span>
	<p>haha<span>has color</span></p>
</div>
```

> 后代选择器

它表示匹配存在的所有由第一个元素作为祖先元素(但不一定是父元素)的第二个元素, 无论它在 DOM 中"跳跃" 多少次

```css
p span {
	color : yellow;
}
```

```html
<div>
	<span>no color</span>
	<p>haha<span>has color</span></p>
</div>
```

### 伪类

`nth-child(n)`和`nth-of-type`

[参考](https://juejin.im/post/59bce23c51882519777c5eb5)
