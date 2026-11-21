//Astro 的全局配置入口
//当前涉及线上网址和代码高亮主题
//Shiki 是一个代码高亮库它用就是 VS Code 的语法高亮引擎
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://guanyunshang.github.io',
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});


/**
 * package.json是 Node.js 项目重要配置文件。
 * 它主要记录两类信息：
 * 第一类：项目依赖
 * 第二类：运行环境、命令
 */

/**
 * tsconfig.json是 TypeScript 的配置文件
 * 作用是告诉 TypeScript 和编辑器（VS Code）该怎么理解、检查你项目里的代码。
 */

/**
 * .mjs 就是普通的 JavaScript 文件，只是后缀换了个名字，
 * 用来明确告诉 Node.js：这个文件要按 ES Module（ESM）规范来解析。
 * 不同规范，代码书写方式不一样，
 * 如果是.js文件，需要在package.json文件中设置 "type": "module"
 */