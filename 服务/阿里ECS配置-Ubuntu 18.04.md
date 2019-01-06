# 阿里云ECS node环境配置

* 系统镜像: Ubuntu 18.0.4 64位
* MacOS Mojave
* 配置:
    * CPU: 1核
    * 内存: 1 GB
    * 实例类型:  I/O优化

## 操作

>  链接远程服务器

右键terminal -> new Remote Connection ->  + server 输入ecs实例ip地址 -> user root -> connect

>  安装nodejs

* `sudo apt install nodejs`

>  安装npm 

* `sudo apt install npm`
* `npm install npm -g` 更新npm

>  安装Nginx 

* `sudo apt install nginx`


## 配置Nginx

>  修改nginx默认端口

`Nginx`默认端口是`80`， 所以在启动时，可能会和AliYundun的端口起冲突，所以可能需要修改，不然启动nginx会报端口号被占用的错

```
$ cd ../etc/nginx/site-enable/
$ cp default default_backup //备份修改的文件
$ vim default
```

修改port端口号，我修改为81

> 进入nginx配置目录

`$ cd ../etc/nginx/conf.d`
`$ vim nodejs-3389.conf` 根据个人喜好定义名称，我依据服务和对应的端口号组成文件名

```
upstream api{
    server 127.0.0.1:3389;
    keepalive 64;
}

server {
    listen 80; // nginx 监听80端口
        server_name 47.xxx.xxx.x www.xxx.com web.xxx.com; // 当访问这些端口号或域名时进入代理 |:
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_set_header Connection "";
                proxy_pass http://api; // :| 代理到api这个服务即 127.0.0.1:3389
        }

}
```

校验配置文件是否有错误`sudo nginx -t`

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

出现这些即表示测试成功，配置文件可用

>  Nginx相关命令

* `systemctl start nginx` 启动Nginx
* `systemctl status nginx` 查看Nginx状态
* `systemctl stop nginx`暂停Nginx
* `service reload nginx` 重启Nginx
* `netstat -lntp` 查看所有端口号
* `lsof -i:80` 模糊查询80相关端口
* `kill -9 进程号` 强制杀死进程











