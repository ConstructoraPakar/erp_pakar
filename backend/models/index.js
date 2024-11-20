const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const basename = path.basename(__filename);
const db = {};

// Cargar y inicializar todos los modelos
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    if (typeof model.init === 'function') {
      model.init(sequelize, Sequelize.DataTypes); // Inicializar con Sequelize
    }
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Establecer relaciones si existen
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
