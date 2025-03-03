import { Schema, model } from "mongoose";
import { hashPassword } from "../../utils/index.js"; // Importa la función de hash

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un email válido"],
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart", // Referencia al modelo Cart
    },
    role: {
      type: String,
      default: "user", // Rol por defecto
    },
  },
  { timestamps: true }
);

// Middleware para encriptar la contraseña antes de guardarla
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = hashPassword(this.password); // Encripta la contraseña
  next();
});

export default model("User", UserSchema);

