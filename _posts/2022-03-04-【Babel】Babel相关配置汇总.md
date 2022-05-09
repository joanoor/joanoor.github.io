---
layout: post
title: Babel相关配置汇总
categories: 前端
tags: [Babel]
excerpt_separator: '<!-- more -->'
---

**TL;DR**  
pollyfill方式发生了改变，直接使用@babel/pollyfill的方式已被废弃！
<!-- more -->
@babel/preset-env既可以转换语法，比如ES6转义成ES5等（此时不需要配置，例如下面的第一种情况），也可以转义ES2018、ES2019及之后的ESNEXT的新增语法（换句话说，就是pollyfill），比如Promise,Symbol等（需配置babel，配合core-js、regenerator-runtime等来使用，例如下面的第二种情况中使用entry引入全部的pollyfill，或者使用usage自动按需引入pollyfill **使用@babel/preset-env进行pollyfill会污染全局变量，所以如果开发库文件，不建议使用这种方式，当然如果是项目文件，则无所谓**）  
详见:  
1. [@babel/preset-env](https://babel.docschina.org/docs/en/babel-preset-env/)  
2. [@babel/polyfill](https://babel.docschina.org/docs/en/babel-polyfill/)  

如果@babel/preset-env只用于转义语法，那么可以通过@babel/plugin-transform-runtime实现（需在babel中配置此插件，通过@babel/runtime、 @babel/runtime-corejs2或@babel/runtime-corejs3来实现不污染全局变量的pollyfill，例如下面的第三种情况）  
详见: [@babel/plugin-transform-runtime](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime/)

也就是说：@babel/preset-env 做语法转换。 @babel/runtime（或者@babel/runtime-corejs3）提供helpers辅助函数， @babel/plugin-transform-runtime 帮我们自动引入@babel/runtime（或者@babel/runtime-corejs3）的辅助函数，减少冗余。这三个包从这个角度上（其他的角度请见第三种情况）都与语法转换相关，和polyfill的使用是两码事。


### 说明
> Babel 是一个工具链，主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015+ 代码转换为向后兼容（这里向后指的是落后，之前的）版本的JavaScript。

### 查看本地安装的babel版本
Babel是一个工具集，而这个工具集是围绕@babel/core这个核心的npm包构成的。每次@babel/core发布新版本的时候，整个工具集的其它npm包也都会跟着升级到与@babel/core相同的版本号，即使它们的代码可能一行都没有改变

所以提到Babel版本的时候，通常是指@babel/core这个Babel核心包的版本

目前，前端开发领域使用的Babel版本主要的Babel6和Babel7这两个版本  
Babel7的npm包都是放在babel域下的，即在安装npm包的时候，我们是安装@babel/这种方式，例如@babel/cli、@babel/core等。而在Babel6，我们安装的包名是babel-cli，babel-core等。其实它们本质是一样的，都是Babel官方的cli命令行工具和core核心包，而且功能是一样的，只是名称版本变化了一下而已。在平时开发和学习的过程中，碰到'@babel/'和'babel-'应该下意识认识到他俩原本是一个包，只是版本不一样而已。

附录：[关于Babel版本](https://www.jiangruitao.com/babel/versions/)


### preset和plugins的区别
例如一个很普通的.babelrc配置文件
```.babelrc
{ 
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    '@babel/plugin-proposal-optional-chaining'
  ]
}
```
1、可以看到babel插件一般尽可能拆成小的力度，开发者可以按需引入。比如对ES6转ES5的功能，Babel官方拆成了20+个插件。这样的好处显而易见，既提高了性能，也提高了扩展性。比如开发者想要体验ES6的箭头函数特性，那他只需要引入transform-es2015-arrow-functions插件就可以，而不是加载ES6全家桶。

但很多时候，逐个插件引入的效率比较低下。比如在项目开发中，开发者想要将所有ES6的代码转成ES5，插件逐个引入的方式令人抓狂，不单费力，而且容易出错。

这个时候，可以采用Babel Preset。可以简单的把Babel Preset视为Babel Plugin的集合。

2、plugin和preset执行顺序
* 先执行完所有Plugin，再执行Preset。
* 多个Plugin，按照声明次序顺序执行。
* 多个Preset，按照声明次序逆序执行。

附录：[Babel：plugin、preset的区别与使用](https://juejin.cn/post/6844903616554221576)

### @babel/preset-env
babel@7推荐的preset；  
preset-env 主要做的是转换 JavaScript 最新的 Syntax（指的是 const let ... 等）， 而作为可选项 preset-env 也可以转换 JavaScript 最新的 API （指的是比如 数组最新的方法 filter 、includes，Promise 等等；

### 配置文件
babel的配置文件有很多，例如：  
.babelrc  
.babelrc.js和babel.config.js  
babel.config.json  
在package.json中添加babel字段  
构建工具中关于babel的配置  
......

附录：[Babel 配置文件](https://www.jiangruitao.com/babel/config/)

***
#### **示例：通过babel命令行来进行js代码转义**

执行命令 ```npx babel index.js -o bundle.js``` 进行转义
#### **情况一：当babel配置文件只存在@babel/preset-env，且没有做任何选项配置时**
.babelrc文件内容如下：
```
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  "plugins": []
}
```
package.json文件内容如下：
```
"devDependencies": {
  "@babel/cli": "^7.17.6",
  "@babel/core": "^7.17.5",
  "@babel/preset-env": "^7.16.11",
},
"dependencies": {}
```
将要被转义的index.js文件内容如下：
```
const sym = Symbol();
const promise = Promise.resolve();
const check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());
class Person {
  sayname() {
    return 'name'
  }
}
const john = new Person()
console.log(john)
```
生成的bundle.js文件内容如下：
```
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var sym = Symbol();
var promise = Promise.resolve();
var check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());

var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);

  return Person;
}();

var john = new Person();
console.log(john);

```

#### **情况二：当babel配置文件只有@babel/preset-env，且通过配置选项来实现pollyfill**（分为两种情况）  
**一、当useBuiltIns设置为entry时：需要手动在入口文件中引入core-js/stable和regenerator-runtime/runtime**  
.babelrc文件内容如下：
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {  // 此处的targets可以直接配置在.browserslistrc中，或者package.json的browserslist字段里，不需要在这里配置
          "chrome": "28",
          "ie": "7"
        },
        "useBuiltIns": "entry",
        "corejs": {
          "version": "3.21",
          "proposals": true
        }
      }
    ]
  ],
  "plugins": []
}
```
package.json文件内容如下：
```
"devDependencies": {
  "@babel/cli": "^7.17.6",
  "@babel/core": "^7.17.5",
  "@babel/preset-env": "^7.16.11",
},
"dependencies": {
  "core-js": "^3.21.1",
  "regenerator-runtime": "^0.13.9"
}
```
将要被转义的index.js文件内容如下：
```
import "core-js/stable" // 手动引入
import "regenerator-runtime/runtime"  // 手动引入
const sym = Symbol();
const promise = Promise.resolve();
const check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());
class Person {
  sayname() {
    return 'name'
  }
}
const john = new Person()
console.log(john)
```
生成的bundle.js文件内容如下：
```
"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.async-iterator.js");

require("core-js/modules/es.symbol.has-instance.js");

require("core-js/modules/es.symbol.is-concat-spreadable.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.symbol.match.js");

require("core-js/modules/es.symbol.match-all.js");

require("core-js/modules/es.symbol.replace.js");

require("core-js/modules/es.symbol.search.js");

require("core-js/modules/es.symbol.species.js");

require("core-js/modules/es.symbol.split.js");

.........引入全部的pollyfill辅助函数..........

require("core-js/modules/web.structured-clone.js");

require("core-js/modules/web.timers.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url.to-json.js");

require("core-js/modules/web.url-search-params.js");

require("regenerator-runtime/runtime");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var sym = Symbol();
var promise = Promise.resolve();
var check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());

var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);

  return Person;
}();

var john = new Person();
console.log(john);

```
此种情况这样会导致全局变量污染

**二、当useBuiltIns设置为usage时：不需要需要手动引入core-js/stable和regenerator-runtime/runtime**  
.babelrc文件内容如下：
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "28",
          "ie": "7"
        },
        "useBuiltIns": "usage",
        "corejs": {
          "version": "3.21",
          "proposals": true
        }
      }
    ]
  ],
  "plugins": []
}
```
package.json文件内容如下：
```
"devDependencies": {
  "@babel/cli": "^7.17.6",
  "@babel/core": "^7.17.5",
  "@babel/preset-env": "^7.16.11",
  "core-js": "^3.21.1",
},
"dependencies": {}
```
将要被转义的index.js文件内容如下：
```
const sym = Symbol();
const promise = Promise.resolve();
const check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());
class Person {
  sayname() {
    return 'name'
  }
}
const john = new Person()
console.log(john)
```
生成的bundle.js文件内容如下：
```
"use strict";

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.error.cause.js");

require("core-js/modules/es.error.to-string.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var sym = Symbol();
var promise = Promise.resolve();
var check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());

var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);

  return Person;
}();

var john = new Person();
console.log(john);
```
这样也会导致全局变量污染，

#### 情况三：当babel配置文件有@babel/preset-env，且使用了@babel/plugin-transform-runtime插件，如果没有给@babel/plugin-transform-runtime配置选项，则默认为false，会使用@babel/runtime；选项中corejs为2，需要用到@babel/runtime-corejs2;为3，需要用到@babel/runtime-corejs3
>因为使用@babel/preset-env进行pollyfill时会污染全局变量，所以在做库开发的时候，一般是添加@babel/plugin-transform-runtime插件，可以实现不污染全局变量的pollyfill

***需要将这三个用到的依赖安装到dependencies中***

| corejs option | Install command |
| --- | ---|
| false | npm install --save @babel/runtime |
| 2 | npm install --save @babel/runtime-corejs2 |
| 3 | npm install --save @babel/runtime-corejs3 |
.babelrc文件内容如下：
```
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": "3",
          "proposals": true
        }
      }
    ]
  ]
}
```
package.json文件内容如下：
```
"devDependencies": {
  "@babel/cli": "^7.17.6",
  "@babel/core": "^7.17.5",
  "@babel/plugin-transform-runtime": "^7.17.0",
  "@babel/preset-env": "^7.16.11",
  "core-js": "^3.21.1"
},
"dependencies": {
  "@babel/runtime-corejs3": "^7.17.2"
}
```
将要被转义的index.js文件内容如下：
```
const sym = Symbol();
const promise = Promise.resolve();
const check = arr.includes("yeah!");
console.log(arr[Symbol.iterator]());
class Person {
  sayname() {
    return 'name'
  }
}
const john = new Person()
console.log(john)
```
生成的bundle.js文件内容如下：
```
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/symbol"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/includes"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var sym = (0, _symbol["default"])();

var promise = _promise["default"].resolve();

var check = (0, _includes["default"])(arr).call(arr, "yeah!");
console.log((0, _getIterator2["default"])(arr));

var Person = /*#__PURE__*/function () {
  function Person() {
    (0, _classCallCheck2["default"])(this, Person);
  }

  (0, _createClass2["default"])(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);
  return Person;
}();

var john = new Person();
console.log(john);
```

附录：[吃一堑长一智系列: 99% 开发者没弄明白的 babel 知识](https://zhuanlan.zhihu.com/p/361874935)