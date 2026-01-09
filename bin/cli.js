#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, statSync } from 'fs';
import { startServer } from '../src/server/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// パッケージ情報を読み込む
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

program
  .name('mdpreview')
  .description(packageJson.description)
  .version(packageJson.version)
  .argument('<directory>', 'Directory containing Markdown files')
  .option('-p, --port <number>', 'Port number', '3000')
  .option('-o, --open', 'Open browser automatically', true)
  .option('--no-open', 'Do not open browser automatically')
  .option('-w, --watch', 'Watch file changes', true)
  .option('--no-watch', 'Do not watch file changes')
  .action(async (directory, options) => {
    const targetDir = resolve(directory);

    // ディレクトリの存在確認
    if (!existsSync(targetDir)) {
      console.error(`Error: Directory "${targetDir}" does not exist.`);
      process.exit(1);
    }

    // ディレクトリかどうか確認
    if (!statSync(targetDir).isDirectory()) {
      console.error(`Error: "${targetDir}" is not a directory.`);
      process.exit(1);
    }

    const port = parseInt(options.port, 10);

    if (isNaN(port) || port < 1 || port > 65535) {
      console.error(`Error: Invalid port number "${options.port}".`);
      process.exit(1);
    }

    try {
      await startServer({
        directory: targetDir,
        port,
        open: options.open,
        watch: options.watch,
      });
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `Error: Port ${port} is already in use. Try a different port with --port option.`
        );
        console.error(`Example: npx mdpreview ${directory} --port ${port + 1}`);
      } else {
        console.error('Error:', error.message);
      }
      process.exit(1);
    }
  });

program.parse();
