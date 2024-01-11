import { Socket } from "socket.io";
import { Request, Response } from "express";
const express = require('express');
const http = require('http');
import socketIO from "socket.io";
import users from "./users";
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

app.use(express.json());

// Serve a basic HTML page
app.post('/onCardRead', (req: Request, res: Response) => {
  console.log('Received card read event');
  const { cardId } = req.body;
  const user = users.find((user) => user.cardId === cardId);
  if (!user) {
    console.log(`User with id ${cardId} not found`);
    return res.sendStatus(404);
  }
  console.log(`User ${user.name} with id ${cardId} found`);
  io.emit('cardRead', user);
  res.sendStatus(200);
});

// Handle WebSocket connections
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

