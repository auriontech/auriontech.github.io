"use client";
import { organizationSchema } from "../config/schema";
import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  const getIconForPlatform = (url: string) => {
    if (url.includes("x.com") || url.includes("twitter.com"))
      return <FaXTwitter size={20} />;
    if (url.includes("github.com")) return <FaGithub size={20} />;
    if (url.includes("linkedin.com")) return <FaLinkedin size={20} />;
    if (url.includes("instagram.com")) return <FaInstagram size={20} />;
    if (url.includes("facebook.com")) return <FaFacebook size={20} />;
    return null;
  };

  return (
    <footer className="p-3 sm:p-4 bg-background text-foreground shadow-md">
      <div className="container-custom">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center gap-4">
            {organizationSchema.sameAs.map((url) => {
              const icon = getIconForPlatform(url);
              if (!icon) return null;

              return (
                <a
                  key={url}
                  title={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-300 dark:hover:text-secondary-100 transition-colors"
                >
                  {icon}
                </a>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <p className="text-center text-secondary-600 dark:text-secondary-300">
              © {year} Adol Tech. All rights reserved.
            </p>
            <a
              title="Privacy Policy"
              href="/privacy"
              className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-300 dark:hover:text-secondary-100 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
