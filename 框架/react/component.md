# 组件

[学习自](https://juejin.im/post/5b07caf16fb9a07aa83f2977)

##  无状态组件

组件中不包含`state`的纯组件，目的是单纯的展示UI

```js
import * as React from 'react';

// 定义Props类型
type Props = {
    onClick(e: React.MouseEvent<HTMLElement>): void,
    children?: React.ReactNode
};

export default class Button extends React.Componet<Props, object> {
    render() {
        const { onClick } = this.props;
        return(
            <button onClick={onClick}>{chidlren ? chidren : 'click me'}</button>
        )
    }
}

```
**使用**

调用`Button`组件，通过props传递`onClick`事件达到绑定事件
```js
import * as React from 'react';
import Button from 'xxx/xxx';

export default App extends React.Component {
    private onClick = () => {
        // code here
    }
    render() {
        return (
            <React.Fragment>
                 <Button onClick={onClick}>Hi, Click Me</Button>
            </React.Fragment>
        )
    }
}
```
## 有状态组件

组件中包含`state`, 更具state的变化，组件重新渲染

```js
import * as React from 'react';

const initialState = { clickCount: 0 };

// 通过typescript来推断State的类型
// 设置Readonly的作用： 
// React中状态的改变需要通过this.setState来改变，这样设置的原因，如果使用 this.state.clickCount = 10等这样的赋值，ts会立即报错。
type State = Readonly<typeof initialState>;


// 状态改变，通过提取纯函数来实现，使用了Typescript中的只读属性，这样就可以防止函数做一些更改状态的操作
// 如 clickCount: prevState.clickCount--
// 报错 [ts] Cannot assign to 'clicksCount' because it is a constant or a read-only property
const decrementState = (prevState: State) => {
    return {
        clickCount: prevState.clickCount - 1
    }
}

export default class ButtonStateComponent extends React.Component<object, State> {
    // class类中，也要设置readonly属性
    readonly state: State = initialState;
    private increment = () => {
        this.setState({
            clickCount: this.state.clickCount + 1
        });
    }
    private decrement = () => {
        this.setState(decrementState);
    }
    render() {
        return (
            <React.Fragment>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                点击次数{this.state.clickCount}次
            </React.Fragment>
            
        )    
    }
}
```

使用

```js
import * as React from 'react';
import ButtonStateComponent from 'xxx/xxx';

export default class App extends React.Component {
    render() {
        return {
            <ButtonStateComponent />
        }
    }
}
```

## 组件的默认属性

泛型没看懂 😔


## render