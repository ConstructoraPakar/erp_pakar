const { DataTypes } = require('sequelize'); // Importamos DataTypes desde sequelize
const sequelize = require('../config/database'); // Asegúrate de que esta línea esté correcta

// Definir el modelo Proyecto
const Proyecto = sequelize.define('Proyecto', {
  id: {
    type: DataTypes.INTEGER, // Usamos DataTypes en lugar de Sequelize
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, // Usamos DataTypes para STRING
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Usamos DataTypes para TEXT
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE, // Usamos DataTypes para DATE
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE, // Usamos DataTypes para DATE
    allowNull: true,
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2), // Usamos DataTypes para DECIMAL
    allowNull: false,
  },
});

module.exports = Proyecto; // Exportamos correctamente el modelo Proyecto
