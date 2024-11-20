require('dotenv').config(); // Configuración de dotenv para cargar variables de entorno
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./models/database'); // Importamos la conexión a la base de datos
const models = require('./models'); // Importamos todos los modelos desde index.js

// Importar las rutas
const administracionRoutes = require('./routes/administracion');
const bodegaRoutes = require('./routes/bodega');
const finanzasRoutes = require('./routes/finanzas');
const obraRoutes = require('./routes/obra');
const proyectoRoutes = require('./routes/proyecto');
const usersRoutes = require('./routes/users'); // Ruta de usuarios
const authRoutes = require('./routes/auth'); // Ruta de autenticación

// Middleware para procesar JSON
app.use(express.json());
app.use(cors());

// Definir las rutas
app.use('/administracion', administracionRoutes);
app.use('/bodega', bodegaRoutes);
app.use('/finanzas', finanzasRoutes);
app.use('/obra', obraRoutes);
app.use('/proyecto', proyectoRoutes);
app.use('/api/users', usersRoutes); // Ruta de usuarios
app.use('/api/auth', authRoutes); // Ruta de autenticación

// Puerto de escucha
const port = process.env.PORT || 3000;

// Sincronizar los modelos con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
    return sequelize.sync(); // Sincroniza todos los modelos
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos o sincronizar los modelos:', error);
  });


module.exports = app;
