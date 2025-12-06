'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FlaskConical, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-amber-500 mb-6">
        <FlaskConical size={80} strokeWidth={1.5} />
      </div>
      <h1 className="text-2xl font-bold mb-4">Error</h1>
      <p className="text-muted-foreground mb-4 max-w-md">
        Internal Server Error
      </p>
      <p className="text-sm text-muted-foreground mb-8 italic">
        Something went wrong
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors flex items-center gap-2"
        >
          <Home size={16} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
