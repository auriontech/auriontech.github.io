import { geistSans, geistMono } from '@/lib/fonts';
import './globals.css';
import Providers from '@/components/providers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CookieConsentBanner from '@/components/cookie-consent-banner';

export { metadata } from './metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main className="flex flex-col min-h-screen">
            <Header />
            {children}
          </main>
          <Footer />
          <CookieConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
