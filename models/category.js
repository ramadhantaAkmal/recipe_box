"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.belongsToMany(models.recipe, { through: models.recipe_category })
    }
  }
  category.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Name can`t be null."
          }
        }
      },
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
