---
title: 从零搭建个人博客（二）：Astro 项目部署与 GitHub Pages 自动化配置
description: 配置 Astro 部署参数、GitHub Actions 工作流与 GitHub Pages，梳理个人博客的自动构建、部署和日常更新流程。
category: 技术
tags: [Astro, GitHub Actions, GitHub Pages, 博客搭建]
---
## 一、前言

在上一篇中，已经完成了 GitHub 远程仓库创建、Astro 本地项目初始化，以及本地 Git 仓库与 GitHub 远程仓库的连接。

目前，项目代码已经成功推送到 GitHub，但这并不意味着网站已经上线。

GitHub 仓库主要负责保存项目源代码，而 GitHub Pages 负责将构建后的网站发布到互联网上。

因此，本阶段的主要目标是：

1. 配置 Astro 项目的部署参数。
2. 配置 GitHub Actions 自动化工作流。
3. 开启 GitHub Pages。
4. 实现网站自动构建与部署。
5. 理解个人博客后续的日常更新流程。

最终希望通过以下地址访问个人博客：

[https://guanyunshang.github.io/](https://guanyunshang.github.io/)

这里有个小问题，可跳转“八、问题记录”具体查看
​
## 二、配置 Astro 部署参数

### 2.1 修改 Astro 配置文件

打开本地项目根目录下的：

`astro.config.mjs`

原始配置：

```
import { defineConfig } from 'astro/config';

export default defineConfig({});
```

修改为：

```
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://guanyunshang.github.io',
});
```

### 2.2 为什么需要配置 site？

Astro 需要知道网站最终发布的完整网址。

`site` 用于指定网站的规范 URL，供 Astro 生成站点相关链接和资源信息。

本项目使用 GitHub Pages 的个人网站仓库，仓库名称为：

`guanyunshang.github.io`

因此，网站直接发布在域名根路径下，不需要额外配置 `base`。

需要区分两种情况：

| 仓库类型     | 网站地址                   | 是否需要配置 base |
| -------------- | ---------------------------- | ------------------- |
| 个人网站仓库 | username.github.io         | 不需要            |
| 普通项目仓库 | username.github.io/project | 通常需要          |

## 三、本地构建验证

完成配置后，在项目根目录打开终端，执行：

```
npm run build
```

该命令会调用 Astro 的构建工具，将项目源代码转换为可以部署的静态网站文件。

构建完成后，会生成 `dist` 文件夹。

项目的构建过程可以理解为：

```
src（源代码）
      ↓
Astro Build
      ↓
dist（构建产物）
```

需要区分以下三个命令：

| 命令            | 作用               |
| ----------------- | -------------------- |
| npm run dev     | 启动本地开发服务器 |
| npm run build   | 构建正式网站       |
| npm run preview | 本地预览构建结果   |

本地构建成功后，说明 Astro 项目能够正常生成静态网站文件。

## 四、配置 GitHub Actions 自动部署

### 4.1 什么是 GitHub Actions？

GitHub Actions 是 GitHub 提供的自动化工作流服务。

它可以根据预先设置的规则，自动执行代码检查、项目构建、测试和部署等任务。

在本项目中，我们使用 GitHub Actions 实现自动部署。

整体流程：

```
本地修改 Astro 项目
        ↓
Git 提交代码
        ↓
git push
        ↓
GitHub Actions 触发
        ↓
安装项目依赖
        ↓
执行 Astro Build
        ↓
生成 dist 构建文件
        ↓
部署到 GitHub Pages
        ↓
网站更新
```

这样以后每次向 main 分支推送代码，GitHub 就可以自动执行构建和部署，不需要手动上传 dist 文件。

### 4.2 创建工作流文件

在本地项目根目录创建以下文件结构：

```
personal-blog/
└── .github/
    └── workflows/
        └── deploy.yml
```

其中：

- `.github`：GitHub 项目配置目录。
- `workflows`：自动化工作流配置目录。
- `deploy.yml`：定义网站自动构建和部署的工作流。

### 4.3 编写部署配置

在 `deploy.yml` 中写入：

```
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Build Astro site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

### 4.4 理解工作流配置

| 配置项            | 作用                   |
| ------------------- | ------------------------ |
| name              | 工作流名称             |
| on.push           | 监听代码推送事件       |
| branches: [main]  | 只监听 main 分支       |
| workflow_dispatch | 允许手动触发工作流     |
| permissions       | 配置工作流所需权限     |
| jobs              | 定义自动化任务         |
| build             | 构建任务               |
| deploy            | 部署任务               |
| needs: build      | 构建成功后才能执行部署 |

其中，`withastro/action` 是 Astro 官方提供的 GitHub Actions 部署方案，可以自动完成项目依赖安装和网站构建。

`actions/deploy-pages` 负责将构建产物发布到 GitHub Pages。

## 五、通过 Git 上传工作流文件

创建并保存 `deploy.yml` 后，需要将它提交到 GitHub。

在本地项目终端执行：

**第一步：检查新增文件**

```
git status
```

**第二步：加入暂存区**

```
git add .github/workflows/deploy.yml
```

**第三步：创建提交**

```
git commit -m "Add GitHub Pages deployment workflow"
```

**第四步：推送到远程仓库**

```
git push
```

由于之前已经建立了本地 main 分支与远程 origin/main 的跟踪关系，因此可以直接使用 `git push`。

推送成功后，在 GitHub 仓库中可以看到：

```
.github/
└── workflows/
    └── deploy.yml
```

## 六、开启 GitHub Pages

### 6.1 找到正确的 Settings

GitHub 有两种 Settings：

- 个人账号 Settings：管理个人账户。
- 仓库 Settings：管理具体项目。

我们需要的是仓库 Settings，而不是个人账号 Settings。

进入项目仓库：

[https://github.com/guanyunshang/guanyunshang.github.io](https://github.com/guanyunshang/guanyunshang.github.io)

然后：

1. 点击仓库顶部的 Settings。
2. 在左侧菜单找到 Pages。
3. 进入 Build and deployment。
4. 找到 Source。
5. 选择 GitHub Actions。

### 6.2 为什么选择 GitHub Actions？

GitHub Pages 提供不同的发布方式。

本项目选择 GitHub Actions，是因为 Astro 需要先经过构建，才能生成最终的静态网站文件。

GitHub Actions 可以自动执行构建和部署，因此不需要手动上传构建产物。

配置完成后，GitHub Pages 就可以使用**工作流**（第四部分创建的工作流）发布网站。

## 七、个人博客的日常更新机制

完成自动部署配置后，个人博客就具备了自动更新能力。

以后不需要每次手动构建网站，也不需要手动将 HTML 文件上传到 GitHub Pages。

只要在本地修改项目并推送代码，就可以触发自动部署。

### 7.1 日常更新流程

假设现在准备新增一篇博客文章。

整个过程如下：

```
① 在本地 Astro 项目中编写文章
              ↓
② 执行 git add .
              ↓
③ 执行 git commit
              ↓
④ 执行 git push
              ↓
⑤ GitHub Actions 检测到 main 分支有新提交
              ↓
⑥ 自动安装依赖并重新构建网站
              ↓
⑦ 生成新的 dist 构建产物
              ↓
⑧ 自动部署到 GitHub Pages
              ↓
⑨ 线上博客更新
```

### 7.2 每一步具体做什么？

**第一步：在本地修改内容**

例如：

- 新增一篇博客文章。
- 修改网站页面。
- 调整 CSS 样式。
- 更新图片或其他资源。

这些操作都在本地 Astro 项目中完成。

**第二步：将修改加入暂存区**

```
git add .
```

这条命令将符合 Git 跟踪规则的修改加入暂存区。

注意：`.gitignore` 中配置的文件不会被正常加入。

**第三步：创建版本记录**

```
git commit -m "Add a new blog post"
```

这一步将本次修改保存为一个新的本地版本。

`-m` 后面的内容是本次提交的说明，可以根据实际修改内容命名。

**第四步：推送到 GitHub**

```
git push
```

这一步将本地提交同步到 GitHub 远程仓库的 main 分支。

**第五步：GitHub Actions 自动执行**

由于此前配置了：

```
on:
  push:
    branches: [main]
```

因此，当 main 分支收到新的代码推送时，GitHub Actions 就会自动触发工作流。

随后自动完成：

1. 获取最新项目代码。
2. 安装项目依赖。
3. 执行 Astro 构建。
4. 生成新的静态网站文件。
5. 将构建产物部署到 GitHub Pages。

**第六步：访问更新后的网站**

部署成功后，重新访问：

[https://guanyunshang.github.io/](https://guanyunshang.github.io/)

就可以看到更新后的内容。

### 7.3 日常更新需要记住的命令

| 命令                 | 作用             | 是否每次更新都需要 |
| ---------------------- | ------------------ | -------------------- |
| git status           | 检查项目修改状态 | 建议               |
| git add .            | 将修改加入暂存区 | 是                 |
| git commit -m "说明" | 创建版本记录     | 是                 |
| git push             | 推送到 GitHub    | 是                 |
| npm run build        | 本地构建检查     | 视情况             |

这里有一个重要区别：

**本地的**  `npm run build` **和 GitHub Actions 中的自动构建不是一回事。**

本地构建主要用于提前检查项目是否能够正常构建；GitHub Actions 则负责在代码推送后自动完成正式部署。

因此，日常更新时，通常不需要手动执行构建命令，GitHub Actions 会自动处理。
## 八、问题记录：部署 Astro 后，博客首页显示的是 README

### 问题现象

把 Astro 项目上传到 GitHub 后，我打开博客网址，看到的是 `README.md` 里的模板说明，包括安装命令、目录结构和命令表格。按 `src/pages/index.astro` 的内容，首页应该只显示一个 `Astro` 标题。

### 排查过程

查看线上网页源码后，我发现里面有 `Jekyll v3.10.0` 的标记，正文也和仓库根目录的 `README.md` 一致。GitHub Pages 从分支发布时默认使用 Jekyll，而 `README.md` 可以作为站点入口。这解释了为什么项目代码已经上传，线上首页却仍然是项目说明。

我一度以为是 Pages 设置里的 **GitHub Pages Jekyll** 卡片导致的。后来确认，那只是 GitHub 推荐的工作流模板。实际的发布来源要看上方的 **Source** 下拉框。

### 解决方法

1. 在仓库的 **Settings → Pages** 中，确认 **Source** 为 **GitHub Actions**。
2. 打开 **Actions → Deploy to GitHub Pages**，点击 **Run workflow**，选择 `main` 分支并运行。
3. 等 `build` 和 `deploy` 都成功后刷新博客首页，页面显示了 `Astro` 标题。

### 为什么手动运行后才生效

切换 Source 只配置了发布方式，不会自动触发仓库里的 `deploy.yml`。手动运行工作流后，Astro 读取 `src/pages/index.astro`，生成 `dist/index.html`，再由 GitHub Actions 把构建结果发布到原来的网址。这样，线上首页才从 Jekyll 渲染的 README 换成了 Astro 页面。

以后修改首页，只要把改动推送到 `main`，就会自动触发这条工作流，无需每次手动运行。

修改后，结果如下：

<img src="/images/blog-02-result.png" alt="GitHub Pages 部署后的页面，显示 Astro 标题" width="1035" height="805" loading="lazy" decoding="async" />

## 九、本阶段的核心知识总结

| 技术或工具       | 本阶段的作用           |
| ------------------ | ------------------------ |
| Astro            | 网站开发框架           |
| astro.config.mjs | Astro 项目配置         |
| npm run build    | 本地构建静态网站       |
| dist             | 构建生成的网站文件     |
| GitHub Actions   | 自动化构建与部署       |
| deploy.yml       | 定义自动化工作流       |
| GitHub Pages     | 网站静态托管服务       |
| git add          | 将修改加入暂存区       |
| git commit       | 创建本地版本记录       |
| git push         | 推送代码并触发自动部署 |

### 几个容易混淆的概念

**1. GitHub 和 GitHub Pages 有什么区别？**

GitHub 负责托管代码，GitHub Pages 负责托管生成的网站。

**2. GitHub Actions 和 GitHub Pages 有什么区别？**

GitHub Actions 负责执行自动化任务，GitHub Pages 负责发布网站。

**3. 为什么不能直接把 Astro 源代码当成最终网站？**

因为 Astro 项目需要经过构建，生成浏览器可以直接访问的静态网页文件。

**4. 为什么不需要每次手动上传 dist？**

因为 GitHub Actions 可以在代码推送后自动完成构建，并将构建结果交给 GitHub Pages 发布。

**5. 以后修改博客，为什么只需要 git push？**

因为已经配置了 GitHub Actions 自动化工作流。当 main 分支有新的代码提交时，工作流会自动触发，完成重新构建和部署。

## 十、本阶段进度记录

| 任务                      | 当前状态                   |
| --------------------------- | ---------------------------- |
| Astro 项目初始化          | 已完成                     |
| 本地开发运行验证          | 已完成                     |
| GitHub 仓库创建           | 已完成                     |
| 本地 Git 初始化           | 已完成                     |
| 本地与远程仓库连接        | 已完成                     |
| Astro site 参数配置       | 已配置                     |
| GitHub Actions 工作流创建 | 已创建                     |
| 工作流推送到 GitHub       | 已完成配置，需核对推送结果 |
| GitHub Pages Source 配置  | 已选择 GitHub Actions      |
| Actions 构建与部署成功    | 已完成                     |
| 线上网站访问              | 已成功                     |

下一阶段：检查 GitHub Actions 执行结果，确认网站是否成功发布，并通过个人博客网址完成线上访问验证。
