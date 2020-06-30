require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const authCtrl = require("./controllers/authController");
const postCtrl = require("./controllers/postController");
const socket = require("socket.io");
const messages = [];

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: SESSION_SECRET,
  })
);

app.get("/auth/user", authCtrl.getUser);
app.post("/auth/register", authCtrl.register);
app.post("/auth/logout", authCtrl.logout);
app.post("/auth/login", authCtrl.login);

app.get("/api/posts/:id", postCtrl.getPost);
app.get("/api/posts", postCtrl.getPosts);
app.post("/api/posts", postCtrl.addPost);
app.put("/api/posts/:id", postCtrl.editPost);
app.delete("/api/posts/:id", postCtrl.deletePost);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("beating cancer one db at a time");
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`Getting Ws on port ${SERVER_PORT}`);
});
const io = socket(server);

io.on("connection", (socket) => {
  // GLOBAL SOCKETS
  socket.on("broadcast to global socket", (data) => {
    console.log(`global broadcast hit`);
    socket.broadcast.emit("global response", data);
  });

  socket.on("emit to global socket", (data) => {
    console.log("global emit hit");
    socket.emit("global response", data);
  });

  socket.on("blast to global socket", (data) => {
    console.log("global blast hit");
    io.sockets.emit("global response", data);
  });

  socket.on("typing", (data) => {
    console.log("typing", data);
    if (data.room !== "global") {
      socket.to(data.room).broadcast.emit("typing");
    } else {
      socket.broadcast.emit("typing");
    }
  });

  socket.on("stopped typing", (data) => {
    console.log("stopped typing", data);
    if (data.room !== "global") {
      socket.to(data.room).broadcast.emit("stopped typing");
    }
    socket.broadcast.emit("stopped typing");
  });

  // ROOM SOCKETS
  socket.on("join room", (data) => {
    socket.join(data.room);
  });

  socket.on("broadcast to room socket", (data) => {
    //2
    //this is sending to the client
    messages.push(data);
    socket.to("global").broadcast.emit("room response", messages);
  });

  socket.on("emit to room socket", (data) => {
    console.log(`emit to room ${data}`);
    socket.emit("room response", data);
  });
  socket.on("blast to room socket", (data) => {
    console.log(`blast to room ${data}`);
    io.to(data.room).emit("room response", data);
  });
});
