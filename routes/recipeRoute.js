const recipeRoute = require("express").Router();
const { RecipeController } = require("../controllers");

recipeRoute.get("/", RecipeController.listMyRecipe);
recipeRoute.post("/", RecipeController.addRecipes);
recipeRoute.get("/add", RecipeController.showAddRecipes)
recipeRoute.get("/:id", RecipeController.getRecipeByID);
recipeRoute.get("/delete/:id", RecipeController.deleteRecipe);
recipeRoute.post("/update/:id", RecipeController.updateRecipe);

module.exports = recipeRoute;
