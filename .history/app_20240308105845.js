const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const ProductManager = require("./ProductManager");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

const productManager = new ProductManager();
const messages = []; // Almacenar mensajes

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Enviar mensajes existentes al cliente recién conectado
  socket.emit("updateMessages", messages);

  socket.on("sendMessage", (message) => {
    const newMessage = { socketId: socket.id, message };
    messages.push(newMessage);

    // Enviar el nuevo mensaje a todos los clientes conectados
    io.emit("updateMessages", [newMessage]);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
