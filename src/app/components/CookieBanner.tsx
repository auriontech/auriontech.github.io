"use client";

interface CookieBannerProps {
  isConsentGiven: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export default function CookieBanner({
  isConsentGiven,
  onAccept,
  onReject,
}: CookieBannerProps) {
  if (isConsentGiven) return null;

  return (
    <div className="fixed bottom-0 w-full bg-secondary-800 text-white p-4 text-center">
      <p className="body-text text-white">
        We use cookies for analytics. You can choose to accept them to help us
        improve your experience, or reject them.
      </p>
      <div className="mt-4 space-x-4">
        <button onClick={onAccept} className="btn-primary">
          Accept
        </button>
        <button onClick={onReject} className="btn-secondary">
          Reject
        </button>
      </div>
    </div>
  );
}
