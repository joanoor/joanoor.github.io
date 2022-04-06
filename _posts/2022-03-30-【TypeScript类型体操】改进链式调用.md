---
layout: post
title: TypeScript类型体操改进链式调用
categories: 类型体操
tags: [类型体操, TypeScript]
---
### 代码
```ts
interface Knead {
  kneadDough(): Pull
}

interface Pull {
  pull(): Boil
}

interface Boil {
  boil(): Fish
}

interface Fish {
  fish(): Add
}

// 因为this实在Add声明时确定的，如果想让this在方法被调用时被确定，目前只能通过泛型的方式
interface Add {
  addSoup<T>(this: T): Omit<T, 'addSoup'>
  addSeasoning<T>(this: T): Omit<T, 'addSeasoning'>
}

type INoodleRobot = Knead & Pull & Boil & Fish & Add

class NoodleRobot implements INoodleRobot {
  kneadDough() {
    console.log('揉面')
    return this
  }

  pull() {
    console.log('拉成细条')
    return this
  }

  boil() {
    console.log('放进开水里煮')
    return this
  }

  fish() {
    console.log('捞出面条')
    return this
  }

  addSoup<T>(this: T): Omit<T, 'addSoup'> {
    console.log('加适量面汤')
    return this
  }

  addSeasoning<T>(this: T): Omit<T, 'addSeasoning'> {
    console.log('加适量调味品')
    return this
  }
}

const robot: Knead = new NoodleRobot()
// robot.kneadDough().pull().boil().fish().addSeasoning
robot.kneadDough().pull().boil().fish().addSeasoning().addSoup()
robot.kneadDough().pull().boil().fish().addSoup().addSeasoning()
```

参见：  
1. [用 TypeScript 类型体操改进链式调用](https://zhuanlan.zhihu.com/p/449293953)