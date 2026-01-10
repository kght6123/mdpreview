export function setupWebSocket(wss) {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log('Received:', message.toString());
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error.message, error.stack);
      // Attempt to close the connection gracefully
      try {
        ws.close();
      } catch (closeError) {
        console.error('Error closing WebSocket:', closeError);
      }
    });

    // Send welcome message
    ws.send(
      JSON.stringify({
        event: 'connected',
        data: { message: 'Connected to mdpreview server' },
      })
    );
  });
}
