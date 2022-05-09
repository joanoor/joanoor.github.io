---
layout: post
title: 创建型设计模式——工厂方法模式
categories: 设计模式
tags: [设计模式, ts]
---

### ✈️ 简介
**单例模式**是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。  
它解决了两个问题：保证一个类只有一个实例；为该实例提供一个全局访问节点

### ✈️ 示例代码
![单例模式](/assets//images//singleton-comic-1-zh.png)
```ts
class Singleton {
  private static instance: Singleton
  private constructor() {}
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }

  someBusinessLogic() {
    console.log('我们看看你是谁？', Singleton.instance)
  }
}

function clientCode() {
  const s1 = Singleton.getInstance()
  const s2 = Singleton.getInstance()
  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.')
  } else {
    console.log('Singleton failed, variables contain different instances.')
  }
}

clientCode()
```
执行结果：
```
Singleton works, both variables contain the same instance.
```

### ✈️ 优缺点
1. 优点：
   * 保证一个类只有一个实例
   * 获得一个指向该实例的全局访问节点
   * 仅在首次请求单例对象时对其进行初始化
2. 缺点：
   * 违反了单一职责原则
   * 单例模式可能掩盖不良设计
   * 该模式在多线程环境下需要进行特殊处理， 避免多个线程多次创建单例对象
   * 单例的客户端代码单元测试可能会比较困难， 因为许多测试框架以基于继承的方式创建模拟对象

### ✈️ 应用场景
1. 如果程序中的某个类对于所有客户端只有一个可用的实例， 可以使用单例模式
2. 如果你需要更加严格地控制全局变量， 可以使用单例模式