
<div style="font-size:20px;font-weight:700;margin-bottom:10px">TL;DR 🥇 </div> 
TypeScript 给 JavaScript 扩展了类型的语法，而且还支持了高级类型来生成类型。高级类型是通过 type 声明的带有类型参数的类型，类型参数也叫泛型。根据类型参数生成最终类型的类型计算逻辑被戏称为类型体操。

TypeScript 给 JavaScript 扩展了类型的语法，我们可以给变量加上类型，在编译期间会做类型检查，配合编辑器还能做更准确的智能提示。此外，TypeScript 还支持了高级类型用于增加类型系统的灵活性。

就像 JavaScript 的高阶函数是生成函数的函数，React 的高阶组件是生成组件的组件一样，Typescript 的高级类型就是生成类型的类型。

TypeScript 高级类型是通过 type 定义的有类型参数（也叫泛型）的类型，它会对传入的类型参数做一系列的类型计算，产生新的类型。

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
比如，这个 Pick 就是一个高级类型，它有类型参数 T 和 K，类型参数经过一系列的类型计算逻辑，会返回新的类型。

TypeScript 高级类型会根据类型参数求出新的类型，这个过程会涉及一系列的类型计算逻辑，这些类型计算逻辑就叫做类型体操。当然，这并不是一个正式的概念，只是社区的戏称，因为有的类型计算逻辑是比较复杂的。

TypeScript 的类型系统是图灵完备的，也就是说它能描述任何可计算逻辑，简单点来说就是循环、条件判断等该有的语法都有。

既然 TypeScript 的类型系统这么强，那我们就做一些高级类型的类型体操来感受下吧。

我们会做这些体操：

用 ts 类型实现加法

用 ts 类型生成重复 N 次的字符串

用 ts 类型实现简易的 js parser（部分）

用 ts 类型实现对象属性按条件过滤

我把这些体操分为数字类的、字符串类的、对象类的，把这三种类型计算逻辑的规律掌握了，相信你的体操水平会提升一截。

TypeScript 类型语法基础
在做体操之前，要先过一下 TypeScript 的类型语法，也就是能做哪些类型计算逻辑。

既然说该有的语法都有，那我们来看下循环和判断都怎么做：

ts 类型的条件判断
来做操吧！深入 TypeScript 高级类型和类型体操  第1张

ts 类型的条件判断的语法是 条件 ? 分支1 : 分支2 。

extends 关键字是用于判断 A 是否是 B 类型的。例子中传入的类型参数 T 是 1，是 number 类型，所以最终返回的是 true。

ts 类型的循环
来做操吧！深入 TypeScript 高级类型和类型体操  第2张 ts 类型没有循环，但可以用递归来实现循环。

我们要构造一个长度为 n 的数组，那么就要传入长度的类型参数 Len、元素的类型参数 Ele、以及构造出的数组的类型参数 Arr（用于递归）。

然后类型计算逻辑就是判断 Arr 的 length 是否是 Len，如果是的话，就返回构造出的 Arr，不是的话就往其中添加一个元素继续构造。

这样，我们就递归的创建了一个长度为 Len 的数组。

ts 类型的字符串操作
ts 支持构造新的字符串：

来做操吧！深入 TypeScript 高级类型和类型体操  第3张

也支持根据模式匹配来取字符串中的某一部分：

来做操吧！深入 TypeScript 高级类型和类型体操  第4张

因为 str 符合 aaa, 的模式，所以能够匹配上，把右边的部分放入通过 infer 声明的局部类型变量里，之后取该局部变量的值返回。

ts 类型的对象操作
ts 支持对对象取属性、取值：

来做操吧！深入 TypeScript 高级类型和类型体操  第5张

也可以创建新的对象类型：

来做操吧！深入 TypeScript 高级类型和类型体操  第6张

通过 keyof 取出 obj 的所有属性名，通过 in 遍历属性名并取对应的属性值，通过这些来生成新的对象类型 newObj。

我们过了一下常用的 ts 类型的语法，包括条件判断、循环（用递归实现）、字符串操作（构造字符串、取某部分子串）、对象操作（构造对象、取属性值）。接下来就用这些来做操吧。

ts 类型体操练习
我们把体操分为 3 类来练习，之后再分别总结规律。

数字类的类型体操
体操 1： 实现高级类型 Add，能够做数字加法。
ts 类型能做数字加法么？ 肯定可以的，因为它是图灵完备的，也就是各种可计算逻辑都可以做。

那怎么做呢？

数组类型可以取 length 属性，那不就是个数字么。可以通过构造一定长度的数组来实现加法。

上文我们实现了通过递归的方式实现了构造一定长度的新数组的高级类型：

type createArray<Len, Ele, Arr extends Ele[] = []> =  Arr['length'] extends Len ? Arr : createArray<Len, Ele, [Ele, ...Arr]>
那只要分别构造两个不同长度的数组，然后合并到一起，再取 length 就行了。

type Add<A extends number, B extends number> = [...createArray<A, 1>, ...createArray<B, 1>]['length']
我们测试下：

来做操吧！深入 TypeScript 高级类型和类型体操  第7张

我们通过构造数组的方式实现了加法！

小结下：ts 的高级类型想做数字的运算只能用构造不同长度的数组再取 length 的方式，因为没有类型的加减乘除运算符。

字符串类的体操
体操2：把字符串重复 n 次。
字符串的构造我们前面学过了，就是通过 ${A}${B} 的方式，那只要做下计数，判断下重复次数就行了。

计数涉及到了数字运算，要通过构造数组再取 length 的方式。

所以，我们要递归的构造数组来计数，并且递归的构造字符串，然后判断数组长度达到目标就返回构造的字符串。

所以有 Str（待重复的字符串）、Count（重复次数）、Arr（用于计数的数组）、ResStr（构造出的字符串）四个类型参数：

type RepeactStr<Str extends string,
                Count, 
                Arr extends Str[] = [],
                ResStr extends string = ''> 
 = Arr['length'] extends Count 
 ? ResStr 
 : RepeactStr<Str,Count, [Str, ...Arr], `${Str}${ResStr}`>;
我们递归的构造了数组和字符串，判断构造的数组的 length 如果到了 Count，就返回构造的字符串 ResStr，否则继续递归构造。

测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第8张

小结：递归构造字符串的时候要通过递归构造数组来做计数，直到计数满足条件，就生成了目标的字符串。

这个体操只用到了构造字符串，没用到字符串通过模式匹配取子串，我们再做一个体操。

体操3: 实现简易的 JS Parser，能解析字符串 add(11,22) 的函数名和参数
字符串的解析需要根据模式匹配取子串。这里要分别解析函数名（functionName）、括号（brackets）、数字（num）、逗号（comma），我们分别实现相应的高级类型。

解析函数名
函数名是由字母构成，我们只要一个个字符一个字符的取，判断是否为字母，是的话就记录下该字符，然后对剩下的字符串递归进行同样的处理，直到不为字母的字符，通过这样的方式就能取出函数名。

我们先定义字母的类型：

type alphaChars = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
    | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
还有保存中间结果的类型：

type TempParseResult<Token extends string, Rest extends string> = {
    token: Token,
    rest: Rest
}
然后就一个个取字符来判断，把取到的字符构造成字符串存入中间结果：

type parseFunctionName<SourceStr extends string, Res extends string = ''> 
  = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends alphaChars 
    ?  parseFunctionName<RestStr, `${Res}${PrefixChar}`> 
    : TempParseResult<Res, SourceStr> 
    : never;
我们取了单个字符，然后判断是否是字母，是的话就把取到的字符构造成新的字符串，然后继续递归取剩余的字符串。

测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第9张

来做操吧！深入 TypeScript 高级类型和类型体操  第10张

符合我们的需求，我们通过模式匹配取子串的方式解析出了函数名。

然后继续解析剩下的。

解析括号
括号的匹配也是同样的方式，而且括号只有一个字符，不需要递归的取，取一次就行。

type brackets = '(' | ')';
type parseBrackets<SourceStr> 
    = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends brackets 
    ?  TempParseResult<PrefixChar, RestStr> 
    : never 
    : never;
测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第11张

继续解析剩下的：

解析数字
数字的解析也是一个字符一个字符的取，判断是否匹配，匹配的话就递归取下一个字符，直到不匹配：

type numChars = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type parseNum<SourceStr extends string, Res extends string = ''> 
    = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends numChars 
    ? parseNum<RestStr, `${Res}${PrefixChar}`> 
    : TempParseResult<Res, SourceStr> 
    : never;
测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第12张

继续解析剩下的：

解析逗号
逗号和括号一样，只需要取一个字符判断即可，不需要递归。

type parseComma<SourceStr extends string> 
    = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends ',' 
    ?  TempParseResult<',', RestStr> 
    : never 
    : never;
测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第13张

至此，我们完成了所有的字符的解析，解析来按照顺序组织起来就行。

整体解析
单个 token 的解析都做完了，整体解析就是组织下顺序，每次解析完拿到剩余的字符串传入下一个解析逻辑，全部解析完，就可以拿到各种信息。

type createArray<Len, Ele, Arr extends Ele[] = []> =  Arr['length'] extends Len ? Arr : createArray<Len, Ele, [Ele, ...Arr]>0
测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第14张

大功告成，我们用 ts 类型实现了简易的 parser！

小结：ts 类型可以通过模式匹配的方式取出子串，我们通过一个字符一个字符的取然后判断的方式，递归的拆分出 token，然后按照顺序拆分 token，就能实现字符串的解析。

完整代码如下：

type numChars = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type alphaChars = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
    | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

type TempParseResult<Token extends string, Rest extends string> = {
    token: Token,
    rest: Rest
}

type parseFunctionName<SourceStr extends string, Res extends string = ''> = 
    SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends alphaChars 
    ?  parseFunctionName<RestStr, `${Res}${PrefixChar}`> 
    : TempParseResult<Res, SourceStr> 
    : never;

type brackets = '(' | ')';
type parseBrackets<SourceStr> 
    = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends brackets 
    ?  TempParseResult<PrefixChar, RestStr> 
    : never 
    : never;

type parseNum<SourceStr extends string, Res extends string = ''> 
    = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends numChars 
    ? parseNum<RestStr, `${Res}${PrefixChar}`> 
    : TempParseResult<Res, SourceStr> 
    : never;

type parseComma<SourceStr extends string> 
    = SourceStr extends `${infer PrefixChar}${infer RestStr}` 
    ?  PrefixChar extends ',' 
    ?  TempParseResult<',', RestStr> 
    : never 
    : never;

type createArray<Len, Ele, Arr extends Ele[] = []> =  Arr['length'] extends Len ? Arr : createArray<Len, Ele, [Ele, ...Arr]>0

type res = parse<'add(11,2)'>;
对象类的体操
体操4：实现高级类型，取出对象类型中的数字属性值
构造对象、取属性名、取属性值的语法上文学过了，这里组合下就行：

type createArray<Len, Ele, Arr extends Ele[] = []> =  Arr['length'] extends Len ? Arr : createArray<Len, Ele, [Ele, ...Arr]>2
我们构造一个新的对象类型，通过 keyof 遍历对象的属性名，然后对属性值做判断，如果不是数字就返回 never，然后再取属性值。

属性值返回 never 就代表这个属性不存在，就能达到过滤的效果。

测试一下：

来做操吧！深入 TypeScript 高级类型和类型体操  第15张

小结：对象类型可以通过 {} 构造新对象，通过 [] 取属性值，通过 keyof 遍历属性名，综合这些语法就可以实现各种对象类型的逻辑。

总结
TypeScript 给 JavaScript 扩展了类型的语法，而且还支持了高级类型来生成类型。

高级类型是通过 type 声明的带有类型参数的类型，类型参数也叫泛型。根据类型参数生成最终类型的类型计算逻辑被戏称为类型体操。

TypeScript 的类型系统是图灵完备的，可以描述任何可计算逻辑：

有 ? : 可以做条件判断，常配合 extends 使用

通过递归可以实现循环

可以做对象的构造 {}、取属性名 keyof、取属性值 T[Key]

可以做字符串的构造 ${a}${b}，字符串的模式匹配来取子串 str extends ${infer x}${infer y}

我们分别做了这些类型体操：

ts 实现加法：通过递归构造数组再取长度

ts 实现重复字符串：递归构造数组来计数，然后递归构造字符串

ts 实现 parser：通过字符串模式匹配取子串的方式来解析每一部分，最后组合调用

ts 实现对象属性过滤：通过构造对象、取属性名、取值的语法组合调用

其中要注意的就是数字类的要通过构造数组取长度的方式来计算，再就是字符串的模式匹配结合 infer 保存中间结果来取子串，这两个是相对难度大一些的。

其实各种高级类型，只要熟悉了 ts 类型语法，想清楚了逻辑就能一步步写出来，和写 JS 逻辑没啥本质区别，只不过它是用于生成类型的逻辑。

读到这里，是不是感觉高级类型的类型体操也没有啥难度了呢？

附录：  
1、[来做操吧！深入 TypeScript 高级类型和类型体操](https://www.shouxicto.com/article/2818.html)  
2、[接近天花板的TS类型体操，看懂你就能玩转TS了](https://juejin.cn/post/7061556434692997156)