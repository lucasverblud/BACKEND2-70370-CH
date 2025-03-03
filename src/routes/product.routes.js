import express from "express";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

// Ejemplo: Crear un producto (Solo Admin)
router.post("/", 
  passport.authenticate("current", { session: false }), 
  authorizeRole("admin"), 
  (req, res) => {
    res.json({ message: "Producto creado con éxito" });
  }
);

// Ejemplo: Eliminar un producto (Solo Admin)
router.delete("/:pid", 
  passport.authenticate("current", { session: false }), 
  authorizeRole("admin"), 
  (req, res) => {
    res.json({ message: "Producto eliminado con éxito" });
  }
);

export default router;
