---
layout: post
title: ts类型体操大挑战
categories: 设计模式
tags: [设计模式, ts]
---

### 在线挑战
[https://github.com/joanor/type-challenges](https://github.com/joanor/type-challenges)

注意：类型操作符跟普通的运算符是不一样的，类型操作符有extends、typeof、in、keyof、索引[index:string]等，例如实现Equal操作  
例如：
```ts
// ts中实现Equal，判断两个类型是否相等
type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false

// ts中通过泛型实现tuple类型
type C<T extends unknown[]> = readonly [...T] 

// ts将字符串转成数组类型
type StringToArray<S extends string> = S extends `${infer F}${infer R}` ? [F,...StringToArray<R>]:[]

// NOTE:Remeneber 
type F<S extends unknown[]>=S extends [infer F,...infer R] ? true : false
type F2=F<[]> 此时F2为false， ✔️ 说明[]不满足[infer F, ...infer R]的约束
type S<S extends string>=S extends `${infer F}${infer R}` ? true : false
type F3=F<''> 此时F3为false， ✔️ 说明''不满足`${infer F}${infer R}`的约束
```

1. Pick
   ```ts
    type MyPick<T, K extends keyof T> = {
      [P in K]:T[P]
    }
   ```
2. Readonly
   ```ts
   type MyReadonly<T> = {
     readonly [P in keyof T]:T[P]
   }
   ```
3. TupleToObject  将元组类型转换成对象
   ```ts
   type TupleToObject<T extends readonly any[]> = {
     [P in T[number]]:P
   }
   ```
4. 第一个元素——返回数组的第一个元素的类型
   ```ts
   type First<T extends any[]> = T extends [] ? never : T[0]
   ```
5. 创建一个通用的Length，接受一个readonly的数组，返回此数组的长度
   ```ts
   type Length<T extends readonly any[]> =T['length']
   ```
6. 实现Exclude
   ```ts
   type Exlude<T,U> = T extends U ? never : T
   ```
7. 实现Awaited
   ```ts
   type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T
   ```
8. 实现If
   ```ts
   type If<C extends boolean, T, F> = C extends true ? T : F
   ```
9. 实现Concat
   ```ts
   type Concat<T extends any[], U extends any[]> = [...T,...U]
   ```
10. 实现Includes
    ```ts
    type Includes<T extends readonly any[], U> = T extends [infer F,...infer R] ? (Equal<F,U> extends true ? true : Includes<R,U>) : false
    ```
11. 实现push
    ```ts
    type Push<T extends any[], U> = [...T, U] 
    ```
12. 实现UnShift
    ```ts
    type Unshift<T extends any[], U> = [U,...T]
    ```
13. 实现Parameters
    ```ts
    type MyParameters<T extends (...args: any[]) => any> = T extends (...args:infer R)=>any ? R :T
    ```
14. 实现ReturnType
    ```ts
    type MyReturnType<T> = T extends (...args: any[])=>infer R ? R :never
    ```
15. 实现Omit
    ```ts
    type MyOmit<T, K extends keyof T> = {
      [P in Exclude<keyof T, K>]:T[P]
    }
    // type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
    ```
16. 实现Readonly2（实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。`K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样）
    ```ts
    type MyReadonly2<T, K extends keyof T = keyof T> = {
      [P in Exclude<keyof T,K>] : T[P]
    } & {
      readonly [P in K]: T[P]
    }
    // type MyReadonly2<T, K extends keyof T=keyof T> = Omit<T, K> & Readonly<Pick<T, K>>
    ```
17. 实现深度Readonly
    ```ts
    T extends Record<any,any> ? {
    readonly [P in keyof T]: DeepReadonly<T[P]>
    } : Readonly<T>
    // [key in keyof T]: T[key] extends Record<string, unknown> ? DeepReadonly<T[key]> : T[key]
    ```
18. 实现返回数组元素所有值的合集
    ```ts
    type TupleToUnion<T extends unknown[]> = T extends Array<infer E>? E :never 
    // type TupleToUnion<T extends unknown[]> = T[number]
    // type TupleToUnion<T extends unknown[]> = T extends [infer F,...infer Rest]? F | TupleToUnion<Rest> :never 
    ```
19. 🥇 实现可选链构造器
    ```ts
    type Chainable<T = {}> = {
      option<K extends string,V>(key: K, value: V): Chainable<T & {
         [k in K]:V
      }>
      get():T
    }

    // 例如：
    declare const config: Chainable

    const result = config
      .option('foo', 123)
      .option('name', 'type-challenges')
      .option('bar', { value: 'Hello World' })
      .get()

      // 期望 result 的类型是：
    interface Result {
      foo: number
      name: string
      bar: {
         value: string
      }
    }
    ```
20. 获取数组类型的最后一个元素的类型
    ```ts
    type Last<T extends any[]> = T extends [infer F,...infer R]? R['length'] extends 0? F : Last<R> :never
    // type Last<T extends any[]> = [any, ...T][T['length']]
    // type Last<T extends any[]> = T extends [...unknown[], ...infer L] ? L : never
    ```
21. 实现通用Pop<T>，它接受一个数组T并返回一个没有最后一个元素的数组
    ```ts
    type Pop<T extends any[]> = T extends [...infer F, infer L] ? F :never
    // type Pop<T extends any[]> = T extends [...infer F, unknown] ? F :never
    ```
22. 🥇 实现函数promiseAll，它接收PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组
    ```ts
    declare function promiseAll<T extends unknown[]>(value: readonly [...T]): Promise<{[K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]}>
    // ts中数组不仅可以通过any[]或者Array<number>这些方式，还可以
    // type ARR={[propName:number]: any} 采用这种方式
    ```
23. 实现：
    例如：通过在联合Dog | Cat中搜索公共type字段来获取响应的类型，```LookUp<Dog | Cat, 'cat'>``` 获得Dog
    ```ts
    interface Cat {
      type: 'cat'
      breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
    }

    interface Dog {
      type: 'dog'
      breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
      color: 'brown' | 'white' | 'black'
    }

    type LookUp<U, T extends string> = U extends {type:string}? U['type'] extends T ? U : never : never
    // type LookUp<U extends {type:string},T extends string> = U extends {type:`${T}`} ? U :never
    ```
24. 实现TrimLeft
    ```ts
    type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : S
    ```
25. 🥇🥇 实现Trim
    ```ts
    type Trim<T extends string> = T extends `${' ' | '\n' | '\t'}${infer Rest}` | `${infer Rest}${' ' | '\n' | '\t'}` ? Trim<Rest> : T;
    ```
26. 🥇 实现Capitalize
    ```ts
    type MyCapitalize<S extends string> = S extends `${infer F}${infer Rest}` ? `${Uppercase<F>}${Rest}` : S
    ```
27. 🥇 实现replace
    ```ts
    type Replace<S extends string, From extends string, To extends string> = S extends `${infer U}${From}${infer V}` ? From extends '' ? `${U}${From}${V}` : `${U}${To}${V}` : S;
    ```
28. 🥇🥇 实现replaceAll
    ```ts
    type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer F}${From}${infer R}` ? `${F}${To}${ReplaceAll<R,From,To>}`:S
    ```
29. 实现泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数
    ```ts
    type AppendArgument<Fn extends Function, A> = Fn extends (...args:infer T) => infer R? (...args:[...T,A]) => R : never
    ```
30. 🥇🥇🥇 实现排列组合
    实现Permutation类型，将联合类型转换成所有可能排列的数组组成的联合类型
    ```type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']```
    ```ts
    type Permutation<T, U = T> = [T] extends [never] ? [] : T extends U ? [T, ...Permutation<Exclude<U, T>>] : T
    ```
31. 实现Length of String
    ```ts
    type LengthOfString<S extends string,T extends string[]=[]>=S extends '' ? T['length'] : S extends `${infer F}${infer R}` ? LengthOfString<R,[...T,F]> : never
    ```
32. 实现Flatten
    ```ts
    type Flatten<S extends unknown, Result extends unknown[] = []> = S extends [] ? Result : S extends [infer F,...infer R] ? Flatten<R, [...Result, ...Flatten<F>]> : [S,...Result]
    ```
33. 实现Append to object  
    假设 type Test={id : '1'}  
    期望 type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
    ```ts
    type AppendToObject<T extends Record<string, unknown>, U extends string, V extends unknown> = {
      [K in (keyof T | U)]: K extends U ? V: T[K]
    }
    ```
34. 🥇🥇 实现Absolute  
    A type that take string, number or bigint. The output should be a positive number string
    ```ts
    type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`
    ```
35. 实现merge  
    Merge two types into a new type. Keys of the second type overrides keys of the first type
    ```ts
    type Merge<F extends Record<string,unknown>, S extends Record<string,unknown>> = {
      [K in keyof F | keyof S]: K extends Extract<keyof F,keyof S> ? S[K] : K extends keyof F ? F[K]: K extends keyof S? S[K]:never
    }
    ```
36. 实现CamelCase
    ```ts
    type CamelCase<S extends string> = S extends `${infer F}-${infer R}` ? (R extends Capitalize<R> ? `${F}-${CamelCase<R>}` : `${F}${CamelCase<Capitalize<R>>}`) : S
    ```
37. 实现KebabCase
    ```ts
    type KebabCase<S> = S extends `${infer F}${infer L}` ? L extends Uncapitalize<L> ? `${Lowercase<F>}${KebabCase<L>}` : `${Lowercase<F>}-${KebabCase<L>}` : S
    ```
