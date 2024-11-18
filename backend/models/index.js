const sequelize = require('../config/database'); // Asegúrate de que esta línea esté correcta
const User = require('./user'); // Asegúrate de que todos los modelos estén importados correctamente
const Administracion = require('./Administracion');
const Bodega = require('./Bodega');
const Finanzas = require('./Finanzas');
const Obra = require('./Obra');
const Proyecto = require('./Proyecto');

// Establecer relaciones entre modelos si es necesario
// Administracion.hasMany(...);
// Bodega.belongsTo(...);

module.exports = {
  sequelize,
  User,
  Administracion,
  Bodega,
  Finanzas,
  Obra,
  Proyecto,
};
