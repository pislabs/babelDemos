# babel 使用实例

## 安装 babel

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

## 配置 babel.config.js

```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
```

## 参考

- [一口(很长的)气了解 babel](https://juejin.cn/post/6844903743121522701)
