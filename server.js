const WebSocket = require('ws');
const PORT = process.env.PORT || 1000; // Render automatically provides PORT
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  console.log('New device connected');

  ws.on('message', message => {
    // Broadcast message to all other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Device disconnected');
  });
});

console.log(`WebSocket server running on port ${PORT}`);
