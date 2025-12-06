'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-2xl font-bold mb-6">Something went wrong!</h1>
          <p className="mb-8">
            We&apos;ve encountered a serious problem. Please try again later.
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
