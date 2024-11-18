const { DataTypes } = require('sequelize'); // Importamos DataTypes desde sequelize
const sequelize = require('../config/database'); // Cambia la ruta a '../config/database'

// Definir el modelo Finanzas
const Finanzas = sequelize.define('Finanzas', {
  id: {
    type: DataTypes.INTEGER, // Usamos DataTypes en lugar de Sequelize
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING, // Usamos DataTypes para STRING
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Usamos DataTypes para DECIMAL
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE, // Usamos DataTypes para DATE
    allowNull: false,
  },
});

module.exports = Finanzas; // Exportar correctamente el modelo Finanzas
