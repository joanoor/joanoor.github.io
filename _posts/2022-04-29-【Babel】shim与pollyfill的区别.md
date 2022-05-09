---
layout: post
title: shim与polyfill的区别
categories: 设计模式
tags: [设计模式, ts]
---

### 结论
> him针对的是环境，polyfill针对的是API

在使用shim时，不会在意旧环境是否已经存在某API，它会直接重新改变全局对象，为旧环境提供API(它是一个垫片，为旧环境提供新功能，从而创建一个新环境)。
而在polyfill中，它会判断旧环境是否已经存在API，不存在时才会添加新API(它是腻子，抹平不同环境下的API差异)。
这二者的目的并不相同

参见：[shim与polyfill的区别](https://juejin.cn/post/6844904050882772999)