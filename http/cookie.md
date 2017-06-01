# Http协议

### Cookie工作原理

定义：一个Cookies是web服务器存放在用户硬盘的一段文本，Cookies允许一个wen站点在用户的机器存放一些文本的信息，并可以在以后重新获取它。这个基于文本的信息存储着一些“键－值”对。   

![原理图](https://lh3.googleusercontent.com/U5ktna260Zjln3t04F_DWUweIP7IP-ak8KIzPUleXQbOGs1mrRWYLQ5RQRiNxr_zokqvkech_5i_CnCA8EUHoJX8q93tmdq9KOSwwIiYxUoxOVF8Ze-X4OjmWGrMKkn24QY9fdij3vi_ck0He1u8vacFF2bpi2BxY9JeMmepTR73_AOFNbbx5WdO0j5d2kJBtPCU9K5sL2o12ALnxWsMbVfj4tcoeH1CbcecCikAeIgMx4BGR-jjARd6lmx2mQG6qMd_97KElGYXAz6jkt0JLrSIsPicZguLU0ArwjqUtQuBBuC9RUjTkocJgt6B_vROAZUrwXeMCEvwY2lFJuxruvQmtaKOOw6K2kZrlyM5dESZQHTtZRYEPWVfoa-92_ZkYJ834xQjiHl7MoUWScuvtnK3GdqPePFXMnQmoFjqEsmGKPC09VQdAvvC1IIO_jXFbH4O4REO3_aka32IwD4YEZUOv2-JEB4XYtiCvECEh14HgUMhrEAXxcYgklwGSraychwyUypcsJZWmYYW8yth7GTtVNj19Q4JERty5Xqwf6xGRpeLDl_BzKDITHXIWVWBtM7_iIdXWl5tz8xPIESJUc_CaoniuIVBIG4JgQXdoeNj_pwrL3Ec-R6m-FBOfY5yLqCLrI8YHdbpZcuCDKg6fqpBub0MnvliH0Ympyiu=w1149-h1046-no)

#### 原理说明：
- 当用户登录的时候，浏览器会向服务器发送请求，如http://login.xxx.com
- 当浏览器发送请求，服务端会处理相关信息，返回请求数据的同时会创建一个唯一标示的userid的cookie，发送给浏览器，cookie就会保存在硬盘中，此时就存在了cookie
- 当用户下一次访问，浏览器发送请求时，会查找和域名相关的cookie，如果存在和域名相关的cookie，会一同和请求发送给服务器；如果不存在，则不发送cookie
- 服务器收到了cookie的键-值对，会对cookie作出校验，如果存在userID，则表示必有一次登陆过，则不用登录直接访问。否则如果判断失败，则跳转到登录界面
- web服务器可以在你访问站点时，随时的更改“键－值”对或者加入一个新的“键－值”对。  
- 同“键－值”对发送到客户端的还有同这个“键－值”对相关的一些其它信息，其中之一就是Cookie有效期，另一个就是路径（为了在同一个站点的不通部分关联不同的Cookie）。  

 **你能够控制这个过程，你可以在你的浏览器中设置当web站点向你的机器发送Cookie时你是接受还是拒绝。**

#### 优缺点
- 站点能够精确的知道有多少访问者在实际的访问站点，它能排除哪些因为代理服务器，缓冲器，集中器等等带来的干扰，正确统计站点访问数的唯一方法是为每一个 来访者设置一个唯一的ID，并存在Cookie中，用Cookie，站点能够：  
- 决定有多少访问者到达。  
- 决定多少新的访客，多少是再次造访者。  
- 确定一个访问者访问的频度

缺点：

- 不同机器同一用户访问，服务器会当不同的用户来处理
- 如果浏览器出现问题，将丢掉你的所有的Cookies文件。当你再次访问某个站点时，站点将会想你是个新的用户并给你一个新的user   ID，你以前在这个站点设置的一些个性设置也将不在存在。  （当然，如果保存在数据库中的画，会规避这个现象）
- 公共场所，不同人使用，会造成隐藏的安全问题。

[参考](http://www.cnblogs.com/joeliu/archive/2008/01/10/1033232.html)
