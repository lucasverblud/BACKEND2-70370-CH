export default class UserRepository {
    constructor(userDAO) {
      this.userDAO = userDAO;
    }
  
    async getUserById(id) {
      return await this.userDAO.getUserById(id);
    }
  
    async getUserByEmail(email) {
      return await this.userDAO.getUserByEmail(email);
    }
  
    async createUser(userData) {
      return await this.userDAO.createUser(userData);
    }
  
    async updateUser(id, newData) {
      return await this.userDAO.updateUser(id, newData);
    }
  
    async deleteUser(id) {
      return await this.userDAO.deleteUser(id);
    }
  }
  