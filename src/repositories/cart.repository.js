export default class CartRepository {
    constructor(cartDAO) {
      this.cartDAO = cartDAO;
    }
  
    async getCartById(id) {
      return await this.cartDAO.getCartById(id);
    }
  
    async createCart(cartData) {
      return await this.cartDAO.createCart(cartData);
    }
  
    async updateCart(id, newData) {
      return await this.cartDAO.updateCart(id, newData);
    }
  
    async deleteCart(id) {
      return await this.cartDAO.deleteCart(id);
    }
  }
  