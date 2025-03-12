export default class CartRepository {
  constructor(cartDAO) {
    this.cartDAO = cartDAO;
  }

  getCartById(id) {
    return this.cartDAO.getCartById(id);
  }

  updateCart(id, newData) {
    return this.cartDAO.updateCart(id, newData);
  }

  purchaseCart(cartId, userEmail) {
    return this.cartDAO.purchaseCart(cartId, userEmail);
  }
}
