---
layout: post
title: TypeScript协办和逆变
categories: typescript
tags: [ts]
---

>协变与逆变(covariance and contravariance)是在计算机科学中，描述“具有父/子类别关系的多个类别” 通过 “类别构造器”，构造出的 “多个复杂类别之间是否有父/子类别关系” 的用语  

定义两个接口
```ts
interface Animal {
  age: number
}

interface Dog extends Animal {
  bark(): void
}
```

### 协变（covariance）
例如：
```ts
let animals: Animal[] = []
let dogs: Dog[] = []
animals = dogs
animals[0].age  // 正确，可以正常使用
```
**对于 type MakeArray\<T> = T[] 这个类型构造器来说，父子类型之间关系就是 协变（Covariance） 的**

### 逆变（Contravariance）
定义两个函数：
```ts
let visitAnimal: (animal: Animal) => void = (animal: Animal) => {
  console.log(animal.age)
}

let visitDog: (dog: Dog) => void = (dog:Dog) => {
  dog.bark()
}


// 一般在以函数为参数的方法中
visitAnimal = visitDog // 报错，无法赋值
visitDog = visitAnimal // ✔️ 可以正常使用

// 这是因为，如果 visitAnimal = visitDog 正确的话，此时代码相当于下面：
visitAnimal: (animal: Animal) => void = (dog) => {
  dog.bark()
}
// 参数是Animal类型的，如果此时用户传递一个不带bark方法的Animal类型的参数，则代码会报错
```

**对于 type MakeFunction\<T> = (arg: T) => void 这个类型构造器来说，父子类型关系逆转了，这就是逆变**

### Inferring in Contravariant Position
> 1. Remember, when it comes to function arguments, the more general type will always be the subtype of the more specific one
> 2. compiler converts a union type into an intersection type when inferring in contravariant position

参考：
* [TypeScript 中的子类型、逆变、协变是什么](https://github.com/sl1673495/blogs/issues/54)
* [Covariance and Contravariance in Typescript](https://www.jihadwaspada.com/post/covariance-and-contravariance-in-typescript/)