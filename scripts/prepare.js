#!/usr/bin/env node

/**
 * Prepare script that runs after npm install
 * - Sets up husky for development
 * - Builds client if needed (e.g., when installing from GitHub)
 */

import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Setup husky if in development mode
if (existsSync(join(rootDir, '.husky'))) {
  try {
    execSync('husky', { stdio: 'inherit', cwd: rootDir });
    console.log('✓ Husky setup complete');
  } catch {
    // Husky setup failed, but it's not critical
    console.log('⚠ Husky setup skipped');
  }
}

// Check if client needs to be built
const clientDistPath = join(rootDir, 'src/client/dist');
const clientNodeModulesPath = join(rootDir, 'src/client/node_modules');

if (!existsSync(clientDistPath)) {
  console.log('📦 Building client (dist not found)...');

  // Install client dependencies if needed
  if (!existsSync(clientNodeModulesPath)) {
    console.log('📦 Installing client dependencies...');
    try {
      execSync('npm install', {
        stdio: 'inherit',
        cwd: join(rootDir, 'src/client'),
      });
    } catch {
      console.error('❌ Failed to install client dependencies');
      process.exit(1);
    }
  }

  // Build client
  try {
    execSync('npm run build', {
      stdio: 'inherit',
      cwd: join(rootDir, 'src/client'),
    });
    console.log('✓ Client build complete');
  } catch {
    console.error('❌ Failed to build client');
    process.exit(1);
  }
} else {
  console.log('✓ Client dist already exists, skipping build');
}
