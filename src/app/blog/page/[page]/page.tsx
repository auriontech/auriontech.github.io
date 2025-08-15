import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { ClockIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  try {
    const allPosts = await getAllPosts();
    const totalPages = Math.ceil(allPosts.length / 6);

    // Generate params for all pages
    const params = [];
    for (let page = 1; page <= totalPages; page++) {
      params.push({ page: page.toString() });
    }

    return params;
  } catch (error) {
    console.warn('Failed to generate static params for blog pages:', error);
    return [{ page: '1' }];
  }
}

type BlogPageProps = {
  params: Promise<{ page: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  // Get all posts and paginate manually
  const allPosts = await getAllPosts();
  const postsPerPage = 6;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <section className="container px-4 py-6 mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-sm text-muted-foreground">
          {totalPosts} post{totalPosts !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {posts.map(p => (
          <article
            key={p.slug}
            className="border-b border-border pb-6 last:border-b-0"
          >
            <div className="flex items-start gap-3 mb-2">
              <h2 className="text-xl font-semibold flex-1">
                <Link
                  href={`/blog/${p.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {p.title}
                </Link>
              </h2>
              {p.draft && process.env.NODE_ENV === 'development' && (
                <Badge variant="secondary" className="text-xs">
                  DRAFT
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span>
                {new Date(p.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                <span>{p.readingTime} min read</span>
              </div>
            </div>
            {p.description && (
              <p className="text-muted-foreground mb-3">{p.description}</p>
            )}
            <Link
              href={`/blog/${p.slug}`}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasPrevPage && (
              <Button variant="outline" asChild>
                <Link href={`/blog/page/${currentPage - 1}`}>
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Previous
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {(() => {
              const maxVisiblePages = 5;
              const pages = [];

              if (totalPages <= maxVisiblePages) {
                // Show all pages if total is small
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Show smart pagination with ellipsis
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, currentPage + 2);

                if (startPage > 1) {
                  pages.push(1);
                  if (startPage > 2) pages.push('...');
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }

                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) pages.push('...');
                  pages.push(totalPages);
                }
              }

              return pages.map((pageNum, index) => {
                if (pageNum === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-muted-foreground"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'default' : 'outline'}
                    size="sm"
                    asChild
                  >
                    <Link href={`/blog/page/${pageNum}`}>{pageNum}</Link>
                  </Button>
                );
              });
            })()}
          </div>

          <div className="flex items-center gap-2">
            {hasNextPage && (
              <Button variant="outline" asChild>
                <Link href={`/blog/page/${currentPage + 1}`}>
                  Next
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </section>
  );
}
