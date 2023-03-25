const { Router } = require("express");
const ingredientRoute = Router();
const { IngredientController } = require("../controllers");

ingredientRoute.get("/", IngredientController.getIngredients);
ingredientRoute.post("/create", IngredientController.create);
ingredientRoute.get("/delete/:id", IngredientController.delete)

module.exports = ingredientRoute;