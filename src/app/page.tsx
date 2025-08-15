import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRightIcon,
  BookOpenIcon,
  CodeIcon,
  CoffeeIcon,
  ClockIcon,
} from 'lucide-react';

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to my blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            I am a software scientist and electrical engineer that loves
            learning. Here you will find me writing about science, technology
            and my personal journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              <BookOpenIcon className="mr-2 h-4 w-4" />
              Read the Blog
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <CoffeeIcon className="mr-2 h-4 w-4" />
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Topics I Love
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CodeIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Artificial Intelligence</CardTitle>
                <CardDescription>
                  Specially LLMs, deep learning and algorithms.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BookOpenIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Quantum Computing</CardTitle>
                <CardDescription>
                  Finding new applications to quantum computing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CoffeeIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Nuclear Fusion</CardTitle>
                <CardDescription>
                  Looking for a future energy source.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Recent Posts</h2>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all posts
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6">
              {recentPosts.map(post => (
                <Card
                  key={post.slug}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary">{post.locale}</Badge>
                        {post.draft &&
                          process.env.NODE_ENV === 'development' && (
                            <Badge variant="outline" className="text-xs">
                              DRAFT
                            </Badge>
                          )}
                      </div>
                    </div>
                    {post.description && (
                      <CardDescription className="mt-2">
                        {post.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Read more
                      <ArrowRightIcon className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
