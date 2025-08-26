// mqtt-websocket.js
const mqtt = require('mqtt');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// MQTT credentials (replace these with your own)
const FLESPI_TOKEN = process.env.FLESPI_TOKEN;
const FLESPI_BROKER = process.env.FLESPI_BROKER;
const FLESPI_TOPIC = process.env.FLESPI_TOPIC;

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
