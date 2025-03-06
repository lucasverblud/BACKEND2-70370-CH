import express from "express";
import { purchaseCart } from "../controllers/cart.controller.js";
import passport from "passport";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Agregar producto al carrito (Solo Usuario)
router.post("/:cid/products/:pid", 
  passport.authenticate("current", { session: false }), 
  authorizeRole("user"), 
  (req, res) => {
    res.json({ message: "Producto agregado al carrito" });
  }
);

// Finalizar compra del carrito (Solo Usuario)
router.post("/:cid/purchase",
  passport.authenticate("current", { session: false }),
  authorizeRole("user"),
  purchaseCart
);

export default router;
