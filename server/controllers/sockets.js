const socket = require('socket.io')
module.exports = Sockets

function Sockets (server){
  
  const messages = [];
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
})
}