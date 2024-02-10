class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validaciones
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Error: Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("Error: Ya existe un producto con el mismo código.");
      return;
    }

    // Agregar producto
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
