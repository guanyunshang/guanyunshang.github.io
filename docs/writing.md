# 文章管理

文章放在 `src/content/blog/`，使用 Markdown（`.md`）编写。文件名决定网址，例如 `my-note.md` 对应 `/blog/my-note`。支持子目录。

```yaml
---
title: 文章标题
description: 一句话摘要
category: 技术
tags: [Astro, 学习]
featured: false
draft: true
demo: false
---
```

`pubDate` 不必填写。系统自动读取文章文件第一次加入 Git 时的提交日期；以后编辑、重新部署或重命名文件不会改变这一日期。没有提交过的本地文件暂用文件创建时间预览，首次提交后以 Git 日期为准。这是本博客的首次入库日期，不自动获取 CSDN 等外部平台的历史发布日期；如果希望保留原始发布日期，可自行添加可选字段 `pubDate` 覆盖自动值。

GitHub Actions 需完整检出历史（`fetch-depth: 0`），现有工作流已配置。首次加入 Git 时即使处于草稿状态，也会作为日期起点。

`cover` 为可选封面路径，可使用 `/images/example.webp`；图片应放在 `public/images/`。正文可使用标准 Markdown 图片和 `<figure><img ... /><figcaption>说明</figcaption></figure>`。

- `draft: true`：草稿，不生成详情页，不显示在首页。
- `demo: true`：排版演示，不生成公开详情页，不进入首页、归档、分类或统计。
- `featured: true`：在首页精选区展示；多篇精选时展示日期最新的一篇。
- 首页、归档、分类、侧栏和关于页的文章数量都来自同一份正式文章数据。
- 阅读时间根据正文估算；目录由正文的二、三级标题生成。建议正文从二级标题开始。
- 代码围栏注明语言（例如 `typescript`、`bash`、`powershell`），即可获得对应语法高亮和复制按钮。
- 上下篇按发布日期排序；提交时间相同时按文件名稳定排序。

当前两篇文章均使用标题命名：

- `从零搭建个人博客（一）：GitHub 仓库创建与 Astro 项目初始化.md`
- `从零搭建个人博客（二）：Astro 项目部署与 GitHub Pages 自动化配置.md`

两篇均自动获取发布日期。演示文章已删除。文章网址由文件名生成，空格及标点会被规范化，改名后请使用页面上的实际文章链接。

验证自动日期规则：`node --experimental-strip-types --test tests/publication-date.test.mjs`。测试在 `.astro/` 下的独立仓库中运行，不修改博客仓库的提交历史。

修改后执行 `npm run build` 验证。`npm run dev -- --background` 启动后台开发服务；使用 `npm run astro -- dev status`、`npm run astro -- dev logs`、`npm run astro -- dev stop` 管理。

截图可使用以下写法预留宽高，减少加载时的排版跳动：

```html
<img src="/images/example.png" alt="图片说明" width="1035" height="805" loading="lazy" decoding="async" />
```

将宽高换成图片的实际尺寸。CSS 会在手机和正文区域自动缩放图片。
