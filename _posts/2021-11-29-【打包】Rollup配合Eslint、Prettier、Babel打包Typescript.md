---
layout: post
title: Rollup配合Eslint、Prettier、Babel打包Typescript
categories: 前端
tags: [前端, Rollup]
---

### 使用Eslint、Prettier配置TypeScript库项目
步骤：  
1. ```npm init -y``` // 初始化一个项目
2. ```npm i -D typescript``` // 安装Typescript
3. ```npm i -D eslint```  // 安装Eslint
4. ```npm i -D prettier eslint-config-prettier eslint-plugin-prettier```
5. ```$ npx eslint --init```  // 初始化.eslintrc.yml（这一步中可以选择使用typesciprt，这样会下载@typescript-eslint/eslint-plugin，@typescript-eslint/parser这两个依赖，如果框架选择vue，还会多下载eslint-plugin-vue这个依赖）
6. ```npm i -D @babel/core @babel/preset-env @babel/preset-typescript``` // （可选的，因为有些最新的特性，typescript没办法支持，所以需要用到babel）
7. ```npm i -D rollup rollup-plugin-terser @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-babel rollup-plugin-typescript2 rollup-plugin-filesize rollup-plugin-peer-deps-external tslib``` // （可选的，由于这里用到了@rollup/plugin-babel依赖，所以必须要安装第6步，@rollup/plugin-typescript有问题，这里使用rollup-plugin-typescript2）
8. ```npm i -D jest jest-puppeteer puppeteer regenerator-runtime``` // 在jest测试文件中使用async，需要安装regenerator-runtime；参看[jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)


### 附录（配置文件内容）

1、通过Rollup打包Typescript时的.babelrc的配置（一般用Rollup打包是为了生成js库，这里使用@babel/plugin-transform-runtime插件来进行不污染全局的pollyfill）
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
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
2、 rollup.config.ts的配置
```ts
import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import path from 'path'
const resolveFile = filePath => path.join(__dirname, filePath)
import { resolve } from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

export default defineConfig({
  input: resolveFile('./index.ts'),
  output: [
    {
      file: resolveFile(pkg.main),
      format: 'esm',
      name: 'ivy2',
    },
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    commonjs(),
    nodeResolve({ browser: true }),
    typescript({
      abortOnError: true,
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      configFile: resolve(__dirname, '.babelrc'),
    }),
    terser(),
    filesize(),
  ],
  external: [/@babel\/runtime-corejs3/],
})
```
3、jest.config.js的配置
```js
export default {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.setup.ts'],
}
```
7、jest.setup.js的配置
```
import 'regenerator-runtime/runtime'
```