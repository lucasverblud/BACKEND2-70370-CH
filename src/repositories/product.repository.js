export default class ProductRepository {
    constructor(productDAO) {
      this.productDAO = productDAO;
    }
  
    createProduct(productData) {
      return this.productDAO.createProduct(productData);
    }
  
    deleteProduct(id) {
      return this.productDAO.deleteProduct(id);
    }
  }
  