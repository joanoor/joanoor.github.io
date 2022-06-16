---
layout: post
title: 
categories: 
tags: []
---

### Node.js模块中的exports和module.exports的区别
exports只是module.exports的引用，是它的别名，类似于exports=module.exports
```js
var module={
  exports:{
    name:"我是module的exports属性"
  }
}

var export = module.exports; //exports是对module.exports的引用，也就是exports现在指向的内存地址和module.exports指向的内存地址是一样的

console.log(module.exports);    //  { name: '我是module的exports属性' }
console.log(exports);   //  { name: '我是module的exports属性' }

exports.name = "我想改一下名字";

console.log(module.exports);    //  { name: '我想改一下名字' }
console.log(exports);   //  { name: '我想改一下名字' }
//看到没，引用的结果就是a和b都操作同一内存地址下的数据

//这个时候我在某个文件定义了一个想导出的模块
var Circle = {
  name:"我是一个圆",
  func:function(x){
      return x*x*3.14;
  }
};

exports = Circle;  // 看清楚了，Circle这个Object在内存中指向了新的地址，所以exports也指向了这个新的地址，和原来的地址没有半毛钱关系了

console.log(module.exports);    //  { name: '我想改一下名字' }
console.log(exports);   // { name: '我是一个圆', func: [Function] }
```
回到nodejs中，module.exports初始的时候置为{},exports也指向这个空对象
那么，这样写是没问题的：
```js
exports.name = function(x){
    console.log(x);
};
//和下面这个一毛一样，因为都是修改的同一内存地址里的东西
module.exports.name = function(x){
  console.log(x);
};

```
但是这样写就有了区别了：
```js
exports = function(x){
    console.log(x);
};

//上面的 function是一块新的内存地址，导致exports与module.exports不存在任何关系，而require方能看到的只有module.exports这个对象，看不到exports对象，所以这样写是导不出去的

//下面的写法是可以导出去的。说句题外话，module.exports除了导出对象，函数，还可以导出所有的类型，比如字符串、数值等
module.exports = function(x){
  console.log(x);
};
```

参见: [Node.js模块里exports与module.exports的区别?](https://www.zhihu.com/question/26621212)