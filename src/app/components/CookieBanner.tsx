"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true") setIsConsentGiven(true);
    setIsLoading(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsConsentGiven(true);
    window.location.reload(); // Reload to apply tracking scripts
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "false");
    setIsConsentGiven(true);
  };

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
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Accept
          </button>
          <button
            onClick={rejectCookies}
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
          >
            Reject
          </button>
        </div>
      </div>
    )
  );
}
