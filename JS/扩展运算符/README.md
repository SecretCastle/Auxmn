# 扩展运算符

扩展运算符的使用和理解

## 数组的扩展

> 含义

扩展运算符（ spread ）是三个点（...）。将一个数组转为用逗号分隔的参数序列

eg

```javascript
console.log(...[1,2,3]) // 1 2 3
console.log(1,...[2,3,4],5) // 1 2 3 4 5

Function arrayConcat(array , ...items){
	array.push(...items);
}
```
> 函数的apply用法

函数中，如果要使用数组作为参数的话

```javascript
var args = [1,2,3,4]
var args2 = [5,6,7]

function compute(x,y,z,j){
	console.log(x+y+z+j);
}

//es5 
compute.apply(null,args); // 10

//es6
compute(...args) //10
```
> 实际应用

```javascript
//求数组中的最大值
//es5 
Math.max.apply(null,args) // 4

//es6
Math.max(...args) //4

//push 数组到一个数组尾部
Array.prototype.push.apply(args,args2); // args [1,2,3,4,5,6,7]
```
#### 扩展运算符使用

> 合并数组

```javascript
var args = [1,2,3]
var args2 = [4,5,6]
var newarg = [...args,...args2]
```
> 与解构赋值使用

```javascript
const [a,...b] = [1,2,3,4,5,7]
console.log(a,b) // 1 [2,3,4,5,7]
```
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

> 处理函数返回值

```javascript
funtion com(){
	return [1,2,3]
}
var comm = com()
console.log(...comm); // 1 2 3
```

> 字符串

```javascript
console.log(...'Hello'); // 'H' 'e' 'l' 'l' 'o'
console.log([...'Hello']) //['H','e','l','l','o']
```

> 实现了 Iterator 接口的对象

+ 对于实现了Iterator接口的对象，可以使用扩展运算符转化为真正的数组

	```
	var nodeList = document.querySelectorAll('div');
	var array = [...nodeList];
	```
	
+ 单数对于对象而言，就不能使用扩展运算符转化为数组

	```
	var obj = {
		'0': 1,
	   '1': 2,
	   '2': 3,
		length:3
	}
	
	let arr = [...obj] //error  TypeError: Cannot spread non-iterable object.
	```
	此时可以使用```Array.from()``` 来使对象转化为真正的数组
	
	```
	var obj = {
	  '0': 1,
	  '1': 2,
	  '2': 3,
	  length:3
	}
	let newa = Array.from(obj);
	console.log(newa);  //[1,2,3]
	```
	
	Tip: ```Array.from()``` 定义：```Array.from()```方法用于将两类对象转为真正的数组：**类似数组的对象（array-like object）** 和 **可遍历（iterable）的对象**

> Map 和 Set 结构，Generator 函数
	
## 扩展运算符在对象中的使用

In es2017

基本上和数组的扩展运算符使用相差无几

> 解构赋值

```javascript
Let {x,y,z} = {
	x:1,
	y:2,
	a:3,
	b:4
}

console.log(x,y,z)  // 1 2 {a:3 , b:4}

```

所以映射出React中参数的传递

```
class Welcome extend Component{
	render(){
		return(
			<div>{this.props.firstname}===>{this.props.lastname}</div>
		)
	}
}

class atom extend Component{
	render(){
		const data = {
			firstname:'chen',
			lastname:'haha'
		}
		return (
			<div className = "ccc" >
				<Welcome {...data}/>
			</div>
		)
	}
}

```

[参考阮老师的](http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符)


