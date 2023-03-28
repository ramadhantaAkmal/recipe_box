'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      recipe.belongsTo(models.user)
    }
  }
  recipe.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    preparation_time: DataTypes.INTEGER,
    cooking_time: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};