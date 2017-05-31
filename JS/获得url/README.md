# 获取url里的参数对象

```
http://www.domain.com/?user=anonymous&id=123&id=456&id=888&city=%E5%8C%97%E4%BA%AC&d&enabled
```

思路

- 解码url（如参数重带中文，则为乱码）
- 分离http域名和所带参数
- 分离参数，获得数组
- 对新获得的数组进行遍历
- 新建返回空对象
- 为每一个键值对赋值
- 判断值的类型 string number boolean
- 判断对象中是否存在该键
	- 存在：则根据需求（如存入数组）。保存相同键的值为数组
	- 不存在：则保存键值对
- 返回数组

实现(字符串分割法)

```
var url = "http://www.domain.com/?user=anonymous&id=123&id=456&id=888&city=%E5%8C%97%E4%BA%AC&d&enabled";

function parseURL(str){
	var paramObj = {};
	//解码+分离域名和参数
	var paramArr = decodeURI(str).split('?');
	//分离参数+遍历
	paramArr[1].split('&').map(val=>{
		var KeyVal = val.split('=');
		var ObjKey = KeyVal[0];
		var ObjVal = KeyVal[1] || true; //当不存在值是，默认为true
		if(typeof ObjVal === 'string' && Number.isNaN(Number(ObjVal)) === false){
			ObjVal = Number(ObjVal);
		}
		
		if(typeof paramObj[ObjKey] ==== 'undefined'){
			paramObj[ObjKey] = ObjVal;
		}else{
			//相同键的值保存为数组,判断此时此键的值是否为数组
			var newArr = Array.isArray(paramObj[ObjKey]) ? paramObj[ObjKey] : [paramObj[ObjKey]];
			newArr.push(ObjVal);
			paramObj[ObjKey] = newArr;
		}
	});
	return paramObj;
} 

```

正则表达式方法

匹配```?```开始，忽略```"和／```,

```
function parseURL(str){
	var reg = /\?[^"/]+/
	var result = reg.exec(str);
	paramStr = decodeURI(result[0].slice(1));
	
	//....
}
```

## BUT

某些现代浏览器支持URLSearchParams可以直接使用此接口

```
var url = "http://www.domain.com/?user=anonymous&id=123&id=456&id=888&city=%E5%8C%97%E4%BA%AC&d&enabled";

function parseURL(str){
	var searchParamObj = new URLSearchParams(str.split('?')[1]);

	var paramObj = {};
	for(var item of searchParamObj.entries()){
		var key = item[0];
		var value = item[1] || true;
		if(typeof value === 'string' && Number.isNaN(Number(value)) === false){
			value = Number(value);
		}
		if(typeof paramObj[key] === 'undefined'){
			paramObj[key] = value;
		}else{
			var newArr = Array.isArray(paramObj[key]) ? paramObj[key]: [paramObj[key]];
			newArr.push(value);
			paramObj[key] = newArr;
		}
		
	}
	return paramObj;
}
```
(还是要更具业务需求来写)


学习来源[参考](https://juejin.im/post/592e08fc0ce463006b4a5df3?utm_source=gold_browser_extension)