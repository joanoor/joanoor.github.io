---
layout: post
title: angular项目安装tailwind css
categories: 前端
tags: [前端]
---

### 安装步骤
1. ```npm install -D tailwindcss``` 安装tailwindcss依赖
2. ```npx tailwindcss init``` 生成tailwind.config.js配置文件
3. 在全局样式类中引入tailwindcss样式
   ```
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
   ```

### 附录
[https://hsuchihting.github.io/TailwindCSS/20210702/3640682418/](https://hsuchihting.github.io/TailwindCSS/20210702/3640682418/)