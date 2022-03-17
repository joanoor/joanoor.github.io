---
layout: post
title: 问题汇集
categories: 前端
tags: [前端]
---

### 使用Vue ts开发项目，添加storybook添加组件可视化
步骤：  
1. ```vue create demo``` // 初始化一个vue项目，2.0版本，带ts支持，开启eslint+prettier
2. 在根目录下添加.prettierrc.yml配置
3. ```npm i -D sb```  // 安装storybook
4. ```npx sb init```  // 初始化storybook配置
5. 执行完上面步骤之后，会在根目录下发现```.storybook```这个文件夹，关于storybook的配置都在这里。详见：[config](https://storybook.js.org/docs/vue/configure/overview)
6. 在使用tsx开发组件的时候，在storires.tsx中引入组件tsx会报错，说ts-loader有问题，
   ```
   // 使用console.log(config.module.rules)查看storybook默认webpack配置的rules，发现tsx规则是数组第5个元素
   // 添加webpackFinal配置（对于tsx，除了ts-loader之外，还要增加babel-loader）
   webpackFinal: async config => {
    config.module.rules[5].use.splice(0, 0, {
      loader: 'babel-loader',
    })
    return config
  },
   ```