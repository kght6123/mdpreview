import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import open from 'open';
import { setupWatcher } from './watcher.js';
import { setupWebSocket } from './websocket.js';
import { getFileTree } from './api/tree.js';
import { getFileContent } from './api/file.js';
import { getAsset } from './api/asset.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function startServer(config) {
  const { directory, port, open: shouldOpen, watch } = config;

  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  // Static files (Vite build output)
  const clientDistPath = join(__dirname, '../client/dist');
  app.use(express.static(clientDistPath));

  // API routes
  app.get('/api/tree', (req, res) => {
    try {
      const tree = getFileTree(directory);
      res.json(tree);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/file', async (req, res) => {
    try {
      const filePath = req.query.path;
      if (!filePath) {
        return res.status(400).json({ error: 'Missing path parameter' });
      }
      const content = await getFileContent(directory, filePath);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/asset', async (req, res) => {
    try {
      const assetPath = req.query.path;
      if (!assetPath) {
        return res.status(400).json({ error: 'Missing path parameter' });
      }
      await getAsset(directory, assetPath, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(join(clientDistPath, 'index.html'));
  });

  // WebSocket setup
  setupWebSocket(wss);

  // File watcher setup
  if (watch) {
    setupWatcher(directory, wss);
  }

  // Start server
  return new Promise((resolve, reject) => {
    server.listen(port, (err) => {
      if (err) {
        reject(err);
        return;
      }

      const url = `http://localhost:${port}`;
      console.log(`\n🚀 mdpreview server started!`);
      console.log(`📂 Directory: ${directory}`);
      console.log(`🌐 URL: ${url}`);
      console.log(`👀 Watch: ${watch ? 'enabled' : 'disabled'}\n`);

      if (shouldOpen) {
        open(url).catch(() => {
          console.log('Could not open browser automatically.');
        });
      }

      resolve(server);
    });

    server.on('error', reject);
  });
}
