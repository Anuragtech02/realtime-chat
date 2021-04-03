const express = require("express");
const socketio = require("socket.io");
const router = require("./Router/router");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("join", ({ name, room }) => {
    console.log({ name, room });
  });

  socket.on("disconnect", () => {
    console.log("User has left!!!");
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(router);
