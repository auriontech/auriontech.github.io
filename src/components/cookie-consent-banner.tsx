'use client';

import { useState, useEffect } from 'react';
import { CookieIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Here you would initialize your analytics/tracking scripts
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary');
    setShowBanner(false);
    // Only load essential cookies
  };

  if (!showBanner) return null;

  return (
    <Dialog open={showBanner}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <CookieIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <DialogTitle>Cookie Consent</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience and analyze our
            traffic.{' '}
            <Link
              href={'/privacy'}
              className="underline text-primary hover:text-primary/90 transition-colors"
            >
              Privacy Policy
            </Link>{' '}
            for more information.
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={acceptNecessary}
            className="flex-1"
          >
            Necessary Only
          </Button>
          <Button onClick={acceptAll} className="flex-1">
            Accept All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
