import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../daos/models/user.model.js";

const cookieExtractor = (req) => {
  return req?.cookies?.authCookie || null;
};

const initializePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET || "clave-secreta",
  };

  passport.use(
    "jwt",
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const user = await userModel.findById(jwt_payload.id);
        if (!user) return done(null, false, { message: "Usuario no encontrado" });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.use(
    "current",
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const user = await userModel.findById(jwt_payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export default initializePassport;


