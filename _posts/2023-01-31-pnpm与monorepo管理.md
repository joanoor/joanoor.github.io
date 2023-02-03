---
layout: post
title: pnpm与monorepo管理
categories: 
tags: []
---

### 什么是pnpm

pnpm 是新一代的包管理工具，号称是最先进的包管理器。可以实现节约磁盘空间并提升安装速度和创建非扁平化的 node_modules 文件夹两大目标。

| 含义                                                 | pnpm命令                           |
| ---------------------------------------------------- | ---------------------------------- |
| 安装项目所有依赖                                     | pnpm [install, i]                  |
| 安装到dependencies                                   | pnpm add [package]                 |
| 安装到devDependencies                                | pnpm add -D [package]              |
| 安装全局包                                           | pnpm add -g [package]              |
| 遵循 package.json 指定的范围更新所有的依赖项         | pnpm [up, upgrade]                 |
| 更新所有依赖项，此操作会忽略 package.json 指定的范围 | pnpm [up, upgrade] --latest        |
| 移除某个包                                           | pnpm [rm, uninstall, un] [package] |

参见：[pnpm 解决我哪些痛点？](https://juejin.cn/post/7036319707590295565)

### 什么是monorepo
参见：[5分钟搞懂Monorepo](https://www.jianshu.com/p/c10d0b8c5581)
