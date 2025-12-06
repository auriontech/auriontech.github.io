import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost } from '@/lib/posts';
import { mdxComponents } from '@/lib/mdx-components';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { Badge } from '@/components/ui/badge';
import { ClockIcon } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map(post => ({ slug: post.slug }));
  } catch (error) {
    console.warn('Failed to generate static params for blog posts:', error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { content, data } = await getPost(slug);

    return (
      <article className="container px-4 py-6 mx-auto max-w-4xl">
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              {data.title}
            </h1>
            {data.draft && process.env.NODE_ENV === 'development' && (
              <Badge variant="secondary" className="ml-4">
                DRAFT
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time>
              {new Date(data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              <span>{data.readingTime} min read</span>
            </div>
          </div>
        </header>
        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  rehypeAutolinkHeadings,
                  rehypeHighlight,
                ],
              },
            }}
          />
        </div>
        <footer className="mt-12 pt-8 border-t">
          <Link
            href={'/blog'}
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            ← Back to Blog
          </Link>
        </footer>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}
