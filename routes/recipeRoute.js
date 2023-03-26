const recipeRoute = require("express").Router();
const { RecipeController } = require("../controllers");

recipeRoute.get("/", RecipeController.listRecipe);
recipeRoute.post("/", RecipeController.addRecipes);
recipeRoute.get("/:id", RecipeController.getRecipeByID);
recipeRoute.get("/delete/:id", RecipeController.deleteRecipe);
recipeRoute.post("/update/:id", RecipeController.updateRecipe);

module.exports = recipeRoute;
