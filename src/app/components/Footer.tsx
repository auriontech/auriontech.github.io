import { organizationSchema } from "../config/schema";
import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

export default function Footer() {
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
    <footer className="p-3 sm:p-4 bg-gray-900 text-white text-center text-sm sm:text-base">
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
                className="hover:text-gray-300 transition-colors"
              >
                {icon}
              </a>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <p>© {new Date().getFullYear()} Adol Tech. All rights reserved.</p>
          <a
            title="Privacy Policy"
            href="/privacy"
            className="hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
