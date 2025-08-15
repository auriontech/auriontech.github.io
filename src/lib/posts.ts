import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

/**
 * Calculate estimated reading time for content
 * @param content - The text content to analyze
 * @returns Reading time in minutes
 */
function calculateReadingTime(content: string): number {
  // Remove markdown syntax and code blocks for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links (keep text)
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = plainText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Average reading speed: 200-250 words per minute
  // Using 225 as a reasonable middle ground
  const wordsPerMinute = 225;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  // Minimum reading time of 1 minute
  return Math.max(1, readingTimeMinutes);
}

export type PostMeta = {
  slug: string;
  locale: string;
  title: string;
  date: string; // ISO
  description?: string;
  readingTime: number; // in minutes
  draft?: boolean; // true for draft posts
};

export async function getAllPosts(): Promise<PostMeta[]> {
  const dir = path.join(BLOG_DIR);
  const files = await fs.readdir(dir);

  const posts = await Promise.all(
    files
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .map(async file => {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const { data, content } = matter(raw);
        const slug = file.replace(/\.mdx?$/, '');
        const readingTime = calculateReadingTime(content);
        return { ...data, slug, readingTime } as PostMeta;
      })
  );

  // Filter out drafts in production
  const isProduction = process.env.NODE_ENV === 'production';
  const filteredPosts = isProduction
    ? posts.filter(post => !post.draft)
    : posts;

  return filteredPosts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export type PaginatedPosts = {
  posts: PostMeta[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

/**
 * Get paginated posts
 * @param page - Current page number (1-based)
 * @param limit - Number of posts per page
 * @returns Paginated posts with metadata
 */
export async function getPaginatedPosts(
  page: number = 1,
  limit: number = 6
): Promise<PaginatedPosts> {
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

export async function getPost(slug: string) {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(file, 'utf8');
  const { data, content } = matter(raw);
  const readingTime = calculateReadingTime(content);
  return {
    content,
    data: { ...data, readingTime } as PostMeta,
  };
}
