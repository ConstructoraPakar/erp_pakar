const { Model, DataTypes } = require('sequelize');

class Obra extends Model {
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
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Obra',
        tableName: 'obras', // Nombre de la tabla en la base de datos
        timestamps: false, // Cambiar según sea necesario
      }
    );
  }
}

module.exports = Obra;
