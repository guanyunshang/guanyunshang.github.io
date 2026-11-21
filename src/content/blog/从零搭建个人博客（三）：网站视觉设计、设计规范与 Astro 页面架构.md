---
title: 从零搭建个人博客（三）：网站视觉设计、设计规范与 Astro 页面架构
description: 记录 GUANYUNSHANG 个人博客的视觉设计过程，整理配色、字体、字号与布局规范，以及 Astro 页面架构和组件实现。
category: 技术
tags: [Astro, 视觉设计, 设计规范, 博客搭建]
---
## 一、前言：从网站上线到建立自己的视觉体系

在前两篇文章中，我完成了个人博客的基础搭建与部署。

第一篇主要解决项目初始化问题，包括 GitHub 仓库创建、Astro 项目初始化、本地 Git 配置，以及本地代码与远程仓库的连接。

第二篇则完成了 Astro 项目的部署配置，通过 GitHub Actions 实现自动构建，并使用 GitHub Pages 发布网站。

至此，一个可以通过互联网访问的个人博客已经建立起来。

但能够访问并不意味着网站已经完成。

对于一个长期维护的个人博客来说，真正重要的是如何建立统一的视觉语言、合理的信息架构，以及能够持续扩展的页面组件。

因此，这一阶段开始着手设计 GUANYUNSHANG 的整体视觉体系。

本篇主要记录以下内容：

1. 参考网站的选择与设计分析。
2. 网站整体视觉风格与配色方案。
3. 字体、字号、行高和间距规范。
4. 首页及其他页面的信息架构。
5. Astro 项目中的组件与 CSS 实现。
6. 网站设计参数的整理。

最终目标不是简单地套用一个现成的博客主题，而是建立一套具有个人识别度、方便维护和持续迭代的设计系统。

## 二、设计目标与参考网站分析

### 2.1 网站定位

网站名称：GUANYUNSHANG

网站地址：[https://guanyunshang.github.io/](https://guanyunshang.github.io/)

网站定位：个人思考与知识记录平台。

网站主要围绕四个方向展开：

- 研究：记录研究过程、学术思考和阶段性成果。
- 技术：记录编程、工具使用和技术实践。
- 学习：整理知识、方法与学习心得。
- 生活：记录日常观察、个人经历和生活感悟。

网站首页采用的核心文案是：

> 一个人的思考索引

> 记录思考，探索世界。

整体设计希望兼顾个人博客的阅读属性和独立杂志的视觉表达，避免过于标准化的模板感。

### 2.2 参考网站与设计借鉴

设计过程中，主要参考了以下几种设计方向。

**参考一：Sapphic Index**

参考地址：[https://sapphicindex.com/](https://sapphicindex.com/)

主要借鉴：

- 米白色与低饱和色彩的搭配方式。
- 具有编辑设计感的排版。
- 文字、色块与留白之间的关系。
- 适度使用装饰元素，避免页面过于单调。

**参考二：Hexo Butterfly**

参考方向：成熟博客主题的页面组织方式。

主要借鉴：

- 顶部导航结构。
- 文章列表与分类组织。
- 个人信息侧边栏。
- 文章目录和阅读体验。

**参考三：杂志式编辑排版**

主要借鉴：

- 清晰的标题层级。
- 适度拼贴的视觉布局。
- 不同内容模块之间的节奏变化。
- 具有辨识度的英文标题与数字装饰。

最终采用的不是某一个网站的完整复刻，而是将不同设计语言进行整合。

### 2.3 最终设计方向

经过调整，最终确定以下设计原则：

| 设计维度   | 最终选择               |
| --- | --- |
| 整体风格   | 独立杂志式个人博客     |
| 页面底色   | 米白纸张质感           |
| 正文颜色   | 深黑色                 |
| 品牌强调色 | 柔和粉色               |
| 辅助色     | 蓝、橙、黄、绿         |
| 页面密度   | 折中风                 |
| 拼贴程度   | 适度拼贴               |
| 首页布局   | 极简文字型             |
| 侧边栏     | 独立米白纸张卡片       |
| 导航       | 四个主要入口           |
| 圆角       | 小圆角，避免过度卡片化 |

核心原则是：让视觉设计服务于内容，而不是让装饰元素抢占阅读注意力。

## 三、网站视觉规范：建立统一的 Design System

这一部分是本次设计中最重要的内容。

为了避免后续修改时出现颜色不统一、字体混乱和间距不一致的问题，将网站的视觉参数统一整理为 Design System。

### 3.1 色彩系统

网站以米白色作为主要背景，深黑色作为正文颜色，粉色作为品牌强调色。

其他颜色用于标签、装饰和局部视觉区分。

**基础色板**
| 变量名称 | HEX     | 色卡                                                                                                                                                   | 使用场景     |
| --- | --- | --- | --- |
| Paper    | #F3EEE4 | <span style="display:inline-block;width:18px;height:18px;background:#F3EEE4;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 页面背景     |
| Ink      | #171717 | <span style="display:inline-block;width:18px;height:18px;background:#171717;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 正文、标题   |
| Pink     | #F5B6C6 | <span style="display:inline-block;width:18px;height:18px;background:#F5B6C6;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 品牌强调色   |
| Blue     | #4D8FD0 | <span style="display:inline-block;width:18px;height:18px;background:#4D8FD0;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 辅助色       |
| Orange   | #ED694A | <span style="display:inline-block;width:18px;height:18px;background:#ED694A;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 辅助色       |
| Yellow   | #F0C94D | <span style="display:inline-block;width:18px;height:18px;background:#F0C94D;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 辅助色       |
| Green    | #B6C79B | <span style="display:inline-block;width:18px;height:18px;background:#B6C79B;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 辅助色       |
| Muted    | #625E57 | <span style="display:inline-block;width:18px;height:18px;background:#625E57;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 辅助文字     |
| Rule     | #BCB7AD | <span style="display:inline-block;width:18px;height:18px;background:#BCB7AD;border:1px solid #BCB7AD;border-radius:4px;vertical-align:middle;"></span> | 分隔线、边框 |

**色彩使用原则**

1. 米白色承担页面大面积背景，避免纯白色带来的生硬感。
2. 黑色用于主要信息，保证文字辨识度。
3. 粉色作为主要强调色，用于提示、引用、标题装饰等。
4. 蓝色、橙色、黄色和绿色用于分类标签与局部装饰。
5. 辅助色不应同时大面积出现，避免视觉混乱。
6. 边框使用灰褐色，保持纸张和印刷品的视觉感觉。

CSS 变量定义：

```
:root {
  --color-paper: #f3eee4;
  --color-ink: #171717;
  --color-pink: #f5b6c6;
  --color-blue: #4d8fd0;
  --color-orange: #ed694a;
  --color-yellow: #f0c94d;
  --color-green: #b6c79b;
  --color-muted: #625e57;
  --color-rule: #bcb7ad;
}
```

### 3.2 字体系统

字体分为六类，分别承担不同的视觉任务。

| 字体变量 | 字体栈                                         | 使用场景           |
| --- | --- | --- |
| Display  | Bebas Neue、Impact                             | 英文展示标题       |
| Body     | Instrument Sans、Noto Sans SC、Microsoft YaHei | 通用界面           |
| Heading  | Noto Sans SC、Microsoft YaHei                  | 页面标题           |
| Serif    | Songti SC、STSong、Noto Serif SC               | 文章标题及衬线文字 |
| Reading  | PingFang SC、Microsoft YaHei、Noto Sans SC | 文章阅读正文 |
| Mono     | JetBrains Mono、Consolas                       | 代码与技术信息     |

需要注意：CSS 中配置的字体栈属于优先级列表，并不代表所有字体都已经实际加载。项目不依赖外部字体请求，最终会根据设备本地字体进行回退。此前本地验收记录中，正文实际使用的是 Microsoft YaHei。

字体配置：

```
:root {
  --font-display:
    'Bebas Neue', Impact, 'Arial Narrow', sans-serif;

  --font-body:
    'Instrument Sans', 'Noto Sans SC',
    'Source Han Sans SC', 'Microsoft YaHei',
    system-ui, sans-serif;

  --font-heading:
    'Noto Sans SC', 'Source Han Sans SC',
    'Microsoft YaHei', system-ui, sans-serif;

  --font-serif:
    'Songti SC', 'STSong', 'Noto Serif SC',
    'Source Han Serif SC', 'SimSun',
    'Times New Roman', serif;

  --font-reading:
    'PingFang SC', 'Microsoft YaHei',
    'Noto Sans SC', 'Source Han Sans SC',
    system-ui, sans-serif;

  --font-mono:
    'JetBrains Mono', Consolas,
    'Courier New', monospace;
}
```

### 3.3 字号规范

字号统一采用 rem 单位，根字号为浏览器默认的 16px。全站共用以下字号变量：

| 元素 | 变量 | CSS 定义 | 实际字号 |
| --- | --- | --- | --- |
| 基础正文 | `--text-body` | 1rem | 16px |
| 小号文字、导航文字 | `--text-small` | 0.875rem | 14px |
| 文章卡片标题 | `--text-post-title` | clamp(1.125rem, 1.5vw, 1.375rem) | 18–22px |
| 模块标题 | `--text-section-title` | 1.25rem | 20px |
| 侧栏标题、通用 H3 | `--text-subheading` | 1.0625rem | 17px |
| 文章卡片摘要 | `--text-summary` | 0.9375rem | 15px |
| 日期、分类等元信息 | `--text-meta` | 0.8125rem | 13px |
| 品牌文字 | `--text-brand` | 1.625rem | 26px |
| 页面标题 | `--text-page-title` | clamp(1.5rem, 3vw, 1.875rem) | 24–30px |
| 首页展示标题 | `--text-hero` | clamp(2.5rem, 6.25vw, 4.375rem) | 40–70px |
| 页脚标语 | `--text-footer-motto` | clamp(1.5rem, 3vw, 2rem) | 24–32px |

文章卡片标题的字重为 700，行高为 1.5。首页、分类页使用同一套文章卡片字号，导航、页脚和个人侧栏全站统一。

文章详情页的排版参数：

| 元素 | CSS 定义 | 实际字号 |
| --- | --- | --- |
| 文章标题 H1 | 1.484375rem | 23.75px |
| 正文 H2 | 1.25rem | 20px |
| 正文 H3 | 1.171875rem | 18.75px |
| 正文 H4 | 1.09375rem | 17.5px |
| 文章正文、摘要 | 1.015625rem | 16.25px |
| 文章元信息 | 0.9375rem | 15px |
| 目录文字 | 0.859375rem | 13.75px |
| 代码块 | 0.8984375rem | 14.375px |
| 表格文字 | 0.9375rem | 15px |

文章正文行高为 1.7，段落间距为 0.9375rem（15px）。通用代码字号为 0.875em，相对于父元素字号计算。

### 3.4 间距系统

统一使用以下间距变量：

| 变量 | 当前值 |
| --- | --- |
| space-1 | 0.3125rem（5px） |
| space-2 | 0.625rem（10px） |
| space-3 | 0.9375rem（15px） |
| space-4 | 1.25rem（20px） |
| space-5 | 1.875rem（30px） |
| space-6 | 2.5rem（40px） |
| space-7 | 3.75rem（60px） |
| space-8 | 5rem（80px） |
| space-9 | 7.5rem（120px） |

CSS 定义：

```css
:root {
  --space-1: 0.3125rem;
  --space-2: 0.625rem;
  --space-3: 0.9375rem;
  --space-4: 1.25rem;
  --space-5: 1.875rem;
  --space-6: 2.5rem;
  --space-7: 3.75rem;
  --space-8: 5rem;
  --space-9: 7.5rem;
}
```

### 3.5 边框与圆角

| 参数 | 当前值 |
| --- | --- |
| 小圆角 | 0.3125rem（5px） |
| 普通边框 | 1.25px solid #BCB7AD |
| 强调边框 | 1.25px solid #171717 |
| 页面容器最大宽度 | 93.75rem（1500px） |
| 桌面侧边栏宽度 | 23.4375rem（375px） |
| 桌面容器宽度 | min(93.75rem, 75%) |
| 较窄屏幕的单侧边距 | clamp(1.5625rem, 5vw, 3.125rem) |

整体采用细边框与小圆角，不使用大面积阴影。

## 四、页面结构设计

网站目前采用四个主要导航入口：

首页、归档、分类、关于。

导航容器与正文、页脚保持对齐。导航栏最小高度为 7.5rem（120px），品牌字号为 1.625rem（26px），导航文字为 0.875rem（14px）。

### 4.1 首页

首页是整个博客的入口，采用极简文字型布局。页面根字号为 16px，桌面容器最大宽度为 1500px，侧边栏宽 375px。导航栏最小高度为 120px，品牌字号 26px，导航文字 14px。

主要包含：

1. 顶部导航栏。
2. 网站名称与个人定位。
3. 精选文章。
4. 最新文章。
5. 个人信息侧边栏。
6. 公告模块。
7. 文章分类。
8. 最近更新。
9. 页面底部信息。

首页主要目标是让访问者快速理解网站的定位，并找到值得阅读的内容。

### 4.2 文章详情页

文章页重点考虑阅读体验。

整体采用左右分栏：

- 左侧：文章目录。
- 右侧：文章正文。

文章头部包括文章类别、标题、摘要、发布时间和预计阅读时间。

正文支持：

- H1–H4 标题层级。
- Markdown 图片。
- 有序列表和无序列表。
- 引用块。
- 表格。
- 代码高亮。
- 代码复制。
- 上一篇与下一篇导航。

文章页使用独立的 CSS 文件管理样式，避免文章阅读样式与首页样式相互影响。

**文章阅读布局参数：**

| 参数 | 实际值 |
| --- | --- |
| 正文最大宽度 | 50rem（800px） |
| 左侧目录宽度 | 15rem（240px） |
| 桌面目录与正文间距 | 2.5rem（40px） |
| 平板目录与正文间距 | 1.875rem（30px） |
| 文章头部最大宽度 | 80rem（1280px） |
| 文章顶部间距 | 2.8125rem（45px） |
| 目录固定位置 | 距离视口顶部 25px |
| 目录可用高度 | 视口高度减 50px |
| 阅读小人尺寸 | 约 33.33 × 81.67px |

目录支持独立滚动、章节高亮和点击定位，滚轴隐藏。在屏幕宽度小于 768px 时，目录与正文采用单列布局，目录可折叠。

### 4.3 归档页面

归档页面按照年份和月份组织文章。

每个时间分组下展示文章日期、标题及相关信息。

设计重点：

- 时间层级清晰。
- 文章之间使用细线分隔。
- 避免复杂的卡片布局。
- 手机端调整为单列结构。

### 4.4 分类页面

分类页面用于整理不同主题的文章。

目前分类包括技术等内容，后续可以根据实际写作方向逐步扩展。

分类页面通过文章数量和分组展示内容，避免在文章数量较少时人为制造过多分类。

### 4.5 关于页面

关于页面主要承担个人介绍功能。

目前保留网站名称、简介和相关介绍入口。

真实头像、个人经历及联系方式应由本人提供，不使用虚构信息填充。

## 五、Astro 项目架构与实现

视觉设计确定后，需要将设计规范落实到代码中。

本项目使用 Astro 构建静态个人博客，通过组件化方式管理页面。

### 5.1 项目目录结构

```
personal-blog/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   ├── favicon.svg
│   ├── images/
│   └── social-cover.png
│
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Sidebar.astro
│   │   ├── ProfileCard.astro
│   │   ├── PostCard.astro
│   │   ├── PostList.astro
│   │   ├── FeaturedPost.astro
│   │   ├── TableOfContents.astro
│   │   ├── Sticker.astro
│   │   ├── ReadingCompanion.astro
│   │   └── CodeCopy.astro
│   │
│   ├── config/
│   │   └── site.ts
│   │
│   ├── content/
│   │   └── blog/
│   │
│   ├── data/
│   │   └── home.ts
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── lib/
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── archives.astro
│   │   ├── categories.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   └── 404.astro
│   │
│   └── styles/
│       ├── global.css
│       ├── article.css
│       └── listing.css
│
├── scripts/
├── tests/
├── docs/
├── astro.config.mjs
└── package.json
```

### 5.2 全局样式管理

将网站的颜色、字体、字号、间距、边框和布局参数集中放在：

```
src/styles/global.css
```

这样后续需要修改品牌颜色时，不需要逐个修改页面组件。

例如：

如果希望将网站背景从米白色调整为浅灰色，只需要修改：

```
--color-paper: #f3eee4;
```

如果希望调整正文颜色，只需要修改：

```
--color-ink: #171717;
```

这种方式能够减少重复代码，也有利于保持整个网站的一致性。

### 5.3 样式文件拆分

目前将样式分成三个主要部分：

| 文件        | 管理内容                             |
| --- | --- |
| global.css  | 全局颜色、字体、间距、容器、基础组件 |
| article.css | 文章头部、目录、正文、代码块         |
| listing.css | 归档、分类、关于页面                 |

这种拆分方式能够降低不同页面之间的样式耦合。

### 5.4 响应式布局

网站适配桌面端、平板和手机：

| 断点 | 屏幕宽度 | 主要布局变化 |
| --- | --- | --- |
| Mobile | 小于 768px | 单列、移动导航 |
| Tablet | 768px 及以上 | 两栏内容布局 |
| Desktop | 1024px 及以上 | 完整侧边栏 |

主要 CSS 规则：

```css
@media (min-width: 48rem) {
  .content-grid {
    grid-template-columns: minmax(0, 1fr) minmax(17.5rem, 27%);
  }
}

@media (min-width: 64rem) {
  .container {
    width: min(var(--content-width), 75%);
  }
  .content-grid {
    grid-template-columns: minmax(0, 1fr) var(--sidebar-width);
  }
}

@media (max-width: 47.999rem) {
  .site-main {
    padding-block: var(--space-7) var(--space-8);
  }
}
```

## 六、网站功能与验收

视觉设计只是网站建设的一部分，还需要确保实际功能正常。

目前已经实现的功能包括：

| 功能模块   | 实现情况 |
| --- | --- |
| 首页       | 已完成   |
| 文章列表   | 已完成   |
| 精选文章   | 已完成   |
| 归档       | 已完成   |
| 分类       | 已完成   |
| 关于       | 已完成   |
| 文章详情   | 已完成   |
| 文章目录   | 已完成   |
| 代码高亮   | 已完成   |
| 代码复制   | 已完成   |
| 移动端导航 | 已完成   |
| 上下篇导航 | 已完成   |
| RSS        | 已完成   |
| Sitemap    | 已完成   |
| SEO 元信息 | 已完成   |
| 自定义 404 | 已完成   |

此外，项目还进行了本地构建、页面链接、图片、SEO、移动端布局和交互验收。

此前本地验收覆盖了 1440px、820px、768px、390px 和 320px 等屏幕宽度，检查了页面横向溢出、导航、目录定位和代码复制等功能。

这些测试结果属于本地生产预览验收，不等同于真实用户环境下的线上性能数据。

## 七、本阶段总结

经过前面的项目初始化和自动化部署，再到本阶段的视觉设计与页面架构建设，GUANYUNSHANG 已经从一个基础的 Astro 项目逐步发展为具有独立视觉风格的个人博客。

这一阶段最大的收获，不只是完成了首页和文章页的设计，而是建立了一套可以长期复用的设计规范。

从颜色、字体、字号到间距、布局和组件，每一项都尽可能使用统一的参数管理。

这样，当未来需要增加新的文章类型、页面模块或者调整网站风格时，就不必重新设计整套界面。

个人博客本身也是一个持续生长的项目。

它不仅是文章的存放位置，也是个人思考、知识积累和生活记录的长期载体。

接下来，网站还会围绕内容质量、个人信息展示、文章阅读体验以及更多实用功能继续迭代。

**保持好奇，记录思考，继续探索。**

### 附录：GUANYUNSHANG 设计参数速查表

| 类别 | 参数 | 当前值 |
| --- | --- | --- |
| 品牌 | 网站名称 | GUANYUNSHANG |
| 品牌 | 首页主标题 | 一个人的思考索引 |
| 颜色 | 页面背景 | #F3EEE4 |
| 颜色 | 正文 | #171717 |
| 颜色 | 强调色 | #F5B6C6 |
| 颜色 | 辅助蓝 | #4D8FD0 |
| 颜色 | 辅助橙 | #ED694A |
| 颜色 | 辅助黄 | #F0C94D |
| 颜色 | 辅助绿 | #B6C79B |
| 字体 | 展示字体 | Bebas Neue 字体栈 |
| 字体 | 正文字体 | Instrument Sans 等回退字体 |
| 字体 | 中文阅读 | PingFang SC 等回退字体 |
| 字体 | 代码 | JetBrains Mono 等回退字体 |
| 字号 | 基础正文 | 16px |
| 字号 | 小号文字、导航文字 | 14px |
| 字号 | 文章卡片标题 | 18–22px |
| 字号 | 模块标题 | 20px |
| 字号 | 侧栏标题、通用 H3 | 17px |
| 字号 | 文章卡片摘要 | 15px |
| 字号 | 日期、分类等元信息 | 13px |
| 字号 | 品牌文字 | 26px |
| 字号 | 页面标题 | 24–30px |
| 字号 | 首页展示标题 | 40–70px |
| 字号 | 页脚标语 | 24–32px |
| 文章字号 | 文章标题 H1 | 23.75px |
| 文章字号 | 正文 H2 | 20px |
| 文章字号 | 正文 H3 | 18.75px |
| 文章字号 | 文章正文、摘要 | 16.25px |
| 文章字号 | 目录文字 | 13.75px |
| 文章字号 | 代码块 | 14.375px |
| 布局 | 内容最大宽度 | 93.75rem（1500px） |
| 布局 | 桌面容器宽度 | min(93.75rem, 75%) |
| 布局 | 侧边栏宽度 | 23.4375rem（375px） |
| 布局 | 文章阅读宽度 | 50rem（800px） |
| 布局 | 文章目录宽度 | 15rem（240px） |
| 布局 | 目录与正文间距 | 桌面 40px；平板 30px |
| 边框 | 默认边框 | 1.25px solid #BCB7AD |
| 边框 | 强调边框 | 1.25px solid #171717 |
| 圆角 | 小圆角 | 0.3125rem（5px） |
| 响应式 | 平板断点 | 768px |
| 响应式 | 桌面断点 | 1024px |

**源码查阅入口：**

- 全局样式：`src/styles/global.css`
- 文章样式：`src/styles/article.css`
- 列表样式：`src/styles/listing.css`
- 组件目录：`src/components/`
- 页面目录：`src/pages/`

以上参数以当前项目 CSS 源码为依据。后续如果修改了源码，应同步更新本表，避免文档与实际网站不一致。
