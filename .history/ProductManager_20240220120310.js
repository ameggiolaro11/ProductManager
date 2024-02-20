// ProductManager.js

const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "productos.json");
    this.products = this.readFromFile();
    this.productIdCounter = this.calculateProductIdCounter();
  }

  calculateProductIdCounter() {
    const maxId = this.products.reduce((max, product) => {
      return product.id > max ? product.id : max;
    }, 0);
    return maxId + 1;
  }

  readFromFile() {
    try {
      const fileContent = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  writeToFile() {
    try {
      const contentToWrite = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, contentToWrite, "utf-8");
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Error: Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("Error: Ya existe un producto con el mismo código.");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    console.log("Producto agregado:", newProduct);

    this.writeToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const foundProduct = this.products.find((product) => product.id === id);

    if (foundProduct) {
      console.log("Producto encontrado:", foundProduct);
      return foundProduct;
    } else {
      console.error("Error: Producto no encontrado.");
      return null;
    }
  }

  updateProduct(id, updatedProduct) {
    const indexToUpdate = this.products.findIndex((product) => product.id === id);

    if (indexToUpdate !== -1) {
      this.products[indexToUpdate] = { ...this.products[indexToUpdate], ...updatedProduct };
      console.log("Producto actualizado:", this.products[indexToUpdate]);

      this.writeToFile();
    } else {
      console.error("Error: Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const indexToDelete = this.products.findIndex((product) => product.id === id);

    if (indexToDelete !== -1) {
      const deletedProduct = this.products.splice(indexToDelete, 1)[0];
      console.log("Producto eliminado:", deletedProduct);

      this.writeToFile();
    } else {
      console.error("Error: Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager();

// Agregar productos
productManager.addProduct(
  "Producto 1",
  "Descripción 1",
  10,
  "imagen1.jpg",
  "ABC123",
  50
);
productManager.addProduct(
  "Producto 2",
  "Descripción 2",
  20,
  "imagen2.jpg",
  "XYZ789",
  30
);
productManager.addProduct(
  "Producto 3",
  "Descripción 3",
  15,
  "imagen3.jpg",
  "ABC123",
  40
);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

// Obtener producto por ID
productManager.getProductById(2);
productManager.getProductById(4); // Error: No encontrado

// Actualizar producto por ID
productManager.updateProduct(2, {
  title: "Producto Actualizado",
  price: 25,
  stock: 35,
});

// Eliminar producto por ID
productManager.deleteProduct(1);
