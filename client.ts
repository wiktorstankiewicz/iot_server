import io  from 'socket.io-client';

const client = io("ws://localhost:8000")

client.send("Hello from the client!")
   