---
layout: post
title: Webpack配合Eslint、Prettier、Babel打包Typescript
categories: 前端
tags: [前端, Webpack]
---

### 使用Eslint、Prettier配置TypeScript项目
步骤：（请按下面的步骤执行，否则启动项目时，可能会报错：Error: Cannot find module 'ajv/dist/compile/codegen'）  
1. ```npm init -y``` // 初始化一个项目
2. ```npm i -D webpack webpack-cli``` // 安装Webpack
3. ```npx webpack-cli init``` // 初始化webpack配置(会生成tsconfig.json文件，会自动安装webpack-dev-server、ts-loader、prettier、html-webpack-plugin、typescript等依赖)
   ![webpack-cli init](/assets/images/webpack_cli_init.jpg)
4. ```npm i -D eslint```  // 安装Eslint
5. ```npm i -D prettier eslint-config-prettier eslint-plugin-prettier```
6. ```$ npx eslint --init```  // 初始化.eslintrc.yml（这一步中可以选择使用typesciprt，这样会下载@typescript-eslint/eslint-plugin，@typescript-eslint/parser这两个依赖，如果框架选择vue，还会多下载eslint-plugin-vue这个依赖）
7. ```npm i -D label-loader @babel/core @babel/preset-env @babel/preset-typescript``` 
8.  ```npm i -D fork-ts-checker-webpack-plugin``` // 使用fork-ts-checker-webpack-plugin ，开辟一个单独的线程去执行类型检查的任务，这样就不会影响 webpack 重新编译的速度

### 附录（配置文件内容

1、通过Webpack打包Typescript时的.babelrc的配置（一般用Webpack是做项目时使用，这里直接配置@babel/preset-env来进行pollyfill,要在dependencies中安装core-js和regenerator-runtime）
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "targets": {
          "chrome": "40",
          "ie": "9"
        },
        "corejs": {
          "version": "3",
          "proposals": true
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": []
}
```

2、webpack.config.js的配置内容如下：
```js
const path = require("path");
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' )

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: [ '/node_modules/' ],
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
```

3、package.json的配置内容如下：
```json
{
  "name": "my-webpack-project",
  "version": "1.0.0",
  "description": "My webpack project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=production --node-env=production",
    "build:dev": "webpack --mode=development",
    "build:prod": "webpack --mode=production --node-env=production",
    "watch": "webpack --watch",
    "serve": "webpack serve"
  },
  "keywords": [],
  "author": "Joanor <xixi090830@gmail.com> )",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.8",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-typescript": "^7.16.7",
    "@typescript-eslint/eslint-plugin": "^5.16.0",
    "@typescript-eslint/parser": "^5.16.0",
    "@webpack-cli/generators": "^2.4.2",
    "babel-loader": "^8.2.4",
    "css-loader": "^6.7.1",
    "eslint": "^8.11.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "fork-ts-checker-webpack-plugin": "^7.2.1",
    "html-webpack-plugin": "^5.5.0",
    "prettier": "^2.6.0",
    "sass": "^1.49.9",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "ts-loader": "^9.2.8",
    "typescript": "^4.6.2",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  },
  "dependencies": {
    "core-js": "^3.21.1",
    "regenerator-runtime": "^0.13.9"
  }
}

```