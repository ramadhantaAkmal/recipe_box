"use strict";
const { Model } = require("sequelize");
const ingredient = require("./ingredient");
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

    static setCategories(categories) {
      const RecipeCategory = sequelize.models.recipe_category;

      // Pertama, hapus semua asosiasi yang ada antara resep dan kategori ini
      return RecipeCategory.destroy({ where: { recipeId: this.id } }).then(
        () => {
          // Kemudian, buat asosiasi baru antara resep ini dan kategori yang disediakan
          const associations = categories.map((category) => {
            return { recipeId: this.id, categoryId: category.id };
          });

          return RecipeCategory.bulkCreate(associations);
        }
      );
    }

    static async setIngredients(ingredients) {
      const ingredient = sequelize.models.ingredient;
      const {name, quantity, recipeId} = ingredients;

      await ingredient.create({
        name,
        quantity,
        recipeId
    });
    }


    static async getRecipeById(id) {
      const RecipeCategory = sequelize.models.recipe_category;
      const Ingredient = sequelize.models.ingredient;
      const category = sequelize.models.category;

      let result = await RecipeCategory.findAll({
        where: {
          recipeId: id,
        },
        include: [recipe, category],
      });

      let ingredients = await Ingredient.findAll({
        where: {
          recipeId: id,
        },
      });

      let resultRC = {};
      let categories = [];

      if (result.length === 0) {
        result = await recipe.findByPk(id);
        resultRC = {
          ...result.dataValues,
          categories,
        };
      } else {
        categories = result.map((el) => {
          return el.category.dataValues;
        });
        resultRC = {
          ...result[0].recipe.dataValues,
          categories,
          ingredients,
        };
      }
      return resultRC;
    }

    static async addRecipe(userId, body) {
      const { name, description, preparation_time, cooking_time, categoryId } =
        body;
      const Ingredient = sequelize.models.ingredient;

      console.log(body);
      let ingredients = [];

      let counter = 1;

      while (body[`name${counter}`]) {
        ingredients.push({
          name: req.body[`name${counter}`],
          quantity: +req.body[`quantity${counter}`],
        });
        counter++;
      }

      const recipeNew = await recipe
        .create(
          {
            name,
            description,
            preparation_time,
            cooking_time,
            userId,
            ingredients,
          },
          {
            include: [Ingredient],
          }
        )
        .then((recipe) => {
          recipe.setCategories(categoryId);
        });
    }

    static async updateRecipe(id, body) {
      const { name, description, preparation_time, cooking_time, categoryId } =
        body;
      const Ingredient = sequelize.models.ingredient;

      let counter = 1;

      let ingredients = [];

      while (body[`nameUpdate${counter}`]) {
        ingredients.push({
          name: body[`nameUpdate${counter}`],
          quantity: +body[`quantityUpdate${counter}`],
          recipeId: id,
        });
        counter++;
      }

      counter = 1;

      while (body[`name${counter}`]) {
        ingredients.push({
          name: body[`name${counter}`],
          quantity: +body[`quantity${counter}`],
          recipeId: id,
        });
        counter++;
      }

      const deleteIngredient = await Ingredient.destroy({
        where: {
          recipeId: id,
        },
      });

      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        
        await recipe.setIngredients(ingredient);
      }

      let rc = await recipe.findByPk(id).then((recipe) => {
        if (!recipe) {
          throw new Error("Recipe not found");
        }
        return recipe.setCategories(categoryId);
      });
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
    recipe.name = recipe.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
  return recipe;
};
