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
* 当命名冲突的时候会使用this，否则dart的编程风格会忽略this
* 构造函数不能被继承
* 构造函数分类：
  1. 默认构造函数，(Dart会为每一个类自动声明一个空的构造函数)
  2. 自定义构造函数
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
      构造参数简洁写法
      ```dart
      class Fish{
        String name;
        String type；
        
        Fish(this.name,this.type);
      }
      ```
      **注意：**  
      > 构造函数是不能被子类继承的，如果子类没有自定义构造函数，那么它的构造参数就是空的。
  3. 命名构造函数：```ClassName.identifier```
      ```dart
      class Fish {
        String name;
        String type;
        Fish(this.name, this.type); // 常见的构造函数
        Fish.born(String name, String type) // 命名构造函数
            : this.name = name,
              this.type = type {
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
  4. 常量构造函数：假设类创建的对象永远不会改变，可以在编译期就创建这个常量实例，并且定义一个常量构造函数，并且确保所有的成员变量都是final的
      ```dart
      class ImmutablePoint {
        static final ImmutablePoint origin = const ImmutablePoint(0, 0);

        final num x, y;

        const ImmutablePoint(this.x, this.y);
      }
      ```
  5. 工厂构造函数
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
* 构造函数的执行顺序
  1. 初始化列表  
  2. 父类的未命名无参的构造函数  
  3. 如果父类不包括默认构造函数，就必须手动调用父类的构造器```: superclass constructor```

### 获取对象的类型
通过对象的runtimeType属性
```dart
print('The type of a is ${a.runtimeType}');
```

注意：请使用类型测试操作符而不是runtimeType。生产环境中，```object is Type```比```object.runtimeType==Type```更加健壮和稳定