#  TypeScript

> 注意事项

* `tsconfig.json` 

webpack.config.js
```js
...
resolve: {
    alias: {
        "@src": path.resolve(__dirname, '../xx/xx')
    }
}
...
```

tsconfig.json
```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@src": ["/src"]
        }
    }
}
```

不要单独使用`@`符号作为别名，很容易报错`[ts]2307`
