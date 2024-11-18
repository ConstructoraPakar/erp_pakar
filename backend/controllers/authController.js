const { User } = require('../models'); // Importar el modelo User desde los modelos
const bcrypt = require('bcrypt'); // Para encriptar y verificar contraseñas
const jwt = require('jsonwebtoken'); // Para generar y verificar tokens

/**
 * Función para manejar el inicio de sesión de usuarios.
 * Valida el correo y contraseña, y genera un token JWT.
 */
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo
    const user = await User.findOne({ where: { email } });

    // Validar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT con una duración de 2 horas
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '2h' });

    // Enviar respuesta con el token
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

/**
 * Función para manejar el registro de usuarios.
 * (Este es opcional, lo incluyo si necesitas crear nuevos usuarios desde el backend).
 */
async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña antes de guardar al usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

// Exportar las funciones para usarlas en las rutas
module.exports = {
  login,
  register, // Opcional, puedes quitarlo si no lo necesitas
};
