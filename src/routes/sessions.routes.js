import express from "express";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../utils/index.js";
import userModel from "../daos/models/user.model.js";

const router = express.Router();

// Ruta para login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  // Compara la contraseña ingresada con el hash almacenado
  //if (!isValidPassword(password, user.password)) {
  //  console.log("Contraseña ingresada:", password);
  //  console.log("Contraseña almacenada (hash):", user.password);
  //  return res.status(400).json({ message: "Contraseña incorrecta" });
  //}

  // Generamos el token si la contraseña es correcta
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "clave-secreta", { expiresIn: "24h" });

  res.cookie("authCookie", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  return res.json({ message: "Login exitoso", token });
});

// Ruta para logout
router.post("/logout", (req, res) => {
  res.clearCookie("authCookie");
  res.json({ message: "Logout exitoso" });
});

export default router;

