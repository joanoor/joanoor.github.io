---
layout: post
title: TypeScript类型操作符
categories: TypeScript
tags: [ ts ]
---

# TypeScript中的类型操作符
包括：声明类型和接口的type和interface；还有关键字typeof、keyof、in、extends、infer；以及()、[]、{}、=、<>、：、；、？、&、|等界限符

## typeof
1. typeof可以获取变量的声明类型
2. typeof作为类型操作符后面只能跟<strong style="color:red">变量</strong>
3. typeof返回对象字面量的结构类型
4. 若变量没有声明类型，typeof返回变量的推断类型
   * Typescript3.4中引入新的字面量构造方式：const断言，在const断言作用下，即使let声明也可以限制类型扩展
   ```ts
   let s3 = 'hello' as const
   type TS = typeof s3 // TS = 'hello'
   s3 = 'world' // 错误，不能将类型“"world"”分配给类型“"hello"”
   ```

## keyof
TypeScript允许遍历某种类型的属性，并通过keyof操作符提取其属性的名称，类型Object.keys方法，可以用于获取某种类型的所有键，返回类型是联合类型
1. keyof可以用于操作类
   ```ts
   class Person {   
     name: string = "Semlinker"; 
   }  

   let sname: keyof Person; //等同于 let sname: 'name'

   sname = 'name'
   snmae = 'age' // 异常，不能将类型“"age"”分配给类型“"name"”
   ```
2. keyof操作符除了支持接口和类之外，它也支持基本数据类型
   ```ts
   type TB = keyof boolean // 'toString'
   type TN = keyof number // "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
   type TS = keyof string // number | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" ...
   type TARR = keyof any[] // number | "length" | "toString" | "toLocaleString" | "pop" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort" | "splice" | "unshift" ...
   type TSY = keyof symbol // "toString" | "valueOf"
   type TNULL = keyof null // never
   type TVOID = keyof void // never
   type TUDF = keyof undefined // never
   ```
3. keyof和结合typeof一起使用
   通过typeof获取变量的类型，再通过keyof获取变量类型的所有键组成的联合类型
4. keyof结合[]一起用于类型索引访问查询


## extends
在TypeScript中，extends关键字在不同应用场景下有以下三种含义：
1. 表示继承、扩展的含义
   ```ts
   // 继承父类的方法和属性
   class Animal {
     public weight: number = 0
     public age: number = 0
   }

   class Dog extends Animal {
     public wang() {
       console.log('汪！')
     }
     public bark() {}
   }

   class Cat extends Animal {
     public miao() {
       console.log('喵~')
     }
   }

   // 继承类型
   interface Animal {
     age: number
   }

   interface Dog extends Animal {
     bark: () => void
   }
   ```
2. 表示约束的含义
   ```ts
   function getCnames<T extends { name: string }>(entities: T[]):string[] {
     return entities.map(entity => entity.name)
   }
   ```
3. 表示分配的含义（可赋值性assignable）
   ```ts
   type Animal = {
     name: string;
   }
   type Dog = {
     name: string;
     bark: () => void
   }
   type Bool = Dog extends Animal ? 'yes' : 'no';
   ```
备注：  
```ts
type Equal<X, Y> = X extends Y ? true : false;
// 表示 类型X可以分配给类型Y，而不是说类型X是类型Y的子集
```