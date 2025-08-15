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
  try {
    let fullPath = path.join(PAGES_DIR);
    if (additionalPath) {
      fullPath = path.join(fullPath, additionalPath);
    }

    // Check if directory exists
    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`Pages directory does not exist: ${fullPath}`);
      return [];
    }

    const files = await fs.readdir(fullPath);

    const pages = await Promise.all(
      files
        .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
        .map(async file => {
          try {
            const raw = await fs.readFile(path.join(fullPath, file), 'utf8');
            const { data } = matter(raw);
            const slug = file.replace(/\.mdx?$/, '');
            return { slug, ...(data as Omit<PageMeta, 'slug'>) };
          } catch (fileError) {
            console.warn(`Failed to read page ${file}:`, fileError);
            return null;
          }
        })
    );

    // Filter out null entries
    const validPages = pages.filter(page => page !== null) as PageMeta[];
    return validPages.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.warn('Failed to read pages:', error);
    return [];
  }
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
