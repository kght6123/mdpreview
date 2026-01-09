import { glob } from 'glob';
import { sep } from 'path';

export function getFileTree(directory) {
  // Find all markdown files
  const pattern = '**/*.{md,markdown,mdx}';
  const files = glob.sync(pattern, {
    cwd: directory,
    nodir: true,
    dot: false,
  });

  // Build tree structure
  const tree = {
    name: '/',
    type: 'directory',
    children: [],
  };

  files.forEach((file) => {
    const parts = file.split(sep);
    let current = tree;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      if (isFile) {
        current.children.push({
          name: part,
          type: 'file',
          path: file,
        });
      } else {
        let dir = current.children.find(
          (child) => child.name === part && child.type === 'directory'
        );
        if (!dir) {
          dir = {
            name: part,
            type: 'directory',
            children: [],
          };
          current.children.push(dir);
        }
        current = dir;
      }
    });
  });

  // Sort directories first, then files, alphabetically
  function sortTree(node) {
    if (node.children) {
      node.children.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'directory' ? -1 : 1;
      });
      node.children.forEach(sortTree);
    }
  }

  sortTree(tree);

  return tree;
}
