---
layout: post
title: 使用TypeScript开发node应用
categories: 
tags: []
---

## 环境搭建
步骤：
1. ```npm init -y``` // 初始化一个项目
2. ```npm i -D typescript @types/node``` // 安装Typescript和nodejs的types
3. ```npm i -D eslint```  // 安装Eslint
4. ```npm i -D prettier eslint-config-prettier eslint-plugin-prettier```
5. ```$ npx eslint --init```  // 初始化.eslintrc.yml（这一步中可以选择使用typesciprt，这样会下载@typescript-eslint/eslint-plugin，@typescript-eslint/parser这两个依赖，如果框架选择vue，还会多下载eslint-plugin-vue这个依赖）
6. ```$ npm i -D nodemon ts-node```
7. 添加package.json中的scripts中的命令```nodemon -e ts --exec ts-node src/index.ts```

package.json中的配置：
```json
{
  "name": "nodeStudy",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon -e ts --exec ts-node src/index.ts"
  },
  "keywords": [],
  "author": "ems <joanoor@outlook.com>",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^18.7.16",
    "@typescript-eslint/eslint-plugin": "^5.36.2",
    "@typescript-eslint/parser": "^5.36.2",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.2"
  }
}
```