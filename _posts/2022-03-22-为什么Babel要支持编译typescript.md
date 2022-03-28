
### Typescript编译的两种方式
1. 使用typescript自带的编译器编译
2. 使用Babel+@babel/preset-typescript编译

### **TL;DR**
1. Babel 编译没有类型检查，部分语法不支持；
2. Babel 编译一定要配合 TS 编译器一起使用；
3. Babel 编译有其自身优势；
4. Babel 与 TypeScript 结合是最好的选择；

### Babel编译劣势 🐛
Babel编译typescript是不做类型检查的，或者说，所有的类型声明都会被Babel抛弃掉，且Babel是不支持部分语法的（主要是一些Typescript不推荐的旧语法）

### Babel编译优势 🎉
1. Babel能根据目标环境转移指定语法，TS自带编译器时不支持的  
2. Babel能根据目标环境自动添加polyfill，TS自带编译器也是不支持的
3. Babel有插件机制，TS自带编译器也不支持

### 总结 🦓
Babel 支持编译 TypeScript 才是最好的选择
Babel（@babel/preset-typescript）用于转义，ts自带编译器用于类型检查和生成声明文件

附录：  
1. [TypeScript and Babel 7](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/)
2. [为什么 Babel 要支持编译 TypeScript](https://juejin.cn/post/6844904031643664397)
3. [Using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)