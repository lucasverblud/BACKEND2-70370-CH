export default class UserRepository {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  getUserById(id) {
    return this.userDAO.getUserById(id);
  }

  getUserByEmail(email) {
    return this.userDAO.getUserByEmail(email);
  }

  createUser(userData) {
    return this.userDAO.createUser(userData);
  }

  updateUser(id, newData) {
    return this.userDAO.updateUser(id, newData);
  }

  deleteUser(id) {
    return this.userDAO.deleteUser(id);
  }
}
