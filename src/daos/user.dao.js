import userModel from "./models/user.model.js";

export default class UserDAO {
  async getUserById(id) {
    return await userModel.findById(id).select("-password"); // 🔹 Evita devolver la contraseña por defecto
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email }).select("+password"); // 🔹 Necesario para autenticación
  }

  async createUser(userData) {
    return await userModel.create(userData);
  }

  async updateUser(id, newData) {
    return await userModel.findByIdAndUpdate(id, newData, { new: true });
  }

  async deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }
}
