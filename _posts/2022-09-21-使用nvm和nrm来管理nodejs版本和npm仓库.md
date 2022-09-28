---
layout: post
title: 使用nvm和nrm来管理nodejs版本和npm仓库
categories: 
tags: []
---

## 简介
由于项目可能有多个版本nodejs的需求，可以使用nvm来进行nodejs版本切换

## 系统环境
Ubuntu20.04

Windows版本的可以直接[下载](https://github.com/coreybutler/nvm-windows)使用即可（暂未发现问题）

## 步骤
由于众所周知的原因，域名污染。导致linux下安装nvm和使用nvm下载node的速度太慢了

1. 使用 [ipaddress](https://www.ipaddress.com) 网站，来获取如下域名的真实ip
   ```
   185.199.108.133 raw.githubusercontent.com
   104.20.22.46    nodejs.org
   104.16.16.35    npmjs.org
   ```
2. 将上面的地址写入/etc/hosts中
3. 按照[官方](https://github.com/nvm-sh/nvm)的方法，下载安装nvm
4. 终端执行 ```nvm ls-remote``` 获取可以安装的node版本，然后下载安装nodejs
5. 当网络报错的时候，请重新到[ipaddress](https://www.ipaddress.com)上获取最新的真实ip


## 注意
还有一种方法是说修改~/.nvm/nvm.sh中的NVM_NODEJS_ORG_MIRROR为阿里镜像https://npmmirror.com/mirrors/node/ ，但是这样有一个问题，就是下载node之后，安装npm会报错。所以还是采用上面的步骤，亲测可用