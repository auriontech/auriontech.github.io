/**
 * Utility function to generate consistent URLs across the application
 */
export function getBaseUrl(): string {
  return 'https://adol.tech';
}

/**
 * Generate absolute URLs for assets and pages
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate relative URLs
 */
export function getRelativeUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
}

/**
 * Creates a path generator function for a given locale
 * English locale paths are returned without the locale prefix (e.g., '/blog')
 * Other locales include the locale prefix (e.g., '/es/blog')
 */
export const createLocalizedPath = (locale: string) => {
  return (path: string) => {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // For English, return the path without locale prefix
    if (locale === 'en') {
      return normalizedPath;
    }

    // For other locales, include the locale prefix
    return `/${locale}${normalizedPath}`;
  };
};

/**
 * Utility function to generate a locale-aware path directly
 */
export const getLocalizedPath = (locale: string, path: string) => {
  const pathGenerator = createLocalizedPath(locale);
  return pathGenerator(path);
};
