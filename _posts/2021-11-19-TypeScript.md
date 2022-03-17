---
layout: post
title: 问题汇集
categories: 前端
tags: [前端]
---

### 1、类型
- 数字
- 字符串
- 布尔
- 字面量       // let b: 10 | 8  表示 b只能赋值成10或者8
- any
- 联合类型
- unknow      // 类型断言
- volid
- never 

### 2、type和interface的区别


### 3、unknow类型
>在被确定某个类型之前，不能被进行其他操作， unknown 类型只能分配给 any 类型和 unknown 类型本身
>```
>let value: unknow
>let value33:any
>value33=44
>value = true   // ok
>value = 10     // ok
>value = null   // ok
>let value1:unknow = value   // ok
>let value2:any = value   // ok
>let value3:string = value   // Error
>let value4:boolean = value33   // ok
>```

### 常见错误？
1、Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?  
在tsconfig.json文件中加：
```
{
  "baseUrl": "./",
}
```

2、Property 'context' does not exist on type 'NodeRequire'.  
安装 ```npm i @types/webpack-env -D```  
在tsconfig.json文件中加：
```
{
  "types": ["webpack-env"],
}
```

### .d.ts和.ts文件的区别
>.ts 表示你的代码就是用 ts 写的。  
>但这种代码最后会编译成 .js 的 js 代码，供他人使用。这个时候，类型信息就丢失了。所以 ts 编译器会自动根据 .ts 中的信息，生成对外的 .d.ts 文件，和生成的 js 文件搭配使用。其中，js 文件是给运行引擎用的，而 .d.ts 文件是给 IDE（智能编辑器）写代码时参考用的。  
>另一种情况是，你的代码不是用 ts 写的，只是希望最后给别人用时能有类型信息作为辅助，那么这种情况下的 .d.ts 文件就需要你手写了。

### 在.d.ts中的declare和在.ts中的declare的区别
>通过declare声明的类型或者变量或者模块，在include包含的文件范围内，都可以直接引用而不用去import或者import type相应的变量或者类型。（须在tsconfig.json的“include”中引入）  
```如果.d.ts中包含import或者export（export = 方式除外，export = 不会将.d.ts文件变成声明模块文件），那么这个.d.ts会自动变成一个声明模块文件，就不会自动挂载的全局。引入该文件中定义的类型时，需通过import来引入。```   
```如果使用的是declare namespace ...则表明这个.d.ts也是一个声明模块文件，在其他文件中可以通过import来引入，或者/// <reference />引入``` 
```如果使用的是declare type ...，且文件不是模块文件，则这个声明的类型可以全局使用，无需引入```
* 参见：  
  1. [在TypeScript中，.d.ts声明文件中的 'export=' 是什么意思](https://segmentfault.com/q/1010000010118685)
  2. [ts的.d.ts和declare究竟是干嘛用的](https://blog.csdn.net/qq_34551390/article/details/118800743)  
  3. [typescript 声明文件加载机制以及在不同场景下的正确使用方式](https://zhuanlan.zhihu.com/p/133344957)  
  4. [一文读懂TS的(.d.ts)文件](https://juejin.cn/post/6987735091925483551)
  5. [声明文件](https://ts.xcatliu.com/basics/declaration-files.html#declare-global)

### import 和 /// <reference /> 的区别是什么？
>主要还是历史遗留问题，三斜线指令出现的时候 ES6 还没出来。三斜线指令不会将一个全局文件变成模块文件，而 import 会。如果你需要一个在一个全局文件 b 里用另一个文件 c 里的变量，就可以用三斜线指令，因为用 import 会把 b 变成一个模块文件。  
>例如：当a.ts中使用namespace时，b.ts引入a.ts使用
/// \<reference path='./a.ts' />

当一个声明文件中使用reference types时，表示这个声明文件引入的是全局库的声明文件
/// \<reference types="globalLib" />

![查看图片](/assets/images/declare.png)





### 高级类型
1. Partial\<T>  
   源码定义：
   ```
   type Partial<T> = {
     [P in keyof T]?: T[P];
   }
   ```
   例子：
   ```
   interface IUser {
     name: string
     age: number
     department?: string
   }
   转化之后
   type optional = Partial<IUser>
   // optional的结果如下
   type optional = {
     name?: string | undefined;
     age?: number | undefined;
     department?: string | undefined;
   }
   ```
   附录：
   * [https://blog.csdn.net/roamingcode/article/details/104111165](https://blog.csdn.net/roamingcode/article/details/104111165)
2. Required\<T>  
   与Partial相反
   ```

   ```
   例子：
   ```
   interface Props{
     a?:number
     b:string
   }
   转化之后
   type optional = Partial<Props>
   type optional = {
     a: string
     b: number
   }
   ```
3. Readonly\<T>  
   例子：
   ```
   interface Todo{
     title:string
     description?:string
   } 
   type newTodo=Readonly<Todo>
   const todo:newTodo={
     title:'xixi',
     description:'adfadf'
   }
   todo对象的属性是不允许修改的
   ```