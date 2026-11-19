import type { APIRoute } from 'astro';
import { site as metadata } from '../config/site';
import { getBlogPosts, toSummary } from '../lib/blog';
import { canonicalUrl, escapeXml } from '../lib/seo';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('RSS requires Astro site configuration');
  const posts = (await getBlogPosts()).map(toSummary);
  const items = posts.map((post) => {
    const url = escapeXml(canonicalUrl(post.href, site));
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.description)}</description><category>${escapeXml(post.category)}</category><pubDate>${post.pubDate!.toUTCString()}</pubDate></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(metadata.name)}</title><link>${site.href}</link><description>${escapeXml(metadata.description)}</description><language>zh-cn</language><atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
