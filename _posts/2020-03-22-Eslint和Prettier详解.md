---
layout: post
title: Eslint和Prettier详解
categories: 前端
tags: [前端]
---

### eslint中的plugins和extends的区别
eslint的规则可以通过rules字段进行配置，但是不同场景、不同规范下有些定制的eslint检查需求，eslint默认提供的可选规则中如果没有，这时需要下载安装插件plugins。

plugin插件主要是为eslint新增一些检查规则，举个例子：例如eslint-plugin-react就是对react项目做了一些定制的eslint规则。  
如何使用插件？
1、通过npm安装插件
2、插件装好，只是说明eslint具备了这个能力，但是还没用出来，必须要在rules字段进行一条一条规则的配置，才能体现出这个能力

很明显，plugin极大的扩展了eslint的能力，但是一条条添加规则很不方便，所以需要用到extends。extends可以看做是集成一个个配置方案的最佳实践。。可以把extends理解为集成eslint了风格或者eslint插件的最佳实践，它配置的内容实际就是一份份别人配置好的.eslintrc.js。 

以上述的eslint-plugin-react为例，它实现了几十种配置规则，为了方便其他人使用，它默认实现了两种最佳实践all以及recommened（在configs中可以看到具体的名称，一般拥有eslint-config-***的文件表示配置）

原先还需要自己一条条选择，现在就可以直接把官方配置好的最佳实践直接拿来用。如果碰到和自己风格或者规范有冲突的规则，那直接在rules中重新定义就可以了，毕竟冲突的规则往往都没有多少

参见：  
1、[Eslint中plugins和extends的区别](https://juejin.cn/post/6859291468138774535)  
2、[搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300)
3、[不以规矩，不能成方圆-彻底搞懂 ESLint 和 Prettier](https://juejin.cn/post/6909788084666105864)

### 附录（配置文件内容）
普通项目配置文件内容：  
1、 .prettierrc.yml的配置：
```yml
semi: false
singleQuote: true
trailingComma: "es5"
endOfLine: "auto"
bracketSpacing: true
bracketSameLine: false
arrowParens: "avoid"
htmlWhitespaceSensitivity: "ignore"
```
2、.eslintrc.yml的配置：
```yml
env:
  browser: true
  es2021: true
extends:
  - 'plugin:@typescript-eslint/recommended'
  - 'plugin:prettier/recommended'
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaVersion: 13
  sourceType: module
plugins:
  - '@typescript-eslint'
```
3、.eslintignore的配置：
```
test/**
lib/**
types/**
node_modules
dist
```
4、.editorconfig的配置
```
# editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

```

Vue3项目配置文件内容：  
1、 .prettierrc.yml的配置：
```yml
semi: false
singleQuote: true
trailingComma: "es5"
endOfLine: "auto"
bracketSpacing: true
bracketSameLine: false
arrowParens: "avoid"
htmlWhitespaceSensitivity: "ignore"
```
2、.eslintrc.yml的配置：
```yml
env:
  browser: true
  es2021: true
  node: true
extends:
  - eslint:recommended
  - plugin:vue/vue3-essential
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
parser: "vue-eslint-parser"
parserOptions:
  ecmaVersion: latest
  parser:
    js: "espree"
    ts: "@typescript-eslint/parser"
  sourceType: module
plugins:
  - vue
  - "@typescript-eslint"
rules: {}

```