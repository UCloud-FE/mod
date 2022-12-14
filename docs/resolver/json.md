# json resolver

`json resolver` 能让 `mod` 支持加载 `JSON` 模块。

## 注册解析器

### npm 包

```js
import mod from '@ucloud-fe/mod';
// 导入 json 支持
import jsonResolver from '@ucloud-fe/mod/lib/resolver/json';
// 注册模块类型解析器
mod.registerModuleResolver(jsonResolver);
```

### CDN

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>mod</title>
        <script src="https://cdn.jsdelivr.net/npm/@ucloud-fe/mod@0.1.13/dist/mod.min.js"></script>
        <!-- 添加 json 支持 -->
        <script src="https://cdn.jsdelivr.net/npm/@ucloud-fe/mod@0.1.13/dist/resolver-json.min.js"></script>
        <script src="app.js"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```

## 使用

```js
// 注册 json 模块
mod.config({
    modules: {
        jsonData: {
            file: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/mod/package.json',
            type: 'json'
        }
    }
});

// 引用模块
mod.import('jsonData').then(jsonData => {
    console.log(jsonData);
});
```
