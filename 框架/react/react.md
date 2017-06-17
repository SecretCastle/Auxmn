# React

## 生命周期

#### react 的生命周期



#### 事件

正常的jsx语法如下

```

class Foo extends React.Component{
    constructor(props){
        super(props);

        //初始化局部状态
        this.state = {isLogin:false};
    }

    //属性初始化语法,用于this的指向 
    doSth = () =>{
        console.log(`this is ${this}`);  //Foo
    }


    render(){
        return (
            <button onClick="this.doSth"></button>

        )
    }
}

```

官方文档推荐在自定义事件时使用```属性初始化语法```


#### 条件渲染

正常情况下

```

class Foo extends React.Component{
    constructor(props){
        super(props);

        //初始化局部状态
        this.state = {isLogin:false};
    }

    //属性初始化语法,用于this的指向 
    doSth = () =>{
        console.log(`this is ${this}`);  //Foo
        if(this.state.isLogin){
            this.setState({isLogin:false});
        }else{
            this.setState({isLogin:true});
        }
    }


    render(){
        //这里使用元素变量来存储组件(这里拿div替代)
        let msg = null;
        if(this.state.isLogin){
            //true
            msg = <div>This is true</div>
        }else{
            //false
            msg = <div>This is false</div>
        }

        return (
            <div>
                 <button onClick="this.doSth"></button>
                 {msg}
            </div>
           

        )
    }
}

```

同样相同的效果，还有 与运算符 以及 三元表达式


组织条件渲染的方法

思路=>组件中,让render返回的是null即可

```
function Comp1 (props){
    if(!props.warn){
        return null
    }

    return (
        <div>This is Show</div>
    )

}

//只要在事件中改变warn的值，并且传递给Comp1即可

//code later
......

```


#### 列表&Keys

正常情况使用```map()```函数来遍历一个数组


```

    //eg

    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById('root')
    );

```

Keys

Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

