const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Actualizar la ruta a config/database

// Definir el modelo Bodega simplificado
const Bodega = sequelize.define('Bodega', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true, // Permitir valores nulos inicialmente
  },
});

module.exports = Bodega;
