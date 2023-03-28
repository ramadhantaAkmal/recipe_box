const { recipe, user } = require("../models");

class RecipeController {
  static async listRecipe(req, res) {
    try {
      let recipes = await recipe.findAll({
        include: [user],
        order: [["id", "ASC"]],
      });
      const data = {
        id: req.user_id,
        username: req.username,
      };
      if (req.username) {
        res.render("dashboard.ejs", { recipes, data });
      } else {
        res.render("landingPage.ejs", { recipes });
      }
    } catch (error) {
      res.json(error);
    }
  }

  static async listMyRecipe(req, res) {
    const user_id = req.user_id;
    const data = {
      id: req.user_id,
      username: req.username,
    };
    try {
      let recipes = await recipe.findAll({
        include: [user],
        where: {
          userId: user_id,
        },
        order: [["id", "ASC"]],
      });
      // res.json(recipes);
      console.log(recipes);
      res.render("recipes/index.ejs", { recipes, data });
    } catch (error) {
      res.json(error);
    }
  }

  static async addRecipes(req, res) {
    try {
      const { name, description, preparation_time, cooking_time} =
        req.body;
      const userId = req.user_id
      const result = await recipe.create({
        name,
        description,
        preparation_time,
        cooking_time,
        userId,
      });
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
      const data = {
        id: req.user_id,
        username: req.username,
      };
      const recipes = await recipe.findByPk(id);
      res.render("recipes/detailPage.ejs", { recipes, data });
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
