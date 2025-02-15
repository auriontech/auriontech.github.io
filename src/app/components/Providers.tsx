"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import CookieBanner from "./CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(true);
  const [isConsent, setIsConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    setIsConsentGiven(consent === "true" || consent === "false");
    setIsConsent(consent === "true");
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <CookieBanner
        isConsentGiven={isConsentGiven}
        onAccept={() => {
          localStorage.setItem("cookie_consent", "true");
          setIsConsentGiven(true);
          setIsConsent(true);
          window.location.reload();
        }}
        onReject={() => {
          localStorage.setItem("cookie_consent", "false");
          setIsConsentGiven(true);
          setIsConsent(false);
        }}
      />
      {isConsentGiven && isConsent && (
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
    </div>
  );
}
