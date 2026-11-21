export const site = {
  name: 'GUANYUNSHANG',
  description: '记录思考，探索世界。关于研究、技术、学习与生活的个人记录。',
  defaultImage: '/social-cover.png',
};

export const navigation = [
  { label: '首页', href: '/', title: '首页' }, //href:指定链接的目标地址。
  { label: '归档', href: '/archives', title: '文章归档' },
  { label: '分类', href: '/categories', title: '文章分类' },
  { label: '关于', href: '/about', title: '关于我' },
];

/**
 * / 在 URL 里代表站点根目录
 * 当浏览器请求根目录时，服务器会默认返回该目录下的 index.html
 * 在 Astro 里，这个 / 对应的就是 src/pages/index.astro 这个文件
 */
