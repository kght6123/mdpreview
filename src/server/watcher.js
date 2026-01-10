import chokidar from 'chokidar';
import { WebSocket } from 'ws';

export function setupWatcher(directory, wss) {
  const watcher = chokidar.watch('**/*.{md,markdown,mdx}', {
    cwd: directory,
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });

  function broadcast(event, data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event, data }));
      }
    });
  }

  watcher
    .on('add', (path) => {
      console.log(`File added: ${path}`);
      broadcast('file:added', { path });
    })
    .on('change', (path) => {
      console.log(`File changed: ${path}`);
      broadcast('file:changed', { path });
    })
    .on('unlink', (path) => {
      console.log(`File removed: ${path}`);
      broadcast('file:deleted', { path });
    })
    .on('error', (error) => {
      console.error(`Watcher error: ${error}`);
    });

  return watcher;
}
