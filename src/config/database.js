import mongoose from "mongoose";

export default async function connectDb(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ Base de datos conectada con éxito");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
    process.exit(1); // Si la conexión falla, detenemos el servidor
  }
}
