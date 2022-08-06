---
layout: post
title: JavaScript异步
categories: 
tags: []
---


### 思考一个问题？

正常情况下代码是从上到下按顺序执行，一段代码执行了之后才会执行下一段代码，这就是同步（synchronous）执行。但是在某些场景下：
* 网络请求
* IO操作（比如nodejs中readFile）
* 定时器
  
上面这些场景可能非常耗时，而且时间不定长，这时候这些代码就不应该同步执行了，先执行可以执行的代码，在未来的某个时间再来执行他们的handler，这就是异步。

### 进程与线程
一个程序（program）至少包含一个进程（process），一个进程至少包含一个线程（thread）。
![线程与进程](../assets/images/%E7%BA%BF%E7%A8%8B%E4%B8%8E%E8%BF%9B%E7%A8%8B)
#### 进程：
1. 一个进程可以包含一个或多个线程。
2. 进程在执行过程中拥有独立的内存单元。
3. 一个进程可以创建和撤销另一个进程，这个进程是父进程，被创建的进程称为子进程。

#### 线程：
1. 线程不能独立运行，必须依赖进程空间。
2. 线程自己基本上不拥有系统资源，只拥有一点在运行中必不可少的资源(如程序计数器,一组寄存器和栈)，但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源。
3. 一个线程可以创建和撤销另一个线程；同一个进程中的多个线程之间可以并发执行。

> 从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现线程的调度和管理以及资源分配。这就是进程和线程的重要区别  

> 多个线程或进程”同时”运行只是感官上的一种表现。事实上进程和线程是并发运行的，OS的线程调度机制将时间划分为很多时间片段（时间片），尽可能均匀分配给正在运行的程序，获取CPU时间片的线程或进程得以被执行，其他则等待。而CPU则在这些进程或线程上来回切换运行。微观上所有进程和线程是走走停停的，宏观上都在运行，这种都运行的现象叫并发，但是不是绝对意义上的“同时发生。

所有的程序都要交给CPU实现计算任务，但是CPU一个时间点只能处理一个任务。这时如果多个程序在运行，就涉及到了《操作系统原理》中重要的**线程调度算法**，线程是CPU**轮转**的最小单位，其他上下文信息用所在进程中的  

> **进程是资源的分配单位，线程是CPU在进程内切换的单位**

### Javascript与浏览器（这里以浏览器为例，暂没有nodejs）
Javascript是单线程的，但浏览器程序多进程的
![浏览器](../assets/images/%E6%B5%8F%E8%A7%88%E5%99%A8.webp)
从上图可以看到浏览器中包含了很多的进程，但是对前端来说最重要的是最下面的渲染进程（也就是浏览器内核），明显渲染进程是多线程的
* GUI渲染线程
  * 负责渲染页面，布局和绘制
  * 页面需要重绘和回流时，该线程就会执行
  * 与js引擎线程互斥，防止渲染结果不可预期
* JS引擎线程
  * 负责处理解析和执行javascript脚本程序
  * 只有一个JS引擎线程（单线程）
  * 与GUI渲染线程互斥，防止渲染结果不可预期
* 事件触发线程
  * **用来控制事件循环**（鼠标点击等）
  * **当事件满足触发条件时，将事件放入到JS引擎所在的任务队列中**
* 定时触发器线程
  * setInterval与setTimeout所在的线程
  * 定时任务并不是由JS引擎计时的，是由定时触发线程来计时的
  * 计时完毕后，通知事件触发线程
* 异步http请求线程
  * 浏览器有一个单独的线程用于处理AJAX请求
  * 当请求完成时，若有回调函数，通知事件触发线程

**_GUI渲染线程与JS引擎线程是互斥的关系_**，有些文章中也把渲染线程和JS线程看成同一个线程

### 事件循环（Event Loop）
一些概念：
* JavaScript 将所有任务分为 同步任务（synchronous） 和 异步任务（asynchronous）；
* 同步任务 指的是在主线程上排队执行的任务，形成一个执行栈（或者叫调用栈），只有前一个任务执行完毕，才能执行后一个任务；
* 异步任务 指的是不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
* 事件触发线程管理一个任务队列，异步任务触发条件达成，将回调事件放到任务队列中
* 执行栈中所有同步任务执行完毕，此时JS引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行

注意：**任务队列也叫消息队列，事件队列**

![事件循环](../assets/images/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF1.webp)


setTimeout/setInterval和XHR/fetch到底做了什么事？

我们知道，不管是setTimeout/setInterval和XHR/fetch代码，在这些代码执行时， 本身是同步任务，而其中的回调函数才是异步任务。

当代码执行到setTimeout/setInterval时，实际上是JS引擎线程通知定时触发器线程，间隔一个时间后，会触发一个回调事件， 而定时触发器线程在接收到这个消息后，会在等待的时间后，将回调事件放入到由事件触发线程所管理的事件队列中。

当代码执行到XHR/fetch时，实际上是JS引擎线程通知异步http请求线程，发送一个网络请求，并制定请求完成后的回调事件， 而异步http请求线程在接收到这个消息后，会在请求成功后，将回调事件放入到由事件触发线程所管理的事件队列中。

当我们的同步任务执行完，JS引擎线程会询问**事件触发线程**，在事件队列中是否有待执行的回调函数，如果有就会加入到执行栈中交给JS引擎线程执行

![事件循环](../assets/images/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF2.webp)

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop

总结
* JS引擎线程只执行执行栈（或者叫调用栈）中的事件
* 执行栈（或者叫调用栈）中的代码执行完毕，就会读取事件队列中的事件
* 事件队列中的回调事件，是由各自线程插入到事件队列中的
* 如此循环

例如：异步http请求
```ts
function ajax (url, callback){
    var req = new XMLHttpRequest();

    req.onloadend = callback;
    req.open('GET', url, true);
    req.send();
};

console.log(1);
ajax('/api/xxxx', function(res){
    console.log(res);
});
console.log(2);
```
![http请求](../assets/images/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E4%B9%8Bhttp%E8%AF%B7%E6%B1%82.webp)
图中三条线分别表示函数执行的调用栈，异步消息队列，以及请求所依赖的网络请求线程（浏览器自带）。执行顺序：
1. 调用栈执行console.log(1);。
2. 调用栈执行ajax方法，方法里面配置XMLHttpRequest的回调函数，并交由线程执行异步请求。
3. 调用栈继续执行console.log(2);。
4. 调用栈被清空，消息队列中并无任务，JavaScript线程停止，**事件循环结束**。
5. 不确定的时间点请求返回，将设定好的回调函数放入消息队列。
6. 事件循环再次启动，调用栈中无函数，执行消息队列中的任务function(res){console.log(res)}

### 宏任务 和 微任务
宏任务（macrotask）和微任务（microtask）都属于异步任务
* macrotask包括setTimeout, setInterval, setImmediate, I/O, UI rendering
* microtask包括process.nextTick(node), Promises, Object.observe(废弃), MutationObserver

我们可以将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。

**JS引擎线程和GUI渲染线程是互斥的关系，浏览器为了能够使宏任务和DOM任务有序的进行，会在一个宏任务执行结果后，在下一个宏任务执行前，GUI渲染线程开始工作，对页面进行渲染。**

当宏任务执行完，会在渲染前，将执行期间所产生的所有微任务都执行完

![事件循环机制](../assets/images/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%9C%BA%E5%88%B6.webp)

在Event Loop中，每一次循环称为tick，每一次tick的任务如下：

执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
检查是否存在微任务，有则会执行至微任务队列为空；
如果宿主为浏览器，可能会渲染页面；
开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）。


例如： 
```ts
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');

// script start
// script end"
// promise1
// promise2
// undefined
// setTimeout
```
执行顺序：
1. 执行函数调用栈中的任务。
2. 函数调用栈清空之后，执行microtasks队列任务至清空。
3. 执行macrotask队列任务至清空。

区别：**在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microtasks 队列清空。**


### 总结
* 执行一个宏任务（栈中没有就从事件队列中获取）
* 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
* 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
* 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
* 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

![事件循环](../assets/images/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.webp)

|                    | 宏任务                                                                                                                                                       | 微任务                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 谁发起的           | 宿主（Node、浏览器）                                                                                                                                         | JS引擎                                                                                                             |
| 具体事件           | 1. script (可以理解为外层同步代码)<br>2. setTimeout/setInterval<br>3. UI rendering/UI事件<br>4.postMessage，MessageChannel<br>5.setImmediate，I/O（Node.js） | 1. Promise <br>2. MutaionObserver<br>3. Object.observe（已废弃；Proxy 对象替代）<br>4. process.nextTick（Node.js） |
| 谁先运行           | 后运行                                                                                                                                                       | 先运行                                                                                                             |
| 会触发新一轮Tick吗 | 会                                                                                                                                                           | 不会                                                                                                               |

### 附录
1. [JavaScript之多线程和Event Loop](https://segmentfault.com/a/1190000020889508)
2. [夯实基础-JavaScript异步编程](https://segmentfault.com/a/1190000014874668)
3. [关于JavaScript单线程的一些事](https://github.com/JChehe/blog/blob/master/posts/%E5%85%B3%E4%BA%8EJavaScript%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%B8%80%E4%BA%9B%E4%BA%8B.md)
4. [为什么javascript是单线程的却能让AJAX异步调用](https://www.cnblogs.com/yasmi/articles/5064588.html)
5. [聊聊 JavaScript 的并发、异步和事件循环](https://segmentfault.com/a/1190000037519690)