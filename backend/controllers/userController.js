const User = require('../models/User');

// Obtener información del perfil del usuario
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Asumiendo que el ID del usuario está disponible en req.user
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};

// Obtener historial de inicios de sesión del usuario
exports.getLoginHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit } = req.query; // Número de registros a mostrar
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const loginHistory = user.loginHistory.slice(-limit).reverse();
    res.json(loginHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de inicios de sesión' });
  }
};
