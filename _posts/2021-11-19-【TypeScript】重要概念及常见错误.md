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
- unknow      // top type（任何类型都是它的subtype）
- any         // 既属于top type，又属于bottom type（任何类型都是它的subtype，同时它页是任何类型的subtype，导致any放弃了类型检查）
- volid
- never       // never是所有类型的子类型

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
一句话：***we can always substitute a type with its subtype***
<br />
<br />
# 😄 重要概念

### 1. type和interface的区别

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
🐔 .ts 表示你的代码就是用 ts 写的。  
🐔 但这种代码最后会编译成js代码，供他人使用。这个时候，类型信息就丢失了。所以 ts 编译器会自动根据 .ts 中的信息，生成对外的 .d.ts 文件，和生成的 js 文件搭配使用。其中，js 文件是给运行引擎用的，而 .d.ts 文件是给 IDE（智能编辑器）写代码时参考用的。  
🐔 另一种情况是，你的代码不是用 ts 写的，只是希望最后给别人用时能有类型信息作为辅助，那么这种情况下的 .d.ts 文件就需要你手写了。  
<br />
### 4. **.d.ts中的declare和在.ts中的declare的区别** 

🐟 通过declare声明的类型或者变量或者模块，只要在tsconfig.json的include包含的文件范围内，都可以直接引用而不用通过import或者import type相应的变量或者类型。  

🐟 如果.d.ts中包含import或者export（export = 方式除外，export = 不会将.d.ts文件变成声明模块文件），那么这个.d.ts会自动变成一个声明模块文件，就不会自动挂载的全局。引入该文件中定义的类型时，需通过import来引入。  

🐟 如果使用的是declare namespace ...则表明这个.d.ts也是一个声明模块文件，在其他文件中可以通过import来引入，或者/// <reference />引入  

🐟 如果使用的是declare type ...，且文件不是模块文件，则这个声明的类型可以全局使用，无需引入  

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

### 5. **import 和 /// <reference path|type='' /> 的区别是什么？**  

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
> 比如，type U<T> = T | never，我们会得到U的类型是T，通俗理解就是你拥有了一个类型T，此时还拥有一个不存在的东西never，那么最终你手上有的还只是T。所以T和T | never是恒等的。

例如：
```ts
type Demo<T> = T extends any ? true : false
type ZZ = Demo<never> // never
```
那么如何去解决这个问题呢？就是不触发Distributive Conditional Types既可，最简单的方法就是不要让T是naked type。如下的代码，只要我们把T包裹住即可。
```ts
type case2<T = never> = [T] extends [never] ? true : false 
type c = case2 // true
```

示例：
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

## **常见错误？**
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










