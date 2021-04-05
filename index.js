const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");

const router = require("./Router/router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(router);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let count = 0;

io.listen(server);

io.on("connection", (socket) => {
  console.log("Connected", count++);
  socket.on("join", ({ name, room }, callback) => {
    console.log("Joined", { name, room });
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(user);
    if (error) return;

    socket.join(room);

    // console.log(getUsersInRoom(user));

    io.to(room).emit("room-data", {
      room: user.room,
      users: getUsersInRoom(user),
    });
  });

  socket.on("send-message", (msg) => {
    console.log(msg);
    const user = getUser(msg.sender);
    console.log(user);
    socket.to(msg.room).emit("receive-message", msg);
    // socket.broadcast.to(msg.recepient).emit("receive-message", msg);
  });

  socket.on("disconnect", (h, a, b) => {
    console.log(h, a, b);
    console.log("Disconnected");
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started. 5000`)
);
