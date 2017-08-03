# 构造函数

构造函数用于创建特定类型的对象——不仅声明了使用的对象，构造函数还可以接受参数以便第一次创建对象的时候设置对象的成员值。你可以自定义自己的构造函数，然后在里面声明自定义类型对象的属性或方法。

### 基本用法

```
function Person(name,age){
	this.name = name
	this.age = age
	this.sayHello = function(){
		return 'Hello' + this.name + 'Your Age Is' + this.age
	}
}

var p1 = new Person('cj',25) 
console.log(p1) // 'Hello cj Your Age Is 25'
```

但是上面的方法创建的构造函数在每次实例话对象时都会重新定义一个`sayHello`的函数，最好的方法是让所有`Person`的实例对`sayHello`函数共享

### 构造函数和原型
JavaScript里函数有个原型属性叫prototype，当调用构造函数创建对象的时候，所有该构造函数原型的属性在新创建对象上都可用。按照这样，多个Person对象实例可以共享同一个原型，

```
function Person(name,age){
	this.name = name
	this.age = age
}

Person.prototype.sayHello = function(){
	return 'Hello' + this.name + 'Your Age Is' + this.age
}

var p1 = new Person('cj',25) 
console.log(p1) // 'Hello cj Your Age Is 25'
```

### 实例化对象的方法, 只有`new`?

> Method One

```
function Person(name, age) {
    if (!(this instanceof Person)) {
        return new Person(name, age)
    }
    this.name = name
    this.age = age
}

Person.prototype.sayHello = function() {
    return 'Hello ' + this.name + ' Your Age Is ' + this.age
}

var a = Person('cj', 25)
console.log(a.sayHello())
```

这里强制`new`



