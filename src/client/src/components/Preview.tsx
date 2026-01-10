import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { config } from '../config';
import { getStaticFileContent } from '../staticData';

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

interface PreviewProps {
  filePath: string;
  onTOCUpdate: (toc: TOCItem[]) => void;
  isSlideMode?: boolean;
}

export default function Preview({
  filePath,
  onTOCUpdate,
  isSlideMode = false,
}: PreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [baseDir, setBaseDir] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'default',
    });
  }, []);

  const loadDynamicContent = async (
    filePath: string
  ): Promise<{
    html: string;
    baseDir: string;
    toc: Array<{ level: number; text: string; id: string }>;
  }> => {
    const res = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
    if (!res.ok) throw new Error('Failed to load file');
    return res.json();
  };

  useEffect(() => {
    if (!filePath) return;

    setLoading(true);
    setError(null);

    const loadContent = config.isStatic
      ? getStaticFileContent(filePath)
      : loadDynamicContent(filePath);

    loadContent
      .then((data) => {
        setHtml(data.html);
        setBaseDir(data.baseDir);
        onTOCUpdate(data.toc || []);
        setLoading(false);

        // Process Mermaid diagrams after content is rendered
        setTimeout(() => {
          mermaid.run({
            querySelector: '.language-mermaid',
          });
        }, 100);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  // Transform image sources to use asset API
  useEffect(() => {
    if (!html || !baseDir) return;

    const article = document.querySelector('.markdown-content');
    if (!article) return;

    const images = article.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        // Relative path - convert to asset API call
        const assetPath = baseDir ? `${baseDir}/${src}` : src;
        img.src = `/api/asset?path=${encodeURIComponent(assetPath)}`;
      }
    });
  }, [html, baseDir]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <article
      key={filePath}
      className={`markdown-content ${isSlideMode ? 'slide-mode' : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label="Markdown content"
    />
  );
}
