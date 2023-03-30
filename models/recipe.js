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
    

    static setCategories(categories) {
      const RecipeCategory = sequelize.models.recipe_category;
    
      // Pertama, hapus semua asosiasi yang ada antara resep dan kategori ini
      return RecipeCategory.destroy({ where: { recipeId: this.id } })
        .then(() => {
          // Kemudian, buat asosiasi baru antara resep ini dan kategori yang disediakan
          const associations = categories.map(category => {
            return { recipeId: this.id, categoryId: category.id };
          });
    
          return RecipeCategory.bulkCreate(associations);
        });
    };

    static async getRecipeById(id){
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

    static async addRecipe(userId, body){
    
      const { name, description, preparation_time, cooking_time, categoryId } = body;
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

      const recipeNew = await recipe.create(
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
      ).then(recipe => {
        recipe.setCategories(categoryId);
      });
    }

    static async updateRecipe(id, body){
      const { name, description, preparation_time, cooking_time, categoryId } = body;

      let counter = 1;

        let ingredients = [];

        while (req.body[`name${counter}`]) {
          ingredients.push({
            name: req.body[`name${counter}`],
            quantity: +req.body[`quantity${counter}`],
          });
          counter++;
        }

      let result = await recipe.update(
        {
          name,
          description,
          preparation_time,
          cooking_time,
        },
        {
          where: {
            id,
          },
        }
      );

      let rc = await recipe.findByPk(id)
      .then(recipe => {
        if (!recipe) {
          throw new Error('Recipe not found');
        }
        return recipe.setCategories(categoryId);
      })
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
