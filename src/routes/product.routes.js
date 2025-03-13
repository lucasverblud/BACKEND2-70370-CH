import express from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

// Crear un producto (Solo Admin)
router.post(
  "/", 
  passport.authenticate("current", { session: false }), 
  authorizeRole("admin"), 
  createProduct
);

// Eliminar un producto (Solo Admin)
router.delete(
  "/:pid", 
  passport.authenticate("current", { session: false }), 
  authorizeRole("admin"), 
  deleteProduct
);

export default router;

