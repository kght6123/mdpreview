/**
 * Configuration for static vs dynamic mode
 * In static mode, the app loads pre-generated JSON files
 * In dynamic mode, the app calls API endpoints
 */

export const config = {
  // Detect if we're in static mode based on environment
  isStatic: import.meta.env.VITE_STATIC_MODE === 'true',

  // Base path for static files (useful for GitHub Pages)
  basePath: import.meta.env.BASE_URL || '/',
};

export function getApiUrl(endpoint: string): string {
  if (config.isStatic) {
    // In static mode, map API endpoints to static files
    switch (endpoint) {
      case '/api/tree':
        return `${config.basePath}data/tree.json`;
      default:
        return endpoint;
    }
  }
  // In dynamic mode, always use absolute paths without base path
  return endpoint;
}
