const {
  recipe,
  ingredient,
  recipe_category,
  user,
  category,
} = require("../models");

class RecipeController {
  static async listRecipe(req, res) {
    try {
      let recipes = await recipe.findAll({
        include: [user],
        order: [["id", "ASC"]],
      });
      if (req.user_id) {
        res.render("dashboard.ejs", { recipes });
      } else {
        res.render("landingPage.ejs", { recipes });
      }
    } catch (error) {
      res.json(error);
    }
  }

  static async listMyRecipe(req, res) {
    const user_id = req.user_id;
    try {
      let recipes = await recipe.findAll({
        include: [user,ingredient],
        where: {
          userId: user_id,
        },
        order: [["id", "ASC"]],
      });
     
      console.log(user_id);
      res.render("recipes/index.ejs", { recipes });
    } catch (error) {
      res.json(error);
    }
  }

  static async addRecipes(req, res) {
    try {
      const { name, description, preparation_time, cooking_time, userId } =
        req.body;
      
      const recipeNew = await recipe.create({
        name,
        description,
        preparation_time,
        cooking_time,
        userId,
      });

      const rcNew = await recipe_category.create({
        recipeId: recipeNew.id,
        categoryId: 11,
      });

      res.json(rcNew);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  static async deleteRecipe(req, res) {
    try {
      const id = +req.params.id;

      let result = await recipe.destroy({
        where: { id },
      });

      result === 1
        ? res.json({
            message: `Berhasil deleted ${id}`,
          })
        : res.json({
            message: `Id ${id} not deleted`,
          });
    } catch (error) {}
  }

  static async getRecipeByID(req, res) {
    try {
      const id = +req.params.id;
      console.log(id);

      const recipes = await recipe.findByPk(id);
      // console.log(recipes);
      res.render("recipes/detailPage.ejs", { recipes });
      // res.json(recipes);
    } catch (error) {
      res.json(error);
    }
  }

  static async updateRecipe(req, res) {
    try {
      const id = +req.params.id;
      const { name, description, preparation_time, cooking_time, categoryId } =
        req.body;
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

      let rc = await recipe_category.update(
        {
          categoryId,
        },
        {
          where: {
            recipeId: id,
          },
        }
      );

      res.redirect("/recipes");
    } catch (error) {
      res.json(error);
    }
  }

  static async updateRecipePage(req, res) {
    try {
      const id = +req.params.id;

      let result = await recipe_category.findAll({
        where: {
          recipeId: id,
        },
        include: [recipe, category],
      });

      let ingredients = await ingredient.findAll({
        where: {
          recipeId: id,
        },
      });

      let categoryList = await category.findAll();

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

      res.render("editRecipe/index.ejs", { resultRC, categoryList });
    } catch (err) {
      res.json(err);
    }
  }

  // get recipe data in details
  static async getRecipeDetails(req, res) {
    try {
      const id = +req.params.id;

      let result = await recipe_category.findAll({
        where: {
          recipeId: id,
        },
        include: [recipe, category],
      });

      let ingredients = await ingredient.findAll({
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
      console.log(resultRC);
      res.render("recipes/detailPage.ejs", { resultRC });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

module.exports = RecipeController;
