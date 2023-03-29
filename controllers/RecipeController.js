const { recipe, user, ingredient } = require("../models");

class RecipeController {
  static async listRecipe(req, res) {
    try {
      let recipes = await recipe.findAll({
        include: [user],
        order: [["id", "ASC"]],
      });
      // res.json(recipes)
      if (req.username) {
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
      // res.json(recipes);
      // console.log(recipes);
      res.render("recipes/index.ejs", { recipes });
    } catch (error) {
      res.json(error);
    }
  }

  static showAddRecipes(req, res) {
    res.render("recipes/addPage.ejs");
  }

  static async addRecipes(req, res) {
    try {
      const { name, description, preparation_time, cooking_time } = req.body;
      const userId = req.user_id;
      let ingredients = [];

      let counter = 1;

      while (req.body[`name${counter}`]) {
        ingredients.push({
          name: req.body[`name${counter}`],
          quentity: +req.body[`quantity${counter}`],
        });
        counter++;
      }

      const result = await recipe.create(
        {
          name,
          description,
          preparation_time,
          cooking_time,
          userId,
          ingredients,
        },
        {
          include: [ingredient],
        }
      );
      res.json(result);
    } catch (error) {
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
        ? res.redirect("/recipes")
        : res.json({
            message: `Id ${id} not deleted`,
          });
    } catch (error) {}
  }

  static async getRecipeByID(req, res) {
    try {
      const id = +req.params.id;
      const recipes = await recipe.findByPk(id);
      res.render("recipes/detailPage.ejs", { recipes });
    } catch (error) {
      res.json(error);
    }
  }

  static async updateRecipe(req, res) {
    try {
      const id = +req.params.id;
      const { name, description, preparation_time, cooking_time, userId } =
        req.body;

      let result = await recipe.update(
        {
          name,
          description,
          preparation_time,
          cooking_time,
          userId,
        },
        {
          where: {
            id,
          },
        }
      );

      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = RecipeController;
