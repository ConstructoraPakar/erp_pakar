const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user'); // Importar el modelo User
const authenticateToken = require('../middleware/authMiddleware'); // Middleware de autenticación

// Obtener todos los usuarios
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    } else {
      res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
    }
  }
});

// Actualizar un usuario existente
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    user.name = name;
    user.email = email;
    
    // Encriptar la nueva contraseña solo si se proporciona
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
  }
});

// Eliminar un usuario
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
});

// ==================== NUEVAS RUTAS ====================

// Obtener el perfil del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario obtenido del token
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
});

// Obtener el historial de inicios de sesión del usuario
router.get('/login-history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query; // Límite predeterminado de 10 registros
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Obtener los últimos `limit` registros del historial
    const loginHistory = user.loginHistory.slice(-limit).reverse();
    res.json(loginHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de inicios de sesión' });
  }
});

module.exports = router;
