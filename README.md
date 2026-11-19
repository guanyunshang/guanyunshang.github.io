
# GUANYUNSHANG 个人博客

基于 Astro 7 的静态个人博客，使用 Markdown 管理文章，通过 GitHub Actions 部署到 GitHub Pages。

站点：<https://guanyunshang.github.io/>。本地改动需提交并推送后才会更新线上网站。

完整交付与验收记录见 [docs/DELIVERY.md](docs/DELIVERY.md)，文章管理说明见 [docs/writing.md](docs/writing.md)。

## 项目结构

```text
.github/workflows/deploy.yml   GitHub Pages 自动部署
public/                       图片、站点图标与分享封面
src/
  components/                 导航、侧栏、文章、目录及贴纸组件
  config/site.ts              站点名称、简介和导航
  content/blog/               Markdown 正式文章
  content.config.ts           文章元数据校验
  data/home.ts                个人简介、头像和公告配置
  layouts/BaseLayout.astro    公共布局与 SEO
  lib/                        文章查询、自动日期与 URL 工具
  pages/                      首页、归档、分类、关于、文章、404、XML
  styles/                     全局、文章和列表样式
scripts/validate-site.mjs      构建产物验收
tests/                        自动发布日期测试
docs/                         文章管理与交付文档
```

## 本地运行

要求 Node.js >= 22.23.4，使用 npm 安装锁定的依赖：

```powershell
npm ci
npm run dev -- --background
```

开发地址为 <http://localhost:4321>。管理后台开发服务：

```powershell
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

检查正式构建：

```powershell
npm test
npm run build
npm run check:site
npm run preview -- --background --port 4322
```

生产预览地址为 <http://localhost:4322>；使用 `npm run astro -- preview stop` 停止预览服务。

## 写文章

在 `src/content/blog/` 中新建以文章标题命名的 `.md` 文件：

```yaml
---
title: 文章标题
description: 一句话摘要
category: 技术
tags: [Astro, 学习]
featured: false
draft: false
---
```

下方编写 Markdown 正文。`pubDate` 可省略：自动取首次 Git 提交时间；未提交的本地文件用创建时间预览。图片放入 `public/images/`，正文路径从 `/images/` 开始。完整说明见 [文章管理](docs/writing.md)。

## 提交与部署

确认本地检查通过后，在当前 `main` 分支执行：

```powershell
git status
git diff
git add .
git diff --cached --stat
git commit -m "Complete GUANYUNSHANG blog"
git push origin main
```

推送后，现有 [GitHub Actions 工作流](https://github.com/guanyunshang/guanyunshang.github.io/actions) 自动构建并部署。仓库 Settings → Pages → Source 应为 GitHub Actions。工作流使用完整提交历史，以便自动发布日期保持稳定。

## 功能与验收

已实现四个中文导航入口、Markdown 文章、年月归档、分类索引、侧栏、左侧目录与滚动高亮、代码高亮与复制、移动菜单、页尾返回顶部、自动发布日期、SEO、RSS、站点地图和 404。

`npm run check:site` 检查生成页面的内部链接、锚点、图片尺寸、SEO、RSS 和 sitemap；结果保存于 `.astro/site-validation.json`。它需要先执行 `npm run build`。

真实头像、个人经历及联系方式待本人提供，页面不编造这些信息。当前首篇文章的末尾仍有“后续内容待补充”说明。

线上部署状态和完整验收结果见 [交付文档](docs/DELIVERY.md)。

