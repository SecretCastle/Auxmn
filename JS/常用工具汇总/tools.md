# 常用工具方法汇总

> 排序

* 方法一
```js
Array.propertype.sort()
```
针对数字，英文，碰到中文就很尴尬了

* 方法二  中文

```js
Array.propertype.sort(function(a,b){
   return a.localeCompare(b,'zh-Hans-CN', {sensitivity: 'accent'})
})

function sortRebuild(arr,orderby){
    arr.sort((a,b) => {
      if(orderby === 'asc'){
        //顺序
        return a.localeCompare(b,'zh-Hans-CN', {sensitivity: 'accent'})
      }else{
        //desc
        //倒序  
        return b.localeCompare(a,'zh-Hans-CN', {sensitivity: 'accent'})
      }
    })
    return arr
  }
```

其中 *tag*`zh-Hans-CN`在[这里](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)查询.

> 去重 **Learn From [Here](https://github.com/hanzichi/underscore-analysis/issues/9)**

* Method One

```js
function unique(arr){
    let res = [];
    for(var i = 0 , len = arr.length; i < len ; i++){
        let item = arr[i];
        for(var j = 0 , jlen = res.length; j < jlen; j++){
            if(res[j] === item){
                break;
            }     
        }        
        if(j = jlen){
             res.push(item);
        }
    }    
    return res;
}
```
or  `indexOf`
```js
function unique(arr) {
    let res = [];
    for(var i = 0 , len = arr.length; i < len ; i++){
        let item = arr[i];
        if(res.indexOf(item) === -1){
            res.push(item)
        }
    }
    return res;
}
```
or `indexOf` & `filter`

```js
function unique(arr){
    return arr.filter((ele,index,array) => {
        return array.indexOf(ele) === index
    })
}
```

* Method Two (notice)

Object key 方法 , 对于由纯`Number`类型的数组来说，适用

```js 
function unique(arr){
    let store = {};
    return arr.filter((ele,index,array) => {
        return store.hasOwnProperty(typeof(ele) + ele)  ?  false : (store[typeof(ele) + ele] = !0 )
    });
}
```
* Method Three

```js
function unique(arr){
    return arr.concat().sort().fitler( (ele, index, array) => {
        return !index || ele !== array [index - 1]   
    } );
}
```

* Method Four （notice）

```js
function unique(arr){
    return Array.from(new Set(arr));
}
```

> 判断基本类型 **Learn From [Here](https://github.com/hanzichi/underscore-analysis/issues/9)**

```js
window.newTool = {}

checkType = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'];

checkType.forEach(element => {
    return newTool['is'+element] = function(obj){
      return Object.prototype.toString.call(obj) === '[object '+element+']';
    }
});

console.log(newTool.isNumber(1)) // => true
```


