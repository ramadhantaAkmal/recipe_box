const { recipe_category, recipe, category, ingredient } = require('../models')
class RecipeCategoryController{
    static async getRC(req, res) {
        try {
            let RCs = await recipe_category.findAll({
                include: [recipe, category]
            })

            res.json(RCs)
        } catch (err) {
            console.log(err);
            res.json(err)
        }
    }

    static async create(req, res) {
        try {
            const { recipeId, categoryId } = req.body;

            let quantity = await ingredient.count({
                where: { recipeId: recipeId },
              });

            let result = await recipe_category.create({
                recipeId: +recipeId,
                categoryId: +categoryId,
                ingredient_quentity: quantity
            })

            res.json(result)
        } catch (err) {
            res.json(err)
        }
    }

    static async update(req, res) {
        try {
            const { id, recipeId } = req.body;
            let ingredient_quentity = await ingredient.count({
                where: { recipeId: recipeId },
              });

            let result = await recipe_category.update(
                {
                  ingredient_quentity
                },
                {
                  where: {
                    id,
                  },
                }
              );
        
              res.json(result);
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = RecipeCategoryController;