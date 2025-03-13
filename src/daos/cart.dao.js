import cartModel from "./models/cart.model.js";
import productModel from "./models/product.model.js";

export default class CartDAO {
  async getCartById(id) {
    return await cartModel.findById(id).populate("products.product").lean(); // 🔥 Agregamos .lean()
  }

  async updateCart(id, newData) {
    return await cartModel.findByIdAndUpdate(id, newData, { new: true });
  }

  async purchaseCart(cartId, userEmail) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) return { error: "Carrito no encontrado" };

      let totalAmount = 0;
      let productsNotPurchased = [];

      for (const item of cart.products) {
        const product = await productModel.findById(item.product._id);

        if (!product) {
          productsNotPurchased.push(item);
          continue;
        }

        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          totalAmount += product.price * item.quantity;
          await product.save();
        } else {
          productsNotPurchased.push(item);
        }
      }

      if (totalAmount > 0) {
        return {
          success: true,
          ticketData: {
            amount: totalAmount,
            purchaser: userEmail,
          },
          remainingProducts: productsNotPurchased,
        };
      }

      return { success: false, remainingProducts: productsNotPurchased };
    } catch (error) {
      console.error("❌ Error en la compra:", error);
      return { error: "Error al procesar la compra" };
    }
  }
}
