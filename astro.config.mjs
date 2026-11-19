//Astro 的全局配置入口
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
 * package.json是Node.js 项目重要配置文件。
 * 它主要记录两类信息：
 * 第一类：项目依赖
 * 第二类：运行脚本
 */
