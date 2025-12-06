import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: "Adol's Blog",
  description: "Adol's Blog is a personal blog about technology and science",
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    types: {
      'application/rss+xml': [
        { title: 'RSS Feed', url: '/rss.xml' },
        { title: 'Atom Feed', url: '/atom.xml' },
        { title: 'JSON Feed', url: '/feed.json' },
      ],
    },
  },
  openGraph: {
    title: "Adol's Blog",
    description: 'Personal blog about technology and science',
    url: getBaseUrl(),
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
