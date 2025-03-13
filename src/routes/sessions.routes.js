import express from "express";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../utils/index.js";
import userModel from "../daos/models/user.model.js";

const router = express.Router();

// Ruta para login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Validación de contraseña
    if (!isValidPassword(password, user.password)) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generamos el token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "clave-secreta",
      { expiresIn: "24h" }
    );

    // Enviar token como cookie HTTP-only
    res.cookie("authCookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

// Ruta para logout
router.post("/logout", (req, res) => {
  res.clearCookie("authCookie");
  res.json({ message: "Logout exitoso" });
});

export default router;
