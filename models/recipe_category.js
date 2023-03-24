'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      recipe_category.hasMany(models.category)
      recipe_category.hasMany(models.recipe)
    }
  }
  recipe_category.init({
    ingredient_quentity: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe_category',
  });
  return recipe_category;
};