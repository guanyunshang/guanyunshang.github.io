import type { APIRoute } from 'astro';
import { navigation } from '../config/site';
import { getBlogPosts, toSummary } from '../lib/blog';
import { canonicalUrl, escapeXml } from '../lib/seo';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Sitemap requires Astro site configuration');
  const routes = [...navigation.map((item) => item.href), ...(await getBlogPosts()).map((entry) => toSummary(entry).href)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escapeXml(canonicalUrl(route, site))}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
