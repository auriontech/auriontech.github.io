import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Mermaid } from '@/components/mermaid';

export const mdxComponents = {
  // Headings with proper styling
  h1: ({ children, ...props }: any) => (
    <h1
      className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-8"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-normal mb-4"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight mb-3"
      {...props}
    >
      {children}
    </h4>
  ),
  // Paragraphs with proper spacing
  p: ({ children, ...props }: any) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6 mb-4 text-muted-foreground"
      {...props}
    >
      {children}
    </p>
  ),
  // Links with proper styling
  a: ({ href, children, ...props }: any) => {
    // Internal links
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }
    // External links
    return (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  // Lists with proper styling
  ul: ({ children, ...props }: any) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // Code blocks
  code: ({ children, className, ...props }: any) => {
    // Check if this is a mermaid code block with multiple possible formats
    if (
      className === 'language-mermaid' ||
      className?.includes('language-mermaid') ||
      className === 'mermaid'
    ) {
      return <Mermaid chart={String(children).trim()} />;
    }

    // Check if this is inside a pre block (syntax highlighted code)
    const isInPre =
      props['data-theme'] !== undefined || className?.includes('hljs');

    if (isInPre) {
      // For syntax highlighted code, don't add extra styling
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // For inline code, use the styled version
    return (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => {
    // Check if this contains a mermaid code block
    const child = Array.isArray(children) ? children[0] : children;
    const childClassName = child?.props?.className;

    if (
      childClassName === 'language-mermaid' ||
      childClassName?.includes('language-mermaid') ||
      childClassName === 'mermaid'
    ) {
      return child; // Return the mermaid component directly
    }

    return (
      <pre
        className="mb-6 mt-6 overflow-x-auto rounded-lg p-4 bg-muted/50 border border-border dark:bg-gray-950 dark:border-gray-800"
        {...props}
      >
        {children}
      </pre>
    );
  },
  // Horizontal rule
  hr: (props: any) => <Separator className="my-8" {...props} />,
  // Tables
  table: ({ children, ...props }: any) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => <thead {...props}>{children}</thead>,
  tbody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => (
    <th
      className="border border-border px-4 py-2 text-left font-bold bg-muted"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="border border-border px-4 py-2 text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  // Custom components
  Badge,
  Separator,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  // Mermaid diagrams
  Mermaid,
};
