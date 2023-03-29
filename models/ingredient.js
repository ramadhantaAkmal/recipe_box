"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ingredient.belongsTo(models.recipe);
    }
  }
  ingredient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      quentity: DataTypes.INTEGER,
      recipeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ingredient",
    }
  );
  return ingredient;
};
