import UserRepository from "../repositories/user.repository.js";
import UserDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";

const userRepository = new UserRepository(new UserDAO());

export const getUserById = async (req, res) => {
  try {
    const user = await userRepository.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const userDTO = new UserDTO(user); // Aplicamos DTO para evitar enviar `password`
    res.json(userDTO);
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
