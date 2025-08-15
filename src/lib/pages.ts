import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';

const PAGES_DIR = path.join(process.cwd(), 'src', 'content', 'pages');

export type PageMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

export async function getAllPages(
  additionalPath: string = ''
): Promise<PageMeta[]> {
  let fullPath = path.join(PAGES_DIR);
  if (additionalPath) {
    fullPath = path.join(fullPath, additionalPath);
  }
  const files = await fs.readdir(fullPath);

  const pages = await Promise.all(
    files
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .map(async file => {
        const raw = await fs.readFile(path.join(fullPath, file), 'utf8');
        const { data } = matter(raw);
        const slug = file.replace(/\.mdx?$/, '');
        return { slug, ...(data as Omit<PageMeta, 'slug'>) };
      })
  );

  return pages.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPage(slug: string, additionalPath: string = '') {
  let fullPath = path.join(PAGES_DIR);
  if (additionalPath) {
    fullPath = path.join(fullPath, additionalPath);
  }
  const file = path.join(fullPath, `${slug}.mdx`);
  const raw = await fs.readFile(file, 'utf8');
  return matter(raw);
}
