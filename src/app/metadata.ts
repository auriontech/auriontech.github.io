import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Adol's Blog",
  description: "Adol's Blog is a personal blog about technology and science",
  metadataBase: new URL('https://adol.tech'),
  openGraph: {
    title: "Adol's Blog",
    description: 'Personal blog about technology and science',
    url: 'https://adol.tech',
    siteName: "Adol's Blog",
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: "Adol's Blog - Personal Blog",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adol's Blog",
    description: 'Personal blog about technology and science',
    images: ['/og_image.png'],
    creator: '@adol',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
