const { Model, DataTypes } = require('sequelize');

class Finanzas extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Finanzas',
        tableName: 'finanzas', // Nombre de la tabla en la base de datos
        timestamps: false, // Cambiar según sea necesario
      }
    );
  }
}

module.exports = Finanzas;
