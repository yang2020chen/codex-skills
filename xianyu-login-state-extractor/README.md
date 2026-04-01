# 闲鱼登录态提取器

这是一个单独可用的 Chrome 扩展，用来从闲鱼页面提取完整登录态 JSON。

它会在你主动点击时读取：

- Cookie（包括 `HttpOnly`）
- 当前页面常用请求头
- 浏览器环境信息
- 当前域名的 `localStorage` / `sessionStorage` 快照

所有数据都在本地浏览器中生成，不会自动上传到任何服务器。

## 目录结构

- `manifest.json`：扩展清单
- `background.js`：提取 Cookie、请求头、环境信息的核心逻辑
- `popup.html`：弹窗界面
- `popup.js`：弹窗交互逻辑
- `icons/`：扩展图标资源
- `icon-source.svg`：图标源文件
- `privacy-policy.html`：隐私说明页面
- `pack-extension.sh`：打包脚本

## 安装方法

1. 打开 Chrome，进入 `chrome://extensions`
2. 打开右上角“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择当前目录 `xianyu-login-state-extractor`

## 使用方法

1. 打开并登录 [https://www.goofish.com](https://www.goofish.com)
2. 点击扩展图标
3. 点击“提取登录态 JSON”
4. 等待 JSON 生成
5. 点击“复制到剪贴板”
6. 保存为 `xianyu_state.json` 或粘贴到你的程序中

## 输出内容

输出 JSON 包含这些字段：

- `capturedAt`
- `pageUrl`
- `page`
- `env`
- `storage`
- `meta`
- `headers`
- `cookies`

## 发布打包

如果你要把它发给别人安装，可以执行：

```bash
cd /Users/xintianxi/Documents/Playground/xianyu-login-state-extractor
chmod +x pack-extension.sh
./pack-extension.sh
```

输出文件会在：

```text
dist/xianyu-login-state-extractor.zip
```

## 作为独立仓库使用

这个目录已经适合作为独立仓库使用，建议你后续保留这些文件：

- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `privacy-policy.html`
- `icons/`

## 权限说明

- `activeTab` / `tabs`：读取当前活动闲鱼标签页
- `cookies`：提取当前站点 Cookie
- `scripting`：注入脚本读取浏览器环境和存储数据
- `webRequest`：观察一次真实请求头

## 注意事项

- 仅支持 `goofish.com`
- 只有点击按钮时才会提取
- 登录态 JSON 属于敏感信息，不要发给不可信的人
- 如果你要公开发布，建议先补扩展图标和正式隐私政策链接
