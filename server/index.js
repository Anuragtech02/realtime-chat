const express = require("express");
const socketio = require("socket.io");
const router = require("./Router/router");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(http);
const io = socketio(server);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(router);
