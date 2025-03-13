import productModel from "./models/product.model.js";

export default class ProductDAO {
  async createProduct(productData) {
    return await productModel.create(productData);
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async getAllProducts() {
    return await productModel.find();
  }

  async updateProduct(id, productData) {
    return await productModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}
