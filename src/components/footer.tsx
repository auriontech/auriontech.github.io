import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className="font-medium hover:underline">
              Adol&apos;s Blog
            </Link>
            . Built with ❤️ for science and technology
          </p>
          <nav className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
