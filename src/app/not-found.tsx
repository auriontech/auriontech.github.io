import Link from 'next/link';
import { Dna } from 'lucide-react';

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-red-500 mb-6">
        <Dna size={80} strokeWidth={1.5} />
      </div>
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
