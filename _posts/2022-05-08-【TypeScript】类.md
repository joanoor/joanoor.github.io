---
layout: post
title: 
categories: 
tags: []
---

## 面向对象的solid原则
* S：the Single Responsibility Principle:单一职责原则
* O：the Open Closed Principle:开放闭合原则
* L：the Liskov Substitution Principle:里氏替换原则
* I：the Interface Segregation Principle:接口分离原则
* D:the Dependency Inversion Principle依赖倒转原则

>一句话概括就是:单一职责原则告诉我们实现类要职责单一；里氏替换原则告诉我们不要破坏继承体系；接口隔离原则告诉我们在设计接口的时候要精简单一；依赖倒置原则告诉我们要面向接口编程。而开闭原则是总纲，他告诉我们要对扩展开放，对修改关闭

#### Single Responsibility Principle（单一职责原则）  
* 核心思想：应该有且仅有一个原因引起类的变更
* 好处：类的复杂度降低、可读性提高、可维护性提高、扩展性提高、降低了变更引起的风险。
* 需注意：单一职责原则提出了一个编写程序的标准，用“职责”或“变化原因”来衡量接口或类设计得是否优良，但是“职责”和“变化原因”都是不可以度量的，因项目和环境而异。

#### Open Closed Principle（开闭原则）
* 核心思想：尽量通过扩展软件实体来解决需求变化，而不是通过修改已有的代码来完成变化
* 通俗来讲：一个软件产品在生命周期内，都会发生变化，既然变化是一个既定的事实，我们就应该在设计的时候尽量适应这些变化，以提高项目的稳定性和灵活性。

#### Liskov Substitution Principle（里氏替换原则）
* 核心思想：在使用基类的的地方可以任意使用其子类，能保证子类完美替换基类。
* 通俗来讲：只要父类能出现的地方子类就能出现。反之，父类则未必能胜任。
* 好处：增强程序的健壮性，即使增加了子类，原有的子类还可以继续运行。
* 需注意：如果子类不能完整地实现父类的方法，或者父类的某些方法在子类中已经发生“畸变”，则建议断开父子继承关系 采用依赖、聚合、组合等关系代替继承。

#### Interface Segregation Principle（接口隔离原则）
* 核心思想：类间的依赖关系应该建立在最小的接口上
* 通俗来讲：建立单一接口，不要建立庞大臃肿的接口，尽量细化接口，接口中的方法尽量少。也就是说，我们要为各个类建立专用的接口，而不要试图去建立一个很庞大的接口供所有依赖它的类去调用。
* 需注意：接口尽量小，但是要有限度。对接口进行细化可以提高程序设计灵活性，但是如果过小，则会造成接口数量过多，使设计复杂化。所以一定要适度提高内聚，减少对外交互。使接口用最少的方法去完成最多的事情为依赖接口的类定制服务。只暴露给调用的类它需要的方法，它不需要的方法则隐藏起来。只有专注地为一个模块提供定制服务，才能建立最小的依赖关系。

#### Dependency Inversion Principle（依赖倒置原则）
* 核心思想：高层模块不应该依赖底层模块，二者都该依赖其抽象；抽象不应该依赖细节；细节应该依赖抽象；
* 通俗来讲：依赖倒置原则的本质就是通过抽象（接口或抽象类）使各个类或模块的实现彼此独立，互不影响，实现模块间的松耦合。
* 好处：依赖倒置的好处在小型项目中很难体现出来。但在大中型项目中可以减少需求变化引起的工作量。使并行开发更友好。


## 
TypeScript 是一种静态类型语言而不是强类型语言（有争议）。private 只是在编译时做检查，最终生成的 js 代码中被 private 修饰的属性依然是公开的。



参见：  
1. [为什么 JavaScript 的私有属性使用 # 符号](https://zhuanlan.zhihu.com/p/47166400)