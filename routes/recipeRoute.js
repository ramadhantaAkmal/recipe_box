const recipeRoute = require("express").Router();
const { RecipeController } = require("../controllers");

recipeRoute.get("/", RecipeController.listRecipe);
recipeRoute.post("/", RecipeController.addRecipes);
recipeRoute.get("/:id", RecipeController.getRecipeByID);
recipeRoute.delete("/:id", RecipeController.deleteRecipe);
recipeRoute.put("/:id", RecipeController.updateRecipe);

module.exports = recipeRoute;
