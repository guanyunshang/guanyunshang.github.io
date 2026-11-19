import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { getPublicationDate } from '../src/lib/publication-date.ts';

const run = promisify(execFile);

test('publication dates use original Git history, with local preview fallback', async (t) => {
  await mkdir('.astro', { recursive: true });
  const root = await mkdtemp(resolve('.astro/publication-date-'));
  const git = (args, date) => run('git', [
    '-c', `safe.directory=${root.replaceAll('\\', '/')}`,
    '-c', 'user.name=Publication Date Test', '-c', 'user.email=test@example.invalid', ...args,
  ], { cwd: root, windowsHide: true, env: { ...process.env, ...(date ? { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } : {}) } });
  await git(['init']);
  await mkdir(resolve(root, 'articles'));
  const file = resolve(root, 'articles/note.md');
  await writeFile(file, 'First version');

  await t.test('untracked local file uses creation time', async () => {
    const info = await stat(file);
    assert.equal((await getPublicationDate(file, root)).getTime(), (info.birthtimeMs > 0 ? info.birthtime : info.mtime).getTime());
  });

  const original = '2024-05-01T23:30:00+08:00';
  await git(['add', 'articles/note.md']);
  await git(['commit', '-m', 'Add test article'], original);
  await t.test('first addition becomes publication date', async () => {
    assert.equal((await getPublicationDate(file, root)).toISOString(), new Date(original).toISOString());
  });

  await writeFile(file, 'Edited version');
  await git(['add', 'articles/note.md']);
  await git(['commit', '-m', 'Edit test article'], '2025-07-04T09:00:00+08:00');
  await t.test('later edits preserve publication date', async () => {
    assert.equal((await getPublicationDate(file, root)).toISOString(), new Date(original).toISOString());
  });

  await git(['mv', 'articles/note.md', 'articles/renamed-note.md']);
  await git(['commit', '-m', 'Rename test article'], '2025-07-05T09:00:00+08:00');
  await t.test('renaming preserves the original date', async () => {
    assert.equal((await getPublicationDate('articles/renamed-note.md', root)).toISOString(), new Date(original).toISOString());
  });
  await t.test('a new untracked article in an existing repository uses preview creation time', async () => {
    const next = resolve(root, 'articles/new-note.md');
    await writeFile(next, 'Untracked second article');
    const info = await stat(next);
    assert.equal((await getPublicationDate(next, root)).getTime(), (info.birthtimeMs > 0 ? info.birthtime : info.mtime).getTime());
  });
});
