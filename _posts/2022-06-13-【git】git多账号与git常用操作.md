---
layout: post
title: git多账号与git常用操作
categories: 
tags: [git]
---

### 多账户配置
当有多个git账号时，比如：

a. 一个gitee，用于公司内部的工作开发；
b. 一个github，用于自己进行一些开发活动；

需要在电脑上配置多个git账号

配置步骤：
1. 生成github的ssh-key
   ```sh
   $ ssh-keygen -t rsa -C 'xxxxx@qq.com' -f ~/.ssh/github_id_rsa
   ```
2. 生成gitee的ssh-key
   ```
   $ ssh-keygen -t rsa -C 'xxxxx@company.com' -f ~/.ssh/gitee_id_rsa
   ```
3. 在 ~/.ssh 目录下新建一个config文件，添加如下内容（其中Host和HostName填写git服务器的域名，IdentityFile指定私钥的路径）
   ```sh
   # gitee
   Host gitee.com
   HostName gitee.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/gitee_id_rsa
   # github
   Host github.com
   HostName github.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/github_id_rsa
   ```
4. 将生成的gitee_id_rsa.pub和github_id_rsa.pub中的公钥分别添加到gitee和github中
5. 分别执行如下命令，测试是否连通
   ```
   $ ssh -T git@gitee.com
   $ ssh -T git@github.com
   ```

参见：[Git配置多个SSH-Key](https://gitee.com/help/articles/4229#article-header0)

### 常用git操作（亲测有效）
```git branch```  - 查看本地仓库的所有分支  
```git branch -a``` - 查看本地和远程仓库的所有分支  
```git branch -d [branchName]```  - 删除本地仓库的指定分支（branchName是分支名）  
```git push origin --delete [branchName]``` - 删除远程仓库的指定分支  
```git remote -v``` - 查看远程仓库的地址  
```git branch --list``` - 查看本地仓库的所有分支  