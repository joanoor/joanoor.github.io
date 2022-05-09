---
layout: post
title: ts装饰器和元编程
categories: 装饰器
tags: [ts]
---


## 装饰器简介
装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上，可以修改类的行为。 装饰器使用 @expression这种形式，expression求值后必须为一个函数。<span style="font-weight:700;color:red">装饰器本质上就是一个函数，理论上忽略参数的话，任何函数都可以当作装饰器使用</span>

## 装饰器执行时机
装饰器在ts编译阶段运行代码，也就是说，装饰器本质就是编译时执行的函数

## 四种装饰器
1. 类装饰器 ClassDecorator
2. 属性装饰器 PropertyDecorator
3. 方法装饰器 MethodDecorator
4. 参数装饰器 ParameterDecorator

## 装饰器加载顺序
```ts
function ClassDecorator() {
    return function (target) {
        console.log("I am class decorator");
    }
}
function MethodDecorator() {
    return function (target, methodName: string, descriptor: PropertyDescriptor) {
        console.log("I am method decorator");
    }
}
function Param1Decorator() {
    return function (target, methodName: string, paramIndex: number) {
        console.log("I am parameter1 decorator");
    }
}
function Param2Decorator() {
    return function (target, methodName: string, paramIndex: number) {
        console.log("I am parameter2 decorator");
    }
}
function PropertyDecorator() {
    return function (target, propertyName: string) {
        console.log("I am property decorator");
    }
}

@ClassDecorator()
class Hello {
    @PropertyDecorator()
    greeting: string;


    @MethodDecorator()
    greet( @Param1Decorator() p1: string, @Param2Decorator() p2: string) { }
}
```
输出结果：
```css
I am property decorator
I am parameter2 decorator
I am parameter1 decorator
I am method decorator
I am class decorator
```

1、有多个参数装饰器时：从最后一个参数依次向前执行  
2、方法和方法参数中参数装饰器先执行。  
3、类装饰器总是最后执行。  
4、方法和属性装饰器，谁在前面谁先执行