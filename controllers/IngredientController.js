const { ingredient, recipe } = require("../models");

class IngredientController {
  static async getIngredients(req, res) {
    try {
      let ingredients = await ingredient.findAll({
        include: [recipe],
      });
      res.json(ingredients);
      //res.render("pirates/index.ejs", { pirates });
    } catch (err) {
      res.json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name, quentity, recipeId } = req.body;

      let ingridient = await ingredient.create({
        name,
        quentity,
        recipeId,
      });

      //res.redirect("/pirates");
    } catch (err) {
      res.json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      await ingredient.destroy({
        where: { id },
      });

      // res.redirect("/recipes");
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = IngredientController;