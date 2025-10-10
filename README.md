# Color Picker

一款轻量级、无依赖的网页颜色工具。提供原生颜色选择器、交互式HSV和HSL画布色轮、实时色彩显示、一键复制到剪贴板，以及可选的Bing壁纸背景。基于纯静态文件构建，可直接在本地打开或部署到任意服务器。

## 开发说明

本项目使用AI工具辅助开发，包括：
- **GitHub Copilot** - 代码生成和自动补全
- **GPT Code X** - 代码优化和调试
- 所有代码均经过人工审核和测试，但可能仍存在少量问题。

## 功能特性

- 原生颜色选择器，自动保存上次选择的颜色
- 交互式画布色轮
  - HSV模式：角度控制色相，半径控制饱和度，滑块调节明度
  - HSL模式：角度控制色相，半径控制饱和度，滑块调节亮度
- 多格式实时显示：HEX、RGB、HSV/HSL
- 一键复制到剪贴板（支持降级处理）
- 可选壁纸背景，支持缓存和模糊/叠加效果调节
- 零配置使用，纯前端实现（HTML/CSS/ES模块）

## 快速开始

**在线访问**
- https://leon144-art.github.io/Color-Picker/

**本地使用**
- 直接在现代浏览器中打开 `index.html`

**本地服务器**
- 使用Python启动：`python3 -m http.server 8080`，然后访问 `http://localhost:8080/`

**使用说明**
- 通过色轮或原生选择器调整颜色，色彩预览和数值会实时更新
- 应用会自动记住上次选择的颜色

## 壁纸背景配置

在 `js/app.js` 中可以自定义壁纸设置：

```javascript
import { initWallpaper } from './components/wallpaper.js';
const wallpaper = initWallpaper(document.body, {
  enabled: true,        // 启用壁纸
  ttlHours: 24,        // 缓存时间（小时）
  blur: 7,             // 模糊程度
  // proxyURL: 'https://corsproxy.io/?', // 可选：设置代理地址
});

// 动态控制示例
// wallpaper.setEnabled(false);           // 禁用壁纸
// wallpaper.refresh();                   // 刷新壁纸
// wallpaper.setOptions({ blur: 5 });     // 调整模糊度
```

## 浏览器兼容性

需要支持ES模块的现代浏览器。如果直接从文件系统打开时遇到模块导入错误，请使用本地服务器运行。

## LICENSE

MIT — 请参阅`LICENSE`。
