import express from "express";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

// Ejemplo: Agregar producto al carrito (Solo Usuario)
router.post("/:cid/products/:pid", 
  passport.authenticate("current", { session: false }), 
  authorizeRole("user"), 
  (req, res) => {
    res.json({ message: "Producto agregado al carrito" });
  }
);

export default router;
