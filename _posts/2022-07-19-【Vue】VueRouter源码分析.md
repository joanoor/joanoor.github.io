---
layout: post
title: VueRouter源码分析
categories: 
tags: []
---

```ts
// types/router.d.ts
export interface RouterOptions {
  routes?: RouteConfig[]
  mode?: RouterMode
  fallback?: boolean
  base?: string
  linkActiveClass?: string
  linkExactActiveClass?: string
  parseQuery?: (query: string) => Object
  stringifyQuery?: (query: Object) => string
  scrollBehavior?: (
    to: Route,
    from: Route,
    savedPosition: Position | void
  ) => PositionResult | Promise<PositionResult> | undefined | null
}

// 
```
