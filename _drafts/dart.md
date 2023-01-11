# dart语法简介
1. 万物皆是对象
2. 尽管dart是强类型的，但是由于dart支持类型推断，所以声明变量时，可以通过var关键字而不指定类型
3. dart建议指定每一个函数的返回值和参数类型
4. dart类是单继承的
5. dart没有interface关键字，所有的类隐式定义了一个接口
6. 当null safety时，_int? x_ 表示x可能是int也可能是null
7. dynamic或者Object? Object类型
8. 泛型
9. top-level函数
10. top-level变量
11. dart没有public、protected和private修饰符
12. 标识符由字母或下划线开头
13. 表达式（有运行时值）和语句（没有值），例如三元运算表达式和if else语句

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

## 控制流

## 异常

## 类
```dart
class Point {
  var naam;
  var kaam;
  Point(this.naam, this.kaam);

  int get hasCode {
    int result = 11 * naam.hashCode;
    result = 13 * (result + kaam.hashCode);
    return result;
  }

  bool operator ==(dynamic otherObj) {
    return (otherObj is Point) &&
        (otherObj.naam == naam) &&
        (otherObj.kaam == kaam);
  }
}
```
### 类成员

### 构造函数
* dart中的构造函数是类用来实例化类对象并且 **与类名同名** 的方法
* 当命名冲突的时候才使用this，否则dart的编程风格会忽略this
* **构造函数不能被继承**
* 如果实例变量在声明的时候没有初始化，那么在构造函数中必须要进行初始化
* 构造函数分类：
  1. 默认构造函数，(Dart会为每一个类自动声明构造函数，no argument, no name)
  2. 普通构造函数
      ```dart
      class Fish{
        String name;
        String type;
        
        Fish(String name,String type){
          this.name = name; // 使用this关键字，是为了防止参数名和属性名发生冲突
          this.type = type; // 使用this关键字，是为了防止参数名和属性名发生冲突
        }
      }
      ```
      构造参数简洁写法（初始化形参，初始化形参引入的变量是隐式final类型的，并且仅在initializer list的作用域范围内）
      ```dart
      class Fish{
        String name;
        String type；
        
        Fish(this.name,this.type);
      }
      ```
  3. 命名构造函数：```ClassName.identifier```
      ```dart
      class Fish {
        String name;
        String type;
        Fish(this.name, this.type); // 常见的构造函数
        Fish.born(String name, String type) // 命名构造函数
            : name = name,
              type = type {
        }

      /*
      * 或者像下面这样
      * Fish.born(String name, String type)
          : this.name = name,
            this.type = type;
      */

        void sayHello() {
          print('我是${this.name},我的类型是${this.type}');
        }
      }
      ```
      **注意：**  
      > 它还是不能被子类继承，但是可以重写父类名称相同的命名构造函数。
  4. 重定向构造函数  
     有时构造函数的目的仅仅是重定向到同一个类下的其他的构造函数。构造函数体时空的。
     ```dart
      class Point {
        double x, y;

        // The main constructor for this class.
        Point(this.x, this.y);

        // Delegates to the main constructor.
        Point.alongXAxis(double x) : this(x, 0);
      }
     ```
  5. 常量构造函数：假设类创建的对象永远不会改变，可以在编译期就创建这个常量实例，并且定义一个常量构造函数，并且确保所有的成员变量都是final的
      ```dart
      class ImmutablePoint {
        static final ImmutablePoint origin = const ImmutablePoint(0, 0);

        final num x, y;

        const ImmutablePoint(this.x, this.y);
      }
      ```
  6. 工厂构造函数  
      * 不会自动实例化，需要在工厂构造函数体中进行判断
      * 工厂构造函数体中不能使用this关键字
      ```dart
      class Fish{
        String name;
        String type；
        
        // Fish 单例具体实现
        static Fish fish;
        
        Fish._born(this.name):age = 0
        
        factory Fish(){
          if(fish == null){
             fish = Fish._born('单例鱼');
          }
          return fish;
        }
      }

      void main(){
          Fish fish = new Fish();
          print(fish.name);
      }
      ```
* 当子类调用父类的默认构造函数时的执行顺序
  1. 初始化列表  
  2. 父类的no-argument, no-name构造函数  
  3. 子类的no-argument, no-name构造函数
* 当父类没有no-argument, no-name的构造函数，只有命名构造函数（一个或多个），那么子类必须手动调用父类的一个命名构造函数，例如：
  ```dart
  class Person {
    String? firstName;
    Person.fromJson(Map data) {
      print('in Person');
    }
  }

  class Employee extends Person {
    Employee(super.data) : super.fromJson() {
      print('in Employee');
    }

    Employee.fromJson(super.data) : super.fromJson() {
      print('in Employee2');
    }
  }

  void main(List<String> args) {
    var employee = Employee.fromJson({});
    print(employee);
  }
  ```

* 初始化列表
  ```dart
  class Point {
    Point.fromJson(Map<String, double> json)
      : x = json['x']!,
        y = json['y']! {
      print('In Point.fromJson(): ($x, $y)');
    }
  }
  ```



### 获取对象的类型
通过对象的runtimeType属性
```dart
print('The type of a is ${a.runtimeType}');
```

注意：请使用类型测试操作符而不是runtimeType。生产环境中，```object is Type```比```object.runtimeType==Type```更加健壮和稳定

### 类的访问修饰
* dart与typescript不同，没有访问修饰符（public、protected、private）
* dart类中，默认的访问修饰符是公开的（即public）
* 如果属性或方法以_（下划线）开头，则表示私有（即private）
* _只有把类单独抽离出去（也就是单独放到一个文件中），私有属性和方法才起作用_

### 类的Getter与Setter
* Getter（获取器）是通过get关键字修饰的方法
  * get函数没有小括号，访问时也没有小括号（像访问属性一样访问方法）
* Setter（修改器）是通过set关键字修饰的方法
```dart
class Circle {
  final double PI = 3.1415;
  num r;
  Circle(this.r);

  num get area {
    return PI * r * r;
  }

  set setR(num value) {
    r = value;
  }
}
```

### 初始化列表
* 作用：在构造函数中设置属性的默认值
* 时机：在构造函数体执行之前执行
* 语法：使用逗号分隔初始化表达式
* 场景：常用于设置final常量的值

### static
* static关键字用来指定静态成员
* 静态成员可以通过类名称直接访问（不需要实例化）
  * 实例化是比较消耗资源的，声明静态成员，可以提高程序性能
* 静态方法不能访问非静态成员，非静态方法可以访问静态成员
  * 静态方法中不能使用this关键字
  * 不能使用this关键字来访问静态属性

### 混入
* 混入（Mixin）是一段公共代码。混入有两种声明方式：
  * 将类当作混入```class MixinA{...}```
    * 作为Mixin的类只能继承自Object，不能继承其他类
    * 作为Mixin的类不能有构造函数
  * 使用mixin关键字声明```mixin MixinB{...}```
* 提高代码服用效率（dart是单继承的），普通类可以通过with来使用混入
  * ```class MyClass with MixinA, MixinB{...}```
* 使用多个混入的时候，后引入的混入会覆盖之前混入中的重复的内容
  * MixinA和MixinB中都有hello()方法，MyClass会使用MixinB中的


## 泛型
* 泛型是在函数、类、接口中指定宽泛数据类型的语法
  * 泛型函数
  * 泛型类
  * 泛型接口
* 通常，在尖括号中，使用一个字母来代表类型
  ```dart
  返回类型 函数名<输入类型>(参数类型 参数){
    函数体
  }
  ```


## 枚举
* 枚举是数量固定的常量值，通过enum关键字声明（内容不支持中文）
* 枚举的values常量，可以获取所有枚举值列表
* 可以通过index获取值的索引
```dart
// 声明枚举
enum Color {
  red,
  green,
  blue,
}

void main(List<String> args) {
  List<Color> colors = Color.values;
  print(colors); // [Color.red, Color.green, Color.blue]
  print(Color.green.index); // 1
}
```

## 库与生态
### 自定义库
#### 通过library来声明库
* 每个dart文件默认都是一个库，只是没有使用library来显示声明；
* dart使用_（下划线）开头的标识符，表示库内访问可见（私有）
* library关键字声明的库名称建议使用：小写字母+下划线

#### 通过import来引入库
* 不同类型的库，引入方式不同
  * 自定义库（```import '库的位置/库名称.dart';```）
  * 系统库（```import 'dart:库名称'```）'dart:core'是默认引入的
  * 第三方库
* 引入部分库（仅引入需要的内容）
  * 包含引入（show）
  * 排除引入（hide）
* 指定库的前缀
  * 当库名冲突的时候，可以通过as关键字，给库声明一个前缀
* 延迟加载（懒加载）
  * 使用defered as 关键字来表示需要演示加载的库

### part与part of
![part与partof](../assets/images/part%E4%B8%8Epartof.jpg)

### 第三方库
* 来源
  * https://pub.dev
  * https://pub.flutter-io.cn/packages
  * https://pub.dartlang.org/flutter
* 使用
  * 在项目目录下创建```pubspec.yaml```
  * 在pubspec.yaml中声明第三方库（依赖）
  * 命令行中进入pubspec.yaml所在的目录，执行```pub get```进行安装
  * 项目中引入已经安装的第三方库（import 'package:xxxxx/xxxxx.dart';）
```yaml
name: demo02
description: A starting point for Dart libraries or applications.
version: 1.0.0
# homepage: https://www.example.com

environment:
  sdk: '>=2.18.4 <3.0.0'

# dependencies:
#   path: ^1.8.0

dev_dependencies:
  lints: ^2.0.0
  test: ^1.16.0
```
