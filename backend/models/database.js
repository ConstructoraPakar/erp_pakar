// models/database.js

const { Sequelize } = require('sequelize');
const config = require('../config'); // Asegúrate de que la ruta sea correcta

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres', // O 'mysql', 'sqlite', según la base de datos que uses
  }
);

// Sincronización de la base de datos sin eliminar tablas existentes
sequelize.sync({ alter: true }).then(() => {
  console.log("Tablas sincronizadas con la base de datos.");
}).catch((error) => {
  console.error("Error al sincronizar las tablas:", error);
});

module.exports = sequelize;
