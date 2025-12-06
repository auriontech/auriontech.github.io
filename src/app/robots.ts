import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
