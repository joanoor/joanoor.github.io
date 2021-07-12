---
layout: post
title: jekyll建站详解（亲测有效）
categories: jekyll
tags: [jekyll, markdown]
---

## 简介
Jekyll是一个简单的博客形态的静态站点生产机器。它有一个模版目录，其中包含原始文本格式的文档，通过一个转换器（如 Markdown）和 Liquid 渲染器转化成一个完整的可发布的静态网站.

## 我的环境 
* Windows10  
![win10版本](/assets/images/windows10_version.png)
* ruby版本
![ruby版本](/assets/images/ruby_version.png)

## 安装ruby和jekyll
1. 使用WSL2  
[windows10上安装WSL2](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10) 选择ubuntu20.04或者18.04版本（下面所有的操作都在WSL中操作）
2. 安装rvm   
按照官方的方法：[https://github.com/rvm/ubuntu_rvm](https://github.com/rvm/ubuntu_rvm)  
3. 安装ruby  
{% highlight shell %}
$ rvm list known      #查看所有已知的ruby版本
$ rvm install ruby-2.7.2      #请安装2.7.2版本
$ gem install bundler jekyll  
{% endhighlight %}

## 备注
* [http://jekyllcn.com/](http://jekyllcn.com/)
* 也可以从[http://jekyllthemes.org/](http://jekyllthemes.org/)上下载