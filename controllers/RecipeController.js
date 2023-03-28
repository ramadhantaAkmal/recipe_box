const { recipe, ingredient, recipe_category, user, category } = require("../models");

class RecipeController {
  static async listRecipe(req, res) {
    try {
      let recipes = await recipe.findAll({
        include: [user,ingredient]
      });
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

  static async getRecipeByID(req, res) {
    try {
      const id = +req.params.id;
      console.log(id);

      const recipes = await recipe.findByPk(id);
      // console.log(recipes);
      res.json(recipes);
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
  

  // get recipe data in details
  static async getRecipeDetails(req, res) {
    try {
        const id = +req.params.id

        let result = await recipe_category.findAll({
            where: {
                recipeId: id
            },
            include: [recipe, category]
        })

        let resultRC = {}
        let categories = []

        if (result.length === 0) {
            result = await recipe.findByPk(id)
            resultRC = {
                ...result.dataValues,
                categories
            }
        } else {
            categories = result.map(el => {
                return el.category.dataValues
            })
            resultRC = {
                ...result[0].recipe.dataValues,
                categories
            }
        }

        console.log(resultRC)
        res.json(resultRC)
        // res.render('recipe/detailRecipe.ejs', { RC: resultRC });
    } catch (err) {
        res.json(err)
    }
}
}

module.exports = RecipeController;
