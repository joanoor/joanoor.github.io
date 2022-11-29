# dart语法简介
dart中：
1. 万物皆是对象
2. dart是强类型的，但是dart支持类型推断，可以声明时赋初值来推断变量类型
3. 当null safety时，int? x表示x可能是int也可能是null
4. dynamic或者Object? Object类型
5. 泛型
6. top-level函数
7. top-level变量
8. dart没有public、protected和private修饰符
9. 标识符由字母或下划线开头
10. 表达式（有运行时值）和语句（没有值），例如三元运算表达式和if else语句
11. 

## 注释
* // 单行注释  
* /**/ 多行注释  
* /// 可以生成文档的注释

## 变量
```dart
var name = 'Bob'
Object name = 'Bob'
String name = 'Bob
```
建议：对于本地变量，使用var而不是类型注解来声明

### 默认值
* 没有初始化的变量有一个nullable类型，拥有初始默认值null ```int? lineCount``` （本地变量声明的时候无需初始化）
* late修饰符
  * 在声明之后初始化一个non-nullable变量
  * 懒初始化一个变量
  ```dart
  late String temperature = readThermometer()
  ```
  如果temperature从未使用，那么readThermometer则永远不会调用
* final和const
  用final修饰的变量，只能设置一次。用const来定义编译时常量。const比final更严格

## 内置类型
* int
* double
* String
* bool
* List
* Set
* Map
* Runes
* Symbol
* Null
* Object
* Enum
* Future
* Stream
* Iterable
* Never
* dynamic
* void

## Function
* 命名参数
  ```dart
  void enableFlags({bool? bold, bool? hidden}) {}
  ```
* 位置参数
  ```dart
  String say(String from, String msg, [String? device]) {
    var result = '$from says $msg';
    if (device != null) {
      result = '$result with a $device';
    }
    return result;
  }
  ```


## 操作符
