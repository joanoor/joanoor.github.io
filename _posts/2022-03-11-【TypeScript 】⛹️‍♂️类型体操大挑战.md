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
// ts中通过泛型实现tuple类型
type C<T extends unknown[]> = readonly [...T] 

// NOTE:Remeneber 
type F<S extends unknown[]> = S extends [infer F,...infer R] ? true : false
type F2 = F<[]> 此时F2为false， ✔️ 说明[]不满足[infer F, ...infer R]的约束
type S<S extends string>=S extends `${infer F}${infer R}` ? true : false
type F3 = F<''> 此时F3为false， ✔️ 说明''不满足`${infer F}${infer R}`的约束
```

封装的工具方法：
```ts
// NOTE: Equal，判断两个类型是否相等
type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false

// NOTE: 字符串类型转成数组类型
type StringToArray<S extends string> = S extends `${infer F}${infer R}` ? [F,...StringToArray<R>]:[]

// NOTE: 获取数组长度
type Length<T extends any[]> = T["length"]

// NOTE: 将数字转换成数组
type Range<T extends number = 0, P extends any[] = []> = {
  0: Range<T, [any, ...P]>;
  1: P;
}[Length<P> extends T ? 1 : 0]

// NOTE: Concat，将两个数组类型连在一起
type Concat<T extends any[], P extends any[]> = [...T, ...P]

// NOTE: 加法
type Add<A extends number, B extends number> = Length<
  Concat<Range<A>, Range<B>>
>

// NOTE: 实现Array.Shift
type Shift<T extends any[]> = T extends [any,...infer R] ? R : []

// NOTE: 实现Array.Push
type Push<T extends any[], E extends any = any> = [...T, E]

// NOTE: IsEmpty
type IsEmpty<T extends any[]> = T['length'] extends 0 ? true : false

// NOTE: NotEmpty
type NotEmpty<T extends any[]> = IsEmpty<T> extends true ? false : true

// NOTE: 逻辑与
type And<T extends boolean, U extends boolean> = T extends false 
? false 
: U extends false 
  ? false
  : true

// NOTE: 小于等于
type LessEqList<T extends any[], U extends any[]> = {
  0: LessEqList<Shift<T>, Shift<U>>
  1: true 
  2: false
}[
  And<NotEmpty<T>,NotEmpty<U>> extends true 
  ? 0 
  : IsEmpty<T> extends true 
    ? 1
    : 2
]
type LessEq<T extends number, P extends number> = LessEqList<
  Range<T>,
  Range<P>
>

// NOTE: 减法
type SubList<T extends any[], U extends any[] , Result extends any[] = []> = {
  0: Length<Result>
  1: SubList<Shift<T>, U , Push<Result>>
}[Length<T> extends Length<U> ? 0 : 1]

type Sub<T extends number, P extends number> = {
  0: Sub<P, T>;
  1: SubList<Range<T>, Range<P>>;
}[LessEq<T, P> extends true ? 0 : 1]

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
29. 实现泛型 `AppendArgument<Fn, A>`  
    对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数
    ```ts
    type AppendArgument<Fn extends Function, A> = Fn extends (...args:infer T) => infer R? (...args:[...T,A]) => R : never
    ```
30. 🥇🥇🥇 实现排列组合
    实现Permutation类型，将联合类型转换成所有可能排列的数组组成的联合类型
    ```type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']```
    ```ts
    type Permutation<T, U = T> = [T] extends [never] ? [] : T extends U ? [T, ...Permutation<Exclude<U, T>>] : never
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
38. 实现Diff  
    找出两个对象类型的不同之处
    ```ts
    type Diff<O extends Record<string,unknown>, O1 extends Record<string,unknown>> = {
        [K in (Exclude<keyof O,keyof O1> | Exclude<keyof O1, keyof O>)]: K extends keyof O ? O[K]:K extends keyof O1?O1[K]:never
    }
    ```
39. 🥇🥇 实现AnyOf
    ```ts
    type AnyOf<T extends readonly any[], C= 0 | "" | false | [] | {[propName:string]:never}> = T extends [infer F , ...infer R] 
    ? F extends C ? AnyOf<R> 
    : true : false
    // 或者
    type AnyOf<T extends readonly any[], C= 0 | "" | false | [] | {[propName:string]:never}> = T[number] extends C ? false : true
    ```
40. 实现IsNever
    ```ts
    type IsNever<T> = [T] extends [never] ? true : false 
    ```
41. 实现IsUnion
    ```ts
    type IsUnion<T,U = T> = T extends U ? [U] extends [T] ? false : true : never 
    ```
42. 实现ReplaceKey  
    Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments. 
    ```ts
    type ReplaceKeys<U, T, Y extends Record<string,unknown>, S = U> = U extends S
    ? Extract<keyof U, T> extends never 
    ? U 
    : {
    [K in keyof U]: K extends Extract<keyof U,T> ? K extends keyof Y ? Y[K] : never : U[K]
    }
    : never
    ```
43. 🥇🥇🥇 实现Remove Index Signature  
    例如：
    ```ts
    type Foo = {
    [key: string]: any;
    foo(): void;
    }

    type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
    ```
    ```ts
    type RemoveIndexSignature<T> = {
        [K in keyof T as K extends `${infer R}` ? R : never]: T[K]
    }
    // 或者
    type RemoveIndexSignature<T extends Record<string, any>> = {
        [K in keyof T as [T[K]] extends [undefined] ? never : K]: T[K]
    }
    ```
44. 🥇🥇🥇 实现Percentage Parser  
    实现：
    ```ts
    type PString1 = ''
    type PString2 = '+85%'
    type PString3 = '-85%'
    type PString4 = '85%'
    type PString5 = '85'

    type R1 = PercentageParser<PString1>  // expected ['', '', '']
    type R2 = PercentageParser<PString2>  // expected ["+", "85", "%"]
    type R3 = PercentageParser<PString3>  // expected ["-", "85", "%"]
    type R4 = PercentageParser<PString4>  // expected ["", "85", "%"]
    type R5 = PercentageParser<PString5>  // expected ["", "85", ""]
    ```
    ```ts
    type PercentageParser<S extends string> = S extends `${infer F}${infer R}` ? F extends '+' | '-'
    ? R extends `${infer M}%`
        ? [ F, M , '%']
        : [ F, R, '']
    : S extends `${infer M}%`
        ? [ '', M, '%']
        : [ '', R, '']
    : ['', '', '']
    ```
45. 实现DropChar  
    例如:
    ```ts
    type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
    ```
    ```ts
    type DropChar<S extends string, C extends string> = S extends `${infer T}${C}${infer R}` ? `${T}${DropChar<R,C>}` : S
    ```
46. 实现MinusOne  
    例如：  
    ```ts
    type Zero = MinusOne<1> // 0
    type FiftyFour = MinusOne<55> // 54
    ```
    ```ts
    type MinusOne<T extends number,Result extends number[] = []> = T extends Result['length'] 
    ? Result extends [infer _F,...infer R] 
        ? R['length'] 
        : 0 
    : MinusOne<T, [...Result, T]>
    ```
47. 实现PickByType  
    想要实现如下效果：  
    ```ts
    type OnlyBoolean = PickByType<{
        name: string
        count: number
        isReadonly: boolean
        isEnable: boolean
    }, boolean> // { isReadonly: boolean; isEnable: boolean; }
    ```
    ```ts
    type PickByType<T, U> = {
        [K in keyof T as U extends T[K] ? K :never]: T[K]
    }
    ```
48. 实现StartsWith
    ```ts
    type StartsWith<T extends string, U extends string> = T extends `${U}${infer _R}`
    ? true
    : false
    ```
49. 实现EndsWith
    ```ts
    type EndsWith<T extends string, U extends string> = T extends `${infer _F}${U}`? true : false
    ```
50. 🥇🥇 实现PartialByKeys  
    例如：
    ```ts
    interface User {
        name: string
        age: number
        address: string
    }

    type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
    ```
    ```ts
    type PartialByKeys<T , K = keyof T> = Omit<Omit<T, K & keyof T> & Partial<T>, never>;
    ```
51. 实现RequiredByKeys
    ```ts
    type RequiredByKeys<T , K = keyof T> = Omit<T & Required<Pick<T,K & keyof T>>, never>
    ```
52. 实现Mutable（可变的）
    ```ts
    type Mutable<T> = {
      -readonly [P in keyof T]: T[P]
    }
    ```
53. 实现OmitByType
    ```ts
    type OmitByType<T, U> = {
      [P in keyof T as T[P] extends U ? never : P]: T[P]
    }
    ```
54. 实现ObjectEntries  
    例如：
    ```ts
    interface Model {
      name: string;
      age: number;
      locations: string[] | null;
    }
    type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
    ```
    ```ts
    type ObjectEntries<T, U extends keyof T = keyof T> = U extends unknown 
    ? [U, T[U] extends (infer F | undefined) 
    ? F extends never 
        ? undefined
        : F
    : T[U] ] 
    : never
    ```
55. 实现shift
    ```ts
    type Shift<T> = T extends [infer _F, ...infer R] ? R : never
    ```
56. 实现TupleToNestedObject  
    例如：
    ```ts
    type a = TupleToNestedObject<['a'], string> // {a: string}
    type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
    type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
    ```
    ```ts
    type TupleToNestedObject<T extends string[], U> = T extends [infer F, ...infer R]
    ? {
      [P in F as P extends string ? P : never]: R extends string[] ? TupleToNestedObject<R,U> : never
    }
    : U
    ```
57. [实现Reverse](https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md)
    ```ts
    type Reverse<T extends unknown[], Result extends unknown[] = []> = T extends [infer F, ...infer R]
    ? Reverse<R, [F,...Result]>
    : Result
    ```
58. [FlipArguments 实现Lodash中的_.flip](https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md)
    例如：
    ```ts
    type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
    // (arg0: boolean, arg1: number, arg2: string) => void
    ```
    ```ts
    type Reverse<T extends any[], Result extends any[] = []> = T extends [ infer F, ...infer R] 
    ? Reverse<R, [F, ...Result]> 
    : Result

    type FlipArguments<T extends (...arg:any[])=> any> = (...args:Reverse<Parameters<T>>) => ReturnType<T>
    ```
59. 🥇🥇🥇 [FlattenDepth任意指定深度的数组](https://github.com/type-challenges/type-challenges/blob/main/questions/03243-medium-flattendepth/README.md)  
    例如：
    ```ts
    type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
    type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
    ```
    ```ts
    type FlattenDepth<T extends unknown[], N extends number =1,Result extends unknown[]=[]>=Result['length'] extends N
    ? T
    : T extends [infer F,...infer R]
        ? F extends unknown[]
            ? [...FlattenDepth<F, N, [any,...Result]>, ...FlattenDepth<R, N, Result>]
            : [F,...FlattenDepth<R,N,Result>]
        : T
    // 或者
    type FlattenByCount<T extends unknown[] ,N extends number = 1, Count extends unknown[]=[],U = T[number] > = U extends unknown[] 
    ? Count['length'] extends N
    ? U
    : FlattenByCount<U, N, [...Count, any]>
    : U
    type UnionToIntersectionF<U> = (U extends unknown ? (arg: (x: U) => void) => void : never) extends
    ((arg:infer I)=>void) ? I :never    // 转成了交叉类型

    type LastInUnion<T>=UnionToIntersectionF<T> extends (arg:infer R) => any ? R : never // 或者可以写成 type LastInUnion<T>=UnionToIntersectionF<T> extends {(arg:infer R) : any} ? R : never

    type UnionToTuple<T, U=T>=[T] extends [never] ? [] :[...UnionToTuple<Exclude<U,LastInUnion<T>>>, LastInUnion<T>]

    type FlattenDepth<T extends unknown[],N extends number =1>=UnionToTuple<FlattenByCount<T,N>>
    ```
    参见：
    * [Union To Tuple](https://juejin.cn/post/6987596107866079269)
    * [[TypeScript奇技淫巧] union to tuple](https://zhuanlan.zhihu.com/p/58704376)
60. 🥇🥇 [实现BEM](https://github.com/type-challenges/type-challenges/blob/main/questions/03326-medium-bem-style-string/README.md)  
    例如：**btn__price--warning**
    ```ts
    type BEM<B extends string, E extends string[], M extends string[]> = B extends ''
    ? ''
    : `${B}${E['length'] extends 0 ? '' : `__${E[number]}`}${M['length'] extends 0 ? '' : `--${M[number]}`}`
    ```
    注意：  
    * T[number]会自动迭代数组
      ```ts
      type D=`foo_${['A', 'B', 'C'][number]}`   // type D = "foo_A" | "foo_B" | "foo_C"
      ```
61. [实现InorderTraversal（二叉树中的中序遍历）](https://github.com/type-challenges/type-challenges/blob/main/questions/03376-medium-inordertraversal/README.md)
    ```ts
    interface TreeNode {
      val: number;
      left: TreeNode | null;
      right: TreeNode | null;
    }

    type InorderTraversal<T extends TreeNode | null, S extends NonNullable<T> = NonNullable<T>> = [T] extends [S]
    ? [...InorderTraversal<S['left']>, S['val'], ...InorderTraversal<S['right']>]
    : []
    ```
    参见：
    * [二叉树遍历（前序、中序、后序）](https://juejin.cn/post/6990631860611383310)
62. [实现Flip](https://github.com/type-challenges/type-challenges/blob/main/questions/04179-medium-flip/README.md)  
    例如：
    ```ts
    Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
    Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
    flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
    ```
    ```ts
    type Flip<T extends Record<string | number , string | number | boolean>, U extends keyof T = keyof T> = 
    {
      [P in U as T[P] extends string | number | boolean ? `${T[P]}` : never]: P
    }
    // 或者简写
    type Flip<T extends Record<string | number , string | number | boolean>, U extends keyof T = keyof T> = 
    {
      [P in U as `${T[P]}`]: P
    }
    ```
63. 🥇🥇🥇 [实现Fibonacci Sequence](https://github.com/type-challenges/type-challenges/blob/main/questions/04182-medium-fibonacci-sequence/README.md)  
    例如：
    ```ts
    type Result1 = Fibonacci<3> // 2
    type Result2 = Fibonacci<8> // 21
    ```
    ```ts
    type Fibonacci<T extends number, L extends any[] = [any], V extends any[] = [any], P extends any[] = []> = 
    L extends { length: T } 
    ? V['length'] 
    : Fibonacci<T, [any, ...L], [...V, ...P], V> // L用于计数，V存储当前值，P存储上一次的值
    // 当T为3 时
    // 第一次 L为[any]，V为[any]，P为[]
    // 第二次 L为[any, any]，V为[any]，P为[any]
    // 第三次 L为[any,any,any]，V为[any,any]，P为[any]{length:3}
    // 第四次 L为[any,any,any,any]，V为[any,any,any]，P为[any,any]
    // 第五次 L为[any,any,any,any,any]，V为[any,any,any,any,any],P为[any,any,any]
    // ......
    ```
    参见:   
    * [用ts类型系统实现斐波那契数列](https://juejin.cn/post/6957276082437537828)
    * [https://github.com/type-challenges/type-challenges/issues/6346](https://github.com/type-challenges/type-challenges/issues/6346)
64. [实现AllCombinations](https://github.com/type-challenges/type-challenges/blob/main/questions/04260-medium-nomiwase/README.md)
    ```ts

    ```

65. [实现GreaterThan](https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md)  
    implement a type GreaterThan<T, U> like T > U  
    例如：
    ```ts
    GreaterThan<2, 1> //should be true
    GreaterThan<1, 1> //should be false
    GreaterThan<10, 100> //should be false
    GreaterThan<111, 11> //should be true
    ```
    实现
    ```ts
    type Range<T extends number, P extends any[] = []> = P['length'] extends T
    ? P
    : Range<T, [...P, any]>

    type Pop<T extends any[]> = T extends [...infer F, infer L]
    ? F['length']
    : never

    type GreaterThan<T extends number, U extends number, N = 0> = T extends N
    ? false
    : U extends N
        ? true
        : Pop<Range<T>> extends N
        ? false
        : Pop<Range<U>> extends N
            ? true
            : GreaterThan<Pop<Range<T>>, Pop<Range<U>>, N>
    
    // 或者
    type GreaterThan<
    T extends number,
    U extends number,
    R extends any[] = []
        > = T extends R['length']
        ? false
        : U extends R['length']
            ? true
            : GreaterThan<T, U, [...R, any]>
    ```
66. [实现Zip](https://github.com/type-challenges/type-challenges/blob/main/questions/04471-medium-zip/README.md)  
    Zip<T, U>，其中T和U都是Tuple，例如：
    ```ts
    type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
    ```
    实现：
    ```ts
    type Zip<
    T extends any[],
    U extends any[],
    Result extends any[] = []
    > = T['length'] extends 0
    ? T
    : U['length'] extends 0
        ? T
        : Result['length'] extends T['length']
        ? Result
        : Result['length'] extends U['length']
            ? Result
            : Zip<T, U, [...Result, [T[Result['length']], U[Result['length']]]]>

    // 或者
    type Zip<T extends any[],U extends any[]> = 
    T extends [infer TF,...infer TR]?
        U extends [infer UF,...infer UR]?
        [[TF,UF],...Zip<TR,UR>]
        :[]
    :[]
    ```
67. 🥇 [实现IsTuple](https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md)
    ```ts
    type IsTuple<T extends {length:number}> = T extends readonly [infer _F, ...infer _R]
    ? true
    : T['length'] extends 0
        ? true
        : false

    // 或者
    type IsTuple<T> = 
    T extends readonly any[]
    ? number extends T['length']
        ? false 
        : true
    : false
    ```
68. 🥇 [实现chunk（类似lodash中的chunk）](https://github.com/type-challenges/type-challenges/blob/main/questions/04499-medium-chunk/README.md)
    ```ts
    type Chunk<T extends any[], N extends number, Part extends any[] = []> = T extends [infer F,...infer R]
    ? Part['length'] extends N
        ? [Part, ...Chunk<T, N>]
        : Chunk<R, N , [...Part, F]>
    : Part extends [] 
        ? Part 
        : [Part]
    ```
69. 🥇🥇🥇 [实现fill](https://github.com/type-challenges/type-challenges/blob/main/questions/04518-medium-fill/README.md)  
    例如
    ```ts
    type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
    ```
    代码实现
    ```ts
    type Fill<
    T extends any[],
    N extends any,
    Start extends number = 0,
    End extends number = T["length"],
    Result extends any[] = []
    > = T extends [infer F, ...infer R]
    ? Result["length"] extends Start
        ? Start extends End
            ? [...Result, ...T]
            : Fill<R, N, [...Result, N]["length"] & number, End, [...Result, N]>    // NOTE: &写法很棒
        : Fill<R, N, Start, End, [...Result, F]>
    : Result;
    ```
70. [trimRight](https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.md)
    ```ts
    type TrimRight<S extends string> =  S extends `${infer R}${' ' | '\n' | '\t'}` ? TrimRight<R> : S
    ```
71. [Without](https://github.com/type-challenges/type-challenges/blob/main/questions/05117-medium-without/README.md)  
    Lodash.without
    例如：
    ```ts
    type Res = Without<[1, 2], 1>; // expected to be [2]
    type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
    type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
    ```
    实现： 
    ```ts
    type Expand<T extends number | number[]>= T extends number[]
    ? T[number]
    : T
    type Without<T extends unknown[], U extends number | number[],Result extends unknown[]= []> = T extends [infer F, ...infer R]
    ? F extends Expand<U>
        ? Without<R, U, [...Result]>
        : Without<R, U, [...Result, F]>
    : [...Result,...T]
    ```
72. [Math.trunc（截取操作，对小数会去掉小数部分和小数点）](https://github.com/type-challenges/type-challenges/blob/main/questions/05140-medium-trunc/README.md)
    ```ts
    type Trunc<T extends number | string> = `${T}` extends `${infer F}.${infer R}`
    ? F
    : `${T}`
    ```
73. [indexOf](https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md)  
    例如：
    ```ts
    type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
    type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
    type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
    ```
    代码实现：
    ```ts
    type IndexOf<T extends (string | number)[], U extends string | number, Index extends any[] = []> =Index['length'] extends T['length']
    ? -1
    : `${T[Index['length']]}` extends `${U}`
    ? `${U}` extends `${T[Index['length']]}`
        ? Equal<U, any> extends true
        ? Equal<T[Index['length']], any> extends true
            ? Index['length']
            : IndexOf<T,U,[...Index,any]>
        : Index['length']
        : IndexOf<T,U,[...Index,any]>
    : IndexOf<T, U, [...Index,any]>
    // 这里的Equal是@type-challenges/utils里的工具泛型，可以判断是否是any
    ```
74. [Join](https://github.com/type-challenges/type-challenges/blob/main/questions/05310-medium-join/README.md)  
    例如：
    ```ts
    type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
    type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
    type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
    type Res3 = Join<["o"], "u">; // expected to be 'o'
    ```
    代码实现：
    ```ts
    type Join<T extends any[], U extends string | number> = T extends [infer F, ...infer R]
    ? R['length'] extends 0
        ? F
        : `${F & string}${U}${Join<R,U> & string}`      // NOTE: &写法再次出现
    : ''
    ```
75. [LastIndexOf](https://github.com/type-challenges/type-challenges/blob/main/questions/05317-medium-lastindexof/README.md)  
    从右向左开始查找
    ```ts
    type Pop<T extends any[]> = T extends [...infer F, infer L] ? F :never
    type LastIndexOf<T extends (string | number)[], U extends string | number, Index extends any[] = T> = Index['length'] extends 0
        ? -1
        : `${T[Pop<Index>['length']]}` extends `${U}`
        ? `${U}` extends `${T[Pop<Index>['length']]}`
            ? Equal<U, any> extends true
            ? Equal<T[Pop<Index>['length']], any> extends true
                ? Pop<Index>['length']
                : LastIndexOf<T,U,Pop<Index>>
            : Pop<Index>['length']
            : LastIndexOf<T,U,Pop<Index>>
        : LastIndexOf<T, U, Pop<Index>>
    // 这里的Equal是@type-challenges/utils里的工具泛型，可以判断是否是any
    ```
76. [实现lodash中的unique操作](https://github.com/type-challenges/type-challenges/blob/main/questions/05360-medium-unique/README.md)
    ```ts
    type IndexOf<T extends any[], U extends any, Index extends any[] = []> =Index['length'] extends T['length']
    ? -1
    : Equal<T[Index['length']], U> extends true
        ? Index['length']
        : IndexOf<T,U,[...Index,any]>

    type Unique<T extends any[], Result extends any[]=[]> = T extends [infer F , ...infer R]
    ? IndexOf<Result, F> extends -1
        ? Unique<R, [...Result, F]>
        : Unique<R, [...Result]>
    : Result
    ```
77. 🥈🥈🥈 [实现MapTypes](https://github.com/type-challenges/type-challenges/blob/main/questions/05821-medium-maptypes/README.md)  
    ```ts
    type MapTypes<T extends Record<string,any>, R extends Record<'mapFrom' | 'mapTo', any>, U = R> = {
                    [K in keyof T]: Equal<T[K], R['mapFrom']> extends true 
                                    ? R['mapTo']
                                    : T[K] extends R['mapFrom'] 
                                        ? U extends R 
                                        ? Equal<T[K], U['mapFrom']> extends true
                                            ? U['mapTo']
                                            : never
                                        : never
                                        : T[K]
                    }
    // 或者
    type MapTypes<T, R extends {mapFrom:any,mapTo:any}> = {
        [key in keyof T]: [R extends {mapFrom:T[key]} ? R['mapTo']: never] extends [never]
        ? T[key]
        : R extends {mapFrom:T[key]} ? R['mapTo'] : never
    }
    ```
78. [实现Construct Tuple](https://github.com/type-challenges/type-challenges/blob/main/questions/07544-medium-construct-tuple/README.md)
    ```ts
    type ConstructTuple<L extends number, Result extends unknown[] = []> = Result['length'] extends L
    ? Result
    : ConstructTuple<L, [...Result, unknown]>
    ```
79. [实现Number Range](https://github.com/type-challenges/type-challenges/blob/main/questions/08640-medium-number-range/README.md)
    ```ts
    type ConstructTuple<
    L extends number, 
    Result extends number[] = []
    > = Result['length'] extends L
        ? [...Result,1]
        : ConstructTuple<L, [...Result, 1]>

    type NumberRange<
    L extends number, 
    H extends number, 
    Temp extends number[] = ConstructTuple<L>, 
    Result extends unknown[] = [L]
    > = L extends H
        ? Result[number]
        : NumberRange<Temp['length'], H ,[...Temp, 1],[...Result,Temp['length']]>
    ```
    