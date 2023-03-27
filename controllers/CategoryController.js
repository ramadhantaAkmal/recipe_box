const { category } = require("../models");

class CategoryController {
  static async getCategories(req, res) {
    try {
      let categories = await category.findAll();
      res.json(categories);
      //res.render("pirates/index.ejs", { pirates });
    } catch (err) {
      res.json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body;

      let categories = await category.create({
        name,
      });

      // res.redirect("/recipes");
      res.json(categories);
    } catch (err) {
      res.json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      await category.destroy({
        where: { id },
      });

      // res.redirect("/recipes");
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = CategoryController;