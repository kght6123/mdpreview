import { useState } from 'react';

interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  path?: string;
  children?: TreeNode[];
}

interface FileTreeProps {
  tree: TreeNode;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

function TreeNodeComponent({
  node,
  selectedFile,
  onSelectFile,
  level = 0,
}: {
  node: TreeNode;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
  level?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (node.type === 'file' && node.path) {
    const isSelected = selectedFile === node.path;
    return (
      <button
        onClick={() => onSelectFile(node.path!)}
        className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
          isSelected
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300'
        }`}
        style={{ paddingLeft: `${level * 1 + 1}rem` }}
        aria-current={isSelected ? 'page' : undefined}
      >
        <span className="inline-block w-5 mr-1" aria-hidden="true">
          📄
        </span>
        {node.name}
      </button>
    );
  }

  if (node.type === 'directory' && node.children) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 font-medium"
          style={{ paddingLeft: `${level * 1 + 1}rem` }}
          aria-expanded={isExpanded}
        >
          <span className="inline-block w-5 mr-1" aria-hidden="true">
            {isExpanded ? '📂' : '📁'}
          </span>
          {node.name}
        </button>
        {isExpanded && (
          <div role="group">
            {node.children.map((child, index) => (
              <TreeNodeComponent
                key={`${child.name}-${index}`}
                node={child}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default function FileTree({
  tree,
  selectedFile,
  onSelectFile,
}: FileTreeProps) {
  if (!tree.children || tree.children.length === 0) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400 text-sm">
        No Markdown files found in this directory.
      </div>
    );
  }

  return (
    <nav aria-label="File navigation">
      {tree.children.map((node, index) => (
        <TreeNodeComponent
          key={`${node.name}-${index}`}
          node={node}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
        />
      ))}
    </nav>
  );
}
