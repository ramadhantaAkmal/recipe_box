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
        include: [user],
        where: {
          userId: user_id,
        },
        order: [["id", "ASC"]],
      });

      res.render("recipes/index.ejs", { recipes });
    } catch (error) {
      res.json(error);
    }
  }

  static async showAddRecipes(req, res) {
    try {
      let categoryList = await category.findAll();
      res.render("recipes/addPage.ejs", { categoryList });
    } catch (error) {
      console.log(error);
    }
  }

  static async addRecipes(req, res) {
    try {
      const body = req.body;
      const userId = req.user_id;

      const recipeNew = await recipe.addRecipe(userId, body);

      // res.json(recipeNew);

      res.redirect("/recipes");
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

      const deleteIngredient = await ingredient.destroy({
        where: {
          recipeId: id,
        },
      });

      const deleteRC = await recipe_category.destroy({
        where: {
          recipeId: id,
        },
      });

      result === 1
        ? res.redirect("/recipes")
        : res.json({
            message: `Id ${id} not deleted`,
          });
    } catch (error) {}
  }

  static async updateRecipe(req, res) {
    try {
      const id = +req.params.id;
      const body = req.body;

      await recipe.updateRecipe(id, body);

      res.redirect("/recipes");
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  static async updateRecipePage(req, res) {
    try {
      const id = +req.params.id;
      let categoryList = await category.findAll();

      let resultRC = await recipe.getRecipeById(id);

      res.render("editRecipe/index.ejs", { resultRC, categoryList });
    } catch (err) {
      res.json(err);
    }
  }

  // get recipe data in details
  static async getRecipeByID(req, res) {
    try {
      const id = +req.params.id;

      let resultRC = await recipe.getRecipeById(id);

      res.render("recipes/detailPage.ejs", { resultRC });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

module.exports = RecipeController;
