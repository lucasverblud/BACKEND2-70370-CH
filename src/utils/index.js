import { hashSync, genSaltSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

// Generar un token JWT
export const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "clave-secreta",
    { expiresIn: "24h" }
  );
};

// Hashear contraseña
export const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

// Comparar contraseña ingresada con la almacenada (hash)
export const isValidPassword = (password, hashedPassword) => {
  return compareSync(password, hashedPassword);
};
