# 函数的节流（throttle） and 函数去抖（debounce）

 > 函数去抖（在一段时间内连续触发的函数，只调用一次）

理解：当第一个事件进入时，设置定时器，当下一个事件进入时，清除定时器，并且重新设置定时器，以此类推，直到最后一个事件进入完成。

```js
function print(){
    console.log('hello world')
}
window.onscroll = print()

// => 连续的hello world
```

去抖的核心方法

```js 
function debounce(){
   var timer = null;
   return function(){
       clearTimeout(timer)
        timer = setTimeout(function(){
            print();
        },1000)
   }
}

function print(){
    console.log('hello world');
}

window.onscroll = debounce();

// => 当停止滚动时，过1000ms，输出hello world
```

> 函数节流 （在一段时间内，减少函数的调用频率，改为固定时间频率调用）

理解： 当第一个事件进入时，设置起始时间，并设置时间间隔，当第二个事件进入时，判断，如果这个事件的进入时间为时间间隔内，则不执行，直到超时，执行对应函数。如果不存在第二个事件，则等待。 