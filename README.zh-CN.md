# MOD

[![npm version](https://badge.fury.io/js/%40ucloud-fe%2Fmod.svg)](https://badge.fury.io/js/%40ucloud-fe%2Fmod)
[![GitHub license](https://img.shields.io/github/license/ucloud-fe/mod.svg)](https://github.com/ucloud-fe/mod/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/ucloud-fe/mod.svg)](https://GitHub.com/ucloud-fe/mod/tags/)
[![Publish workflow](https://github.com/ucloud-fe/mod/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/ucloud-fe/mod/actions/workflows/npm-publish.yml)

## 安装

```bash
npm install @ucloud-fe/mod
```

## 引用

```js
import mod from '@ucloud-fe/mod';
// 导入 amd 支持
import amdResolver from '@ucloud-fe/mod/lib/resolver/amd';
// 注册模块类型解析器
mod.registerModuleResolver(amdResolver);
```

## 使用

```js
// 添加模块配置
mod.config({
    modules: {
        react: {
            type: 'amd',
            js: 'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js'
        },
        'react-dom': {
            type: 'amd',
            js: 'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js',
            dep: 'react'
        }
    }
});

(async () => {
    // 加载模块
    const [React, ReactDOM] = await mod.import(['react', 'react-dom']);
    // 使用模块
    ReactDOM.render(React.createElement('button', {}, 'test'), document.getElementById('app'));
})();
```

## 使用教程

-   [官网地址](https://ucloud-fe.github.io/mod/)
-   [快速上手](https://ucloud-fe.github.io/mod/#/quickStart)
-   [背景](https://ucloud-fe.github.io/mod/#/background)
-   [API 定义](https://ucloud-fe.github.io/mod/#/api)
-   [Resolver](https://ucloud-fe.github.io/mod/#/resolver)
    -   [amd](https://ucloud-fe.github.io/mod/#/resolver/amd)
    -   [cjs](https://ucloud-fe.github.io/mod/#/resolver/cjs)
    -   [global](https://ucloud-fe.github.io/mod/#/resolver/global)
    -   [css-lazy](https://ucloud-fe.github.io/mod/#/resolver/css-lazy)
    -   [style-lazy](https://ucloud-fe.github.io/mod/#/resolver/style-lazy)
    -   [wasm](https://ucloud-fe.github.io/mod/#/resolver/wasm)
-   [开发](https://ucloud-fe.github.io/mod/#/develop)
-   [使用案例](https://ucloud-fe.github.io/mod/#/usage)
    -   [主题切换](https://ucloud-fe.github.io/mod/#/usage/theme)
    -   [按需加载 polyfill](https://ucloud-fe.github.io/mod/#/usage/polyfill)
