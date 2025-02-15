"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import CookieBanner from "./CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true" || consent === "false") setIsConsentGiven(true);
    setIsConsent(consent === "true");
    setIsLoading(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsConsentGiven(true);
    setIsConsent(true);
    window.location.reload(); // Reload to apply tracking scripts
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "false");
    setIsConsentGiven(true);
    setIsConsent(false);
  };

  return (
    <>
      {!isLoading && isConsentGiven && isConsent && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-BZPYCV16JX`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-BZPYCV16JX', {
                  'anonymize_ip': true
                });
              `,
            }}
          />
        </>
      )}
      {children}
      <CookieBanner
        isConsentGiven={isConsentGiven}
        isLoading={isLoading}
        onAccept={acceptCookies}
        onReject={rejectCookies}
      />
    </>
  );
}
