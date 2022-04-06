---
layout: post
title: 创建型设计模式——原型模式
categories: 设计模式
tags: [设计模式, ts]
---

### ✈️ 简介
原型是一种创建型设计模式， 使你能够复制对象， 甚至是复杂对象， 而又无需使代码依赖它们所属的类。

### ✈️ 示例代码
```ts
interface Prototype {
  clone(): Prototype
}

class Dog implements Prototype {
  public name: string
  public birthYear: number
  public sex: string
  public presentYear: number
  constructor() {
    this.name = 'lili'
    this.birthYear = 2015
    this.sex = '男'
    this.presentYear = 2018
  }

  public getDiscription(): string {
    return `狗狗叫${this.name},性别${this.sex},${this.presentYear}年${
      this.presentYear - this.birthYear
    }岁了`
  }

  // 实现复制
  public clone(): Prototype {
    return Object.create(this)
  }
}

// 使用
const dog = new Dog()
console.log(dog.getDiscription())
dog.presentYear = 2020
const dog1 = Object.create(dog)
console.log(dog1.getDiscription())
```
### ✈️ 优缺点
1. 优点：
   * 创建新的对象比较复杂时，可以利用原型模式简化对象的创建过程，同时也能够提高效率
   * 不用重新初始化对象，而是动态地获得对象运行时的状态
   * 如果原始对象发生变化（增加或者减少属性），其它克隆对象也会发生相应的变化，无需修改代码
2. 缺点：
   * 需要为每一个类配备一个克隆方法，这对全新的类来说不是很难，但对已有的类进行修改时，需要修改其源代码，违背了ocp原则
  
### ✈️ 应用场景
1. 创建成本比较大的场景
2. 需要动态的获取当前的对象运行时状态的场景