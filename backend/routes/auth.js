// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Asegúrate de que el nombre y la ruta coincidan
const router = express.Router();

// Endpoint de autenticación
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Buscar usuario por email
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Crear token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
  
      // Devolver el token y el nombre del usuario
      res.json({
        message: 'Autenticación exitosa',
        token,
        user: {
          name: user.name, // Aquí enviamos el nombre del usuario
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });

// Endpoint para verificar la contraseña del usuario (para eliminar)
router.post('/verify-password', async (req, res) => {
  const { password } = req.body;
  
  try {
    // Obtener el usuario actualmente autenticado (administración en este caso)
    const user = await User.findOne({ where: { email: 'administracion@pakarspa.com' } });

    if (!user) {
      return res.status(404).json({ isValid: false });
    }

    // Comparar la contraseña ingresada con la contraseña almacenada
    const isValid = await bcrypt.compare(password, user.password);
    res.json({ isValid });
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    res.status(500).json({ isValid: false });
  }
});

module.exports = router;
