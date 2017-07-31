# 原型和原型链

## prototype(原型)

> each function has two properties: ***length*** and ***prototype***

```
var a = {}
console.log(a.prototype) //undefined
var fn = new function (){}
console.log(fn.prototype) // {}
```

```prototype```是```function```定义时自带的属性


```prototype```和```length```是每一个函数类型自带的两个属性，而其它非函数类型并没有，这一点之所以比较容易被忽略或误解，是因为所有类型的构造函数本身也是函数，所以它们自带了```prototype```属性

> 理解

```prototype```和```length``` 是函数类型的自带的属性，它们只会存在于函数的属性中，对于```Object``` ```String``` ```Number```等等来说，因为它们本质也是构造函数，所以也会存在```prototype```属性，但是对于通过这些构造函数实例话来的对象的话，就只存在```__proto```这个对象内置的属性了

## ```__proto__```

除了```prototype```属性之外，所有的对象都存在一个内置的属性```[[prototype]]```,一般在chrom等浏览器中表现为```__protot__```,这个```__proto__```属性指向的是他的父类的```prototype```

对象的```__proto__```如何指向构造函数的```prototype```

```
function Person() {}
Person.prototype.name = 'cj'
Person.prototype.age = 20
var p1 = new Person()
console.log(p1.name + '------' + p1.age);
console.log(Person.prototype.constructor === Person); // true
console.log(p1.__proto__ === Person.prototype); //true
```
正因为`__proto__`属性和父类的`prototype`属性的关联，所以才实现了继承的功能。

## prototype chain(原型链)

其实说白了，原型链就是每一个对象的`__proto__`属性逆流而上，寻找父类的`prototype`,最终指向 `null`

[参考链接](http://blog.rainy.im/2015/07/20/prototype-chain-in-js/)

[这也是一个很有趣的博客](http://baurine.github.io/2017/07/30/js_prototype.html)