const { recipe } = require("../models");

class RecipeController {
  static async listRecipe(req, res) {
    try {
      let recipes = await recipe.findAll();
      res.json(recipes);
    } catch (error) {
      res.json(error);
    }
  }

  static async addRecipes(req, res) {
    try {
      const { name, description, preparation_time, cooking_time, userId } =
        req.body;
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

  static async updateRecipe(req, res) {
    try {
      const id = +req.params.id;
      const { name, description, preparation_time, cooking_time, userId } =
        req.body;

      let result = recipe.update(
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

module.exports = RecipeController