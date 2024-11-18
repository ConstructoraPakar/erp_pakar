// backend/models/user.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); // Asegúrate de que esta línea esté correcta

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  lastLogin: {
    type: DataTypes.DATE
  }
});

// Definir el modelo UserConnections
const UserConnections = sequelize.define('UserConnections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Establecer relación
User.hasMany(UserConnections);
UserConnections.belongsTo(User);

// Hooks existentes
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Métodos existentes
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Nuevo método para registrar conexión
User.prototype.logConnection = async function() {
  await UserConnections.create({ userId: this.id });
  this.lastLogin = new Date();
  await this.save();
};

module.exports = { User, UserConnections };
