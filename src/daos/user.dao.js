import userModel from "./models/user.model.js";

export default class UserDAO {
  async getUserById(id) {
    return await userModel.findById(id).select("-password");
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email }).select("+password");
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
