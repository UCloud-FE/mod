# 开发者文档

## 包管理器

yarn

## 开发

npm start 后启动 watch

然后 npm test 查看测试用例运行

## 单元测试

由于模块加载器依赖于浏览器环境，没（找到）什么好用的测试工具，所以直接使用浏览器环境进行测试

### 如何测试

1. `npm test` 然后根据输出的服务地址打开浏览器
2. 等待测试用例执行完成，查看是否所有测试用例均通过

## 发布

1. 按照版本号需求执行 npm run publish:patch 或其它两个 script
2. 然后 npm run ci 构建，npm publish 发布。也可以 push 后 action 发布，但是需要先配置 action npm key
