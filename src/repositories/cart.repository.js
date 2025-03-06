export default class CartRepository {
  constructor(cartDAO) {
    this.cartDAO = cartDAO;
  }

  async getCartById(id) {
    return await this.cartDAO.getCartById(id);
  }

  async updateCart(id, newData) {
    return await this.cartDAO.updateCart(id, newData);
  }

  async purchaseCart(cartId, userEmail) {
    return await this.cartDAO.purchaseCart(cartId, userEmail);
  }
}

  