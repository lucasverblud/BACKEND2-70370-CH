import express from "express";
import passport from "passport";
import UserRepository from "../repositories/user.repository.js";
import UserDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";
import { hashPassword } from "../utils/index.js";

const router = express.Router();
const userRepository = new UserRepository(new UserDAO());

// Ruta para registrar un usuario
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;

  try {
    // Validar email en el backend
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Por favor ingresa un email válido" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await userRepository.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Crear usuario con contraseña hasheada
    const newUser = await userRepository.createUser({
      first_name,
      last_name,
      email: email.toLowerCase(), // Asegurar que se guarde en minúsculas
      age,
      password: hashPassword(password),
      role: role || "user",
    });

    res.status(201).json({ message: "Usuario creado exitosamente", user: { email: newUser.email } });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Ruta para obtener el usuario actual usando Passport y DTO
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "No autorizado" });

    const userDTO = new UserDTO(req.user); // Aplicamos el DTO
    res.json(userDTO);
  }
);

export default router;
