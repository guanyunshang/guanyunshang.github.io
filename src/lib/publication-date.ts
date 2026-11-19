import { execFile } from 'node:child_process';
import { stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

/** First Git addition, including before renames. Untracked local files use creation time. */
export async function getPublicationDate(filePath: string, projectRoot = process.cwd()): Promise<Date> {
  const root = resolve(projectRoot);
  const absolute = isAbsolute(filePath) ? filePath : resolve(root, filePath);
  const gitPath = relative(root, absolute).replaceAll('\\', '/');
  const prefix = ['-c', `safe.directory=${root.replaceAll('\\', '/')}`];
  const options = { cwd: root, windowsHide: true };
  const hasHistory = await run('git', [...prefix, 'rev-parse', '--verify', '--quiet', 'HEAD'], options)
    .then(() => true, (error: { code?: number | string }) => {
      if (error.code === 1) return false;
      throw error;
    });
  const { stdout } = hasHistory ? await run('git', [
    ...prefix, 'log', '--follow', '--diff-filter=A', '--format=%aI', '--', gitPath,
  ], options) : { stdout: '' };
  const dates = stdout.trim().split(/\r?\n/).filter(Boolean);
  if (dates.length) {
    const date = new Date(dates[dates.length - 1]);
    if (Number.isNaN(date.getTime())) throw new Error(`无法识别文章首次提交日期：${gitPath}`);
    return date;
  }
  const info = await stat(absolute);
  return info.birthtimeMs > 0 ? info.birthtime : info.mtime;
}
