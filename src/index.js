import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";
import initializePassport from "./config/passport.config.js";
import userRoutes from "./routes/users.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";
import connectDb from "./config/database.js";
import ticketRoutes from "./routes/ticket.routes.js";
import productRoutes from "./routes/product.routes.js";
// import viewRoutes from "./routes/views.routes.js";

// Cargar variables de entorno
dotenv.config();

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.use("/api/sessions", sessionRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

/* 
import { engine } from "express-handlebars";
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use("/", viewRoutes);
*/

// Conectar a la base de datos
connectDb(process.env.MONGO_URI);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
