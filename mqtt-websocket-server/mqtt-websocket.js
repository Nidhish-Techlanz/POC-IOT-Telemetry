// mqtt-websocket.js
const mqtt = require('mqtt');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve HTML UI
app.use(express.static('public'));

// MQTT credentials (replace these with your own)
const FLESPI_TOKEN = 'epK9D0CUqrd8OSUWtS35EYA0qMsZAptzl2V0BNwxp3c05dqac4I7gNeJAL1D57Vc'; 
const FLESPI_BROKER = 'mqtt.flespi.io';
const FLESPI_TOPIC = 'flespi/message/gw/devices/6755546';

// Connect to Flespi MQTT broker
const mqttClient = mqtt.connect(`mqtts://${FLESPI_BROKER}`, {
  username: FLESPI_TOKEN
});

mqttClient.on('connect', () => {
  console.log('Connected to Flespi MQTT');
  mqttClient.subscribe(FLESPI_TOPIC, (err) => {
    if (!err) {
      console.log('Subscribed to topic:', FLESPI_TOPIC);
    } else {
      console.error('Subscription error:', err);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  console.log(`MQTT Message from ${topic}: ${message.toString()}`);

  // Broadcast to all connected WebSocket clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ topic, message: message.toString() }));
    }
  });
});

server.listen(8000, () => {
  console.log('Web server running at http://localhost:8000'); 
});
