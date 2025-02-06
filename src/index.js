import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import userRoutes from './routes/users.routes.js'
import sessionRoutes from './routes/sessions.routes.js';
import connectDb from "./config/database.js";
//settings
const app = express();
app.set("PORT", 3000);
const uri = "mongodb+srv://lucasverblud:ucfWJpJhHT1Vx11P@cluster0.mnycb.mongodb.net/backend2";
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//passport
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());
//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
// Rutas de sesión bajo "/api/sessions"
app.use("/api/sessions", sessionRoutes);
// Usar el enrutador
app.use('/api/users', userRoutes); // Esto asegura que todas las rutas de users.routes.js se sirvan bajo /api/users
//listeners
connectDb(uri);
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
