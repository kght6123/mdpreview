import { readFile } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// Plugin to remove frontmatter from the AST
function remarkRemoveFrontmatter() {
  return (tree) => {
    // Filter out all yaml and toml frontmatter nodes
    tree.children = tree.children.filter(
      (node) => node.type !== 'yaml' && node.type !== 'toml'
    );
  };
}

// Plugin to add IDs to headings
function rehypeAddHeadingIds() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        const text = node.children
          .map((child) => (child.type === 'text' ? child.value : ''))
          .join('');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        node.properties = node.properties || {};
        node.properties.id = id;
      }
    });
  };
}

export async function getFileContent(baseDir, filePath) {
  const fullPath = resolve(join(baseDir, filePath));

  // Security check: ensure file is within baseDir
  if (!fullPath.startsWith(resolve(baseDir))) {
    throw new Error('Invalid file path');
  }

  const content = await readFile(fullPath, 'utf-8');

  // Parse markdown and generate HTML
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkRemoveFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeAddHeadingIds)
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(content);

  const html = String(file);

  // Extract headings for TOC
  const toc = extractTOC(content);

  // Get the directory of the file for relative path resolution
  const fileDir = dirname(filePath);

  return {
    html,
    toc,
    path: filePath,
    baseDir: fileDir,
  };
}

function extractTOC(markdown) {
  // Remove frontmatter before extracting headings
  // This is done here separately because TOC extraction works on raw markdown
  // before AST processing. Support YAML (---) and TOML (+++) frontmatter.
  const yamlFrontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*(?:\n|$)/;
  const tomlFrontmatterRegex = /^\+\+\+\s*\n[\s\S]*?\n\+\+\+\s*(?:\n|$)/;
  const contentWithoutFrontmatter = markdown
    .replace(yamlFrontmatterRegex, '')
    .replace(tomlFrontmatterRegex, '');

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(contentWithoutFrontmatter)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({
      level,
      text,
      id,
    });
  }

  return toc;
}
