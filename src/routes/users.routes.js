import express from "express";
import passport from "passport";
import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/index.js";

const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Por favor ingresa un email válido" });
    }
    
    const newUser = new userModel({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password),
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente", user: { email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Ruta para obtener el usuario actual usando Passport
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    if (!req.user) return res.status(401).json({ message: "No autorizado" });

    // Eliminar el campo password
    req.user.password = undefined;

    // Devolver el usuario sin el campo password
    res.json(req.user);
  }
);

export default router;
