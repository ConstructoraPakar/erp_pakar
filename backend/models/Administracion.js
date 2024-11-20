const { Model, DataTypes } = require('sequelize');

class Administracion extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Administracion',
        tableName: 'administracion', // Nombre de la tabla en la base de datos
        timestamps: false, // Cambiar según sea necesario
      }
    );
  }
}

module.exports = Administracion;
