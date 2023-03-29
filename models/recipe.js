"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      recipe.belongsToMany(models.category, {
        through: models.recipe_category,
      });
      recipe.hasMany(models.ingredient);
      recipe.belongsTo(models.user);
    }
  }
  recipe.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Name can`t be null.",
          },
        },
      },
      description: DataTypes.STRING,
      preparation_time: DataTypes.INTEGER,
      cooking_time: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "User Id can`t be null.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "recipe",
    }
  );
  recipe.addHook("beforeValidate", (recipe, options) => {
    recipe.name = (recipe.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" ");
  });
  return recipe;
};
