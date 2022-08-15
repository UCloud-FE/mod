# raw resolver

`raw resolver` 能让 `mod` 支持加载 `raw` 模块。

## 注册解析器

### npm 包

```js
import mod from '@ucloud-fe/mod';
// 导入 raw 支持
import rawResolver from '@ucloud-fe/mod/lib/resolver/raw';
// 注册模块类型解析器
mod.registerModuleResolver(rawResolver);
```

### CDN

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>mod</title>
        <script src="https://cdn.jsdelivr.net/npm/@ucloud-fe/mod/dist/mod.min.js"></script>
        <!-- 添加 raw 支持 -->
        <script src="https://cdn.jsdelivr.net/npm/@ucloud-fe/mod/dist/resolver-raw.min.js"></script>
        <script src="app.js"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```

## 使用

```js
// 注册 raw 模块
mod.config({
    modules: {
        rawData: {
            file: 'raw.txt',
            type: 'raw'
        }
    }
});

// 引用模块
mod.import('rawData').then(rawData => {
    console.log(rawData);
});
```
