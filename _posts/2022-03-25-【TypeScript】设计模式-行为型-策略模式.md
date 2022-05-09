---
layout: post
title: 行为型设计模式——策略模式
categories: 设计模式
tags: [设计模式, ts]
---

### ✈️ 简介
**策略模式**建议找出负责用许多不同方式完成特定任务的类， 然后将其中的算法抽取到一组被称为策略的独立类中。策略模式由两部分构成：一部分封装不同策略的策略组；另一部分是Context(其中必须包含一个成员变量来存储对于每种策略的引用)，通过组合和委托来让 Context 拥有执行策略的能力，从而实现可复用、可扩展和可维护，并且避免大量复制粘贴的工作。

### ✈️ 示例代码
![策略模式](/assets/images/structure.png)
```ts
interface RouteStratey {
  buildRoute(): string
}

class Context {
  constructor(private strategy: RouteStratey) {}
  setStrategy(strategy: RouteStratey) {
    this.strategy = strategy
  }
  showRouteMethod() {
    console.log(`我要去${this.strategy.buildRoute()}`)
  }
}

class RoadStrategy implements RouteStratey {
  buildRoute(): string {
    return '坐火车'
  }
}

class PlaneStrategy implements RouteStratey {
  buildRoute(): string {
    return '坐飞机'
  }
}

class CarStrategy implements RouteStratey {
  buildRoute(): string {
    return '坐汽车'
  }
}

const A = new Context(new RoadStrategy())
A.showRouteMethod()

A.setStrategy(new PlaneStrategy())
A.showRouteMethod()

A.setStrategy(new CarStrategy())
A.showRouteMethod()
```
执行结果：
```
Client:Strategy is set to normal sorting.
Context:Sorting data using the strategy (not sure how it'll do it)
a,b,c,d,e

Client: Strategy is set to reverse sorting.
Context:Sorting data using the strategy (not sure how it'll do it)
e,d,c,b,a
```
### ✈️ 优缺点


### ✈️ 应用场景
1. 当你想使用对象中各种不同的算法变体， 并希望能在运行时切换算法时， 可使用策略模式
2. 当你有许多仅在执行某些行为时略有不同的相似类时， 可使用策略模式
3. 如果算法在上下文的逻辑中不是特别重要， 使用该模式能将类的业务逻辑与其算法实现细节隔离开来
4. 当类中使用了复杂条件运算符以在同一算法的不同变体中切换时， 可使用该模式