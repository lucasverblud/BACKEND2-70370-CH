export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado. Inicia sesión." });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acceso denegado: No tienes permisos suficientes" });
    }

    next();
  };
};
