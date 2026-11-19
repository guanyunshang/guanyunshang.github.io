# GUANYUNSHANG 个人博客交付记录

验收日期：2026 年 11 月 19 日。工程目录：`D:\code\personal-blog`。

本地功能、生产构建和验收已完成。线上当前仍是旧提交的 Astro 初始页面，新版本需完成提交、推送和 GitHub Actions 部署后生效。

## 1. 项目目录结构

```text
personal-blog/
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   ├── images/blog-02-result.png
│   └── social-cover.svg / social-cover.png
├── src/
│   ├── components/             页面与交互组件
│   ├── config/site.ts          站点设置和导航
│   ├── content/blog/           两篇中文标题 Markdown
│   ├── content.config.ts       内容集合和字段校验
│   ├── data/home.ts            个人资料与公告
│   ├── layouts/BaseLayout.astro
│   ├── lib/                   内容查询、自动日期、SEO 工具
│   ├── pages/
│   │   ├── index.astro
│   │   ├── archives.astro / categories.astro / about.astro
│   │   ├── blog/[...id].astro
│   │   ├── 404.astro
│   │   └── robots.txt.ts / rss.xml.ts / sitemap.xml.ts
│   └── styles/                全局、文章与列表样式
├── scripts/validate-site.mjs
├── tests/publication-date.test.mjs
├── docs/writing.md / DELIVERY.md
├── astro.config.mjs
├── package.json / package-lock.json
└── README.md
```

`dist/` 是构建产物，`.astro/` 是缓存与本地验收记录，均不需要提交。

## 2. 已实现功能

- 中文首页、归档、分类、关于四个导航；当前页面标识和移动端菜单。
- 首页首屏、精选文章、最新文章、个人侧栏、公告、分类数量与最近更新。
- 两篇正式 Markdown 文章，演示文章已删除。
- 文章元数据校验、草稿排除、自动阅读时间、自动发布日期。
- 按年月组织的归档，以及可定位到对应分组的分类跳转。
- 左侧紧凑目录、无额外编号及内部滚动条、二三级标题自动生成、IntersectionObserver 联动、唯一高亮与平滑定位。
- 深色代码块、复制按钮、权限不足时选择代码供手动复制、宽表格横向滚动。
- 上下篇导航、页尾返回顶部、窄屏目录折叠、桌面及手机响应式。
- 原创彩色 SVG 贴纸和四种悬停动态；适配减少动态效果设置。
- 页面 title、description、canonical、Open Graph、Twitter 分享信息及文章发布时间。
- 原创站点图标、1200×630 PNG 分享封面、sitemap、robots、RSS 与 noindex 404 页。
- 保留现有 Astro、仓库、站点域名和 GitHub Pages 工作流；完整检出历史用于自动日期。

## 3. 新增和修改文件

完整清单见文末“文件清单”。本轮验收补齐的主要文件：

- `src/layouts/BaseLayout.astro`：SEO 元信息、订阅发现链接和页面顶部锚点。
- `src/components/Header.astro`：统一 768px 菜单断点。
- `src/components/Footer.astro`：RSS 与返回顶部入口。
- `src/pages/blog/[...id].astro`：文章分享类型及发布日期。
- `src/pages/404.astro`、`robots.txt.ts`、`rss.xml.ts`、`sitemap.xml.ts`。
- `src/lib/seo.ts`：规范 URL 和 XML 转义。
- `public/favicon.svg`、`public/social-cover.svg`、`public/social-cover.png`。
- 第二篇 Markdown：截图补上宽高、延迟加载和异步解码。
- `scripts/validate-site.mjs`、`package.json`、`README.md` 与交付文档。

此前已有的 `.gitignore` 和 `.vscode/launch.json` 本轮未修改。

## 4. 本地运行方式

要求 Node.js >= 22.23.4。项目目录中运行：

```powershell
npm ci
npm run dev -- --background
```

访问 <http://localhost:4321>。后台服务管理：

```powershell
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

生产构建与预览：

```powershell
npm test
npm run build
npm run check:site
npm run preview -- --background --port 4322
```

访问 <http://localhost:4322>。停止生产预览：`npm run astro -- preview stop`。

## 5. 文章发布方式

1. 在 `src/content/blog/` 新建以文章标题命名的 `.md`。
2. 填写 `title`、`description`、`category`；可选 `tags`、`featured`、`cover`。
3. 编写 Markdown，正文建议从二级标题开始；代码围栏填写语言。
4. 图片放在 `public/images/`，正文引用 `/images/图片名`。
5. `draft: true` 不公开，准备发布时改为 `false`。
6. 执行构建和检查，提交并推送后由 GitHub Actions 发布。

`pubDate` 不强制填写：默认使用文件首次 Git 提交时间，后续编辑、改名和重新部署不会改变；尚未提交的本地文件暂用创建时间预览。首次提交时处于草稿也会作为日期起点。可选手写 `pubDate` 用来保留外部平台原始发布日期。详细说明见 [writing.md](writing.md)。

## 6. Git 提交和部署命令

本轮没有执行提交、推送或生产部署。确认当前变更后，在 `main` 分支运行：

```powershell
git status
git diff
git add .
git diff --cached --stat
git commit -m "Complete GUANYUNSHANG blog"
git push origin main
```

仓库 Settings → Pages → Source 保持 GitHub Actions。既有工作流会构建并上传 Pages 产物，不需要提交 `dist/`。`fetch-depth: 0` 保留首次提交日期所需的 Git 历史。

只读线上核对结果：

- <https://guanyunshang.github.io/> 返回 200，但 title 仍是 `Astro`，尚未包含本次改版。
- `main` 远端提交为 `bb47fac1507bee31caff158619ec97f3ee7a3238`。
- [最近一次工作流](https://github.com/guanyunshang/guanyunshang.github.io/actions/runs/43693824178) 状态为成功，但部署的是上述旧提交。
- 这说明既有发布流程曾成功运行；新版本的线上验收要在实际推送并部署后完成。

## 7. 尚未完成及待本人提供的内容

- 新版本的实际提交、推送、云端 Actions 执行和上线后复查。
- 真实头像、个人经历、联系方式和公告内容待本人提供；当前保留已确认的头像占位、简介和“暂无公告”。
- 第一篇文章末尾仍有“本文后续内容待补充”，正文内容由本人继续完善。

不添加访客统计、评论、搜索、登录、第三方追踪或其他复杂功能。

## 8. 测试与优化结果

| 检查项 | 结果 |
| --- | --- |
| Astro 正式构建 | 通过，7 个 HTML 页面及 RSS、sitemap、robots |
| 自动日期测试 | 6 项通过，覆盖首次提交、后续编辑、重命名与未提交文件预览 |
| 生成页面、锚点与资源路径 | 181 个内部引用通过，H1、语言和元素 ID 检查通过 |
| 图片 | 正文截图 24,725 字节，已添加实际宽高及延迟加载；资源加载通过 |
| SEO | 6 个可索引页面均有独立 canonical；OG、Twitter、文章时间、RSS、sitemap、robots 通过 |
| RSS 和 sitemap XML | 浏览器 XML 解析通过，无解析错误 |
| 自定义 404 | 不存在页面返回 404，显示中文页面并有 noindex |
| 桌面与手机 | 1440、820、768、390、320px，35 个页面场景通过，无横向溢出 |
| 导航、分类、文章 | 实际跳转和文章上下篇链接通过 |
| 目录 | 前后滚动、唯一高亮、点击定位和窄屏折叠通过 |
| 代码复制 | 实际写入及回读剪贴板通过；Windows 换行符按平台规范处理 |
| 复制失败降级 | 模拟拒绝权限后，选中代码并给出手动复制提示，通过 |
| 移动菜单 | 开合、Esc 关闭、焦点返回及页面跳转通过 |
| 返回顶部 | 实际点击后回到顶部，通过 |
| 字体 | 正文实测使用本地 Microsoft YaHei，无外部字体请求，无字体加载错误 |
| 控制台及资源请求 | 0 个运行错误，0 个非预期失败响应 |
| 外部链接 | Astro 官网、GitHub 仓库均返回 200 |

性能检查使用本机 Chrome 和本地生产预览，不限速、不模拟真实手机 CPU，不是 Lighthouse 分数或线上用户数据：

- 测得布局偏移 CLS 最大值为 0。
- 本次采样 LCP 最大值约 680ms，页面 load 最大值约 647ms。
- long-task 观察器累计阻塞采样最大值约 484ms；它不等同于 Lighthouse 的 TBT 指标。
- 代码按 Astro 原生方式输出，没有额外前端框架或外部 JavaScript 包请求。文章页内联 JavaScript 约 3,438 字节，gzip 估算约 1,460 字节。
- 两份 CSS 合计约 23.4KB，gzip 估算约 5.6KB；分享 PNG 约 46.5KB。

本地详细记录在 `.astro/site-validation.json`、`.astro/browser-acceptance.json` 和 `.astro/remote-audit.json`；验收截图在 `.astro/acceptance-preview/`，这些是本地记录，不需要提交。

## 文件清单

以下清单以当前 Git 基线为参照，包含此前各阶段的新增与修改；不表示本轮重新改写了所有文件。

### 已跟踪文件修改

- `.github/workflows/deploy.yml`
- `.gitignore`
- `.vscode/launch.json`
- `astro.config.mjs`
- `package.json`
- `public/favicon.svg`
- `README.md`
- `src/pages/index.astro`

### 新增文件

- `docs/DELIVERY.md`
- `docs/writing.md`
- `public/images/blog-02-result.png`
- `public/social-cover.png`
- `public/social-cover.svg`
- `scripts/validate-site.mjs`
- `src/components/Announcement.astro`
- `src/components/CategoryList.astro`
- `src/components/CodeCopy.astro`
- `src/components/FeaturedPost.astro`
- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/PlaceholderPage.astro`
- `src/components/PostCard.astro`
- `src/components/PostList.astro`
- `src/components/ProfileCard.astro`
- `src/components/RecentPosts.astro`
- `src/components/Sidebar.astro`
- `src/components/Sticker.astro`
- `src/components/TableOfContents.astro`
- `src/config/site.ts`
- `src/content.config.ts`
- `src/content/blog/从零搭建个人博客（二）：Astro 项目部署与 GitHub Pages 自动化配置.md`
- `src/content/blog/从零搭建个人博客（一）：GitHub 仓库创建与 Astro 项目初始化.md`
- `src/data/home.ts`
- `src/layouts/BaseLayout.astro`
- `src/lib/blog.ts`
- `src/lib/publication-date.ts`
- `src/lib/seo.ts`
- `src/pages/404.astro`
- `src/pages/about.astro`
- `src/pages/archives.astro`
- `src/pages/blog/[...id].astro`
- `src/pages/categories.astro`
- `src/pages/robots.txt.ts`
- `src/pages/rss.xml.ts`
- `src/pages/sitemap.xml.ts`
- `src/styles/article.css`
- `src/styles/global.css`
- `src/styles/listing.css`
- `tests/publication-date.test.mjs`

