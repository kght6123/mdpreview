import { createReadStream, existsSync } from 'fs';
import { join, resolve, extname } from 'path';
import { stat } from 'fs/promises';

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.bmp': 'image/bmp',
  '.ico': 'image/x-icon',
};

export async function getAsset(baseDir, assetPath, res) {
  const fullPath = resolve(join(baseDir, assetPath));

  // Security check: ensure file is within baseDir
  if (!fullPath.startsWith(resolve(baseDir))) {
    res.status(403).json({ error: 'Access denied' });
    return;
  }

  if (!existsSync(fullPath)) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  const stats = await stat(fullPath);
  if (!stats.isFile()) {
    res.status(400).json({ error: 'Not a file' });
    return;
  }

  const ext = extname(fullPath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

  res.setHeader('Content-Type', mimeType);
  res.setHeader('Content-Length', stats.size);

  const stream = createReadStream(fullPath);
  stream.pipe(res);
}
