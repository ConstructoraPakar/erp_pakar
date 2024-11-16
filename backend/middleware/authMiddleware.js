// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Si no hay token, devuelve 401 (No autorizado)

  jwt.verify(token, 'SECRET_KEY', (err, user) => { // Usa la misma clave secreta que usaste para generar el token
    if (err) return res.sendStatus(403); // Si el token no es válido, devuelve 403 (Prohibido)
    req.user = user;
    next(); // Si el token es válido, permite el acceso a la ruta
  });
}

module.exports = authenticateToken;
