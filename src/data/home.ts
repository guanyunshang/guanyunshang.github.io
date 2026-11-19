/** 文章展示字段。文章正文与元数据由 Markdown 内容集合提供。 */
export interface PostSummary {
  title: string;
  description: string;
  href: string;
  pubDate?: Date;
  category: string;
  readingMinutes: number;
  featured?: boolean;
  cover?: string;
  demo?: boolean;
}

export const profile: { introduction: string; avatar: string | null } = {
  introduction: '记录思考，探索世界。',
  avatar: null,
};

export const announcement: string | null = null;

export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai',
}).format(date);

export function categoryClass(category: string) {
  const colors: Record<string, string> = {
    研究: 'tag--blue', 技术: 'tag--orange', 学习: 'tag--yellow', 生活: 'tag--green',
  };
  return colors[category] ?? 'tag--pink';
}
