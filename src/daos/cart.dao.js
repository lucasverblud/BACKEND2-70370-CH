import cartModel from "./models/cart.model.js";

export default class CartDAO {
  async getCartById(id) {
    return await cartModel.findById(id).populate("products");
  }

  async createCart(cartData) {
    return await cartModel.create(cartData);
  }

  async updateCart(id, newData) {
    return await cartModel.findByIdAndUpdate(id, newData, { new: true });
  }

  async deleteCart(id) {
    return await cartModel.findByIdAndDelete(id);
  }
}