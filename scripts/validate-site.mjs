import assert from 'node:assert/strict';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve, relative, join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve('dist');
const origin = 'https://guanyunshang.github.io';
async function walk(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}
const files = await walk(root);
const pages = files.filter((file) => file.endsWith('.html'));
assert(pages.length >= 5, 'Build the site before validating');
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
async function targetFile(pathname) {
  let file = resolve(root, `.${decodeURIComponent(pathname)}`);
  assert(file === root || file.startsWith(root + '\\') || file.startsWith(root + '/'), 'Link escapes build directory');
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); }
  catch { file = join(file, 'index.html'); }
  await stat(file);
  return file;
}

let internalLinks = 0;
let images = 0;
const externalLinks = new Set();
const canonicalPages = new Set();
const inlineScripts = [];
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const name = relative(root, file).replaceAll('\\', '/');
  const pathname = '/' + name.replace(/index\.html$/, '');
  const inline = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]).join('\n');
  inlineScripts.push({ page: name, bytes: Buffer.byteLength(inline), gzipBytes: inline ? gzipSync(inline).length : 0 });
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${name}: one H1`);
  assert(/<html[^>]+lang="zh-CN"/.test(html), `${name}: document language`);
  assert(/<title>[^<]+<\/title>/.test(html), `${name}: title`);
  assert(/name="description" content="[^"]+"/.test(html), `${name}: description`);
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0])).find((link) => link.rel === 'canonical');
  if (name === '404.html') {
    assert(/name="robots" content="noindex, follow"/.test(html));
    assert(!canonical);
  } else {
    assert(canonical, `${name}: canonical URL`);
    assert.equal(canonical.href, new URL(pathname, origin).href);
    assert(!canonicalPages.has(canonical.href), 'Duplicate canonical URL');
    canonicalPages.add(canonical.href);
  }
  for (const property of ['og:type', 'og:locale', 'og:title', 'og:description', 'og:url', 'og:image']) assert(html.includes(`property="${property}"`), `${name}: ${property}`);
  assert(html.includes('name="twitter:card"'));
  assert(html.includes('type="application/rss+xml"'));
  if (pathname.startsWith('/blog/')) {
    assert(html.includes('property="og:type" content="article"'));
    assert(html.includes('property="article:published_time"'));
    assert(!html.includes('演示占位文章'));
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => decode(match[1]));
  assert.equal(new Set(ids).size, ids.length, `${name}: unique element IDs`);
  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*>/g)) {
    const attrs = attributes(match[0]);
    const value = attrs.href ?? attrs.src;
    if (!value || /^(data:|mailto:|tel:)/.test(value)) continue;
    const url = new URL(value, new URL(pathname, origin));
    if (url.origin !== origin) { if (match[0].startsWith('<a')) externalLinks.add(url.href); continue; }
    const target = await targetFile(url.pathname);
    if (url.hash) {
      const content = await readFile(target, 'utf8');
      assert(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${name}: missing anchor ${value}`);
    }
    internalLinks++;
    if (match[0].startsWith('<img')) {
      images++;
      assert('alt' in attrs, `${name}: image alternative text`);
      assert(Number(attrs.width) > 0 && Number(attrs.height) > 0, `${name}: image dimensions`);
    }
  }
}
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert.deepEqual(new Set(locations), canonicalPages, 'Sitemap must match all indexable pages');
const rss = await readFile(join(root, 'rss.xml'), 'utf8');
const postCount = [...canonicalPages].filter((url) => new URL(url).pathname.startsWith('/blog/')).length;
assert.equal([...rss.matchAll(/<item>/g)].length, postCount);
for (const match of rss.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)) assert(!Number.isNaN(Date.parse(match[1])));
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert(robots.includes(`${origin}/sitemap.xml`));
assert(!robots.includes('Disallow: /'));
await stat(join(root, 'social-cover.png'));
const assetSizes = await Promise.all(files.filter((file) => ['.js', '.css'].includes(extname(file))).map(async (file) => {
  const buffer = await readFile(file);
  return { file: relative(root, file).replaceAll('\\', '/'), bytes: buffer.length, gzipBytes: gzipSync(buffer).length };
}));
const report = {
  pages: pages.length, indexablePages: canonicalPages.size, posts: postCount, internalLinks, images,
  seo: 'canonical, Open Graph, Twitter, RSS, sitemap, robots and 404 passed',
  externalLinks: [...externalLinks], assets: assetSizes,
  externalJavaScriptGzipBytes: assetSizes.filter((asset) => asset.file.endsWith('.js')).reduce((sum, asset) => sum + asset.gzipBytes, 0),
  inlineScripts,
  maximumInlineJavaScriptGzipBytes: Math.max(...inlineScripts.map((page) => page.gzipBytes)),
};
await writeFile('.astro/site-validation.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
