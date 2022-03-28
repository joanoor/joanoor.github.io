---
layout: post
title: 创建型设计模式——简单工厂模式
categories: 设计模式
tags: [设计模式, ts]
---

### ✈️ 简介
**简单工厂模式** 又叫 <strong style="color:red">“静态工厂方法”</strong>。  
通常情况下，分为工厂和产品两个大类，工厂类中定义了一个静态方法用于创建产品类的实例对象。其中所有产品应该都具有一个公共的抽象父类，表明它们是同一类产品。

### ✈️ 示例代码
![简单工厂模式](/assets//images/2520380897-a604db3e171fe434_fix732.webp)
```ts
type BMWType = '730' | '840'

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

class BMWFactory {
  public static produceBMW(type: BMWType): BMW {
    switch (type) {
      case '730':
        return new BMW730()
      case '840':
        return new BMW840()
      default:
        throw new Error('未知的宝马型号')
    }
  }
}

BMWFactory.produceBMW('730').run()
BMWFactory.produceBMW('840').run()
```
执行结果：
```cmd
BMW730启动
BMW840启动
```

### ✈️ 优缺点
1. 优点：
   *. 将创建实例与使用实例的任务分开，使用者不必关心对象是如何创建的，实现了系统的解耦
   * 客户端无须知道所创建的具体产品类的类名，只需要知道具体产品类所对应的参数即可
2. 缺点：  
   * 由于工厂类集中了所有产品创建逻辑，一旦不能正常工作，整个系统都要受到影响
   * 系统扩展困难，一旦添加新产品就不得不修改工厂逻辑，在产品类型较多时，也有可能造成工厂逻辑过于复杂，不利于系统的扩展和维护

### ✈️ 应用场景
1. 工厂类负责创建的对象比较少：由于创建的对象比较少，不会造成工厂方法中业务逻辑过于复杂
2. 客户端只需知道传入工厂类静态方法的参数，而不需要关心创建对象的细节