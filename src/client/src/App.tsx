import { useState, useEffect } from 'react';
import FileTree from './components/FileTree';
import Preview from './components/Preview';
import TOC from './components/TOC';
import { config, getApiUrl } from './config';

interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  path?: string;
  children?: TreeNode[];
}

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

function App() {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [notification, setNotification] = useState<string>('');

  const findFirstFile = (node: TreeNode): string | null => {
    if (node.type === 'file' && node.path) {
      return node.path;
    }
    if (node.children) {
      for (const child of node.children) {
        const file = findFirstFile(child);
        if (file) return file;
      }
    }
    return null;
  };

  useEffect(() => {
    // Fetch file tree
    fetch(getApiUrl('/api/tree'))
      .then((res) => res.json())
      .then((data) => {
        setTree(data);
        // Auto-select first file if available
        const firstFile = findFirstFile(data);
        if (firstFile) {
          setSelectedFile(firstFile);
        }
      })
      .catch((err) => console.error('Failed to load file tree:', err));

    // WebSocket connection for file changes (only in dynamic mode)
    if (!config.isStatic) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}`);

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (
          message.event === 'file:changed' &&
          message.data.path === selectedFile
        ) {
          setNotification(`File "${message.data.path}" has been updated`);
          setTimeout(() => setNotification(''), 3000);
          // Reload the file
          setSelectedFile(message.data.path);
        } else if (
          message.event === 'file:added' ||
          message.event === 'file:deleted'
        ) {
          // Refresh tree
          fetch(getApiUrl('/api/tree'))
            .then((res) => res.json())
            .then((data) => setTree(data))
            .catch((err) => console.error('Failed to refresh tree:', err));
        }
      };

      return () => ws.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="flex h-screen bg-white dark:bg-gray-900">
        <aside
          className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
          role="navigation"
          aria-label="File tree"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              mdpreview
            </h1>
          </div>
          {tree ? (
            <FileTree
              tree={tree}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          ) : (
            <div className="p-4 text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          )}
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          {notification && (
            <div
              role="status"
              aria-live="polite"
              className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-4 py-2 text-sm"
            >
              {notification}
            </div>
          )}

          <main
            id="main-content"
            className="flex-1 flex overflow-hidden"
            role="main"
          >
            <div className="flex-1 overflow-y-auto">
              {selectedFile ? (
                <Preview filePath={selectedFile} onTOCUpdate={setToc} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <p className="text-lg mb-2">No file selected</p>
                    <p className="text-sm">
                      Select a Markdown file from the tree
                    </p>
                  </div>
                </div>
              )}
            </div>

            {toc.length > 0 && (
              <aside
                className="w-64 border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
                role="navigation"
                aria-label="Table of contents"
              >
                <TOC items={toc} />
              </aside>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
