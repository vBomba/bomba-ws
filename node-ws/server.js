const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  // Send random data to client every 5 seconds
  setInterval(() => {
    const data = Math.random();
    ws.send(data);
  }, 5000);

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
});
