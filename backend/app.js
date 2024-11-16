const express = require('express');
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

const cors = require('cors');


// Middleware para procesar JSON
app.use(express.json()); // Para manejar JSON en el cuerpo de la solicitud

app.use(cors());
// Definir las rutas
app.use('/administracion', administracionRoutes);
app.use('/bodega', bodegaRoutes);
app.use('/finanzas', finanzasRoutes);
app.use('/obra', obraRoutes);
app.use('/proyecto', proyectoRoutes);
app.use('/api/users', usersRoutes); // Cambiar la ruta de usuarios a '/api/users'
app.use('/api/auth', authRoutes); // Integración de la ruta de autenticación

// Puerto de escucha
const port = process.env.PORT || 3000;

// Sincronizar los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
    
    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error); // Manejo de errores en la sincronización
  });
