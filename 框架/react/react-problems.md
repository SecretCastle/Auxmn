# React Problems In FogCloud V3 Development

> **React Hot Loader: this component is not accepted by Hot Loader**

React-Hot-Loader貌似只能消化以顶级变量为命名的组件。
So yes - it is **absolutely** impossible to use functional composition and React Hot Loader. All temporal variables, steps, spare parts must be separated."
```js
class AppComp extends React.Component {
    render(){
        return(
            <div>Hello World</div>
        )
    }
}

const App = connect(
    xxx
    xxx
)(AppComp)

export default App;
```
[具体参考github上的说明](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#react-hot-loader-this-component-is-not-accepted-by-hot-loader)
