const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000;

const productManager = new ProductManager();

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.send("Bienvenido al servidor de productos");
});

// Ruta para obtener todos los productos
app.get("/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

  const products = await productManager.getProducts(limit);
  res.json({ products });
});

// Ruta para obtener un producto por ID
app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  const product = await productManager.getProductById(productId);
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
