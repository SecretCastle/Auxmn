# MacOS 安装 Mysql


>   第一步

```
brew install mysql
```

>  启动Mysql

`mysql.server start` | `sudo mysql.server start`


>  使用mysql配置脚本

命令 : `/usr/local/opt/mysql/bin/mysql_secure_installation`  || `mysql_secure_installation`

```
Securing the MySQL server deployment.

Enter password for user root: 
The 'validate_password' component is installed on the server.
The subsequent steps will run with the existing configuration
of the component.
Using existing password for root.

Estimated strength of the password: 100 
Change the password for root ? ((Press y|Y for Yes, any other key for No) : y

New password: 

Re-enter new password: 

Estimated strength of the password: 50 
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : y // 删除匿名用户
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y  // 禁止远程连接
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y // 删除测试数据库
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y // 重新加载权限表
Success.

All done! 

```


>  当手残点击安装`validate_password`插件并且设置了校验政策 为高等级 

修改等级

```mysql
mysql > SHOW VARIABLES LIKE 'validate_password%';

+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password_check_user_name    | OFF    |
| validate_password_dictionary_file    |        |
| validate_password_length             | 8      |
| validate_password_mixed_case_count   | 1      |
| validate_password_number_count       | 1      |
| validate_password_policy             | MEDIUM |
| validate_password_special_char_count | 1      |
+--------------------------------------+--------+
7 rows in set (0.06 sec)
```

```mysql
> mysql SET GLOBAL validate_password_policy=LOW;
```

重新执行一遍[使用mysql配置脚本](## 使用mysql配置脚本) 配置root密码即可


>  修改配置文件

brew安装的配置文件默认于 `/usr/local/ect/my.cnf`


>  常用命令

启动mysql  `sudo /usr/local/mysql/support-files/mysql.server start`
停止mysql  `sudo /usr/local/mysql/support-files/mysql.server stop`
重启mysql `sudo /usr/local/mysql/support-files/mysql.server restart`

