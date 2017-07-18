# JavaScript

### 基础知识

> 三种状态

+ Pending(进行中)
+ Resolved(成功)
+ Rejected(失败)

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

```
	const p1 = new Promise(fn)
	function fn(resolve,reject){
		if(){ 
			resolve(). //success
		}
		if(){
			reject() //failed
		}
	}
```

> ``` Promise.prototype.then```

Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

```
fn().then(res=>{
	return fn()

}).then(res=>{
	//code
})

```

> Promise.resolve([obj]) 

将对象转化为promise实例

+ 1、参数为promise实例

```
const p2 = new Promise((resolve,reject)=>{
	resolve('haha')
})

const p3 = Promise.resolve(p2)

p2.then(res=>{
	console.log(res)
})

// "haha"
```

+ 2、参数为包含then方法的对象

Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。

```
const p1 = Promise.resolve({
	then:(resolve,reject){
		resolve('haha')
	}
})

p1.then(res=>{
	console.log(res)  //"haha"
})
```

+ 3、 参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有```then```方法的对象，则```Promise.resolve```方法返回一个新的Promise对象，状态为```Resolved```。

```
const p1 = Promise.resolve('haha')

p1.then(res=>{
	console.log(res) // "haha"
})
```

+ 4、不带任何参数

```Promise.resolve```方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

```
const p1 = Promise.resolve();

p1.then(function(){
	//code
	console.log('2')
})


console.log('1')

setTimeout(()=>{
	console.log('3')
},0)

//1
//2
//3
```

> Promise.reject()

```Promise.reject(reason)```方法也会返回一个新的 ```Promise``` 实例，该实例的状态为```rejected```。

```
const p1 = Promise.reject({
	then(resolve,reject){
			resolve('haha')
	}
})

p1.catch(err=>{
	console.log(err)
})

//输出
Object:{
	then(resolve,reject){
			resolve('haha')
	}
}
```

Promise.reject()返回的状态为rejected的Promise对象，会完全返回Promise.reject(...arg)中的参数

 >> 阮老师的话来说

注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。



### Promise附加的两个方法

一般在promise类库中用```done()```替代```then()```方法


### Promise 使用

> 1、Promise.all()

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

> 2、Promise.race()

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