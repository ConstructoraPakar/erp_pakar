const { DataTypes } = require('sequelize'); // Importamos DataTypes desde sequelize
const sequelize = require('./database'); // Asegúrate de que la ruta sea correcta

// Definir el modelo Bodega
const Bodega = sequelize.define('Bodega', {
  id: {
    type: DataTypes.INTEGER, // Usamos DataTypes para definir el tipo de dato
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bodega; // Exportar correctamente el modelo Bodega
