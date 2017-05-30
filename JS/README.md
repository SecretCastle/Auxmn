# JavaScript

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