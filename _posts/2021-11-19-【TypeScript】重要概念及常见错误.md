---
layout: post
title: TypeScript重要概念及常见错误
categories: 前端
tags: [前端, typescript]
---

# 😄 基础概念

## 类型
- 数字
- 字符串
- 布尔
- 字面量       // let b: 10 | 8  表示 b只能赋值成10或者8
- any
- 联合类型
- unknow      // <span style="color:red">top type（任何类型都是它的subtype）</span>
- any         // <span style="color:red">既属于top type，又属于bottom type（任何类型都是它的subtype，同时它页是任何类型的subtype，导致any放弃了类型检查）</span>
- volid
- never       // <span style="color:red">never是所有类型的子类型</span>

## 父子类型  
```ts
interface Animal {
  age: number
}
interface Dog extends Animal {
  bark(): void
}
```
Animal是Dog的父类型，Dog是Animal的子类型，子类型的属性比父类型的更多，更具体
* 在类型系统中，属性更多的类型是子类型
* 在集合论中，属性更少的集合是子集

也就是说：**子类型是父类型的超集，而父类型是子类型的子集，这是直觉上容易搞混的一点**

记住一个特征，子类型比父类型更加<strong style="color:red">具体</strong>，这点很关键

## 可赋值性 assignable  
一句话：***we can always substitute(代替) a type with its subtype***
<br />
<br />
<br />

# 😄 重要概念

### 1. type和interface的区别
参见：[Interfaces vs Types in TypeScript](https://blog.logrocket.com/types-vs-interfaces-in-typescript/)

### 2. any和unknow类型
> any类型相当于关闭了类型检查，对一个变量，执行任何操作（调用，取值等等）都不会提示报错
> 在被确定某个类型之前，不能被进行其他操作， unknown 类型只能分配给 any 类型和 unknown 类型本身
```typescript
let value: unknow
let value33:any
value33 = 44
value = true   // ok
value = 10     // ok
value = null   // ok
let value1:unknow = value   // ok
let value2:any = value   // ok
let value3:string = value   // Error
let value4:boolean = value33   // ok
```

### 3. **.d.ts和.ts文件的区别**
类型定义文件(*.d.ts)  DefinitelyTyped的简写  

🐔 .ts 表示你的代码就是用 ts 写的。  
🐔 但这种代码最后会编译成js代码，供他人使用。这个时候，类型信息就丢失了。所以 ts 编译器会自动根据 .ts 中的信息，生成对外的 .d.ts 文件，和生成的 js 文件搭配使用。其中，js 文件是给运行引擎用的，而 .d.ts 文件是给 IDE（智能编辑器）写代码时参考用的。  
🐔 另一种情况是，你的代码不是用 ts 写的，只是希望最后给别人用时能有类型信息作为辅助，那么这种情况下的 .d.ts 文件就需要你手写了。  
<br />

### 4. **.d.ts中的declare和在.ts中的declare的区别** 

🐟 通过declare声明的类型或者变量或者模块，只要在tsconfig.json的include包含的文件范围内，都可以直接引用而不用通过import或者import type相应的变量或者类型。  

🐟 如果.d.ts中包含import或者export（export = 方式除外，export = 不会将.d.ts文件变成声明模块文件），那么这个.d.ts会自动变成一个声明模块文件，就不会自动挂载的全局。引入该文件中定义的类型时，需通过import来引入。  

🐟 如果使用的是declare namespace ...则表明这个.d.ts也是一个声明模块文件，在其他文件中可以通过import来引入，或者/// <reference />引入  

🐟 如果使用的是declare type ...，且文件不是模块文件，则这个声明的类型可以全局使用，无需引入  

🐟 如果文件时模块文件（存在 import 或者 export），则可以使用declare global来定义全局；如果不是模块文件，默认就是declare global，不需要再使用declare global来定义

🐟 参见：  
  1. [在TypeScript中，.d.ts声明文件中的 'export=' 是什么意思](https://segmentfault.com/q/1010000010118685)
  2. [ts的.d.ts和declare究竟是干嘛用的](https://blog.csdn.net/qq_34551390/article/details/118800743)  
  3. [typescript 声明文件加载机制以及在不同场景下的正确使用方式](https://zhuanlan.zhihu.com/p/133344957)  
  4. [一文读懂TS的(.d.ts)文件](https://juejin.cn/post/6987735091925483551)
  5. [声明文件](https://ts.xcatliu.com/basics/declaration-files.html#declare-global)

🐟 备注： 
  1. .d.ts文件顶级声明declare最好不要跟export同级使用，不然在其他ts引用这个.d.ts的内容的时候，就需要手动import导入了
  2. 在.d.ts文件里如果顶级声明不用export的话，declare和直接写type、interface效果是一样的，在其他地方都可以直接引用
<br />

### 5. **import 和 /// <reference path | type='' /> 的区别是什么？**  

🐷 主要还是历史遗留问题，三斜线指令出现的时候 ES6 还没出来。三斜线指令不会将一个全局文件变成模块文件，而 import 会。如果你需要一个在一个全局文件 b 里用另一个文件 c 里的变量，就可以用三斜线指令，因为用 import 会把 b 变成一个模块文件。  

🐷 例如：当a.ts中使用namespace时，b.ts引入a.ts使用
/// \<reference path='./a.ts' />

🐷 当一个声明文件中使用reference types时，表示这个声明文件引入的是全局库的声明文件
/// \<reference types="globalLib" />

![查看图片](/assets/images/declare.png)

<br />

### 6. **Distributive conditional types**
* 首先：类似 ```A extends B ? C : D``` 这样的语法叫做 ***conditional types*** (条件类型)，其中A、B、C、D能够是任何类型表达式，extends关键字是条件类型的核心。A extends B刚好意味着能够将类型A的任何值安全地分配给类型B的变量。在类型系统术语中，咱们能够说“ A可分配给B”
* 其次：***Distributive conditional types*** 也就是分布式条件类型，简单来说，假设T extends U中的T若是一个联合类型A | B | C，则这个表达式会被展开成：
  ```
  (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
  ```
示例：
```ts
type a = never extends never ? true : false           // true
type case1<T = never> = never extends T ? true : false    
type case2<T = never> = T extends never ? true : false   
type b = case1                                        // true
type c = case2                                        // never 
```
你可能会问为什么type c为never？这是因为：
> 众所周知，never在typescript中指不存在的类型。而Union type代表一个集合，never的意思就是一个空的集合。在Distributive Conditional Types的场景下，extends能够表示遍历集合的含义。而遍历一个空的集合never，自然得到的结果也是空never（其实就是得到不存在的类型）  
> 那么有观众就要问了，为什么never也是Union type呢？never其实是|运算的幺元。所有的类型都可以理解为Union type。  
> 比如，type U\<T> = T | never，我们会得到U的类型是T，通俗理解就是你拥有了一个类型T，此时还拥有一个不存在的东西never，那么最终你手上有的还只是T。所以T和T | never是恒等的。

例如：
```ts
type Demo<T> = T extends any ? true : false
type ZZ = Demo<never> // never
// 那么如何去解决这个问题呢？
// 就是不触发Distributive Conditional Types既可，最简单的方法就是不要让T是naked type。如下的代码，只要我们把T包裹住即可。
type case2<T = never> = [T] extends [never] ? true : false 
type c = case2 // true
```

Distributive conditional types的一个完整例子：
```ts
type Action={
  type:'INIT' 
} | {
  type:'SYNC'
} | {
  type:'LOG_IN'
  emailAddress:string
} | {
  type:'LOG_IN_SUCCESS'
  accessToken:string
}

type ActionType= Action['type']

type ExtractActionParameters<A extends Action,U extends ActionType>=A extends {type:U} ? A :never

type ExcludeTypeField<A>={
  [K in Exclude<keyof A,'type'>]:A[K]
}

type ExtractSimpleAction<T>=T extends any ? {} extends ExcludeTypeField<T> ? T :never :never
type SimpleAction=ExtractSimpleAction<Action>
type SimpleActionType=SimpleAction['type']
type ComplexActionType=Exclude<ActionType,SimpleActionType>

function dispatch<T extends SimpleActionType>(type:T):void
function dispatch<T extends ComplexActionType>(type:T,args:ExtractActionParameters<Action,T>):void
function dispatch(type:any,arg?:any){ }
```
参考：  
* [Typescript 理解Conditional Types](https://juejin.cn/post/7002494139153530917)
* [TypeScript 参数简化实战（进阶知识点conditional types，中高级必会）](http://www.noobyard.com/article/p-xzqyvrhe-hk.html)
* [Conditional types in TypeScript](https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/)


### 7. 交叉类型和联合类型
首先抛弃数学集合中的交集和并集概念，它们不是一个概念。
* 联合类型：产生一个包含所有类型的选择集类型
* 交叉类型：产生一个包含所有属性的新类型
  * 如果两个类型交叉，且这个两个类型存在相同名称属性，但是一个optional 一个required，则最终结果是required
  例如:
  ```ts
  type S = ('name' | 'age') & ('name' | 'age' | 'address') // 结果应该是 "name" | "age"
  // 相当于做分解运算 type S="name" & "name" | "name" & "age" | "name" & "address" | "age" & "name" | "age" & "age" | "age" & "address" ===> type S="name" | never | never | never | age |never = "name" | "age"
  ```
参考：
* [TypeScript 交叉类型](http://www.semlinker.com/ts-intersection-types/)
* [理解Ts联合类型和交叉类型](https://juejin.cn/post/6930628304491773966#heading-0)


### 8. Index Signatures（索引签名）
The idea of the index signatures is to type objects of unknown structure when you only know the key and value types.  
在只知道键和值类型的情况下对结构位置的对象进行类型划分  
```ts
type User = {
  [x:string]: number
}
```
参见：😈😈😈 [Index Signatures in TypeScript](https://dmitripavlutin.com/typescript-index-signatures/) 

### 9. 索引签名 VS Record工具类型
参见：😈😈😈 [TypeScript 索引签名 vs Record 工具类型](https://juejin.cn/post/7087971365449367565)

### 10. typescript查找类型定义
1. 包类型定义的查找  
   TypeScript 编译器先在当前编译上下文找类型定义，如果没找到，则会去 node_modules 中的@types （默认情况，可在tsconfig.json中修改）目录下去寻找对应包名的模块声明文件
2. 变量类型定义的查找  
   和包查找类似，默认情况下变量类型定义的查找也会去 @types 下去寻找。只不过并不是直接去 @types 找，而是有一定的优先级， 这个过程类似原型链或者作用域链。
参见：[TS类型定义详解：types/typeRoots/@types，以及命名空间namespace](https://www.zhoulujun.cn/html/webfront/ECMAScript/typescript/2021_1129_8715.html)

## **常见错误？**
1、Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?  
在tsconfig.json文件中添加：
```json
{
  "baseUrl": "./",
}
```

2、Property 'context' does not exist on type 'NodeRequire'.  
安装 ```npm i @types/webpack-env -D```  
在tsconfig.json文件中加：
```json
{
  "types": ["webpack-env"],
}
```

3、tsconfig.json 报错 无法写错写入文件 ，因为他会覆盖输入文件是怎么回事？  
在tsconfig.json文件中添加：
```json
{
  "compilerOptions": {
    "outDir": "./"
  }
}
```

4、 报错 “This syntax requires an imported helper but module 'tslib' cannot be found.ts(2354)”？  
该报错的罪魁祸首便是 tsconifg.compilerOptions 中的 importHelpers。通过查阅文档可知，开启该选项后，一些降级操作会从 tslib 导入

tslib 这个库的作用是把一系列的降级代码（函数）抽离并合并导出的库。目的是降低编译后代码的数量，起到压缩代码体积的作用。

如果你的运行环境有明确的 JavaScript 版本需求，那我强烈建议你打开 importedHelper 这个选项，并安装 tslib 这个依赖，我相信它能在一定程度上压缩整个项目的体积。

参见：[typescript 之 tslib 是什么，你需要它吗](https://juejin.cn/post/7136104350912348174)

5、tsconfig.json报错 “Unable to load schema from 'https://json.schemastore.org/tsconfig'”  
vscode关闭 设置 —— 扩展 —— JSON —— Schema Download: Enable










