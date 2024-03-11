const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const expressHandlebars = require("express-handlebars");
const ProductManager = require("./ProductManager");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

// Configurar Handlebars
app.engine(
  "handlebars",
  expressHandlebars({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Configurar body parser para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager();
const messages = [];

app.use(express.static("public"));

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta para la vista con lista de productos en tiempo real
app.get("/realTimeProducts", (req, res) => {
  const products = productManager.getProducts();
  res.render("realTimeProducts", { products });
});

// Ruta para manejar el formulario y emitir el mensaje a través de WebSocket
app.post("/realTimeProducts", (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  productManager.addProduct(title, description, price, thumbnail, code, stock);

  // Emitir el nuevo producto a través de WebSocket
  const newProduct = productManager.getProductById(productManager.productIdCounter - 1);
  io.emit("updateProducts", [newProduct]);

  res.redirect("/realTimeProducts");
});

// Socket.io
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Enviar mensajes existentes al cliente recién conectado
  socket.emit("updateProducts", productManager.getProducts());

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
