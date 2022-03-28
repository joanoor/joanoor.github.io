---
layout: post
title: 创建型设计模式——抽象工厂模式
categories: 设计模式
tags: [设计模式, ts]
---

### ✈️ 简介
**抽象工厂模式**提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类

### ✈️ 示例代码
![抽象工厂](/assets/images/abstract-factory-uml.png)
```ts
abstract class BMW {
  public abstract run(): void
}

class BMW730 extends BMW {
  public run(): void {
    console.log('BMW730启动')
  }
}

class BMW840 extends BMW {
  public run(): void {
    console.log('BMW840启动')
  }
}

abstract class BMWFactory {
  abstract produceBMW730(): BMW730
  abstract produceBMW840(): BMW840
}

class ConcreteBMWFactory extends BMWFactory {
  produceBMW730(): BMW730 {
    return new BMW730()
  }
  produceBMW840(): BMW840 {
    return new BMW840()
  }
}

new ConcreteBMWFactory().produceBMW730().run()
new ConcreteBMWFactory().produceBMW840().run()
```
执行结果：
```
BMW730启动
BMW840启动
```

### ✈️ 优缺点
1. 优点
   * 抽象工厂模式隔离了具体类的生成，使得客户并不需要知道什么被创建。由于这种隔离，更换一个具体工厂就变得相对容易。所有的具体工厂都实现了抽象工厂中定义的那些公共接口，因此只需改变具体工厂的实例，就可以在某种程度上改变整个软件系统的行为
   * 当一个产品族中的多个对象被设计成一起工作时，它能够保证客户端始终只使用同一个产品族中的对象。这对一些需要根据当前环境来决定其行为的软件系统来说，是一种非常实用的设计模式
2. 缺点：
   * 在添加新的产品对象时，难以扩展抽象工厂来生产新种类的产品，这是因为在抽象工厂角色中规定了所有可能被创建的产品集合，要支持新种类的产品就意味着要对该接口进行扩展，而这将涉及到对抽象工厂角色及其所有子类的修改，显然会带来较大的不便

### ✈️ 应用场景
1. 如果代码需要与多个不同系列的相关产品交互， 但是由于无法提前获取相关信息， 或者出于对未来扩展性的考虑， 你不希望代码基于产品的具体类进行构建， 在这种情况下， 你可以使用抽象工厂
2. 如果你有一个基于一组抽象方法的类， 且其主要功能因此变得不明确， 那么在这种情况下可以考虑使用抽象工厂模式

### ✈️ 与工厂方法模式的区别
    工厂方法模式针对的是一个产品等级结构，而抽象工厂模式则需要面对多个产品等级结构，一个工厂等级结构可以负责多个不同产品等级结构中的产品对象的创建