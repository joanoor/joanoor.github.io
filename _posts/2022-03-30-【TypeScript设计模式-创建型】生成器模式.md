---
layout: post
title: 创建型设计模式——生成器模式
categories: 设计模式
tags: [设计模式, ts]
---

### ✈️ 简介

### ✈️ 示例代码
![生成器模式](/assets//images//builder-structure.png)
```ts
interface Builder {
  producePartA<T>(this: T): Omit<T, 'producePartA'>
  producePartB<T>(this: T): Omit<T, 'producePartB'>
  producePartC<T>(this: T): Omit<T, 'producePartC'>
}

class Product1 {
  parts: string[] = []
  listParts() {
    console.log(`Product parts: ${this.parts.join()}\n`)
  }
}

class ConcreteBuilder1 implements Builder {
  private product: Product1
  constructor() {
    this.reset()
  }

  reset() {
    this.product = new Product1()
  }

  producePartA<T>(this: T & { product: Product1 }) {
    this.product.parts.push('PartA')
    return this
  }
  producePartB<T>(this: T & { product: Product1 }) {
    this.product.parts.push('PartB')
    return this
  }
  producePartC<T>(this: T & { product: Product1 }) {
    this.product.parts.push('PartC')
    return this
  }

  getProduct(): Product1 {
    const result = this.product
    this.reset()
    return result
  }
}

class Director {
  private builder: Builder
  setBuilder(builder: Builder) {
    this.builder = builder
  }

  buildMinimalViableProduct() {
    this.builder.producePartA()
  }

  buildFullFeaturedProduct() {
    this.builder.producePartB().producePartA().producePartC()
  }
}

function clientCode2(director: Director) {
  const builder = new ConcreteBuilder1()
  director.setBuilder(builder)
  console.log('Standard basic product:')
  director.buildMinimalViableProduct()
  builder.getProduct().listParts()

  console.log('')

  console.log('Standard full fetured product:')
  director.buildFullFeaturedProduct()
  builder.getProduct().listParts()
}

const director = new Director()
clientCode2(director)
```
执行结果：
```
Standard basic product:
Product parts: PartA


Standard full fetured product:
Product parts: PartB,PartA,PartC
```

### ✈️ 优缺点

### ✈️ 应用场景