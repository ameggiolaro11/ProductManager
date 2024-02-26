const express = require("express");
const ProductManager = require("./ProductManager"); 

const app = express();
const port = 3000;

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

  const products = await productManager.getProducts(limit);
  res.json({ products });
});

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
