# 闭包

定义：闭包可以理解为获得另一个函数的内的局部变量、函数、对象等的方法。

写法就是外层函数返回其内层函数

```JS
function getName(){
	let name = "Chen"
	return function(){
		return name
	}
}
console.log(getName()()) // Chen
```
解析下，相当于

```
getName() === function(){
	return "Chen"
}
getName()() === function(){ return "Chen" }() === "chen"
```

## 例子（我所理解的场景）

1、可以私有化函数方法，保护私有变量

```JS
;(function(){
	let name = "chen"
	var DA = {
		getName:function(){
			return name
		}
	}
	window.DA = DA  //抛出一个可以全局引用的DA对象 
})()

console.log(name) //undefined
console.log(DA.getName()) //chen
```

2、创建公共函数方法

> 计算器

```JS
function calculator(x){
	return function (y){
		return x + y
	}
}

var c1 = calculator(5)
var c2 = calculator(6)

console.log(c1(1),c2(7))  // 6 , 13
```
> 改变字体大小,闭包返回的是一个公共函数

```html
<a href="javascript:void(0)" id="set12">12</a>
<a href="javascript:void(0)" id="set14">14</a>
<a href="javascript:void(0)" id="set16">16</a>
<div id="content">
    <p>Hello World</p>
</div>
```

```JS
function setSize(size) {
    return function() {
        document.getElementById('content').style.fontSize = size + "px"
    }
}

var set12 = setSize(12)
var set18 = setSize(18)
var set32 = setSize(32)

document.getElementById('set12').onclick = set12
document.getElementById('set14').onclick = set18;
document.getElementById('set16').onclick = set32;
```



