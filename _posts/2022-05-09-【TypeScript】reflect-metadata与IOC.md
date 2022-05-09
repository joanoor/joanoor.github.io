---
layout: post
title: 
categories: 
tags: []
---

## Reflect-metadata
是ECMAScript的 **元数据** [提案](https://rbuckton.github.io/reflect-metadata/)  
>Reflect Metadata 在 TypeScript 1.5+ 版本中的正式支持，使得对于 TypeScript 应用的一些高级特性，例如依赖注入、运行时类型断言、反射和测试等需要运行时类型信息的特性都得以实现
  
## 什么是元数据
元数据是用来定义数据的数据。例如，对于一个数据A，它会具有值，数据类型等等描述这个数据的数据。这样的数据，我们称之为元数据。通过元数据反射API，我们可以为数据添加和获取元数据  
  
> Reflect Metadata 的 API 可以用于类或者类的属性上

## 三种元数据键
为了方便获得运行时类型，TypeScript 定义了三种保留元数据键:
* 类型元数据：使用元数据键 ”design:type”（用来获取属性类型）
* 参数类型元数据：使用元数据键 ”design:paramtypes”（用来获取参数类型）
* 返回值类型元数据：使用元数据键 ”design:returntype”（用来获取返回值类型）

注意：  
当在vite中开发使用Reflect.getMetaData('design:type')等，返回undefined。而切换到webpack中开发时，则可以正常返回。查询才发现：```vite中无法使用reflect-metadata```  
因为vite使用ESBuild，而ESBuild不支持emitDecoratorMetadata

## 元数据的定义和添加
三种方式：
* 通过为类或类中的成员定义一个装饰器
* 通过Reflect.metadata声明式定义
* 通过Reflect.defineMetadata命令式定义

>如果没有进行这三种方式的定义，我们无法通过反射元数据 API 来获得元数据  
详见：[「程序猿同事的分享」TypeScript 元数据的理解与使用](https://zhuanlan.zhihu.com/p/166362122)


参见：  
* [Why can't reflect-metadata be used in vite](https://www.querythreads.com/why-can-t-reflect-metadata-be-used-in-vite/)
* [vite与reflect-metadata](https://kaokei.com/pages/b11568/)
* [Types serialization & The metadata reflection API](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4)
* [如何基于 TypeScript 实现控制反转](https://zhuanlan.zhihu.com/p/311184005)
* [reflect-metadata的研究](https://juejin.cn/post/6844904152812748807)