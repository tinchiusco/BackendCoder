class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
  setId(id) {
    this.id = id;
  }
}

class ProductManager {
  #products;
  constructor() {
    this.#products = [];
    this.idManager = 1;
  }

  validateProduct(product) {
    let flag = false;
    this.#products.forEach((producto) => {
      
      producto.code === product.code && (flag = true); //Valido que no se repida el atributo code
    });
    if (!flag) {//Valido que los campos no esten vacios
      if (
        product.title !== "" &&
        product.description !== "" &&
        product.price !== "" &&
        product.thumbnail !== "" &&
        product.code !== "" &&
        product.stock !== ""
      ) {
        return true; 
      } else {
        return `Error: No se pudo cargar ${product.title}, hay casilleros vacios`;
      }
    } else {
      return `Error: El producto ${product.title} repite el codigo de otro producto`;
    }
  }

  addProduct(product) {
    const validacion = this.validateProduct(product);
    if (validacion === true) {
      product.setId(this.idManager);
      this.idManager += 1;
      this.#products.push(product);
      return `Se cargo ${product.title}`;
    } else {
      return validacion;
    }
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    return (
      this.#products.find((product) => product.id === id) || "Error: Not found"
    ); //Devuelve el producto, en caso de no encontrarlo devuelve un error
  }
}

const producto1 = new Product("Yerba", "Aguantadora", 500, "a", 555, 100);

const producto2 = new Product("Te", "Manzanilla", 250, "b", 1545, 100);

const producto3 = new Product("Cafe", "La Virginia", 400, "c", 555, 100);

const producto4 = new Product("Malta", "", "", "", "", "");

const ManejadorProductos = new ProductManager();

console.log(ManejadorProductos.addProduct(producto1));

console.log(ManejadorProductos.addProduct(producto2));

console.log(ManejadorProductos.addProduct(producto3)); //Error porque se repite el codigo del producto 1

console.log(ManejadorProductos.addProduct(producto4)); //Error por contener casilleros vacios

console.log("Metodo getProducts");
console.log(ManejadorProductos.getProducts());

console.log("Metodo getProductById");
console.log(ManejadorProductos.getProductById(2));

console.log("Metodo getProductById");
console.log(ManejadorProductos.getProductById(10)); //Error por find de un producto que no existe
