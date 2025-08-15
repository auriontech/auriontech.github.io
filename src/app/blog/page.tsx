import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { ClockIcon, ChevronRightIcon, RssIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function BlogIndex() {
  // Get all posts and show first page
  const allPosts = await getAllPosts();
  const postsPerPage = 6;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Show first page posts
  const posts = allPosts.slice(0, postsPerPage);
  const currentPage = 1;
  const hasNextPage = totalPages > 1;

  return (
    <section className="container px-4 py-6 mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-sm text-muted-foreground">
            {totalPosts} post{totalPosts !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/rss.xml"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            title="RSS Feed"
          >
            <RssIcon className="h-4 w-4" />
            RSS
          </Link>
          <Link
            href="/atom.xml"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            title="Atom Feed"
          >
            <RssIcon className="h-4 w-4" />
            Atom
          </Link>
        </div>
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
            {/* Previous button disabled for first page */}
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
                const startPage = 1;
                const endPage = Math.min(totalPages, 3);

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
                    <Link
                      href={pageNum === 1 ? '/blog' : `/blog/page/${pageNum}`}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                );
              });
            })()}
          </div>

          <div className="flex items-center gap-2">
            {hasNextPage && (
              <Button variant="outline" asChild>
                <Link href="/blog/page/2">
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
