---
title: 从零搭建个人博客（一）：GitHub 仓库创建与 Astro 项目初始化
description: 记录 GitHub 仓库创建、Astro 项目初始化，以及首次推送时遇到的提交历史不一致和 README 合并冲突问题。
category: 技术
tags: [Astro, Git, GitHub, 博客搭建]
featured: true
demo: false
---
## 一、前言

最近开始尝试搭建自己的个人博客，决定采用 Astro 作为前端开发框架，使用 GitHub 管理项目代码，并最终通过 GitHub Pages 发布网站。

在正式开发博客之前，需要先完成几个基础工作：

1. 创建 GitHub 远程仓库。
2. 在本地创建 Astro 项目。
3. 初始化本地 Git 仓库。
4. 将本地项目与 GitHub 远程仓库建立连接。
5. 将本地代码推送到 GitHub。

整个过程看起来并不复杂，但在第一次推送代码时遇到了提交历史不一致的问题，随后又出现了 README 文件合并冲突。

本文记录整个操作流程及问题产生的原因。

## 二、创建 GitHub 远程仓库

首先登录 GitHub，创建一个新的 Repository（仓库）。

由于计划使用 GitHub Pages 发布个人博客，因此采用 GitHub 个人网站仓库的命名规则：

`GitHub用户名.github.io`

本次创建的仓库名称为：

`guanyunshang.github.io`

仓库地址：

[https://github.com/guanyunshang/guanyunshang.github.io](https://github.com/guanyunshang/guanyunshang.github.io)

创建仓库时，需要注意几个选项：

| 选项            | 本次设置                 |
| ----------------- | -------------------------- |
| Repository name | guanyunshang.github.io   |
| Visibility      | Public                   |
| Add README      | 本次创建时存在初始化文件 |
| Add .gitignore  | 暂不添加                 |
| Add license     | 暂不添加                 |

**注意：如果本地已经存在一个独立初始化并提交过的项目，建议创建空仓库，不勾选 README、.gitignore 和 License。**

原因是 GitHub 如果自动创建 README，就会在远程仓库产生一次初始提交。此时本地项目如果也有自己的提交历史，首次推送可能遇到历史不一致的问题。

## 三、创建本地 Astro 项目

### 3.1 准备开发环境

本次开发使用以下工具：

| 工具    | 用途                |
| --------- | --------------------- |
| Node.js | JavaScript 运行环境 |
| npm     | 包管理器            |
| Astro   | 网站开发框架        |
| Git     | 本地版本管理        |
| GitHub  | 远程代码托管        |
| Codex   | 辅助编写和管理代码  |

Astro 不需要单独下载 Windows 安装包，可以通过 npm 调用官方脚手架创建项目。

### 3.2 创建项目

首先在 D 盘创建项目目录：

`D:\code\personal-blog`

然后使用 Astro 官方脚手架初始化项目。

```
npm create astro@latest
```

按照提示选择项目名称、模板和相关配置。

本次采用 Astro Minimal（最简）模板，并使用 TypeScript 和 npm。

项目初始化完成后，进入项目目录：

```
cd D:\code\personal-blog
```

安装项目依赖：

```
npm install
```

### 3.3 启动本地开发服务器

执行：

```
npm run dev
```

终端显示本地访问地址：

```
http://localhost:4321/
```

打开浏览器访问该地址，可以看到 Astro 默认欢迎页面。

这说明 Astro 项目已经成功创建，本地开发服务器也能够正常运行。

### 3.4 本地项目目录

初始化后的项目包含以下主要文件：

```
personal-blog/
├── .astro/
├── .vscode/
├── dist/
├── node_modules/
├── public/
├── src/
├── .gitignore
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

其中：

- `src`：网站源代码。
- `public`：静态资源。
- `node_modules`：项目依赖。
- `dist`：构建生成的网站文件。
- `astro.config.mjs`：Astro 配置文件。
- `package.json`：项目依赖和运行命令。
- `tsconfig.json`：TypeScript 配置。
- `.gitignore`：Git 忽略规则。
- `AGENTS.md`：AI 编程代理的项目指令。

## 四、初始化本地 Git 仓库

Astro 项目创建完成后，需要使用 Git 对项目进行版本管理。

首先进入项目根目录：

```
cd D:\code\personal-blog
```

### 4.1 初始化 Git

执行：

```
git init
```

这条命令会在当前项目目录下创建隐藏的 `.git` 文件夹，初始化本地 Git 仓库。

注意：这一步只是在本地创建 Git 仓库，并没有连接 GitHub。

### 4.2 设置主分支名称

初始化后，本地分支名称显示为 `master`。

执行：

```
git branch -M main
```

将当前分支重命名为 `main`。

可以使用以下命令检查：

```
git branch
```

如果显示：

```
* main
```

说明修改成功。

这里需要注意：

`main` 是 Git 分支名称，表示项目的主分支。`git branch -M main` 是重命名当前分支，而不是创建 GitHub 仓库。

### 4.3 检查项目状态

执行：

```
git status
```

此时可以看到：

```
On branch main

No commits yet

Untracked files:
    .gitignore
    .vscode/
    AGENTS.md
    README.md
    astro.config.mjs
    package-lock.json
    package.json
    public/
    src/
    tsconfig.json
```

其中：

- `On branch main`：当前位于 main 分支。
- `No commits yet`：目前还没有提交记录。
- `Untracked files`：这些文件尚未被 Git 正式跟踪。

需要注意，Git 即使没有连接 GitHub，也能识别本地文件和目录。这是因为 Git 本身就是一个可以独立运行的版本管理工具。

## 五、将本地项目与 GitHub 连接

### 5.1 检查远程仓库

执行：

```
git remote -v
```

如果没有输出，说明当前本地仓库还没有配置远程仓库。

### 5.2 添加远程仓库地址

执行：

```
git remote add origin https://github.com/guanyunshang/guanyunshang.github.io.git
```

这里：

| 命令部分   | 含义               |
| ------------ | -------------------- |
| git remote | 管理远程仓库       |
| add        | 添加远程仓库       |
| origin     | 远程仓库的默认名称 |
| URL        | GitHub 仓库地址    |

添加完成后，再次执行：

```
git remote -v
```

如果显示：

```
origin  https://github.com/guanyunshang/guanyunshang.github.io.git (fetch)
origin  https://github.com/guanyunshang/guanyunshang.github.io.git (push)
```

说明远程仓库已经配置成功。

**需要区分：配置远程仓库地址不等于上传代码。**

此时只是建立了本地 Git 仓库与远程 GitHub 仓库之间的关联。

## 六、提交并推送本地代码

### 6.1 将文件加入暂存区

执行：

```
git add .
```

这条命令将当前目录下符合 Git 跟踪规则的文件加入暂存区。

`.gitignore` 中配置的文件不会被正常加入，例如：

- `node_modules/`
- `dist/`
- `.astro/`

### 6.2 检查暂存区

执行：

```
git status
```

确认准备提交的文件没有问题。

### 6.3 创建第一次提交

执行：

```
git commit -m "Initial Astro project"
```

这一步会在本地 Git 仓库创建第一次版本记录。

注意：commit 只是保存本地版本，并没有上传到 GitHub。

### 6.4 推送代码

执行：

```
git push -u origin main
```

各部分含义：

| 命令     | 含义         |
| ---------- | -------------- |
| git push | 推送本地提交 |
| -u       | 设置上游分支 |
| origin   | 远程仓库名称 |
| main     | 目标分支     |

如果推送成功，就可以在 GitHub 仓库中看到本地 Astro 项目的文件。

## 七、本次遇到的问题及排查过程

### 问题一：首次推送被拒绝

执行：

```
git push -u origin main
```

出现：

```
! [rejected] main -> main (fetch first)

Updates were rejected because the remote contains
work that you do not have locally.
```

#### 产生原因

本地和远程仓库分别产生了独立的第一次提交。

本地：

- 初始化 Astro 项目。
- 使用 Git 创建本地仓库。
- 提交 Astro 项目文件。

远程：

- 创建 GitHub 仓库时初始化 README。
- GitHub 自动产生一次初始提交。

因此，两边的提交历史不一致。

Git 不允许普通 push 直接覆盖远程已有的独立提交历史，于是拒绝推送。

#### 正确处理思路

如果远程仓库只有初始化 README，没有需要保留的内容，最简单的方式是重新创建一个空仓库，然后从本地推送。

如果远程仓库已有需要保留的内容，则应该先拉取远程提交，与本地合并，再推送。

本次选择了第二种方案。

### 问题二：执行 git pull 后出现 README 合并冲突

执行：

```
git pull origin main --allow-unrelated-histories
```

出现：

```
Auto-merging README.md
CONFLICT (add/add): Merge conflict in README.md

Automatic merge failed; fix conflicts and then commit the result.
```

#### 产生原因

本地 Astro 项目已经存在 README.md，GitHub 远程仓库也独立创建了 README.md。

在合并两套独立历史时，Git 发现同名文件分别在两边被创建，无法自动判断应该保留哪一份。

因此产生了 `add/add` 合并冲突。

#### 正确处理方式

第一步，查看当前状态：

```
git status
```

第二步，打开本地 README.md，处理冲突内容。

冲突文件中可能出现：

```
<<<<<<< HEAD
本地 README 内容
=======
远程 README 内容
>>>>>>> origin/main
```

根据需要保留两边有用的内容，并删除冲突标记。

第三步，标记冲突已经解决：

```
git add README.md
```

第四步，创建合并提交：

```
git commit -m "Resolve README merge conflict"
```

第五步，重新推送：

```
git push -u origin main
```

**注意：在合并冲突没有解决、合并提交没有完成之前，不能直接继续普通推送。**

本次处理过程中不应该使用 `git push --force`，因为没有必要覆盖远程仓库的提交历史。

## 八、总结：本次建站的经验

通过这次操作，初步理解了 Git 和 GitHub 的关系，以及本地项目与远程仓库之间的同步机制。

几个核心概念：

| 概念       | 作用                                   |
| ------------ | ---------------------------------------- |
| Git        | 分布式版本管理工具                     |
| GitHub     | 基于 Git 的代码托管平台                |
| Repository | 仓库，用于保存项目及其版本历史         |
| Branch     | 分支，用于管理不同开发版本             |
| main       | 主分支                                 |
| commit     | 创建一次版本记录                       |
| remote     | 配置远程仓库                           |
| origin     | 常用的远程仓库默认名称                 |
| push       | 将本地提交推送到远程                   |
| pull       | 拉取远程提交并尝试合并                 |
| fetch      | 获取远程提交，但不直接合并             |
| merge      | 合并不同分支或提交历史                 |
| conflict   | 不同版本之间出现无法自动解决的修改冲突 |

### 最后记住三个原则

1. 如果本地项目已经初始化并提交，创建 GitHub 仓库时最好选择空仓库，避免不必要的历史合并。
2. Git 可以独立管理本地项目，不需要提前连接 GitHub。
3. `git push` 失败时，先检查本地和远程提交历史，不要直接使用强制推送。

从创建仓库、初始化项目，到完成本地与远程仓库的连接，这次也算正式迈出了个人博客开发的第一步。