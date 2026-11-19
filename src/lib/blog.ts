import { getCollection, type CollectionEntry } from 'astro:content';
import type { PostSummary } from '../data/home';
import { getPublicationDate } from './publication-date';

export async function getBlogPosts() {
  const entries = await getCollection('blog', ({ data }) => !data.draft && !data.demo);
  return (await Promise.all(entries.map(async (entry) => {
    if (entry.data.pubDate) return entry;
    if (!entry.filePath) throw new Error(`文章缺少源文件路径：${entry.id}`);
    return { ...entry, data: { ...entry.data, pubDate: await getPublicationDate(entry.filePath) } };
  })))
    .sort((a, b) => (b.data.pubDate?.getTime() ?? 0) - (a.data.pubDate?.getTime() ?? 0) || a.id.localeCompare(b.id, 'zh-CN'));
}

export function categoryId(name: string) { return `category-${name}`; }

export function getCategories(posts: PostSummary[]) {
  const categories = new Map<string, number>();
  for (const post of posts) categories.set(post.category, (categories.get(post.category) ?? 0) + 1);
  return [...categories].map(([name, count]) => ({ name, count }));
}

export function publicationParts(date: Date) {
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit',
  }).formatToParts(date);
  return {
    year: parts.find((part) => part.type === 'year')!.value,
    month: parts.find((part) => part.type === 'month')!.value,
  };
}

export function toSummary(entry: CollectionEntry<'blog'>): PostSummary {
  const text = (entry.body ?? '').replace(/```[\s\S]*?```/g, '').replace(/<[^>]*>/g, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const chinese = text.match(/[\p{Script=Han}]/gu)?.length ?? 0;
  const words = text.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  return {
    ...entry.data,
    href: `/blog/${entry.id.split('/').map(encodeURIComponent).join('/')}`,
    readingMinutes: Math.max(1, Math.ceil(chinese / 350 + words / 200)),
  };
}
