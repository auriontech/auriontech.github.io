export const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (baseUrl) {
    return baseUrl;
  }

  return 'https://adol.tech';
};

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
