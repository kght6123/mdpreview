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
    const response = await fetch(`${config.basePath}data/content.json`);
    if (!response.ok) {
      throw new Error('Failed to load content data');
    }
    contentCache = await response.json();
  }
  return contentCache!;
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
