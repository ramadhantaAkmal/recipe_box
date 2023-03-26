const { recipe_category, recipe, category } = require('../models')
class RecipeCategoryController{
    static async getRC(req, res) {
        try {
            let RCs = await recipe_category.findAll({
                include: [recipe, category]
            })

            res.json(PIs)
        } catch (err) {
            res.json(err)
        }
    }

    static async create(req, res) {
        try {
            const { recipeId, categoryId, ingredient_quentity } = req.body;

            let result = await recipe_category.create({
                recipeId: +recipeId,
                categoryId: +categoryId,
                ingredient_quentity: +ingredient_quentity
            })

            res.json(result)
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = RecipeCategoryController;