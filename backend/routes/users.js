const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, UserConnections } = require('../models/user'); // Importar el modelo User
const authenticateToken = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

// Usar el middleware en las rutas de usuarios
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

// Ruta para obtener datos del perfil y el historial de conexiones
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener historial de conexiones del usuario
    const historial = await UserConnections.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      historial: historial.map(conn => ({
        fecha: new Date(conn.createdAt).toLocaleDateString(),
        hora: new Date(conn.createdAt).toLocaleTimeString(),
      })),
    });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
