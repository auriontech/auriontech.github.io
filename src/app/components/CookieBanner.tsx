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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-md w-[95%] bg-background/95 text-foreground p-3 text-center rounded-lg shadow-md border border-border/10">
      <p className="text-sm text-muted-foreground">
        We use cookies for analytics. You can choose to accept them to help us
        improve your experience, or reject them.
      </p>
      <div className="mt-3 space-x-3">
        <button onClick={onAccept} className="btn-primary btn-sm">
          Accept
        </button>
        <button onClick={onReject} className="btn-secondary btn-sm">
          Reject
        </button>
      </div>
    </div>
  );
}
