"use client";

interface CookieBannerProps {
  isConsentGiven: boolean;
  isLoading: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export default function CookieBanner({
  isConsentGiven,
  isLoading,
  onAccept,
  onReject,
}: CookieBannerProps) {
  return (
    !isConsentGiven &&
    !isLoading && (
      <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 text-center">
        <p>
          We use cookies for analytics. You can choose to accept them to help us
          improve your experience, or reject them.
        </p>
        <div className="mt-2 space-x-4">
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
          >
            Reject
          </button>
        </div>
      </div>
    )
  );
}
