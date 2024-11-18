const { User } = require('../models'); // Asegúrate de que el modelo User esté importado correctamente
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para manejar el éxito del inicio de sesión
function onLoginSuccess(user, res) {
  const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ message: 'Inicio de sesión exitoso', token });
}

// Controlador de inicio de sesión
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña Incorrecta' });
    }

    onLoginSuccess(user, res); // Llama a la función onLoginSuccess

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = {
  login,
};