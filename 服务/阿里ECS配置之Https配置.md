# 阿里ECS配置之Https配置

通常情况下，api都需要开通https支持，防止遭遇黑客

>  申请SSL证书

* 阿里云

购买SSL证书

>   上传证书

* scp 文件名 用户名@服务器ip:目标路径

`scp /Users/xiao/Documents/Image/favicon.ico root@192.168.191.32:~` 上传某个文件到远程服务器


* 解压文件

`sudo apt install unar`

`unar file.zip`

中文乱码使用
`unar -e   GB18030 file.zip`

>  配置`nginx.conf`

增加主配置于`nginx.conf` 
* 监听80端口
* servername 为一级域名

```js
server {
        listen       80;
        server_name ineet.cn;
        rewrite ^(.*) https://$host$1 permanent;
}

# include site-enable/*
```

>  配置https

`$ cd conf.d`
`$ vim xxx.conf`


这里配置二级域名

```js
server {
        listen 443; // 监听https端口
        server_name me.ineet.cn; // 访问的二级域名
        ssl on;
        ssl_certificate cert/me.ineet.cn.pem; // 证书
        ssl_certificate_key cert/me.ineet.cn.key; //证书
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; // 通过服务商获得的解密密钥
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_set_header Connection "";
                proxy_pass http://127.0.0.1:3389; // 被代理的服务
        }
}
```

可更具需求，配置不同的`xxx.conf`文件，添加证书，即可访问https 