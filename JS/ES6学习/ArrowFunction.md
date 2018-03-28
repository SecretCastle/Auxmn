# What Is Arrow Function

```
x => x ** x
```

**Key Point** `this`

箭头函数没有它自己的this值

箭头函数内部的this是词法作用域，由上下文确定。

> “箭头函数”的this，总是指向定义时所在的对象，而不是运行时所在的对象。