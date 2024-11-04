// adaptador
class ProductAdapter implements ProductPort {
  insert(title: string, category: string, stock: number): void {
    console.log("product inserted");
  }
  findByTitle(title: string): boolean {
    return false;
  }
  findByProductId(productId: number): boolean {
    return true;
  }
  update(productId: number, title: string, stock: number): void {
    console.log("product updated");
  }
  remove(productId: number): void {
    console.log("product deleted");
  }
}

// puerto
type ProductPort = {
  insert(title: string, category: string, stock: number): void;
  findByTitle(title: string): boolean;
  findByProductId(productId: number): boolean;
  update(productId: number, title: string, stock: number): void;
  remove(productId: number): void;
};

// aplicación
class ProductApplication {
  port: ProductPort;

  constructor(adapter: ProductPort) {
    this.port = adapter;
  }

  add(title: string, category: string, stock: number) {
    const existsProduct = this.port.findByTitle(title);
    if (!existsProduct) this.port.insert(title, category, stock);
  }

  update(productId: number, title: string, stock: number) {
    const existsProduct = this.port.findByProductId(productId);
    if (existsProduct) this.port.update(productId, title, stock);
  }

  delete(productId: number) {
    const existsProduct = this.port.findByProductId(productId);
    if (existsProduct) this.port.remove(productId);
  }
}

class ProductController {
  application: ProductApplication;

  constructor(application: ProductApplication) {
    this.application = application;
  }

  create(title: string, category: string, stock: number) {
    if (title.length < 5) throw "Title must have 5 characters at least";
    if (category.length < 5) throw "Category must have 5 characters at least";
    if (stock <= 0) throw "Stock must be greater than zero";

    this.application.add(title, category, stock);
  }

  update(productId: number, title: string, stock: number) {
    if (title.length < 5) throw "Title must have 5 characters at least";
    if (productId <= 0) throw "ProductId must be positive number";
    if (stock <= 0) throw "Stock must be greater than zero";

    this.application.update(productId, title, stock);
  }

  remove(productId: number) {
    if (productId <= 0) throw "ProductId must be positive number";

    this.application.delete(productId);
  }
}

const port: ProductPort = new ProductAdapter();
const application = new ProductApplication(port);
const controller = new ProductController(application);
controller.create("Product Title", "Category", 100);
controller.update(10, "New Product Title", 200);
