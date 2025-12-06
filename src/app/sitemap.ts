import { getBaseUrl } from '@/lib/url';

export const dynamic = 'force-static';

export default async function sitemap() {
  const baseUrl = getBaseUrl();

  const routes = ['', '/about', '/blog'];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
