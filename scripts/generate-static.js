#!/usr/bin/env node

/**
 * Static site generator for mdpreview
 * Generates a static version of the markdown viewer with pre-rendered content
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import { getFileTree } from '../src/server/api/tree.js';
import { getFileContent } from '../src/server/api/file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateStaticData(sourceDir, outputDir) {
  console.log('🔨 Generating static data...');
  console.log(`📂 Source: ${sourceDir}`);
  console.log(`📦 Output: ${outputDir}`);

  // Create output directory
  mkdirSync(outputDir, { recursive: true });

  // Generate file tree
  console.log('\n📋 Generating file tree...');
  const tree = getFileTree(sourceDir);
  writeFileSync(
    join(outputDir, 'tree.json'),
    JSON.stringify(tree, null, 2),
    'utf-8'
  );
  console.log('✅ File tree generated');

  // Generate content for all markdown files
  console.log('\n📝 Generating content for markdown files...');
  const files = collectMarkdownFiles(tree);
  const contentMap = {};

  for (const file of files) {
    console.log(`   Processing: ${file.path}`);
    try {
      const content = await getFileContent(sourceDir, file.path);
      contentMap[file.path] = content;
    } catch (error) {
      console.error(`   ⚠️  Failed to process ${file.path}: ${error.message}`);
    }
  }

  writeFileSync(
    join(outputDir, 'content.json'),
    JSON.stringify(contentMap, null, 2),
    'utf-8'
  );
  console.log(`✅ Generated content for ${files.length} files`);

  console.log('\n✨ Static data generation complete!');
}

function collectMarkdownFiles(node, files = []) {
  if (node.type === 'file' && node.path) {
    files.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      collectMarkdownFiles(child, files);
    }
  }
  return files;
}

// Main execution
const sourceDir = process.argv[2] || join(__dirname, '../docs');
const outputDir =
  process.argv[3] || join(__dirname, '../src/client/public/data');

generateStaticData(sourceDir, outputDir).catch((error) => {
  console.error('❌ Error generating static data:', error);
  process.exit(1);
});
