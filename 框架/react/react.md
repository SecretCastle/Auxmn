# React

## 生命周期

#### react 的生命周期

##### 实例化

- ```getDefaultProps ```    	
	
	组件类型首次实例化时初始化默认props属性，多实例共享
	
- ```getInitialState ```    	
	
	实例化时初始化默认state属性
	
- ```componentWillMount ``` 	
	
	在渲染之前触发一次
	
- ```render ```					
	
	渲染函数，返回DOM结构
	
- ```componentDidMount ``` 	
	
	在渲染之后触发一次

##### 有需要重新渲染（props变更或者setState改变state时）

- ```componentWillReceiveProps ```	
	
	组件接收到新的props时调用，并将其作为参数nextProps使用，可在此更改组件state
	
- ```shouldComponentUpdate ```
	
	判断是否需要更新组件（在首次渲染期间或者调用了forceUpdate方法后，该方法不会被调用）
	
- ```componentWillUpdate```
	
	更新渲染前调用
	
- ```render ```
	
	渲染函数，返回DOM结构
	
- ```componentDidUpdate```
	
	更新渲染后调用


##### 销毁

- ```componentWillUnmount ```
	
	组件移除之前调用

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

