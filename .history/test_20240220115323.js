const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
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
      // Si hay un error al leer el archivo (puede ser porque no existe),
      // se inicializa con un array vacío.
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
    // ... (mismo código que ya tenías)

    // Guardar en el archivo
    this.writeToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    // ... (mismo código que ya tenías)
  }

  updateProduct(id, updatedProduct) {
    const indexToUpdate = this.products.findIndex((product) => product.id === id);

    if (indexToUpdate !== -1) {
      // Actualizar el producto en el array
      this.products[indexToUpdate] = { ...this.products[indexToUpdate], ...updatedProduct };
      console.log("Producto actualizado:", this.products[indexToUpdate]);

      // Guardar en el archivo
      this.writeToFile();
    } else {
      console.error("Error: Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const indexToDelete = this.products.findIndex((product) => product.id === id);

    if (indexToDelete !== -1) {
      // Eliminar el producto del array
      const deletedProduct = this.products.splice(indexToDelete, 1)[0];
      console.log("Producto eliminado:", deletedProduct);

      // Guardar en el archivo
      this.writeToFile();
    } else {
      console.error("Error: Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager("ruta_de_tu_archivo.json");

// ... (otros métodos de ejemplo que ya tenías)

// Actualizar producto por ID
productManager.updateProduct(2, {
  title: "Producto Actualizado",
  price: 25,
  stock: 35,
});

// Eliminar producto por ID
productManager.deleteProduct(1);
