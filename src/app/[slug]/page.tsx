import { getAllPages, getPage } from '@/lib/pages';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/lib/mdx-components';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map(page => ({ slug: page.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { content } = await getPage(slug);

    return (
      <div className="container px-4 py-6 mx-auto max-w-4xl">
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
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
