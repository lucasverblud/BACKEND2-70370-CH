import UserRepository from "../repositories/user.repository.js";
import UserDAO from "../daos/user.dao.js";

const userRepository = new UserRepository(new UserDAO());

export const getUserById = async (req, res) => {
  try {
    const user = await userRepository.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
