---
layout: post
title: tsconfig.json详解
categories: 
tags: []
---

## 如何生成tsconfig.json
1、全局安装typescript
2、执行 ```tsc --init``` 生成文件tsconfig.json

## 注意
1、tsconfig.json文件可以是个空文件，那么所有默认的文件都会以默认配置选项编译   
2、在命令行上指定的编译选项会覆盖在tsconfig.json文件里的相应选项
3、不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。  
4、不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录。
当命令行上指定了输入文件时，tsconfig.json文件会被忽略。

## tsconfig.json顶层属性
```json
{
  "extends": "", // 值是一个字符串，包含指向另一个要继承文件的路径，继承的配置文件的相对路径在解析时是相对于它所在的文件的。在原文件里的配置先被加载，然后被来自继承文件里的配置（ 包括：files, include 和 exclude等）重写。如果发现循环引用，则会报错。（目前，唯一被排除在继承之外的顶级属性是references）
  "compileOnSave": true, //让IDE在保存文件的时候根据tsconfig.json重新生成文件
  "compilerOptions": {},  // 编译选项
  "files": [],  // 一个包含相对或绝对文件路径的列表（这里面的文件可以被tsconfig作用到）
  "include": [],  // 指定一个文件glob匹配模式列表
  "exclude": [],  // 指定一个文件glob匹配模式列表
  "references": []  // 一个对象的数组，指明要引用的工程。每个引用的path属性都可以指向到包含tsconfig.json文件的目录，或者直接指向到配置文件本身（名字是任意的）
}
```

### tsconfig.json顶层属性划分为：
![查看图片](/assets/images/v2-058a7c9d0b3af022763c8108ef5ec7a6_720w.png)

### tsconfig.json编译选项按功能划分为：
![查看图片](/assets/images/v2-362e08aee790a2bb7fbd5bde2b0fc882_720w.jpg)


### 附录
```json
{
  // ...
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true, // 是否强制代码中使用的模块文件名必须和文件系统中的文件名保持大小写一致
    "composite": true,  // 强制执行某些约束，使构建工具能够快速确定项目是否已构建；为true，则declaration默认为true，incremental默认也为团设
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息 
    "target": "ES5", // 目标语言的版本
    "module": "CommonJS", // 生成代码的模板标准
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
    "allowJS": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "outDir": "./dist", // 指定编译的输出目录
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "./file", // 指定生成声明文件存放目录
    "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
    "sourceMap": true, // 生成目标文件的sourceMap文件
    "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "declarationMap": true, // 为声明文件生成sourceMap
    "typeRoots": [], // 声明文件目录，默认是node_modules/@types
    "types": [], // TypeScript 编译器会默认引入typeRoots下所有的声明文件，如果不想全局引入定义，则通过types来进行配置
    "removeComments":true, // 删除注释 
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "noEmitOnError": true, // 发送错误时不输出任何文件
    "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "strict": true, // 开启所有严格的类型检查
    "alwaysStrict": true, // 在代码中注入'use strict'
    "noImplicitAny": true, // 不允许隐式的any类型
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的bind/call/apply检查
    "noImplicitThis": true, // 不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noImplicitReturns": true, //每个分支都会有返回值
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于baseUrl
      // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
      "jquery": ["node_modules/jquery/dist/jquery.min.js"]
    },
    "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
    "listEmittedFiles": true, // 打印输出文件
    "listFiles": true// 打印编译的文件(包括引用的声明文件)
  }
}
```

## 备注
TypeScript 会默认引入node_modules下的所有@types声明，但是开发者也可以通过修改tsconfig.json的配置来修改默认的行为.

tsconfig.json 中有两个配置和类型引入有关。

typeRoots: 用来指定默认的类型声明文件查找路径，默认为node_modules/@types, 指定typeRoots后，TypeScript 编译器会从指定的路径去引入声明文件，而不是node_modules/@types, 比如以下配置会从typings路径下去搜索声明

{  "compilerOptions": {    "typeRoots": ["./typings"]  }}

types: TypeScript 编译器会默认引入typeRoot下所有的声明文件，但是有时候我们并**不希望全局引入所有定义**，而是仅引入部分模块。这种情景下可以通过types指定模块名只引入我们想要的模块，比如以下只会引入 jquery 的声明文件

{  "compilerOptions": {    "types": ["jquery"]  }}

总结就是：

typeRoots 是 tsconfig 中 compilerOptions 的一个配置项，typeRoots 下面的包会被 ts 编译器自动包含进来，typeRoots 默认指向 node_modules/@types。

types 和 typeRoots 一样也是 compilerOptions 的配置，指定 types 后，typeRoots 下只有被指定的包才会被引入。

@types 是 npm 的 scope 命名空间，和@babel 类似，@types 下的所有包会默认被引入，你可以通过修改 compilerOptions 来修改默认策略。

1、[tsConfig/baseUrl -- 一键告别相对路径import](https://www.cnblogs.com/imgss/p/14263344.html)  
2、[了不起的 tsconfig.json 指南](https://zhuanlan.zhihu.com/p/285270177)  
3、[TypeScript 项目 rootDir 设置及根目录之外资源的引用](https://wayou.github.io/2020/05/15/TypeScript-%E9%A1%B9%E7%9B%AE-rootDir-%E8%AE%BE%E7%BD%AE%E5%8F%8A%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B9%8B%E5%A4%96%E8%B5%84%E6%BA%90%E7%9A%84%E5%BC%95%E7%94%A8/)