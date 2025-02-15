"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import CookieBanner from "./CookieBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true") setIsConsentGiven(true);
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && isConsentGiven && (
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
      <CookieBanner />
    </>
  );
}
