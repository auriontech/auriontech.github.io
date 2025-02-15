import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import Script from "next/script";
import CookieBanner from "./components/CookieBanner";
import { metadata } from "./config/metadata";
import { organizationSchema } from "./config/schema";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
