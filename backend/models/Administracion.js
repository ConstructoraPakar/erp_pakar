// models/Administracion.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Actualizar la ruta a config/database

// Definir el modelo Administracion simplificado
const Administracion = sequelize.define('Administracion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Administracion;
