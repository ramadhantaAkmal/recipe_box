const recipeRoute = require("express").Router();
const { RecipeController } = require("../controllers");

recipeRoute.get("/", RecipeController.listMyRecipe);
recipeRoute.post("/", RecipeController.addRecipes);
recipeRoute.get("/:id", RecipeController.getRecipeDetails);
recipeRoute.get("/delete/:id", RecipeController.deleteRecipe);
recipeRoute.post("/update/:id", RecipeController.updateRecipe);
recipeRoute.get("/update/:id", RecipeController.updateRecipePage);

module.exports = recipeRoute;
