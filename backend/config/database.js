// backend/config/database.js

const { Sequelize } = require('sequelize');
const path = require('path');
const config = require(path.resolve(__dirname, './config.json')); // Asegúrate de que la ruta sea correcta

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Sincronización de la base de datos sin eliminar tablas existentes
sequelize.sync({ alter: true }).then(async () => {
  console.log("Tablas sincronizadas con la base de datos.");

  // Agrega la columna 'name' sin la restricción NOT NULL
  await sequelize.query('ALTER TABLE "Bodegas" ADD COLUMN IF NOT EXISTS "name" VARCHAR(255)');

  // Asegúrate de que todos los registros existentes tengan un valor para 'name'
  await sequelize.query('UPDATE "Bodegas" SET "name" = \'default_name\' WHERE "name" IS NULL');

  // Luego, agrega la restricción NOT NULL
  await sequelize.query('ALTER TABLE "Bodegas" ALTER COLUMN "name" SET NOT NULL');

}).catch((error) => {
  console.error("Error al sincronizar las tablas:", error);
});

module.exports = sequelize;
