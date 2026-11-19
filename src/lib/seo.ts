export function canonicalUrl(path: string, origin: string | URL) {
  const url = new URL(path, origin);
  url.search = '';
  url.hash = '';
  if (!url.pathname.endsWith('/') && !url.pathname.split('/').pop()!.includes('.')) url.pathname += '/';
  return url.href;
}

export function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}
