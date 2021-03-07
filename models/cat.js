'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cat.belongsTo(models.User, {
        foreignKey: 'owner',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  Cat.init(
    {
      name: DataTypes.STRING,
      is_vaccinated: { type: DataTypes.BOOLEAN, defaultValue: 0 },
      owner: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cat',
    },
  )
  return Cat
}
