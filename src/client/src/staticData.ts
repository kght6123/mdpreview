/**
 * Static data loader for pre-generated content
 */

import { config } from './config';

interface ContentData {
  html: string;
  baseDir: string;
  toc: Array<{ level: number; text: string; id: string }>;
}

let contentCache: Record<string, ContentData> | null = null;

async function loadContentCache(): Promise<Record<string, ContentData>> {
  if (contentCache === null) {
    const url = `${config.basePath}data/content.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to load content data from ${url} (HTTP ${response.status})`
      );
    }
    contentCache = await response.json();
  }
  // contentCache is guaranteed to be non-null here due to the check above
  return contentCache as Record<string, ContentData>;
}

export async function getStaticFileContent(
  filePath: string
): Promise<ContentData> {
  const cache = await loadContentCache();
  const content = cache[filePath];

  if (!content) {
    throw new Error(`Content not found for file: ${filePath}`);
  }

  return content;
}
